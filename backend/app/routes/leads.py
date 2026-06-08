from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.utils.dependencies import get_current_user
from app.schemas.schemas import (
    LeadCreate, LeadUpdate, LeadResponse, LeadListResponse,
    TimelineEventCreate, TimelineEventResponse
)
from app.services.lead_service import LeadService
from typing import List

router = APIRouter(prefix="/leads", tags=["leads"])


@router.post("/", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
def create_lead(
    lead_create: LeadCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new lead"""
    lead = LeadService.create_lead(db, current_user.id, lead_create)
    return lead


@router.get("/", response_model=dict)
def get_leads(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    status: str = Query(None),
    platform: str = Query(None),
    temperature: str = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all leads with pagination and filtering"""
    leads, total = LeadService.get_all_leads(
        db, current_user.id, skip, limit, status, platform, temperature
    )
    
    return {
        "items": [LeadListResponse.from_orm(lead) for lead in leads],
        "total": total,
        "skip": skip,
        "limit": limit
    }


@router.get("/search", response_model=List[LeadListResponse])
def search_leads(
    q: str = Query(..., min_length=1),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Search leads by name, company, or email"""
    leads = LeadService.search_leads(db, current_user.id, q)
    return [LeadListResponse.from_orm(lead) for lead in leads]


@router.get("/{lead_id}", response_model=LeadResponse)
def get_lead(
    lead_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get lead by ID"""
    lead = LeadService.get_lead_by_id(db, current_user.id, lead_id)
    
    if not lead:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found")
    
    return lead


@router.put("/{lead_id}", response_model=LeadResponse)
def update_lead(
    lead_id: int,
    lead_update: LeadUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update lead"""
    lead = LeadService.update_lead(db, current_user.id, lead_id, lead_update)
    
    if not lead:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found")
    
    return lead


@router.delete("/{lead_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_lead(
    lead_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete lead"""
    success = LeadService.delete_lead(db, current_user.id, lead_id)
    
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found")


@router.post("/{lead_id}/timeline", response_model=TimelineEventResponse)
def add_timeline_event(
    lead_id: int,
    event_create: TimelineEventCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Add timeline event to lead"""
    event = LeadService.add_timeline_event(db, current_user.id, lead_id, event_create)
    
    if not event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found")
    
    return event


@router.get("/status/hot", response_model=List[LeadListResponse])
def get_hot_leads(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all hot leads"""
    leads = LeadService.get_hot_leads(db, current_user.id)
    return [LeadListResponse.from_orm(lead) for lead in leads]


@router.get("/platform/{platform}", response_model=List[LeadListResponse])
def get_leads_by_platform(
    platform: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get leads from specific platform"""
    if platform not in ["linkedin", "instagram", "direct"]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid platform")
    
    leads = LeadService.get_leads_by_platform(db, current_user.id, platform)
    return [LeadListResponse.from_orm(lead) for lead in leads]
