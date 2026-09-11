"""
AgriSense AI — FastAPI Server Entry Point
"""
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.api.endpoints import router as api_router

app = FastAPI(
    title="AgriSense AI — Precision Agritech Platform API",
    description="Region-Aware Agricultural Intelligence & Data Aggregation Engine for India",
    version="1.2.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Configuration
origins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API Routers
app.include_router(api_router)

@app.get("/")
def root():
    return {
        "app": "AgriSense AI API",
        "status": "online",
        "docs": "/docs",
        "health": "/api/v1/health"
    }

if __name__ == "__main__":
    import uvicorn
    host = os.getenv("HOST", "127.0.0.1")
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("backend.main:app", host=host, port=port, reload=True)
