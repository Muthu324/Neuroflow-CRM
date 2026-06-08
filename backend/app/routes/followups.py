from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.utils.dependencies import get_current_user
from app.schemas.schemas import (
    FollowUpCreate, FollowUpUpdate, FollowUpResponse, FollowUpListResponse,
)
from app.services.notification_service import FollowUpService
from typing import List

router = APIRouter(prefix="/followups", tags=["followups"])


@router.post("/", response_model=FollowUpResponse, status_code=status.HTTP_201_CREATED)
def create_followup(
    followup_create: FollowUpCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new follow-up"""
    followup = FollowUpService.create_followup(db, current_user.id, followup_create)
    return followup


@router.get("/", response_model=dict)
def get_followups(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    status: str = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all follow-ups with pagination and filtering"""
    followups, total = FollowUpService.get_all_followups(
        db, current_user.id, skip, limit, status
    )
    
    return {
        "items": [FollowUpListResponse.from_orm(f) for f in followups],
        "total": total,
        "skip": skip,
        "limit": limit
    }


@router.get("/pending", response_model=List[FollowUpListResponse])
def get_pending_followups(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get pending follow-ups"""
    followups = FollowUpService.get_pending_followups(db, current_user.id)
    return [FollowUpListResponse.from_orm(f) for f in followups]


@router.get("/overdue", response_model=List[FollowUpListResponse])
def get_overdue_followups(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get overdue follow-ups"""
    followups = FollowUpService.get_overdue_followups(db, current_user.id)
    return [FollowUpListResponse.from_orm(f) for f in followups]


@router.get("/{followup_id}", response_model=FollowUpResponse)
def get_followup(
    followup_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get follow-up by ID"""
    followup = FollowUpService.get_followup_by_id(db, current_user.id, followup_id)
    
    if not followup:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Follow-up not found")
    
    return followup


@router.put("/{followup_id}", response_model=FollowUpResponse)
def update_followup(
    followup_id: int,
    followup_update: FollowUpUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update follow-up"""
    followup = FollowUpService.update_followup(db, current_user.id, followup_id, followup_update)
    
    if not followup:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Follow-up not found")
    
    return followup


@router.post("/{followup_id}/complete", response_model=FollowUpResponse)
def complete_followup(
    followup_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Mark follow-up as completed"""
    followup = FollowUpService.complete_followup(db, current_user.id, followup_id)
    
    if not followup:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Follow-up not found")
    
    return followup


@router.delete("/{followup_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_followup(
    followup_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete follow-up"""
    success = FollowUpService.delete_followup(db, current_user.id, followup_id)
    
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Follow-up not found")
