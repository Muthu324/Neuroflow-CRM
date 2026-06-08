import os
from sqlalchemy import create_engine, event
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.pool import QueuePool
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get database URL from environment
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:Muthu324@localhost/neuroflow_prod"
)

# Get echo setting for SQL logging (useful in development)
DATABASE_ECHO = os.getenv("DATABASE_ECHO", "False").lower() == "true"

# Create engine with connection pooling
engine = create_engine(
    DATABASE_URL,
    poolclass=QueuePool,
    pool_size=10,
    max_overflow=20,
    echo=DATABASE_ECHO,
    connect_args={
        "connect_timeout": 10,
        "check_same_thread": False,
    } if "sqlite" in DATABASE_URL else {}
)

# Create SessionLocal factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    expire_on_commit=False
)

# Create base model
Base = declarative_base()

# Dependency to get database session
def get_db() -> Session:
    """
    Dependency to get database session for FastAPI routes.
    
    Usage:
        @router.get("/endpoint")
        def get_data(db: Session = Depends(get_db)):
            ...
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Database initialization (creates all tables)
def init_db():
    """Initialize database by creating all tables"""
    Base.metadata.create_all(bind=engine)