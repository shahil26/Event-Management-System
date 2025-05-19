import React, { useState, useEffect } from 'react';
import { apiEndpoints } from '../api/api';
import EventCard from './EventCard';
import LoadingSpinner from './LoadingSpinner';
import { useAlert } from '../contexts/AlertContext';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { showAlert } = useAlert();

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await apiEndpoints.getEvents();
        setEvents(data.events || []);  // Use data.events here
      } catch (error) {
        console.error('Failed to fetch events:', error);
        showAlert('Failed to load events. Please try again later.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [showAlert]);

  // Filter events based on search term
  const filteredEvents = events.filter(
    event => 
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search events..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No events found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
