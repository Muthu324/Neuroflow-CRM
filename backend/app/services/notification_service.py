from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.models.notification import FollowUp, Notification
from app.schemas.schemas import FollowUpCreate, FollowUpUpdate, NotificationCreate, NotificationUpdate
from datetime import datetime
from typing import List, Optional


class FollowUpService:
    """CRUD operations for FollowUp model"""
    
    @staticmethod
    def create_followup(db: Session, user_id: int, followup_create: FollowUpCreate) -> FollowUp:
        """Create a new follow-up"""
        new_followup = FollowUp(
            user_id=user_id,
            lead_id=followup_create.lead_id,
            title=followup_create.title,
            description=followup_create.description,
            status=followup_create.status or "pending",
            priority=followup_create.priority or "medium",
            due_date=followup_create.due_date,
            lead_name=followup_create.lead_name,
            platform=followup_create.platform,
            ai_suggestion=followup_create.ai_suggestion,
            streak_value=followup_create.streak_value or 0,
        )
        
        db.add(new_followup)
        db.commit()
        db.refresh(new_followup)
        
        return new_followup
    
    @staticmethod
    def get_followup_by_id(db: Session, user_id: int, followup_id: int) -> Optional[FollowUp]:
        """Get follow-up by ID (user-specific)"""
        return db.query(FollowUp).filter(
            FollowUp.id == followup_id,
            FollowUp.user_id == user_id
        ).first()
    
    @staticmethod
    def get_all_followups(
        db: Session,
        user_id: int,
        skip: int = 0,
        limit: int = 100,
        status: Optional[str] = None,
    ) -> tuple[List[FollowUp], int]:
        """Get all follow-ups for user with optional filtering"""
        query = db.query(FollowUp).filter(FollowUp.user_id == user_id)
        
        if status:
            query = query.filter(FollowUp.status == status)
        
        total = query.count()
        followups = query.order_by(FollowUp.due_date).offset(skip).limit(limit).all()
        
        return followups, total
    
    @staticmethod
    def get_pending_followups(db: Session, user_id: int) -> List[FollowUp]:
        """Get pending follow-ups for user"""
        return db.query(FollowUp).filter(
            FollowUp.user_id == user_id,
            FollowUp.status == "pending"
        ).order_by(FollowUp.due_date).all()
    
    @staticmethod
    def get_overdue_followups(db: Session, user_id: int) -> List[FollowUp]:
        """Get overdue follow-ups"""
        return db.query(FollowUp).filter(
            FollowUp.user_id == user_id,
            FollowUp.status == "overdue"
        ).order_by(FollowUp.due_date).all()
    
    @staticmethod
    def update_followup(db: Session, user_id: int, followup_id: int, followup_update: FollowUpUpdate) -> Optional[FollowUp]:
        """Update follow-up"""
        followup = FollowUpService.get_followup_by_id(db, user_id, followup_id)
        
        if not followup:
            return None
        
        update_data = followup_update.dict(exclude_unset=True)
        
        for field, value in update_data.items():
            setattr(followup, field, value)
        
        # Mark completion time if status changed to completed
        if followup_update.status == "completed" and not followup.completed_date:
            followup.completed_date = datetime.utcnow()
        
        followup.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(followup)
        
        return followup
    
    @staticmethod
    def complete_followup(db: Session, user_id: int, followup_id: int) -> Optional[FollowUp]:
        """Mark follow-up as completed"""
        followup = FollowUpService.get_followup_by_id(db, user_id, followup_id)
        
        if not followup:
            return None
        
        followup.status = "completed"
        followup.completed_date = datetime.utcnow()
        followup.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(followup)
        
        return followup
    
    @staticmethod
    def delete_followup(db: Session, user_id: int, followup_id: int) -> bool:
        """Delete follow-up"""
        followup = FollowUpService.get_followup_by_id(db, user_id, followup_id)
        
        if not followup:
            return False
        
        db.delete(followup)
        db.commit()
        
        return True


class NotificationService:
    """CRUD operations for Notification model"""
    
    @staticmethod
    def create_notification(db: Session, user_id: int, notification_create: NotificationCreate) -> Notification:
        """Create a new notification"""
        new_notification = Notification(
            user_id=user_id,
            notification_type=notification_create.notification_type,
            title=notification_create.title,
            message=notification_create.message,
            severity=notification_create.severity or "info",
            read=notification_create.read or False,
            related_lead_id=notification_create.related_lead_id,
            related_project_id=notification_create.related_project_id,
            action_url=notification_create.action_url,
        )
        
        db.add(new_notification)
        db.commit()
        db.refresh(new_notification)
        
        return new_notification
    
    @staticmethod
    def get_notification_by_id(db: Session, user_id: int, notification_id: int) -> Optional[Notification]:
        """Get notification by ID (user-specific)"""
        return db.query(Notification).filter(
            Notification.id == notification_id,
            Notification.user_id == user_id
        ).first()
    
    @staticmethod
    def get_all_notifications(
        db: Session,
        user_id: int,
        skip: int = 0,
        limit: int = 100,
        unread_only: bool = False,
    ) -> tuple[List[Notification], int]:
        """Get all notifications for user"""
        query = db.query(Notification).filter(Notification.user_id == user_id)
        
        if unread_only:
            query = query.filter(Notification.read == False)
        
        total = query.count()
        notifications = query.order_by(desc(Notification.created_at)).offset(skip).limit(limit).all()
        
        return notifications, total
    
    @staticmethod
    def mark_as_read(db: Session, user_id: int, notification_id: int) -> Optional[Notification]:
        """Mark notification as read"""
        notification = NotificationService.get_notification_by_id(db, user_id, notification_id)
        
        if not notification:
            return None
        
        notification.read = True
        notification.read_at = datetime.utcnow()
        db.commit()
        db.refresh(notification)
        
        return notification
    
    @staticmethod
    def mark_all_as_read(db: Session, user_id: int) -> int:
        """Mark all notifications as read"""
        count = db.query(Notification).filter(
            Notification.user_id == user_id,
            Notification.read == False
        ).update(
            {Notification.read: True, Notification.read_at: datetime.utcnow()},
            synchronize_session=False
        )
        db.commit()
        
        return count
    
    @staticmethod
    def delete_notification(db: Session, user_id: int, notification_id: int) -> bool:
        """Delete notification"""
        notification = NotificationService.get_notification_by_id(db, user_id, notification_id)
        
        if not notification:
            return False
        
        db.delete(notification)
        db.commit()
        
        return True
    
    @staticmethod
    def get_unread_count(db: Session, user_id: int) -> int:
        """Get count of unread notifications"""
        return db.query(Notification).filter(
            Notification.user_id == user_id,
            Notification.read == False
        ).count()
