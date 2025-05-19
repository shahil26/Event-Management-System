from datetime import datetime
from pydantic import BaseModel

class Event(BaseModel):
    name: str
    description: str = None
    total_seats: int
    available_seats: int
    date: datetime

class Booking(BaseModel):
    user_name: str
    booking_date: datetime = datetime.now()