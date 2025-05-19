from fastapi import APIRouter, HTTPException
from models.events_management import Event, Booking
from database.config import client
from database.rules import Rules
from bson import ObjectId
import os

router = APIRouter()

@router.post('/events')
async def add_event(event: Event):
    event = dict(event)
    if event['available_seats'] < 0:
        raise HTTPException(status_code=400, detail="Available seats cannot be negative")
    else:
        if event['available_seats'] > event['total_seats']:
            raise HTTPException(status_code=400, detail="Available seats cannot be greater than total seats")
        else:
            existing_events = Rules.get_all(client, 'event_booking_system', 'events', {})
            if existing_events:
                latest_id = existing_events[-1]['event_id']
                event['event_id'] = latest_id + 1
            else:
                event['event_id'] = 1
            event['_id'] = ObjectId()
            operation_id = Rules.add(client, 'event_booking_system', 'events', event)
            return {'status_code': 200, 'detail': 'Event added successfully', 'operation_id': str(operation_id)}

@router.get('/events')
async def get_events():
    exsisting_events = Rules.get_all(client, 'event_booking_system', 'events', {})
    for event in exsisting_events:
        event['_id'] = str(event['_id'])
    return {'status_code': 200, 'detail': 'Events fetched successfully', 'events': exsisting_events}

@router.get('/events/{event_id}')
async def get_event(event_id: int):
    event = Rules.get(client, 'event_booking_system', 'events', {'event_id': event_id})
    event['_id'] = str(event['_id'])
    if event:
        return {'status_code': 200, 'detail': 'Event fetched successfully', 'event': event}
    else:
        raise HTTPException(status_code=404, detail="Event not found")

@router.post('/events/{event_id}/book')
async def book_event(event_id: int, booking: Booking):
    booking = dict(booking)
    event = Rules.get(client, 'event_booking_system', 'events', {'event_id': event_id})
    if event:
        if event['available_seats'] > 0:
            booking['event_id'] = event_id
            booking['_id'] = ObjectId()
            exsisting_bookings = Rules.get_all(client, 'event_booking_system', 'bookings', {})
            if exsisting_bookings:
                latest_id = exsisting_bookings[-1]['booking_id']
                booking['booking_id'] = latest_id + 1
            else:
                booking['booking_id'] = 1
            operation_id = Rules.add(client, 'event_booking_system', 'bookings', booking)
            Rules.update(client, 'event_booking_system', 'events', {'event_id': event_id}, {'available_seats': event['available_seats'] - 1})
            return {'status_code': 200, 'detail': 'Booking added successfully', 'operation_id': str(operation_id), 'booking_id': int(booking['booking_id'])}
        else:
            raise HTTPException(status_code=400, detail="No available seats")
    else:
        raise HTTPException(status_code=404, detail="Event not found")


@router.delete('/bookings/{booking_id}')
async def cancel_booking(booking_id: int):
    booking = Rules.get(client, 'event_booking_system', 'bookings', {'booking_id': booking_id})
    if booking:
        event = Rules.get(client, 'event_booking_system', 'events', {'event_id': booking['event_id']})
        Rules.delete(client, 'event_booking_system', 'bookings', {'booking_id': booking_id})
        Rules.update(client, 'event_booking_system', 'events', {'event_id': event['event_id']}, {'available_seats': event['available_seats'] + 1})
        return {'status_code': 200, 'detail': 'Booking cancelled successfully'}
    else:
        raise HTTPException(status_code=404, detail="Booking not found")