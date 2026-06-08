# NeuroFlow CRM - Architecture & Migration Guide

## System Architecture

### Backend Architecture

```
app/
├── main.py                 # FastAPI app setup, middleware, route registration
├── database.py             # Database connection, session management
├── models/                 # SQLAlchemy ORM models
│   ├── user.py            # User authentication model
│   ├── lead.py            # Lead + TimelineEvent models
│   ├── project.py         # Project, Task, Milestone models
│   └── notification.py    # FollowUp + Notification models
├── schemas/               # Pydantic validation schemas
│   └── schemas.py         # All request/response schemas
├── services/              # Business logic (CRUD operations)
│   ├── user_service.py
│   ├── lead_service.py
│   ├── project_service.py
│   └── notification_service.py
├── routes/                # API endpoint handlers
│   ├── auth.py           # Authentication routes
│   ├── users.py          # User profile routes
│   ├── leads.py          # Lead CRUD routes
│   ├── projects.py       # Project management routes
│   ├── followups.py      # Follow-up routes
│   ├── notifications.py  # Notification routes
│   └── ai.py             # AI endpoints (future)
└── utils/                # Utilities
    ├── auth.py           # JWT token generation, password hashing
    └── dependencies.py   # FastAPI dependency injection
```

### Frontend Architecture

```
src/
├── app/
│   ├── authContext.tsx    # Authentication state (login/signup)
│   ├── dataContext.tsx    # Data state (leads/projects/followups)
│   ├── router.tsx         # Route definitions
│   └── providers.tsx      # [DEPRECATED] Old mock data provider
├── services/
│   ├── apiClient.ts       # Axios HTTP client with JWT auth
│   ├── leadService.ts     # [DEPRECATED] Old mock service
│   ├── aiService.ts       # AI service calls
│   └── ...other services
├── hooks/
│   ├── useLeads.ts        # Leads data hooks (API-driven)
│   ├── useProjects.ts     # Projects data hooks (API-driven)
│   ├── useNotifications.ts # Notifications hooks (API-driven)
│   ├── useRevenue.ts      # Revenue calculations
│   └── useAI.ts           # AI functionality
├── pages/                 # Page components
├── components/            # Reusable UI components
└── types.ts               # TypeScript type definitions
```

## Data Flow

### Authentication Flow

1. User submits email/password
2. Frontend calls `POST /auth/login`
3. Backend authenticates user, returns JWT tokens
4. Frontend stores tokens in sessionStorage
5. apiClient adds Bearer token to all subsequent requests
6. 401 errors trigger automatic token refresh
7. On logout, tokens cleared from sessionStorage

### Data Fetching Flow

1. User navigates to page (e.g., /leads)
2. DataContext hook fires `useEffect` with empty dependency
3. Calls `fetchLeads()` which calls `apiClient.getLeads()`
4. apiClient makes API call to backend
5. Backend queries database, returns paginated results
6. Frontend updates state in DataContext
7. Components subscribed to DataContext re-render
8. UI displays data with loading/error states

### Create/Update/Delete Flow

1. User performs action (e.g., creates lead)
2. Component calls hook method (e.g., `createLead()`)
3. Hook calls apiClient method
4. apiClient makes POST/PUT/DELETE request
5. Backend validates data, updates database
6. Returns updated resource
7. Frontend updates state optimistically
8. Component re-renders with new data

## Authentication System

### JWT Token Structure

```
Header: { alg: "HS256", typ: "JWT" }
Payload: {
  "sub": "1",              # User ID
  "exp": 1234567890,      # Expiration time
  "iat": 1234567800,      # Issued at
  "type": "access"        # Token type
}
Signature: HMACSHA256(SECRET_KEY)
```

### Token Lifecycle

1. **Access Token**: 30 minutes (short-lived, in requests)
2. **Refresh Token**: 7 days (long-lived, stored securely)
3. **Refresh Flow**: When access token expires, use refresh token to get new access token
4. **Logout**: Clear both tokens from client

## Database Schema

### Users Table
```sql
id (PK), email (UNIQUE), username (UNIQUE), hashed_password,
is_active, is_verified, full_name, avatar_url, bio,
timezone, theme, email_notifications,
created_at, updated_at, last_login
```

### Leads Table
```sql
id (PK), user_id (FK), name, platform, status, temperature,
company, email, phone, handle, niche,
revenue_estimate, probability, last_contacted, next_followup,
notes, pain_points, offer_interested, tags, source,
created_at, updated_at
```

### Timeline Events Table
```sql
id (PK), lead_id (FK), event_type, description, platform,
event_date, created_at
```

### Projects Table
```sql
id (PK), user_id (FK), name, description, client_name,
client_email, client_phone, status, deadline, start_date,
progress, priority, value, payment_status, amount_paid,
ai_risk_analysis, risk_level, created_at, updated_at
```

