
# 🎫 Event Booking System - Backend (FastAPI)

This is the backend service for the Event Booking System built with **FastAPI** and **SQLite**. It provides a RESTful API for managing events and bookings, with support for real-time seat availability, input validation, and OpenAPI integration.

---

## 📌 Features

- Create, view, and manage events
- Book seats for available events
- Cancel bookings
- Prevent overbooking
- Automatic seat reallocation upon cancellations
---

## 🗂️ Project Structure

backend/
├── app/
│ ├── main.py # FastAPI app entrypoint
│ ├── models.py 
│ ├── database.py # DB connection & setup
│ └── routes
│ └── venv
├── requirements.txt # Backend dependencies
└── README.md

---

### 🔒 Backend Booking Logic

- Booking is **only allowed** if seats are available.
- Bookings beyond the capacity will return a `400 Bad Request`.
- Cancelling a booking **frees up** a seat.

---

🚀 Getting Started
✅ Prerequisites
Python 3.8+

🛠 Installation
# Clone the repository
git clone <https://github.com/shahil26/Event-Management-System.git>
cd Event_management_system/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

▶️ Run the app
uvicorn app.main:app --reload
