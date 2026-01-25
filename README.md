# Backend Code Analysis & Optimization Platform

A backend-focused system that allows authenticated users to submit source code for analysis using a **job-based architecture**. 

The platform combines **deterministic static analysis** with **AI-assisted refactoring**, while maintaining auditability, correctness, and scalability.

This project is developed as a **B.Tech Major Project** with an emphasis on backend engineering and system design rather than UI or AI prompt wrapping.

---

## 📌 Problem Statement

Most existing AI-based code review platforms directly send user-submitted code to an AI model and return suggestions.  

This approach suffers from:

- Inconsistent results
- Missed deterministic bugs
- Hallucinated recommendations
- Lack of verification
- Poor backend reliability

The goal of this project is to design a **reliable backend analysis engine** where AI is used as a controlled component, not the sole decision-maker.

---

## 🎯 Objectives

- Build a secure backend system for code submission and analysis
- Introduce a **job-based processing pipeline**
- Detect deterministic bugs using rule-based static analysis
- Use AI only for refactoring confirmed issues
- Track user and system actions for observability and debugging
- Design a system that is extensible and production-oriented

---

## 🧠 Core Design Philosophy

- Static analysis before AI
- Jobs instead of direct requests
- AI as a helper, not an authority
- Verification over blind trust
- Auditability at every step

---

## 🏗️ System Architecture

### High-Level Flow
```
User
│
│ (Authenticated Request)
▼
API Layer (Express)
│
▼
Analysis Job Creation
│
├── Store code snapshot
├── Create job (PENDING)
└── Log CODE_UPLOAD
│
▼
Static Analysis Engine (detector.core)
│
├── Rule-based bug detection
└── Structured issue output
│
▼
AI Refactoring Engine (planned)
│
├── Fix confirmed issues only
└── JSON-validated output
│
▼
Verification Layer (planned)
│
├── Re-run detectors
└── Prevent regressions
│
▼
```
Final Results Stored


---

## 🗂️ Data Model Overview

### AnalysisJob

Represents a single unit of work created when a user submits code.

- Stores immutable code snapshot
- Tracks job lifecycle (`PENDING`, `IN_PROGRESS`, `COMPLETED`, `FAILED`)
- Enables job polling and future async processing

### ActivityLog

Acts as an audit trail for user and system actions.

#### Tracks:

- LOGIN / LOGOUT
- CODE_UPLOAD
- DETECTOR_RUN
- AI_CALL

#### Used for:

- Debugging
- Observability
- Abuse prevention (future scope)

---

## ⚙️ Tech Stack

- Backend: Node.js, Express.js
- Database: MySQL
- ORM: Sequelize
- Authentication: JWT-based authentication
- Architecture Pattern: Controller–Service–Model
- Analysis: Rule-based static analysis
- AI Integration: Planned (LLM APIs)

---

## 🚀 Current Features

### Implemented

- Secure authentication and verification
- Job-based code submission (`POST /jobs`)
- Persistent code storage (text-only, non-executable)
- Activity logging for critical actions
- Clean separation of concerns
- Scalable database design

### Planned

- Static analysis engine integration
- Detector result storage
- AI-assisted refactoring
- Verification loop
- Job status polling (`GET /jobs/:id`)
- Rate limiting and abuse control

---

## 📡 API Overview

### Create Analysis Job

Only authenticated and verified users can create analysis jobs.

## 🔍 Why This Project Stands Out

- Not a simple AI wrapper

- Does not execute or evaluate user-submitted code

- Deterministic bug detection before AI usage

- Job-based design enables scalability

- Clear audit trail for every action

- Backend-first engineering mindset

## 📚 Academic Relevance (Major Project)

- This project demonstrates:

- Backend system design

- RESTful API architecture

- Secure authentication flows

- Static analysis concepts

- Responsible AI integration

- Database modeling and observability

- The implementation aligns with real-world backend engineering practices.

## 🧪 Future Enhancements

- Asynchronous job workers

- Advanced static analysis rules

- Code diff generation

- AI fix verification

- Analytics dashboard

- Multi-language support

## 👤 Author

#### Abhishek Jevene

**LinkedIn Profile** - https://www.linkedin.com/in/abhishek-jevene-2a3b18267/

**Email** - jeveneabhi665@gmail.com

###### B.Tech – Computer Science - (AIML)

###### Backend Developer

Focus: Backend architecture, APIs, system design

## 📜 License

- This project is developed for academic and learning purposes.
