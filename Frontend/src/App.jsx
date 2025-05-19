import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AlertProvider } from './contexts/AlertContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import CreateEvent from './pages/CreateEvent';
import AlertMessage from './components/AlertMessage';


function App() {
  
  return (
    <AlertProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <AlertMessage />
        <div className="container mx-auto px-4 pt-20 pb-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/create-event" element={<CreateEvent />} />
          </Routes>
        </div>
      </div>
    </AlertProvider>
  );
}

export default App;
