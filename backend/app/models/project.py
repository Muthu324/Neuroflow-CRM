from sqlalchemy import Column, Integer, String, DateTime, Float, Text, ForeignKey, JSON, Numeric, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class Project(Base):
    """Project model for managing client projects and deliverables"""
    
    __tablename__ = "projects"

    # Primary Key
    id = Column(Integer, primary_key=True, index=True)
    
    # Foreign Keys
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    
    # Project Details
    name = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=True)
    
    # Client Information
    client_name = Column(String(255), nullable=False)
    client_email = Column(String(255), nullable=True)
    client_phone = Column(String(20), nullable=True)
    
    # Project Status & Timeline
    status = Column(
        String(20),
        default='planning',
        index=True
        # 'planning', 'active', 'review', 'completed', 'on_hold'
    )
    deadline = Column(DateTime, nullable=True)
    start_date = Column(DateTime, default=datetime.utcnow)
    
    # Project Metrics
    progress = Column(Integer, default=0)  # 0-100%
    priority = Column(
        String(20),
        default='average'
        # 'low', 'average', 'high', 'critical'
    )
    value = Column(Numeric(12, 2), default=0)
    
    # Payment Status
    payment_status = Column(
        String(20),
        default='unpaid'
        # 'unpaid', 'partial', 'paid', 'refunded'
    )
    amount_paid = Column(Numeric(12, 2), default=0)
    
    # Risk & Analysis
    ai_risk_analysis = Column(Text, nullable=True)
    risk_level = Column(
        String(20),
        default='low'
        # 'low', 'medium', 'high'
    )
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    owner_user = relationship("User", back_populates="projects")
    tasks = relationship("ProjectTask", back_populates="project", cascade="all, delete-orphan")
    milestones = relationship("ProjectMilestone", back_populates="project", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<Project(id={self.id}, name={self.name}, client={self.client_name}, status={self.status})>"


class ProjectTask(Base):
    """Tasks within a project"""
    
    __tablename__ = "project_tasks"

    id = Column(Integer, primary_key=True, index=True)
    
    # Foreign Keys
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False, index=True)
    
    # Task Details
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    completed = Column(Boolean, default=False)
    
    # Task Metadata
    order_index = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    
    # Relationships
    project = relationship("Project", back_populates="tasks")

    def __repr__(self) -> str:
        return f"<ProjectTask(id={self.id}, title={self.title}, project_id={self.project_id})>"


class ProjectMilestone(Base):
    """Milestones within a project"""
    
    __tablename__ = "project_milestones"

    id = Column(Integer, primary_key=True, index=True)
    
    # Foreign Keys
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False, index=True)
    
    # Milestone Details
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    due_date = Column(DateTime, nullable=False)
    completed = Column(Boolean, default=False)
    
    # Metadata
    order_index = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    
    # Relationships
    project = relationship("Project", back_populates="milestones")

    def __repr__(self) -> str:
        return f"<ProjectMilestone(id={self.id}, title={self.title}, project_id={self.project_id})>"
