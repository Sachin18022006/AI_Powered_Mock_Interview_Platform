# 🚀 AI-Powered Mock Interview Platform

A full-stack web application that simulates real-world technical interviews using AI.
It generates personalized questions from user resumes, supports text and voice responses, and provides intelligent feedback to help users improve their performance.

---

## 🌐 Live Demo

* 🔗 Frontend: https://ai-powered-mock-interview-platform-snowy.vercel.app
* 🔗 Backend: https://ai-powered-mock-interview-platform-6uf5.onrender.com

---

## ✨ Features

* 🔐 JWT-based user authentication
* 📄 Resume upload and parsing (PDF support)
* 🧠 AI-generated interview questions based on resume and role
* 🎤 Voice-based answers using speech-to-text
* 🔊 AI voice responses using text-to-speech
* 💻 Live coding support with evaluation
* 📊 AI-powered feedback with performance scoring
* 📚 Interview history with progress tracking

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* JWT Authentication

### AI & APIs

* Google Gemini API (question generation & feedback)
* AssemblyAI (speech-to-text)
* Murf AI (text-to-speech)

---

## 📁 Project Structure

```bash
AI_Powered_Mock_Interview_Platform/
│
├── client/   # Frontend
├── server/   # Backend
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d

GEMINI_API_KEY=your_gemini_key
ASSEMBLYAI_API_KEY=your_assemblyai_key
MURF_API_KEY=your_murf_key
```

---

### Frontend (Vercel)

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Sachin18022006/AI_Powered_Mock_Interview_Platform.git
cd AI_Powered_Mock_Interview_Platform
```

---

### 2. Run Backend

```bash
cd server
npm install
node server.js
```

---

### 3. Run Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🌍 Deployment

* Frontend → Vercel
* Backend → Render
* Database → MongoDB Atlas

---

## 🧠 Key Highlights

* Built a complete MERN stack application
* Implemented AI-driven interview simulation
* Integrated multiple AI services (Gemini, AssemblyAI, Murf)
* Designed scalable REST APIs with authentication

---

## 👨‍💻 Author

**Sachin B S**
GitHub: https://github.com/Sachin18022006

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
