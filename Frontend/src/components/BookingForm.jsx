import React, { useState } from 'react';
import { apiEndpoints } from '../api/api';
import { useAlert } from '../contexts/AlertContext';

const BookingForm = ({ eventId, onSuccess, onCancel, onAddBookings}) => {
  const [formData, setFormData] = useState({ user_name: '' });
  const [submitting, setSubmitting] = useState(false);
  const { showAlert } = useAlert();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.user_name.trim()) {
      showAlert('Please enter your name', 'error');
      return;
    }
    
    try {
      setSubmitting(true);
      const response = await apiEndpoints.bookEvent(eventId, formData);
      
      // Create a new booking object with the required format
      const newBooking = {
        _id: response.booking_id,
        user_name: formData.user_name,
        booking_date: new Date().toISOString(),
        event_id: eventId
      };
      
      onAddBookings(newBooking);
      setFormData({ user_name: '' }); // Reset form
    } catch (error) {
      console.error('Booking failed:', error);
      
      // Provide specific error messages based on the error
      if (error.response && error.response.status === 400) {
        showAlert('This event is fully booked. No more seats available.', 'error');
      } else {
        showAlert('Failed to book event. Please try again later.', 'error');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="user_name" className="block text-gray-700 text-sm font-medium mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your full name"
            disabled={submitting}
            required
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={submitting}
          >
            {submitting ? 'Booking...' : 'Book Seat'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;