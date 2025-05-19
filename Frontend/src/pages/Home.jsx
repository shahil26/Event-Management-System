import React from 'react';
import EventList from '../components/EventList';

const Home = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Available Events</h1>
      </div>
      <EventList />
    </div>
  );
};

export default Home;