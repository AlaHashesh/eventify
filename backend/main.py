from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas, database

app = FastAPI(title="Eventify API")

# Configure CORS for Frontend connectivity
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For local dev, allow all. In prod, restrict to specific URL.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database migrations are now managed by Alembic.
# Run `alembic upgrade head` to apply schema changes.

@app.get("/events/", response_model=list[schemas.Event])
def read_events(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    events = db.query(models.Event).offset(skip).limit(limit).all()
    return events

@app.post("/events/", response_model=schemas.Event)
def create_event(event: schemas.EventCreate, db: Session = Depends(database.get_db)):
    db_event = models.Event(title=event.title, description=event.description)
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event
