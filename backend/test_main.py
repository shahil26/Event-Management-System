from fastapi.testclient import TestClient
from backend.main import app  

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200 or response.status_code == 404  # depending on if a root route exists

def test_create_event():
    payload = {
        "name": "Test Event",
        "description": "A unit test event",
        "total_seats": 100,
        "available_seats": 100,
        "date": "2025-12-31T23:59:59"
    }
    response = client.post("/events/", json=payload)
    assert response.status_code == 200 or response.status_code == 201
    assert "name" in response.json()

def test_get_events():
    response = client.get("/events/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
