import os
import logging
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.database import init_db, Base, engine
from app.routes.auth import router as auth_router
from app.routes.users import router as users_router
from app.routes.leads import router as leads_router
from app.routes.projects import router as projects_router
from app.routes.followups import router as followups_router
from app.routes.notifications import router as notifications_router
from app.routes.ai import router as ai_router
from dotenv import load_dotenv


# Configure basic server logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# Load environment variables
load_dotenv()

# Initialize database tables
init_db()

# Create FastAPI app
app = FastAPI(
    title="NeuroFlow CRM API",
    description="Production-grade AI-powered CRM platform",
    version="1.0.0"
)

# ============================================================================
# MIDDLEWARE
# ============================================================================

# CORS Configuration - Allow frontend to access API
cors_origins = os.getenv(
    "CORS_ORIGINS",
    '["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"]'
)

# Parse CORS origins from env
import json
try:
    cors_origins_list = json.loads(cors_origins)
except:
    cors_origins_list = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# ROUTE REGISTRATION
# ============================================================================

# Authentication routes (public)
app.include_router(auth_router)

# User profile routes
app.include_router(users_router)

# Protected API routes (user-specific)
app.include_router(leads_router)
app.include_router(projects_router)
app.include_router(followups_router)
app.include_router(notifications_router)

# AI routes
app.include_router(ai_router)

# ============================================================================
# HEALTH CHECKS
# ============================================================================

@app.get("/health", tags=["health"])
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "NeuroFlow CRM API"
    }


@app.get("/", tags=["root"])
def root():
    """Root endpoint"""
    return {
        "message": "NeuroFlow CRM Backend Running",
        "version": "1.0.0",
        "docs": "/docs",
        "openapi": "/openapi.json"
    }


# ============================================================================
# ERROR HANDLERS
# ============================================================================

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """Global exception handler"""
    
    # Log the actual error and traceback to your server console so you can debug
    logger.error(f"Unhandled Server Error on {request.url.path}: {str(exc)}", exc_info=True)
    
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "detail": "Internal server error",
            "type": type(exc).__name__
        }
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
