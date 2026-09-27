# PrepPilot — AI-Powered Mock Interview Platform

PrepPilot simulates real-world technical interviews using AI. It generates personalized
questions from your resume, supports text and voice responses, and provides intelligent
feedback to help you improve your performance — all in one place.

> **Live demo:** https://ai-powered-mock-interview-platform-snowy.vercel.app  
> **API:** https://ai-powered-mock-interview-platform-6uf5.onrender.com  
> **GitHub:** https://github.com/Sachin18022006/AI_Powered_Mock_Interview_Platform  

---

## 1. Project Overview

PrepPilot takes a candidate's resume and target role, then generates a personalized
set of interview questions tailored to their background. Candidates can answer via
text or voice (speech-to-text powered by AssemblyAI), hear AI responses read back
to them (text-to-speech via Murf AI), attempt live coding challenges, and receive
detailed AI feedback with a performance score at the end. All sessions are saved to
an interview history so candidates can track their progress over time.

---

## 2. Features

- **JWT-based user authentication:** Secure signup, login, and protected routes.
- **Resume upload and parsing:** Automatic text extraction from PDF resumes using PDF.js.
- **AI-generated interview questions:** Tailored interview sessions generated via Google Gemini 2.5 Flash.
- **Voice-based answers:** Audio recording with speech-to-text powered by AssemblyAI.
- **AI voice synthesis:** Interactive voice questions and responses streamed via Murf AI.
- **Live coding environment:** In-browser Monaco code editor with real-time AI evaluation.
- **Comprehensive feedback:** Category scoring, strengths, weaknesses, and model answers.
- **Interview history:** Persistent MongoDB session tracking to review past progress.

---

## 3. Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19 (Vite), React Router 7, Monaco Editor, React Hot Toast, React Icons |
| **Backend** | Node.js (ESM), Express 5 |
| **Database** | MongoDB Atlas (Mongoose 9 ODM) |
| **Auth** | JWT + bcryptjs |
| **AI — Questions & Feedback** | Google Gemini 2.5 Flash (`@google/genai`) |
| **AI — Speech to text** | AssemblyAI (`assemblyai`) |
| **AI — Text to speech** | Murf AI Speech Stream API |
| **Deployment** | Vercel (Frontend) + Render (Backend / Fullstack) |

---

## 4. Project Structure

```
AI_Powered_Mock_Interview_Platform/
├── client/              # React frontend (Vite)
│   ├── src/
│   │   ├── components/  # Navbar, CodeEditor, VoiceRecorder, etc.
│   │   ├── pages/       # HomePage, LoginPage, InterviewPage, HistoryPage, etc.
│   │   └── services/    # api.js, authService.js, interviewService.js
│   ├── package.json
│   ├── vercel.json      # SPA routing for Vercel
│   └── vite.config.js
├── server/              # Express backend
│   ├── src/
│   │   ├── config/      # db.config.js, gemini.config.js
│   │   ├── controllers/ # auth, interview, resume, history controllers
│   │   ├── middleware/  # auth.middleware.js, error.middleware.js, upload
│   │   ├── models/      # User, Interview, Resume Mongoose models
│   │   ├── routes/      # Express API routers
│   │   ├── services/    # gemini, assemblyai, murf services
│   │   └── utils/       # jwt, prompts utils
│   ├── server.js        # Backend entrypoint (0.0.0.0 binding)
│   └── package.json
├── package.json         # Root scripts for cloud builds & monorepo orchestration
├── render.yaml          # Render Blueprint deployment definition
└── README.md
```

---

## 5. Local Setup

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas connection string
- API keys for Gemini, AssemblyAI, and Murf AI

### Quick Start
1. **Clone repository:**
   ```bash
   git clone https://github.com/Sachin18022006/AI_Powered_Mock_Interview_Platform.git
   cd AI_Powered_Mock_Interview_Platform
   ```

2. **Configure environment:**
   Create `server/.env` based on `.env.example`:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   GEMINI_API_KEY=your_gemini_api_key
   ASSEMBLYAI_API_KEY=your_assemblyai_api_key
   MURF_API_KEY=your_murf_api_key
   CLIENT_URL=http://localhost:5173
   ```

3. **Install dependencies & build:**
   ```bash
   npm run build
   ```

4. **Run development servers:**
   - **Backend:** `npm run dev:server` (http://localhost:5000)
   - **Frontend:** `npm run dev:client` (http://localhost:5173)

---

## 6. Environment Variables Reference

| Variable | Description | Where to set |
|---|---|---|
| `NODE_ENV` | Application environment (`production` or `development`) | Render & Local |
| `PORT` | Listening port (default 5000 local, 10000 on Render) | Render & Local |
| `MONGODB_URI` | MongoDB Atlas Connection String | Render & Local |
| `JWT_SECRET` | Secret key for signing auth tokens | Render & Local |
| `JWT_EXPIRES_IN` | Token expiration period (`7d`) | Render & Local |
| `GEMINI_API_KEY` | Google Gemini API Key | Render & Local |
| `MURF_API_KEY` | Murf AI Speech API Key | Render & Local |
| `ASSEMBLYAI_API_KEY` | AssemblyAI Speech-to-Text Key | Render & Local |
| `CLIENT_URL` | Frontend URL for CORS | Render & Local |
| `VITE_API_URL` | Backend API URL for frontend client | Vercel |

---

## 7. Render Deployment Guide

### Setting up on Render Dashboard:
1. Navigate to your service `AI_Powered_Mock_Interview_Platform` on [dashboard.render.com](https://dashboard.render.com).
2. Go to **Settings**:
   - **Root Directory:** *(leave blank / empty)*
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/health`
3. Go to **Environment** tab and confirm all environment variables from Section 6 are present.
4. Go to **Manual Deploy** -> **Clear build cache & deploy** (or **Deploy latest commit**).

*(Alternatively, you can deploy using the included `render.yaml` Blueprint via **New + -> Blueprint**).*

---

## 8. High-Level Architecture

```
React Client (Vite / Vercel)
  ├─ Auth state via JWT stored in localStorage
  ├─ Axios instance with Authorization header injection
  └─ Pages: /login , /register , /interview , /history
        │
        │  REST (JSON), JWT in Authorization header
        ▼
Express API (Node.js / Render)
  ├─ /health         → Health check endpoint for zero-downtime monitoring
  ├─ /api/auth       → register, login, profile
  ├─ /api/resume     → upload and parse PDF
  ├─ /api/interview  → generate questions, submit answers, voice stream, code check
  ├─ /api/history    → saved sessions per user
  └─ middleware/auth → verifies JWT, attaches req.user to every request
        │
        ├──────────────────────────────────┐
        ▼                                  ▼
MongoDB Atlas                      External AI APIs
  ├─ Users                           ├─ Google Gemini 2.5 Flash
  ├─ Resumes                         ├─ AssemblyAI (Speech to Text)
  └─ Interviews                      └─ Murf AI (Text to Speech Streaming)
```

---

## 9. Key Design Decisions

- **Multiple AI Providers:** Google Gemini for complex reasoning and evaluation, AssemblyAI for transcription accuracy, Murf AI for realistic voice synthesis.
- **Server-Side PDF Parsing:** Resumes are parsed securely on the server with PDF.js before creating prompt context.
- **Resilient JSON Parsing:** Custom parser for LLM responses to ensure reliable JSON extraction even when LLM output includes markdown formatting or conversational commentary.
- **Express 5 Compatibility:** Modernized routing, 0.0.0.0 container binding, and graceful static fallback for unified hosting.

---

**Author:** Sachin B S — [github.com/Sachin18022006](https://github.com/Sachin18022006)
