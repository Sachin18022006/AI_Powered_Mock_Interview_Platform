# PrepPilot — AI-Powered Mock Interview Platform

PrepPilot simulates real-world technical interviews using AI. It generates personalized
questions from your resume, supports text and voice responses, and provides intelligent
feedback to help you improve your performance — all in one place.

> **Live demo:** https://ai-powered-mock-interview-platform-snowy.vercel.app
> **API:** https://ai-powered-mock-interview-platform-6uf5.onrender.com
> **GitHub:** https://github.com/Sachin18022006/AI_Powered_Mock_Interview_Platform

---

## 1. Project overview

PrepPilot takes a candidate's resume and target role, then generates a personalized
set of interview questions tailored to their background. Candidates can answer via
text or voice (speech-to-text powered by AssemblyAI), hear AI responses read back
to them (text-to-speech via Murf AI), attempt live coding challenges, and receive
detailed AI feedback with a performance score at the end. All sessions are saved to
an interview history so candidates can track their progress over time.

## 2. Features

- JWT-based user authentication
- Resume upload and parsing (PDF support)
- AI-generated interview questions based on resume and target role
- Voice-based answers using speech-to-text (AssemblyAI)
- AI voice responses using text-to-speech (Murf AI)
- Live coding support with AI evaluation
- AI-powered feedback with performance scoring
- Interview history with progress tracking

## 3. Tech stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) + React Router + Axios |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas (Mongoose ODM) |
| Auth | JWT + bcryptjs |
| AI — Question generation & feedback | Google Gemini API |
| AI — Speech to text | AssemblyAI |
| AI — Text to speech | Murf AI |
| Deployment | Vercel (frontend) + Render (backend) |

## 4. Project structure

```
PrepPilot/
├── client/          # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
├── server/          # Express backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
└── README.md
```

## 5. Local setup

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas connection string
- API keys for Gemini, AssemblyAI, and Murf AI

### Backend
```bash
cd server
cp .env.example .env
# fill in all values (see Environment Variables section below)
npm install
node server.js     # starts on http://localhost:5000
```

### Frontend
```bash
cd client
npm install
npm run dev        # starts on http://localhost:5173
```

## 6. Environment variables

### Backend (`server/.env`)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=7d

GEMINI_API_KEY=your_gemini_api_key
ASSEMBLYAI_API_KEY=your_assemblyai_api_key
MURF_API_KEY=your_murf_api_key
```

### Frontend (Vercel environment variables)
```
VITE_API_URL=https://your-backend-url.onrender.com
```

## 7. High-level architecture

```
React Client (Vite)
  ├─ Auth state via JWT stored in localStorage
  ├─ Axios instance with Authorization header injection
  └─ Pages: /login , /register , /dashboard , /interview , /history
        │
        │  REST (JSON), JWT in Authorization header
        ▼
Express API (Node.js)
  ├─ /api/auth       → register, login
  ├─ /api/resume     → upload and parse PDF
  ├─ /api/interview  → generate questions, submit answers, get feedback
  ├─ /api/history    → saved sessions per user
  └─ middleware/auth → verifies JWT, attaches req.user.id to every request
        │
        ├──────────────────────────────────┐
        ▼                                  ▼
MongoDB Atlas                      External AI APIs
  ├─ Users                           ├─ Gemini (questions + feedback)
  ├─ Resumes                         ├─ AssemblyAI (speech to text)
  └─ InterviewSessions               └─ Murf AI (text to speech)
```

## 8. Authentication & authorization

- Passwords hashed with bcryptjs before storage — plaintext never saved.
- Stateless JWT sessions: token signed with JWT_SECRET, sent as
  `Authorization: Bearer <token>` on every request.
- Auth middleware decodes the token and attaches `req.user.id` to the request.
  Every database query for user-specific data (resumes, sessions, history) is
  filtered by this ID, so one user can never access another's data.

## 9. AI integration

**Question generation (Gemini)**
The parsed resume text and target role are sent to Gemini with a structured prompt
that instructs it to return a JSON array of interview questions — a mix of
behavioural, technical, and role-specific questions weighted toward the candidate's
actual experience.

**Feedback & scoring (Gemini)**
After the session, each answer is sent back to Gemini alongside the original question.
The model returns structured feedback (strengths, areas to improve, suggested answer)
and a numeric score per question, which are aggregated into an overall session score.

**Speech to text (AssemblyAI)**
Voice answers are recorded in the browser, uploaded as audio blobs to the backend,
and forwarded to AssemblyAI's transcription API. The returned transcript is treated
as the candidate's answer, identical to a typed response.

**Text to speech (Murf AI)**
AI question text is sent to Murf AI and returned as an audio stream, played back in
the browser so the interview feels more like a real conversation.

## 10. Key design decisions & trade-offs

- **Multiple AI providers** rather than one — Gemini for language tasks, AssemblyAI
  for transcription accuracy, and Murf AI for natural-sounding voice. Each does one
  thing well rather than one provider trying to do everything.
- **Resume parsed server-side** rather than in the browser — keeps the AI prompt
  construction logic in one place and avoids sending large files back and forth.
- **JWT in localStorage** — simpler across separately-deployed frontend and backend
  origins without cookie/SameSite issues. A production hardening step would move
  this to httpOnly cookies with CSRF protection.
- **Session history stored in MongoDB** — allows progress tracking across logins
  without any client-side state persistence.

## 11. Known limitations

- Voice recording quality affects transcription accuracy — background noise can
  reduce AssemblyAI output quality.
- AI-generated questions are based on resume text quality; a sparse or poorly
  formatted resume produces less targeted questions.
- No real-time collaborative or panel interview simulation (single AI interviewer only).
- No video recording or analysis of non-verbal communication.

## 12. Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

Environment variables are set directly in each platform's dashboard — never
committed to the repository.

---

**Author:** Sachin B S — [github.com/Sachin18022006](https://github.com/Sachin18022006)
