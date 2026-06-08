from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class User(Base):
    """User model for authentication and profile management"""
    
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    
    # Authentication
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    
    # Profile
    full_name = Column(String(255), nullable=True)
    avatar_url = Column(String(500), nullable=True)
    bio = Column(Text, nullable=True)
    
    # Account Settings
    timezone = Column(String(50), default="UTC")
    theme = Column(String(20), default="dark")  # 'dark' or 'light'
    email_notifications = Column(Boolean, default=True)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = Column(DateTime, nullable=True)
    
    # Relationships (will be defined with other models)
    leads = relationship("Lead", back_populates="owner_user", cascade="all, delete-orphan")
    projects = relationship("Project", back_populates="owner_user", cascade="all, delete-orphan")
    followups = relationship("FollowUp", back_populates="owner_user", cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="user", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<User(id={self.id}, email={self.email}, username={self.username})>"