### Project Tasks/Milestones Tables
Similar structure with project_id FK, title, description, completion tracking

### Follow-ups Table
```sql
id (PK), user_id (FK), lead_id (FK), title, description,
status, priority, due_date, completed_date, lead_name,
platform, ai_suggestion, streak_value, created_at, updated_at
```

### Notifications Table
```sql
id (PK), user_id (FK), notification_type, title, message,
read, severity, related_lead_id, related_project_id,
action_url, created_at, read_at, expires_at
```

## Migration from Mock to Real API

### What Changed

#### ❌ REMOVED
- `INITIAL_LEADS` array
- `INITIAL_PROJECTS` array
- `INITIAL_FOLLOWUPS` array
- All mock data constants
- localStorage persistence
- Local state management without API

#### ✅ ADDED
- PostgreSQL database
- JWT authentication system
- API client with automatic token refresh
- AuthContext for user sessions
- DataContext for API-driven data
- Comprehensive error handling
- Loading states
- Session storage for tokens

### Key Differences

| Aspect | Before (Mock) | After (Production) |
|--------|---------------|-------------------|
| Data Storage | Browser RAM + localStorage | PostgreSQL Database |
| Authentication | None | JWT with refresh tokens |
| Data Persistence | Session only | Persistent |
| Multi-device | No | Yes |
| Scalability | No | Yes |
| Collaboration | No | Yes (future) |
| API Calls | Mock/simulated | Real HTTP requests |
| Error Handling | None | Comprehensive |
| Loading States | None | Full support |

## API Contract Examples

### Create Lead
```typescript
// Request
POST /leads
{
  "name": "Sarah Jenkins",
  "platform": "linkedin",
  "status": "contacted",
  "temperature": "warm",
  "company": "ScribeFlow AI",
  "revenue_estimate": 14500,
  "probability": 85
}

// Response (200 OK)
{
  "id": 1,
  "user_id": 5,
  "name": "Sarah Jenkins",
  "platform": "linkedin",
  "status": "contacted",
  ...other fields,
  "timeline_events": [],
  "created_at": "2026-06-08T10:30:00Z"
}
```

### Get Leads with Filters
```typescript
// Request
GET /leads?skip=0&limit=50&status=hot&platform=linkedin

// Response (200 OK)
{
  "items": [
    { ...lead object },
    { ...lead object }
  ],
  "total": 23,
  "skip": 0,
  "limit": 50
}
```

### Login
```typescript
// Request
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Response (200 OK)
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer"
}
```

## Error Handling

### Standard Error Response
```json
{
  "detail": "Lead not found"
}
```

Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized (invalid/expired token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 500: Internal Server Error

## Performance Considerations

1. **Pagination**: API returns paginated results (limit max 500)
2. **Filtering**: Filter on backend, not frontend
3. **Connection Pooling**: SQLAlchemy handles DB connections
4. **Token Caching**: Tokens stored in sessionStorage (not localStorage)
5. **API Response Caching**: Implement with Redis for future scaling

## Security Features

1. **Password Hashing**: bcrypt with salt
2. **JWT Tokens**: Signed and validated
3. **CORS**: Restricted to frontend domain
4. **SQL Injection Protection**: SQLAlchemy ORM parameterized queries
5. **XSS Protection**: React auto-escapes content
6. **CSRF Protection**: (Can add if needed)
7. **Rate Limiting**: (Not yet implemented)
8. **Audit Logging**: (Future enhancement)

## Future Enhancements

1. **Real AI Integration**: Replace mock AI with actual LLM APIs
2. **Real-time Updates**: WebSocket support for live notifications
3. **File Uploads**: S3 integration for documents
4. **Background Jobs**: Celery for async tasks
5. **Email Notifications**: Send email alerts
6. **Calendar Integration**: Sync with Google Calendar
7. **CRM Integrations**: Salesforce, HubSpot connectors
8. **Analytics Dashboard**: Advanced reporting
9. **Role-based Access**: Admin/User/Viewer roles
10. **Team Collaboration**: Share leads/projects with team

## Testing

### Backend Tests (future)
```bash
pytest app/tests/
```

### Frontend Tests (future)
```bash
npm test
```

### E2E Tests (future)
```bash
npm run test:e2e
```

## Deployment Checklist

- [ ] Database backup strategy
- [ ] Environment variables configured
- [ ] HTTPS/SSL enabled
- [ ] Database migrations run
- [ ] API health checks passing
- [ ] Frontend builds without errors
- [ ] Auth flow tested end-to-end
- [ ] All CRUD operations tested
- [ ] Error handling verified
- [ ] Performance benchmarked

---

Last Updated: June 8, 2026
NeuroFlow CRM Production System
