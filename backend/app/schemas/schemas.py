from pydantic import BaseModel, EmailStr, Field, validator
from datetime import datetime
from typing import Optional, List
from decimal import Decimal


# ============================================================================
# USER SCHEMAS
# ============================================================================

class UserBase(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=100)
    full_name: Optional[str] = None


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    theme: Optional[str] = None
    timezone: Optional[str] = None
    email_notifications: Optional[bool] = None


class UserResponse(UserBase):
    id: int
    is_active: bool
    is_verified: bool
    avatar_url: Optional[str]
    bio: Optional[str]
    timezone: str
    theme: str
    created_at: datetime
    last_login: Optional[datetime]

    class Config:
        from_attributes = True


# ============================================================================
# LEAD SCHEMAS
# ============================================================================

class TimelineEventBase(BaseModel):
    event_type: str
    description: Optional[str] = None
    platform: str


class TimelineEventCreate(TimelineEventBase):
    event_date: Optional[datetime] = None


class TimelineEventResponse(TimelineEventBase):
    id: int
    lead_id: int
    event_date: datetime
    created_at: datetime

    class Config:
        from_attributes = True


class LeadBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    platform: str = Field(..., pattern="^(linkedin|instagram|direct)$")
    status: Optional[str] = "new"
    temperature: Optional[str] = "cold"
    company: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    handle: Optional[str] = None
    niche: Optional[str] = None
    revenue_estimate: Optional[Decimal] = Decimal("0")
    probability: Optional[int] = Field(default=0, ge=0, le=100)
    notes: Optional[str] = None
    pain_points: Optional[str] = None
    offer_interested: Optional[str] = None
    tags: Optional[List[str]] = None
    source: Optional[str] = None


class LeadCreate(LeadBase):
    pass


class LeadUpdate(BaseModel):
    name: Optional[str] = None
    status: Optional[str] = None
    temperature: Optional[str] = None
    company: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    handle: Optional[str] = None
    niche: Optional[str] = None
    revenue_estimate: Optional[Decimal] = None
    probability: Optional[int] = None
    notes: Optional[str] = None
    pain_points: Optional[str] = None
    offer_interested: Optional[str] = None
    tags: Optional[List[str]] = None
    source: Optional[str] = None
    last_contacted: Optional[datetime] = None
    next_followup: Optional[datetime] = None


class LeadResponse(LeadBase):
    id: int
    user_id: int
    avatar: Optional[str]
    last_contacted: Optional[datetime]
    next_followup: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    timeline_events: List[TimelineEventResponse] = []

    class Config:
        from_attributes = True


class LeadListResponse(BaseModel):
    id: int
    name: str
    company: Optional[str]
    platform: str
    status: str
    temperature: str
    revenue_estimate: Optional[Decimal]
    probability: int
    created_at: datetime

    class Config:
        from_attributes = True


# ============================================================================
# PROJECT SCHEMAS
# ============================================================================

class ProjectTaskBase(BaseModel):
    title: str = Field(..., min_length=1)
    description: Optional[str] = None
    completed: bool = False


class ProjectTaskCreate(ProjectTaskBase):
    pass


class ProjectTaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None


class ProjectTaskResponse(ProjectTaskBase):
    id: int
    project_id: int
    order_index: int
    created_at: datetime
    completed_at: Optional[datetime]

    class Config:
        from_attributes = True


class ProjectMilestoneBase(BaseModel):
    title: str = Field(..., min_length=1)
    description: Optional[str] = None
    due_date: datetime
    completed: bool = False


class ProjectMilestoneCreate(ProjectMilestoneBase):
    pass


class ProjectMilestoneUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    completed: Optional[bool] = None


class ProjectMilestoneResponse(ProjectMilestoneBase):
    id: int
    project_id: int
    order_index: int
    created_at: datetime
    completed_at: Optional[datetime]

    class Config:
        from_attributes = True


class ProjectBase(BaseModel):
    name: str = Field(..., min_length=1)
    description: Optional[str] = None
    client_name: str = Field(..., min_length=1)
    client_email: Optional[str] = None
    client_phone: Optional[str] = None
    status: Optional[str] = "planning"
    deadline: Optional[datetime] = None
    progress: Optional[int] = Field(default=0, ge=0, le=100)
    priority: Optional[str] = "average"
    value: Optional[Decimal] = Decimal("0")
    payment_status: Optional[str] = "unpaid"
    amount_paid: Optional[Decimal] = Decimal("0")
    risk_level: Optional[str] = "low"
    ai_risk_analysis: Optional[str] = None


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    client_name: Optional[str] = None
    client_email: Optional[str] = None
    client_phone: Optional[str] = None
    status: Optional[str] = None
    deadline: Optional[datetime] = None
    progress: Optional[int] = None
    priority: Optional[str] = None
    value: Optional[Decimal] = None
    payment_status: Optional[str] = None
    amount_paid: Optional[Decimal] = None
    risk_level: Optional[str] = None
    ai_risk_analysis: Optional[str] = None


class ProjectResponse(ProjectBase):
    id: int
    user_id: int
    start_date: datetime
    created_at: datetime
    updated_at: datetime
    tasks: List[ProjectTaskResponse] = []
    milestones: List[ProjectMilestoneResponse] = []

    class Config:
        from_attributes = True


class ProjectListResponse(BaseModel):
    id: int
    name: str
    client_name: str
    status: str
    deadline: Optional[datetime]
    progress: int
    priority: str
    value: Decimal
    payment_status: str
    created_at: datetime

    class Config:
        from_attributes = True


# ============================================================================
# FOLLOWUP SCHEMAS
# ============================================================================

class FollowUpBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    lead_id: int
    status: Optional[str] = "pending"
    priority: Optional[str] = "medium"
    due_date: datetime
    lead_name: Optional[str] = None
    platform: Optional[str] = None
    ai_suggestion: Optional[str] = None
    streak_value: Optional[int] = 0


class FollowUpCreate(FollowUpBase):
    pass


class FollowUpUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    due_date: Optional[datetime] = None
    ai_suggestion: Optional[str] = None
    streak_value: Optional[int] = None


class FollowUpResponse(FollowUpBase):
    id: int
    user_id: int
    completed_date: Optional[datetime]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class FollowUpListResponse(BaseModel):
    id: int
    lead_id: int
    lead_name: Optional[str]
    status: str
    priority: str
    due_date: datetime
    platform: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


# ============================================================================
# NOTIFICATION SCHEMAS
# ============================================================================

class NotificationBase(BaseModel):
    notification_type: str
    title: str = Field(..., min_length=1)
    message: str = Field(..., min_length=1)
    severity: Optional[str] = "info"


class NotificationCreate(NotificationBase):
    read: bool = False
    related_lead_id: Optional[int] = None
    related_project_id: Optional[int] = None
    action_url: Optional[str] = None


class NotificationUpdate(BaseModel):
    read: Optional[bool] = None


class NotificationResponse(NotificationBase):
    id: int
    user_id: int
    read: bool
    related_lead_id: Optional[int]
    related_project_id: Optional[int]
    action_url: Optional[str]
    created_at: datetime
    read_at: Optional[datetime]
    expires_at: Optional[datetime]

    class Config:
        from_attributes = True


# ============================================================================
# TOKEN SCHEMAS
# ============================================================================

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenPayload(BaseModel):
    sub: int  # user_id
    exp: Optional[datetime] = None
    iat: Optional[datetime] = None
    type: str = "access"  # "access" or "refresh"
