import requests
from datetime import datetime
from typing import Dict, List, Optional, Any


class EventsBookingSDK:
    """
    Python SDK for the Events Booking API.
    
    This SDK provides methods to interact with the Events Booking API, including:
    - Event management (creating, retrieving events)
    - Booking management (creating bookings, retrieving bookings, canceling bookings)
    """
    
    def __init__(self, base_url: str):
        """
        Initialize the SDK with the base URL of the API.
        
        Args:
            base_url: The base URL of the Events Booking API
        """
        self.base_url = base_url.rstrip('/')
        
    def get_events(self) -> List[Dict[str, Any]]:
        """
        Get all events.
        
        Returns:
            List of events
        """
        response = requests.get(f"{self.base_url}/events")
        response.raise_for_status()
        return response.json()
    
    def add_event(self, 
                 name: str, 
                 total_seats: int, 
                 available_seats: int, 
                 date: datetime,
                 description: Optional[str] = None) -> Dict[str, Any]:
        """
        Add a new event.
        
        Args:
            name: Name of the event
            total_seats: Total number of seats available
            available_seats: Number of seats currently available
            date: Date and time of the event
            description: Optional description of the event
            
        Returns:
            The created event
        """
        event_data = {
            "name": name,
            "total_seats": total_seats,
            "available_seats": available_seats,
            "date": date.isoformat(),
        }
        
        if description:
            event_data["description"] = description
            
        response = requests.post(
            f"{self.base_url}/events",
            json=event_data
        )
        response.raise_for_status()
        return response.json()
    
    def get_event(self, event_id: int) -> Dict[str, Any]:
        """
        Get details of a specific event.
        
        Args:
            event_id: ID of the event to retrieve
            
        Returns:
            Event details
        """
        response = requests.get(f"{self.base_url}/events/{event_id}")
        response.raise_for_status()
        return response.json()
    
    def book_event(self, event_id: int, user_name: str, booking_date: Optional[datetime] = None) -> Dict[str, Any]:
        """
        Book an event for a user.
        
        Args:
            event_id: ID of the event to book
            user_name: Name of the user making the booking
            booking_date: Optional date and time of the booking (defaults to current time)
            
        Returns:
            Booking details
        """
        booking_data = {
            "user_name": user_name,
        }
        
        if booking_date:
            booking_data["booking_date"] = booking_date.isoformat()
            
        response = requests.post(
            f"{self.base_url}/events/{event_id}/book",
            json=booking_data
        )
        response.raise_for_status()
        return response.json()
    
    def get_bookings(self, event_id: int) -> List[Dict[str, Any]]:
        """
        Get all bookings for a specific event.
        
        Args:
            event_id: ID of the event to get bookings for
            
        Returns:
            List of bookings
        """
        response = requests.get(f"{self.base_url}/bookings/{event_id}")
        response.raise_for_status()
        return response.json()
    
    def cancel_booking(self, booking_id: int) -> Dict[str, Any]:
        """
        Cancel a booking.
        
        Args:
            booking_id: ID of the booking to cancel
            
        Returns:
            Response data
        """
        response = requests.delete(f"{self.base_url}/bookings/{booking_id}")
        response.raise_for_status()
        return response.json()


# Usage example:
if __name__ == "__main__":
    # Initialize the SDK with the API base URL
    sdk = EventsBookingSDK("http://127.0.0.1:8000")
    
    # Get all events
    events = sdk.get_events()
    print(f"Found {len(events)} events")
    
    # Create a new event
    new_event = sdk.add_event(
        name="Python Conference 2025",
        description="Annual conference for Python developers",
        total_seats=500,
        available_seats=500,
        date=datetime(2025, 9, 15, 9, 0, 0)
    )
    print(f"Created event: {new_event['name']} with ID {new_event['id']}")
    
    # Book an event
    booking = sdk.book_event(
        event_id=new_event['id'],
        user_name="Jane Doe"
    )
    print(f"Created booking: {booking['id']} for {booking['user_name']}")
    
    # Get all bookings for the event
    bookings = sdk.get_bookings(new_event['id'])
    print(f"Event has {len(bookings)} bookings")
    
    # Cancel a booking
    cancel_result = sdk.cancel_booking(booking['id'])
    print(f"Canceled booking: {booking['id']}")