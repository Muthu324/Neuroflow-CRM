from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.models.lead import Lead, TimelineEvent
from app.schemas.schemas import LeadCreate, LeadUpdate, TimelineEventCreate
from datetime import datetime
from typing import List, Optional


class LeadService:
    """CRUD operations for Lead model"""
    
    @staticmethod
    def create_lead(db: Session, user_id: int, lead_create: LeadCreate) -> Lead:
        """Create a new lead"""
        new_lead = Lead(
            user_id=user_id,
            name=lead_create.name,
            platform=lead_create.platform,
            status=lead_create.status or "new",
            temperature=lead_create.temperature or "cold",
            company=lead_create.company,
            email=lead_create.email,
            phone=lead_create.phone,
            handle=lead_create.handle,
            niche=lead_create.niche,
            revenue_estimate=lead_create.revenue_estimate or 0,
            probability=lead_create.probability or 0,
            notes=lead_create.notes,
            pain_points=lead_create.pain_points,
            offer_interested=lead_create.offer_interested,
            tags=lead_create.tags or [],
            source=lead_create.source,
        )
        
        db.add(new_lead)
        db.commit()
        db.refresh(new_lead)
        
        return new_lead
    
    @staticmethod
    def get_lead_by_id(db: Session, user_id: int, lead_id: int) -> Optional[Lead]:
        """Get lead by ID (user-specific)"""
        return db.query(Lead).filter(
            Lead.id == lead_id,
            Lead.user_id == user_id
        ).first()
    
    @staticmethod
    def get_all_leads(
        db: Session,
        user_id: int,
        skip: int = 0,
        limit: int = 100,
        status: Optional[str] = None,
        platform: Optional[str] = None,
        temperature: Optional[str] = None,
    ) -> tuple[List[Lead], int]:
        """Get all leads for user with optional filtering"""
        query = db.query(Lead).filter(Lead.user_id == user_id)
        
        # Apply filters
        if status:
            query = query.filter(Lead.status == status)
        if platform:
            query = query.filter(Lead.platform == platform)
        if temperature:
            query = query.filter(Lead.temperature == temperature)
        
        # Get total count
        total = query.count()
        
        # Apply pagination and ordering
        leads = query.order_by(desc(Lead.created_at)).offset(skip).limit(limit).all()
        
        return leads, total
    
    @staticmethod
    def search_leads(
        db: Session,
        user_id: int,
        query_str: str,
        limit: int = 50
    ) -> List[Lead]:
        """Search leads by name or company"""
        return db.query(Lead).filter(
            Lead.user_id == user_id,
            (Lead.name.ilike(f"%{query_str}%")) |
            (Lead.company.ilike(f"%{query_str}%")) |
            (Lead.email.ilike(f"%{query_str}%"))
        ).limit(limit).all()
    
    @staticmethod
    def update_lead(db: Session, user_id: int, lead_id: int, lead_update: LeadUpdate) -> Optional[Lead]:
        """Update lead"""
        lead = LeadService.get_lead_by_id(db, user_id, lead_id)
        
        if not lead:
            return None
        
        update_data = lead_update.dict(exclude_unset=True)
        
        for field, value in update_data.items():
            setattr(lead, field, value)
        
        lead.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(lead)
        
        return lead
    
    @staticmethod
    def delete_lead(db: Session, user_id: int, lead_id: int) -> bool:
        """Delete lead"""
        lead = LeadService.get_lead_by_id(db, user_id, lead_id)
        
        if not lead:
            return False
        
        db.delete(lead)
        db.commit()
        
        return True
    
    @staticmethod
    def add_timeline_event(
        db: Session,
        user_id: int,
        lead_id: int,
        event_create: TimelineEventCreate
    ) -> Optional[TimelineEvent]:
        """Add timeline event to lead"""
        lead = LeadService.get_lead_by_id(db, user_id, lead_id)
        
        if not lead:
            return None
        
        new_event = TimelineEvent(
            lead_id=lead_id,
            event_type=event_create.event_type,
            description=event_create.description,
            platform=event_create.platform,
            event_date=event_create.event_date or datetime.utcnow(),
        )
        
        db.add(new_event)
        db.commit()
        db.refresh(new_event)
        
        # Update lead's last_contacted
        lead.last_contacted = datetime.utcnow()
        db.commit()
        
        return new_event
    
    @staticmethod
    def get_leads_by_status(
        db: Session,
        user_id: int,
        status: str
    ) -> List[Lead]:
        """Get all leads with specific status"""
        return db.query(Lead).filter(
            Lead.user_id == user_id,
            Lead.status == status
        ).all()
    
    @staticmethod
    def get_hot_leads(db: Session, user_id: int) -> List[Lead]:
        """Get all hot leads"""
        return db.query(Lead).filter(
            Lead.user_id == user_id,
            Lead.temperature == "hot"
        ).order_by(desc(Lead.probability)).all()
    
    @staticmethod
    def get_leads_by_platform(
        db: Session,
        user_id: int,
        platform: str
    ) -> List[Lead]:
        """Get leads from specific platform"""
        return db.query(Lead).filter(
            Lead.user_id == user_id,
            Lead.platform == platform
        ).all()
