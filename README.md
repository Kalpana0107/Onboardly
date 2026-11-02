# Onboardly

# 📄 AI-Powered Resume Screening System

> Smart resume analysis, skill extraction, and candidate screening powered by NLP.

![GitHub](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/Frontend-React.js-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Python](https://img.shields.io/badge/NLP-Python-yellow)
![Database](https://img.shields.io/badge/Database-SQLite%20%7C%20PostgreSQL-orange)
![Views](https://hits.sh/github.com/Kalpana3007/SmartHire.svg?style=flat-square&label=views&color=0e75b6)

---

## 🚀 Overview

The **Resume Screening System** is an intelligent recruitment assistant designed to automate the initial screening process of job applications.

The system extracts information from uploaded resumes, analyzes skills using Natural Language Processing (NLP), and provides recruiters with structured candidate insights, helping reduce manual effort and improve hiring efficiency.

---

## ✨ Features

### 📂 Resume Upload
- Upload resumes in PDF format.
- Secure file handling using Multer.

### 🧠 NLP-Based Resume Parsing
- Extracts:
  - Name
  - Email
  - Phone Number
  - Skills
  - Education
  - Experience

### 🎯 Skill Analysis
- Identifies technical and non-technical skills.
- Detects keywords relevant to job descriptions.

### 📊 Candidate Evaluation
- Resume scoring based on matching criteria.
- Candidate ranking system.

### 🔍 Search & Filter
- Search candidates by:
  - Skills
  - Education
  - Experience
- Filter resumes efficiently.

### ⚡ Fast Processing
- Automated parsing pipeline.
- Real-time resume analysis.

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|------------|----------|
| React.js | User Interface |
| CSS / Tailwind (if used) | Styling |
| Axios | API Communication |

### Backend

| Technology | Purpose |
|------------|----------|
| Node.js | Server Runtime |
| Express.js | API Framework |
| Multer | File Upload Handling |

### NLP & Processing

| Technology | Purpose |
|------------|----------|
| Python | Resume Processing |
| spaCy | NLP & Skill Extraction |
| pdfplumber | PDF Parsing |

### Database

| Technology | Purpose |
|------------|----------|
| SQLite | Local Development | | Production Database |

### Deployment

| Platform | Purpose |
|----------|----------|
| Vercel | Frontend Hosting |
| Render | Backend Deployment |
| Railway | Database / Services |

---

## 🏗️ System Architecture

```text
┌─────────────┐
│   React UI  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Express API │
└──────┬──────┘
       │
       ▼
┌──────────────────────┐
│ Resume Upload Module │
│      (Multer)        │
└─────────┬────────────┘
          │
          ▼
┌──────────────────────┐
│ Python NLP Pipeline  │
│ spaCy + pdfplumber   │
└─────────┬────────────┘
          │
          ▼
┌──────────────────────┐
│ Candidate Database   │
│ SQLite │
└──────────────────────┘
```

---

## 📁 Project Structure

```text
resume-screening-system/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
│
├── nlp/
│   ├── parser.py
│   ├── extractor.py
│   └── skill_matcher.py
│
├── database/
│   └── schema.sql
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/resume-screening-system.git
cd resume-screening-system
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Python Dependencies

```bash
pip install -r requirements.txt
```

---

## ▶️ Running the Application

### Start Frontend

```bash
npm start
```

### Start Backend

```bash
npm run dev
```

### Run NLP Service

```bash
python parser.py
```

---

## 📡 API Endpoints

### Upload Resume

```http
POST /api/resume/upload
```

### Get Candidate Details

```http
GET /api/candidates/:id
```

### Get All Candidates

```http
GET /api/candidates
```

### Search Candidates

```http
GET /api/candidates/search
```

---

## 📈 Future Enhancements

- AI Resume Scoring
- Job Description Matching
- ATS Compatibility Checker
- Candidate Recommendation Engine
- Resume Feedback Generator
- Dashboard Analytics
- Interview Prediction System

---

## 🔒 Security Considerations

- File validation before upload
- Input sanitization
- Protected API endpoints
- Secure database queries
- Environment variable management

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Add feature"
```

4. Push branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 👥 Contributors

- Project Team
- Open Source Contributors

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---

### Built with ❤️ using React, Node.js, Python NLP, and PostgreSQL.


