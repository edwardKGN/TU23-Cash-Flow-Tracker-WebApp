from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from models import Base, engine
from routes import router

app = FastAPI(title="Cash Flow Tracker")

# Create tables
Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
