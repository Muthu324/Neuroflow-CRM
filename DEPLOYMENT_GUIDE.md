# NeuroFlow CRM - Production Deployment Guide

## Overview
This is a fully transformed, production-ready AI-powered CRM platform built with:
- **Backend**: FastAPI + SQLAlchemy + PostgreSQL
- **Frontend**: React + TypeScript + Vite
- **Authentication**: JWT with bcrypt password hashing
- **State Management**: Context API with API-driven data

---

## Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL 14+
- Git

---

## Backend Setup

### 1. Environment Configuration

```bash
cd backend
cp .env.example .env  # Or create .env with these values:
```

Edit `.env`:
```
DATABASE_URL=postgresql://user:password@localhost/neuroflow_prod
DATABASE_ECHO=False
SECRET_KEY=your-super-secret-key-min-32-chars
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=False
CORS_ORIGINS=["http://localhost:5173"]
```

### 2. Database Setup

```bash
# Create PostgreSQL database
createdb neuroflow_prod

# Verify connection
psql -U postgres -d neuroflow_prod -c "SELECT 1"
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Initialize Database

The database will auto-initialize on first API start (models created via SQLAlchemy).

### 5. Run Backend

```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend should be running at: `http://localhost:8000`

API Documentation available at: `http://localhost:8000/docs`

---

## Frontend Setup

### 1. Environment Configuration

```bash
cd frontend
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:8000
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Frontend should be accessible at: `http://localhost:5173`

---

## Testing the Application

### 1. Create a User Account

Visit: `http://localhost:5173`

Sign up with:
- Email: `test@example.com`
- Username: `testuser`
- Password: `securepassword123`

### 2. Login

Use credentials above to login and access the dashboard.

### 3. Test API Directly

```bash
# Signup
curl -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "api@example.com",
    "username": "apiuser",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "api@example.com",
    "password": "password123"
  }'

# Get current user (use access_token from login response)
curl -X GET http://localhost:8000/users/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## API Endpoints Overview

### Authentication
- `POST /auth/signup` - Create user account
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user

### Users
- `GET /users/me` - Get current user profile
- `PUT /users/me` - Update profile
- `POST /users/me/change-password` - Change password

### Leads
- `GET /leads` - Get all leads (paginated)
- `POST /leads` - Create lead
- `GET /leads/{id}` - Get lead details
- `PUT /leads/{id}` - Update lead
- `DELETE /leads/{id}` - Delete lead
- `POST /leads/{id}/timeline` - Add timeline event
- `GET /leads/search?q=query` - Search leads

### Projects
- `GET /projects` - Get all projects (paginated)
- `POST /projects` - Create project
- `GET /projects/{id}` - Get project details
- `PUT /projects/{id}` - Update project
- `DELETE /projects/{id}` - Delete project
- `POST /projects/{id}/tasks` - Add task
- `PUT /projects/{id}/tasks/{task_id}` - Update task
- `POST /projects/{id}/milestones` - Add milestone

### Follow-ups
- `GET /followups` - Get all follow-ups
- `POST /followups` - Create follow-up
- `GET /followups/pending` - Get pending follow-ups
- `GET /followups/overdue` - Get overdue follow-ups
- `POST /followups/{id}/complete` - Complete follow-up
- `DELETE /followups/{id}` - Delete follow-up

### Notifications
- `GET /notifications` - Get all notifications
- `GET /notifications/unread-count` - Get unread count
- `PUT /notifications/{id}` - Mark as read
- `POST /notifications/mark-all-as-read` - Mark all as read
- `DELETE /notifications/{id}` - Delete notification

---

## Production Deployment

### Backend (Ubuntu/Linux)

1. **Install System Dependencies**
   ```bash
   sudo apt-get update
   sudo apt-get install -y python3.10 python3.10-venv postgresql postgresql-contrib
   ```

2. **Setup Gunicorn + Nginx**
   ```bash
   pip install gunicorn
   
   # Run with Gunicorn
   gunicorn -w 4 -b 0.0.0.0:8000 app.main:app
   ```

3. **Setup Nginx Reverse Proxy**
   ```nginx
   server {
       listen 80;
       server_name api.yoursite.com;

       location / {
           proxy_pass http://127.0.0.1:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

4. **Use systemd Service**
   ```ini
   [Unit]
   Description=NeuroFlow CRM API
   After=network.target

   [Service]
   User=www-data
   WorkingDirectory=/app/backend
   Environment="PATH=/app/backend/venv/bin"
   ExecStart=/app/backend/venv/bin/gunicorn -w 4 -b 127.0.0.1:8000 app.main:app
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```

### Frontend (Vercel/Netlify)

1. **Build for Production**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   npm i -g vercel
   vercel --prod
   ```

   Or connect GitHub repo directly to Vercel.

3. **Environment Variables in Deployment**
   ```
   VITE_API_URL=https://api.yoursite.com
   ```

---

## Database Migrations

Currently using SQLAlchemy auto-migration (creates tables on startup). For advanced migrations, consider using Alembic:

```bash
pip install alembic
alembic init migrations
alembic revision --autogenerate -m "Initial schema"
alembic upgrade head
```

---

## Security Checklist

- [ ] Change SECRET_KEY to a random 32+ character string
- [ ] Set DEBUG=False in production
- [ ] Use HTTPS only
- [ ] Enable CORS only for your domain
- [ ] Use strong database passwords
- [ ] Set up database backups
- [ ] Enable rate limiting (add middleware)
- [ ] Use API keys for sensitive endpoints
- [ ] Implement audit logging
- [ ] Set up monitoring and alerts

---

## Troubleshooting

### Database Connection Issues
```bash
# Test PostgreSQL connection
psql -h localhost -U postgres -d neuroflow_prod
```

### API Not Responding
```bash
# Check if port 8000 is in use
lsof -i :8000

# Kill process if needed
kill -9 <PID>
```

### CORS Errors
Update `CORS_ORIGINS` in backend `.env` to include your frontend URL.

### Logs
```bash
# Backend
tail -f logs/api.log

# Frontend (browser console)
F12 -> Console tab
```

---

## Scaling Considerations

1. **Database**: Use connection pooling (SQLAlchemy handles this)
2. **Cache**: Add Redis for session/data caching
3. **Background Tasks**: Use Celery for async operations
4. **File Storage**: S3 for file uploads
5. **CDN**: CloudFront/Cloudflare for static assets
6. **Load Balancing**: Multiple API instances behind load balancer

---

## Support & Documentation

- FastAPI Docs: https://fastapi.tiangolo.com
- SQLAlchemy: https://docs.sqlalchemy.org
- React Documentation: https://react.dev
- PostgreSQL: https://www.postgresql.org/docs

---

Generated: June 2026
NeuroFlow CRM - Production Ready AI SaaS Platform
