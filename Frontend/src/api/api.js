// api.js - API client for the Event Booking System

import axios from 'axios';

// Configure axios instance with base URL
const API = axios.create({
  baseURL: 'http://127.0.0.1:8000' // The base URL will be added later
});

// API endpoints
export const apiEndpoints = {
  // Get all events
  getEvents: async () => {
    try {
      const response = await API.get('/events/');
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  // Get a specific event by ID
  getEvent: async (eventId) => {
    try {
      const response = await API.get(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching event ${eventId}:`, error);
      throw error;
    }
  },

  // Create a new event
  createEvent: async (eventData) => {
    try {
      const response = await API.post('/events/', eventData);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  // Book a seat for an event
  bookEvent: async (eventId, bookingData) => {
    try {
      const response = await API.post(`/events/${eventId}/book`, bookingData);
      return response.data;
    } catch (error) {
      console.error(`Error booking event ${eventId}:`, error);
      throw error;
    }
  },

  // Cancel a booking
  cancelBooking: async (bookingId) => {
    try {
      const response = await API.delete(`/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error(`Error canceling booking ${bookingId}:`, error);
      throw error;
    }
  }
};

export default API;