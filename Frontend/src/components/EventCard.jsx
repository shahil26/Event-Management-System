import React from "react"
import { Link } from "react-router-dom"
import { format } from "date-fns"

const EventCard = ({ event }) => {
  const availabilityPercentage =
    (event.available_seats / event.total_seats) * 100

  let availabilityColor = "bg-green-500"
  if (availabilityPercentage <= 10) {
    availabilityColor = "bg-red-500"
  } else if (availabilityPercentage <= 30) {
    availabilityColor = "bg-yellow-500"
  }

  const formattedDate = format(new Date(event.date), "PPP p")

  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden">
      <div className="p-6 space-y-5">
        {/* Event Name */}
        <h3 className="text-2xl font-bold text-gray-800 truncate">
          {event.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm h-14 overflow-hidden leading-relaxed">
          {event.description?.length > 100
            ? `${event.description.substring(0, 100)}…`
            : event.description}
        </p>

        {/* Date & Availability */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span className="font-medium">{formattedDate}</span>
          <div className="flex items-center space-x-2">
            <span className={`w-3 h-3 rounded-full ${availabilityColor}`} />
            <span>
              {event.available_seats} / {event.total_seats} seats
            </span>
          </div>
        </div>

        {/* Availability Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${availabilityColor}`}
            style={{ width: `${availabilityPercentage}%` }}
          ></div>
        </div>

        {/* CTA */}
        <Link
          to={`/events/${event.event_id}`}
          className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-xl transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default EventCard
