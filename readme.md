# 🎟️ Event Booking System - Frontend

This is a modern React frontend for the Event Booking System. It provides a user-friendly interface for creating, viewing, and booking events.

---

## 🚀 Features

- View all available events  
- Search and filter events  
- Create new events  
- Book seats for events  
- Cancel bookings  
- Real-time seat availability tracking  

---

## 📁 Project Structure

The project follows a modular component-based architecture:

src/
├── components/ # Reusable UI components
├── pages/ # Page components (Home, Event Detail, etc.)
├── contexts/ # React contexts (for global state)
└── api/ # API client and endpoint methods

---

## ⚙️ Getting Started

### ✅ Prerequisites

- Node.js (>= 14.x)  
- npm or yarn  
- Backend API service running (FastAPI)  

---

## 📦 Installation

1. **Clone the repository:**

```bash
git clone <https://github.com/shahil26/Event-Management-System.git>
cd Event_management_system/Frontend
Install dependencies:

npm install
# or
yarn install
Configure the API endpoint:

Open src/api/api.js and update the baseURL to point to your backend API:
const API = axios.create({
  baseURL: 'http://127.0.0.1:8000' 
});
Start the development server:
npm run dev
The application will be available at:
👉 http://localhost:3000

🔗 Available API Endpoints
The frontend is designed to work with the following API endpoints:

Method	Endpoint	Description
GET	/events/	Retrieve all events
GET	/events/{event_id}	Retrieve a specific event
POST	/events/	Create a new event
POST	/events/{event_id}/book	Book a seat for an event
DELETE	/bookings/{booking_id}	Cancel a booking

🛠 Technologies Used
React.js

React Router

Axios (for API calls)

Tailwind CSS (for styling)

date-fns (for date formatting)

🚚 Deployment
To build the production version of the app:
npm run build
# or
yarn build
The build artifacts will be stored in the build/ directory.

📄 License
This project is licensed under the MIT License.
