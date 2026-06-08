from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.utils.dependencies import get_current_user
from app.schemas.schemas import (
    NotificationCreate, NotificationUpdate, NotificationResponse
)
from app.services.notification_service import NotificationService
from typing import List

router = APIRouter(prefix="/notifications", tags=["notifications"])


@router.post("/", response_model=NotificationResponse, status_code=status.HTTP_201_CREATED)
def create_notification(
    notification_create: NotificationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new notification (admin use primarily)"""
    notification = NotificationService.create_notification(db, current_user.id, notification_create)
    return notification


@router.get("/", response_model=dict)
def get_notifications(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    unread_only: bool = Query(False),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all notifications with pagination"""
    notifications, total = NotificationService.get_all_notifications(
        db, current_user.id, skip, limit, unread_only
    )
    
    return {
        "items": [NotificationResponse.from_orm(n) for n in notifications],
        "total": total,
        "skip": skip,
        "limit": limit
    }


@router.get("/unread-count", response_model=dict)
def get_unread_count(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get count of unread notifications"""
    count = NotificationService.get_unread_count(db, current_user.id)
    return {"unread_count": count}


@router.get("/{notification_id}", response_model=NotificationResponse)
def get_notification(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get notification by ID"""
    notification = NotificationService.get_notification_by_id(db, current_user.id, notification_id)
    
    if not notification:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notification not found")
    
    return notification


@router.put("/{notification_id}", response_model=NotificationResponse)
def update_notification(
    notification_id: int,
    notification_update: NotificationUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update notification (e.g., mark as read)"""
    notification = NotificationService.get_notification_by_id(db, current_user.id, notification_id)
    
    if not notification:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notification not found")
    
    # Apply updates
    if notification_update.read is not None:
        notification = NotificationService.mark_as_read(db, current_user.id, notification_id)
    
    return notification


@router.post("/mark-all-as-read", response_model=dict)
def mark_all_as_read(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Mark all notifications as read"""
    count = NotificationService.mark_all_as_read(db, current_user.id)
    return {"marked_as_read": count}


@router.delete("/{notification_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_notification(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete notification"""
    success = NotificationService.delete_notification(db, current_user.id, notification_id)
    
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notification not found")
