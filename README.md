# 🚀 AI-Powered Mock Interview Platform

An end-to-end full-stack web application that simulates real-world technical interviews using AI. It generates personalized questions from user resumes, supports text and voice responses, and provides intelligent feedback on performance. The platform also tracks interview history, helping users improve through continuous practice.

---

## 🌐 Live Demo

* 🔗 Frontend: https://ai-powered-mock-interview-platform-snowy.vercel.app
* 🔗 Backend API: https://ai-powered-mock-interview-platform-6uf5.onrender.com

---

## ✨ Features

* 🔐 User Authentication (JWT-based login & register)
* 📄 Resume Upload & Parsing
* 🧠 AI-generated Interview Questions (based on role & resume)
* 🎤 Speech-to-Text Answering (AssemblyAI)
* 💻 Code Answer Support
* 📊 AI Feedback & Performance Evaluation
* 📚 Interview History Tracking
* ⚡ Real-time interactive interview flow

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Axios
* React Router
* Tailwind CSS (or your styling)

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* JWT Authentication

### AI & APIs

* Gemini API (Google AI)
* AssemblyAI (Speech-to-Text)
* Murf API (Text-to-Speech)

---

## 📁 Project Structure

```
AI_Powered_Mock_Interview_Platform/
│
├── client/        # Frontend (React + Vite)
├── server/        # Backend (Node.js + Express)
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`server/.env`)

```
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

### Frontend (Vercel Environment)

```
VITE_API_URL=https://your-render-backend-url.onrender.com
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/Sachin18022006/AI_Powered_Mock_Interview_Platform.git
cd AI_Powered_Mock_Interview_Platform
```

---

### 2️⃣ Backend Setup

```
cd server
npm install
node server.js
```

---

### 3️⃣ Frontend Setup

```
cd client
npm install
npm run dev
```

---

## 🌍 Deployment

* Frontend deployed on **Vercel**
* Backend deployed on **Render**
* Database hosted on **MongoDB Atlas**

---

## 🧠 Future Enhancements

* 📊 Advanced analytics dashboard
* 🤖 Adaptive AI questioning
* 🎯 Personalized improvement suggestions
* 🌐 Multi-language support
* 📱 Mobile responsiveness improvements

---

## 🙌 Acknowledgements

* Google Gemini API
* AssemblyAI
* Murf AI
* Open Source Community

---

## 👨‍💻 Author

**Sachin B S**

* GitHub: https://github.com/Sachin18022006

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and share it 🚀
