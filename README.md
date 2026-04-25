<div align="center">

# 🏔️ bukit
### *Sikit-sikit, lama-lama jadi bukit.*

**An AI-powered subsidy discovery platform for every Malaysian.**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-bukit--dan.vercel.app-4CAF50?style=for-the-badge)](https://bukit-dan.vercel.app/)
[![React](https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

</div>

---

## 🇲🇾 What is bukit?

**bukit** helps Malaysian citizens — especially B40 and M40 households — cut through the noise of fragmented government subsidy information. Instead of spending hours navigating incomplete government portals or travelling to offices just to get a pamphlet, users simply ask a question and get a personalized answer in seconds.

> 💬 *"What grocery subsidies can I get in Selangor?"*
> → bukit matches you with **SARA Untuk Semua**, **MyKasih**, and more — instantly.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Secure Auth & Onboarding** | JWT-encrypted login + onboarding flow that captures your state, birth year, and income category (B40/M40/T20) |
| 🤖 **Smart Subsidy Matching** | ILMU-GLM-5.1 with RAG — retrieves only relevant Budget 2026 context before generating a response |
| 📰 **News Module** | Live subsidy news feed powered by NewsData.io |
| 📊 **Categorized Dashboard** | Browse aids by Utilities, Transport, Healthcare, Education, and Groceries |
| 🚀 **High-Impact Landing Page** | Clean, trustworthy entry point highlighting Malaysia-specific subsidies like MyKasih & RON 95 |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    React (Vite) Frontend                 │
│              JWT Auth Context · Responsive UI            │
└───────────────────────┬─────────────────────────────────┘
                        │ RESTful API
┌───────────────────────▼─────────────────────────────────┐
│                  Node.js (Express) Backend               │
│         Auth · Chat · User Profile · News APIs          │
└──────┬─────────────────┬──────────────────┬─────────────┘
       │                 │                  │
  ┌────▼────┐      ┌─────▼─────┐     ┌─────▼──────┐
  │ MongoDB │      │  ChromaDB │     │   Z.AI GLM  │
  │  Users  │      │  RAG/Vecs │     │  + Gemini   │
  └─────────┘      └───────────┘     │  (Fallback) │
                                     └─────────────┘
```

All services deployed on **Vercel**.

---

## 🧠 How the AI Works

1. User submits a question from the dashboard
2. Backend fetches the user's profile (state, income, birth year)
3. **RAG pipeline** queries ChromaDB for relevant Budget 2026 snippets
4. Context + user profile + system instructions → sent to **ILMU-GLM-5.1**
5. GLM returns structured **JSON** → rendered as cards in the UI
6. If GLM times out (>30s) → **Gemini API fallback** kicks in automatically

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite, React Context API |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (users), ChromaDB (vector embeddings) |
| AI | Z.AI ILMU-GLM-5.1, Gemini (fallback) |
| News | NewsData.io API |
| Auth | JWT (JSON Web Tokens) |
| Deployment | Vercel |
| Testing | Vitest, k6 load testing |
| CI/CD | GitHub Actions |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB Atlas URI
- Z.AI API key
- Gemini API key
- NewsData.io API key

### Installation

```bash
# Clone the repo
git clone https://github.com/PandaRyan/dan.git
cd dan

# Install frontend dependencies
cd umh_app
npm install

# Install backend dependencies
cd ../umh_api
npm install
```

### Environment Variables

Create a `.env` file in `umh_api/`:

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
ZAI_API_KEY=your_zai_key
GEMINI_API_KEY=your_gemini_key
NEWSDATA_API_KEY=your_newsdata_key
```

### Running Locally

```bash
# Terminal 1 — Backend
cd umh_api
npm run dev

# Terminal 2 — Frontend
cd umh_app
npm run dev
```

---

## 🧪 Testing

```bash
# Frontend unit tests + coverage
cd umh_app
npm run coverage

# Backend unit tests
cd umh_api
npx vitest run

# Linting
npm run lint

# Load test (requires server running)
k6 run test/load-test.js
```

### CI/CD Gates (GitHub Actions)

| Check | Requirement | Status |
|---|---|---|
| Automatic Build | Zero errors | ✅ |
| Unit Tests | 100% passing | ✅ |
| Code Quality | Zero lint errors | ✅ |
| Test Coverage | ≥ 81.2% | ✅ |
| API Performance (Auth) | < 800ms | ✅ 647ms |
| Security (git leaks) | No keys exposed | ✅ |

---

## 📁 Project Structure

```
dan/
├── umh_app/          # React (Vite) frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── context/
│   └── ...
├── umh_api/          # Node.js (Express) backend
│   ├── routes/
│   ├── middleware/
│   ├── test/
│   └── ...
└── README.md
```

---

## 🗺️ Roadmap

- [ ] Multi-LLM automated RAG pipeline for real-time subsidy updates
- [ ] Follow-up question support within the chat
- [ ] File/image attachment support (pay slips, utility bills)
- [ ] OpenFinance API integration for deeper financial profiling
- [ ] Redis caching for news data
- [ ] Cloudflare CDN for static assets

---

## 👨‍💻 Team dan

| Member | Role |
|---|---|
| **Ryan Ng Ka Wai** | Backend Lead · RAG Pipeline · Documentation |
| **Jayden Yew Jae Han** | Frontend Lead · UI/UX · CI Pipelines |
| **Lee Wen Le** | Frontend · Auth Pages · Documentation |

Built with 💚 for **UMHackathon 2026** · Universiti Malaya × PEKOM

---

<div align="center">

**bukit** · [Live Demo](https://bukit-dan.vercel.app/) · [Report Bug](mailto:umhackathon@um.edu.my) · [Request Feature](mailto:umhackathon@um.edu.my)

*Empowering Malaysians, one subsidy at a time.*

</div>
