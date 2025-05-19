#Event Management System

A full-stack Event Management System where users can view, book, and manage event details.

---

## 📁 Project Structure

Event_management_system/
├── backend/ # FastAPI backend
├── Frontend/ # React frontend



---

## Backend Setup (FastAPI + MongoDB)

###  Requirements

- Python 3.9+
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Poetry](https://python-poetry.org/) or `pip` for dependency management (you can use `requirements.txt`)

### 🔧 Setup Instructions

1. **Navigate to the backend directory:**

cd backend
Create and activate a virtual environment (optional but recommended):

python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
Install dependencies:

pip install -r requirements.txt
Set up environment variables:

Create a .env file in the backend/ folder:

MONGO_URL=mongodb+srv://{}:{}@project.zroupem.mongodb.net/?retryWrites=true&w=majority&appName=Project
DB_NAME=event_booking_system

Run the server:
uvicorn main:app --reload
Access the API:

Swagger UI: http://localhost:8000/docs

Frontend Setup (React)
Requirements
Node.js (v16+ recommended)

npm or yarn

🔧 Setup Instructions
Navigate to the frontend directory:

cd Frontend
Install dependencies:
npm install
# or
yarn install
Start the development server:
npm run dev
# or
yarn start
Access the frontend:

Open http://localhost:3000 in your browser

API and Frontend Integration
Make sure the backend is running on http://localhost:8000.

Update your frontend API calls accordingly (e.g., using axios or fetch to call http://localhost:8000/api/... endpoints).

Features
-->View upcoming events

-->Book event seats

-->Track availability

-->MongoDB for storage

-->FastAPI for backend API

-->React for frontend UI