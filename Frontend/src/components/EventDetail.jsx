import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { apiEndpoints } from '../api/api';
import LoadingSpinner from './LoadingSpinner';
import BookingForm from './BookingForm';
import BookingList from './BookingList';
import { useAlert } from '../contexts/AlertContext';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const data = await apiEndpoints.getEvent(id);
        if (data?.event) {
          setEvent(data.event);
          setBookings(data.event.bookings || []);
        } else {
          showAlert('Unexpected response from server.', 'error');
          navigate('/');
        }
      } catch (error) {
        console.error(`Failed to fetch event with ID ${id}:`, error);
        showAlert('Failed to load event details. Please try again later.', 'error');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, navigate, showAlert]);

  const handleBookingSuccess = (newBooking) => {
    setEvent((prev) => ({
      ...prev,
      available_seats: prev.available_seats - 1,
    }));
    setBookings((prev) => [...prev, newBooking]);
    setShowBookingForm(false);
    showAlert('Booking confirmed successfully!', 'success');
  };

  const handleAddBookings = (newBooking) => {
    setBookings((prev) => [...prev, newBooking]);
    setEvent((prev) => ({
      ...prev,
      available_seats: prev.available_seats - 1,
    }));
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await apiEndpoints.cancelBooking(bookingId);
      setBookings((prev) => prev.filter((b) => (b._id || b.id) !== bookingId));
      setEvent((prev) => ({
        ...prev,
        available_seats: prev.available_seats + 1,
      }));
      showAlert('Booking cancelled successfully!', 'success');
    } catch (error) {
      console.error(`Failed to cancel booking with ID ${bookingId}:`, error);
      showAlert('Failed to cancel booking. Please try again later.', 'error');
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!event) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">Event not found</p>
      </div>
    );
  }

  const formattedDate = (() => {
    const parsed = new Date(event.date);
    return !isNaN(parsed) ? format(parsed, 'PPP p') : 'Invalid date';
  })();

  const isFullyBooked = event.available_seats === 0;
  const bookingPercentage = ((event.total_seats - event.available_seats) / event.total_seats) * 100;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <button
        onClick={() => navigate('/')}
        className="mb-4 inline-flex items-center text-indigo-600 hover:text-indigo-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Events
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{event.name}</h1>
        <p className="text-gray-600 mb-4">{event.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Event Details</h3>
            <p><span className="font-medium">Date & Time:</span> {formattedDate}</p>
            <p><span className="font-medium">Availability:</span> {event.available_seats} of {event.total_seats} seats available</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Booking Status</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div
                className={`h-2.5 rounded-full ${isFullyBooked ? 'bg-red-500' : 'bg-green-500'}`}
                style={{ width: `${bookingPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              {isFullyBooked ? 'This event is fully booked' : `${Math.round(bookingPercentage)}% booked`}
            </p>
          </div>
        </div>

        {!showBookingForm && (
          <button
            onClick={() => setShowBookingForm(true)}
            disabled={isFullyBooked}
            className={`w-full py-3 px-4 rounded-md font-medium ${
              isFullyBooked
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {isFullyBooked ? 'Fully Booked' : 'Book Now'}
          </button>
        )}

        {showBookingForm && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Book Your Seat</h2>
            <BookingForm
              eventId={event.event_id || event._id}
              onSuccess={handleBookingSuccess}
              onAddBookings={handleAddBookings}
              onCancel={() => setShowBookingForm(false)}
            />
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>
        <BookingList bookings={bookings} onCancelBooking={handleCancelBooking} />
      </div>
    </div>
  );
};

export default EventDetail;
