import React, { useState } from 'react';
import { apiEndpoints } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../contexts/AlertContext';

const CreateEventForm = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    total_seats: 10,
    date: '',
    time: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'total_seats' ? parseInt(value, 10) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      showAlert('Please enter an event name', 'error');
      return;
    }
    
    if (!formData.date) {
      showAlert('Please select a date', 'error');
      return;
    }
    
    if (!formData.time) {
      showAlert('Please select a time', 'error');
      return;
    }
    
    if (formData.total_seats <= 0) {
      showAlert('Total seats must be greater than 0', 'error');
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Combine date and time for the API
      const dateTime = new Date(`${formData.date}T${formData.time}`);
      
      const eventData = {
        name: formData.name,
        description: formData.description,
        total_seats: formData.total_seats,
        available_seats: formData.total_seats, // Initially, all seats are available
        date: dateTime.toISOString()
      };
      
      const response = await apiEndpoints.createEvent(eventData);
      showAlert('Event created successfully!', 'success');
      
      // Redirect to the event details page
      navigate(`/events/${response.id}`);
    } catch (error) {
      console.error('Event creation failed:', error);
      showAlert('Failed to create event. Please try again later.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Event</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Event Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter event name"
              disabled={submitting}
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter event description"
              disabled={submitting}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date*
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={submitting}
                required
              />
            </div>
            
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Time*
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={submitting}
                required
              />
            </div>
            
            <div>
              <label htmlFor="total_seats" className="block text-sm font-medium text-gray-700 mb-1">
                Total Seats*
              </label>
              <input
                type="number"
                id="total_seats"
                name="total_seats"
                value={formData.total_seats}
                onChange={handleChange}
                min="1"
                max="1000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={submitting}
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/')}
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
              {submitting ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;