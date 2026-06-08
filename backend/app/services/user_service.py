from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.schemas import UserCreate, UserUpdate
from app.utils.auth import hash_password, verify_password
from datetime import datetime
from typing import Optional


class UserService:
    """CRUD operations for User model"""
    
    @staticmethod
    def create_user(db: Session, user_create: UserCreate) -> User:
        """Create a new user"""
        # Check if email already exists
        if db.query(User).filter(User.email == user_create.email).first():
            raise ValueError("Email already registered")
        
        # Check if username already exists
        if db.query(User).filter(User.username == user_create.username).first():
            raise ValueError("Username already taken")
        
        # Create new user
        new_user = User(
            email=user_create.email,
            username=user_create.username,
            full_name=user_create.full_name,
            hashed_password=hash_password(user_create.password),
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        return new_user
    
    @staticmethod
    def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
        """Get user by ID"""
        return db.query(User).filter(User.id == user_id).first()
    
    @staticmethod
    def get_user_by_email(db: Session, email: str) -> Optional[User]:
        """Get user by email"""
        return db.query(User).filter(User.email == email).first()
    
    @staticmethod
    def get_user_by_username(db: Session, username: str) -> Optional[User]:
        """Get user by username"""
        return db.query(User).filter(User.username == username).first()
    
    @staticmethod
    def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
        """Authenticate user with email and password"""
        user = UserService.get_user_by_email(db, email)
        
        if not user or not verify_password(password, user.hashed_password):
            return None
        
        # Update last login
        user.last_login = datetime.utcnow()
        db.commit()
        
        return user
    
    @staticmethod
    def update_user(db: Session, user: User, user_update: UserUpdate) -> User:
        """Update user profile"""
        update_data = user_update.dict(exclude_unset=True)
        
        for field, value in update_data.items():
            setattr(user, field, value)
        
        user.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(user)
        
        return user
    
    @staticmethod
    def change_password(db: Session, user: User, new_password: str) -> User:
        """Change user password"""
        user.hashed_password = hash_password(new_password)
        user.updated_at = datetime.utcnow()
        db.commit()
        
        return user
    
    @staticmethod
    def deactivate_user(db: Session, user_id: int) -> bool:
        """Deactivate a user account"""
        user = db.query(User).filter(User.id == user_id).first()
        
        if not user:
            return False
        
        user.is_active = False
        db.commit()
        
        return True
    
    @staticmethod
    def activate_user(db: Session, user_id: int) -> bool:
        """Activate a user account"""
        user = db.query(User).filter(User.id == user_id).first()
        
        if not user:
            return False
        
        user.is_active = True
        db.commit()
        
        return True
    
    @staticmethod
    def verify_email(db: Session, user_id: int) -> bool:
        """Mark email as verified"""
        user = db.query(User).filter(User.id == user_id).first()
        
        if not user:
            return False
        
        user.is_verified = True
        db.commit()
        
        return True
