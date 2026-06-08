from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, Text, ForeignKey, JSON, Numeric
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class Lead(Base):
    """Lead model for managing sales pipeline and customer relationships"""
    
    __tablename__ = "leads"

    # Primary Key
    id = Column(Integer, primary_key=True, index=True)
    
    # Foreign Keys
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    
    # Basic Information
    name = Column(String(255), nullable=False, index=True)
    avatar = Column(String(500), nullable=True)
    company = Column(String(255), nullable=True)
    email = Column(String(255), nullable=True)
    phone = Column(String(20), nullable=True)
    
    # Platform & Contact Info
    platform = Column(String(20), nullable=False)  # 'linkedin', 'instagram', 'direct'
    handle = Column(String(255), nullable=True)
    
    # Lead Classification
    niche = Column(String(100), nullable=True)
    status = Column(
        String(20), 
        default='new',
        index=True
        # 'new', 'contacted', 'nurturing', 'proposal', 'negotiation', 'closed_won', 'closed_lost'
    )
    temperature = Column(
        String(20),
        default='cold'
        # 'cold', 'warm', 'hot', 'ghosted'
    )
    
    # Deal Information
    revenue_estimate = Column(Numeric(12, 2), default=0)  # Estimated deal value
    probability = Column(Integer, default=0)  # 0-100 closing probability
    
    # Contact History
    last_contacted = Column(DateTime, nullable=True)
    next_followup = Column(DateTime, nullable=True)
    
    # Notes & Analysis
    notes = Column(Text, nullable=True)
    pain_points = Column(Text, nullable=True)
    offer_interested = Column(String(255), nullable=True)
    
    # Metadata
    tags = Column(JSON, default=list)  # ['tag1', 'tag2', ...]
    source = Column(String(100), nullable=True)  # Where lead came from
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    owner_user = relationship("User", back_populates="leads")
    timeline_events = relationship("TimelineEvent", back_populates="lead", cascade="all, delete-orphan")
    followups = relationship("FollowUp", back_populates="lead", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<Lead(id={self.id}, name={self.name}, platform={self.platform}, status={self.status})>"


class TimelineEvent(Base):
    """Timeline events for lead interaction history"""
    
    __tablename__ = "timeline_events"

    id = Column(Integer, primary_key=True, index=True)
    
    # Foreign Keys
    lead_id = Column(Integer, ForeignKey("leads.id"), nullable=False, index=True)
    
    # Event Data
    event_type = Column(
        String(50),
        nullable=False
        # 'connection_sent', 'connection_accepted', 'message_sent', 'reply_received', 
        # 'call_booked', 'proposal_sent', 'note_added'
    )
    description = Column(Text, nullable=True)
    platform = Column(String(20), nullable=False)  # Platform this event occurred on
    
    # Timestamps
    event_date = Column(DateTime, default=datetime.utcnow, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    lead = relationship("Lead", back_populates="timeline_events")

    def __repr__(self) -> str:
        return f"<TimelineEvent(id={self.id}, lead_id={self.lead_id}, type={self.event_type})>"