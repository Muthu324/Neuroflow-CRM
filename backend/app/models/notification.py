from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class FollowUp(Base):
    """Follow-up reminders and tasks for leads"""
    
    __tablename__ = "followups"

    # Primary Key
    id = Column(Integer, primary_key=True, index=True)
    
    # Foreign Keys
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    lead_id = Column(Integer, ForeignKey("leads.id"), nullable=False, index=True)
    
    # Follow-up Details
    title = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)
    
    # Status & Priority
    status = Column(
        String(20),
        default='pending',
        index=True
        # 'pending', 'completed', 'overdue', 'cancelled'
    )
    priority = Column(
        String(20),
        default='medium'
        # 'low', 'medium', 'high'
    )
    
    # Timing
    due_date = Column(DateTime, nullable=False, index=True)
    completed_date = Column(DateTime, nullable=True)
    
    # Lead Reference (denormalized for quick lookup)
    lead_name = Column(String(255), nullable=True)
    platform = Column(String(20), nullable=True)
    
    # AI Support
    ai_suggestion = Column(Text, nullable=True)
    streak_value = Column(Integer, default=0)  # Consecutive follow-ups completed
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    owner_user = relationship("User", back_populates="followups")
    lead = relationship("Lead", back_populates="followups")

    def __repr__(self) -> str:
        return f"<FollowUp(id={self.id}, lead_id={self.lead_id}, status={self.status}, due_date={self.due_date})>"


class Notification(Base):
    """System notifications for user alerts"""
    
    __tablename__ = "notifications"

    # Primary Key
    id = Column(Integer, primary_key=True, index=True)
    
    # Foreign Keys
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    
    # Notification Content
    notification_type = Column(
        String(50),
        nullable=False
        # 'followup_reminder', 'deadline_alert', 'hot_activity', 'revenue_milestone',
        # 'ai_recommendation', 'missed_opportunity', 'system'
    )
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    
    # Status
    read = Column(Boolean, default=False, index=True)
    severity = Column(
        String(20),
        default='info'
        # 'info', 'warning', 'success', 'alert'
    )
    
    # Action Reference (optional link to entity)
    related_lead_id = Column(Integer, ForeignKey("leads.id"), nullable=True)
    related_project_id = Column(Integer, ForeignKey("projects.id"), nullable=True)
    action_url = Column(String(500), nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    read_at = Column(DateTime, nullable=True)
    expires_at = Column(DateTime, nullable=True)
    
    # Relationships
    user = relationship("User", back_populates="notifications")

    def __repr__(self) -> str:
        return f"<Notification(id={self.id}, type={self.notification_type}, user_id={self.user_id}, read={self.read})>"
