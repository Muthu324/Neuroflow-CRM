
# Neuroflow CRM

Neuroflow CRM is an AI-powered operating system designed for B2B service providers and freelancers. It automates lead qualification, tracks outreach performance, and manages revenue pipelines across LinkedIn and Instagram—all while providing AI-driven tactical insights to close more deals.

## 🚀 Key Features

* **Unified Pipeline Management**: Track leads from LinkedIn and Instagram in one centralized board.
* **AI-Powered Lead Qualification**: Let the AI analyze lead temperature and provide actionable next steps.
* **Revenue Forecasting**: Visualize your potential MRR and track closed-won revenue in real-time.
* **Automated Outreach Tracking**: Monitor connection requests, DM volume, and reply rates across platforms.
* **Executive Dashboard**: High-level performance metrics tailored for CEOs and independent consultants.

## 🛠 Tech Stack

* **Frontend**: React 19, Vite 6, Tailwind CSS v4, Lucide React, Recharts.
* **Backend**: Python FastAPI, SQLAlchemy, PostgreSQL.
* **AI**: Integrated AI operational layer for lead interaction and strategic forecasting.

## 📦 Getting Started

### Prerequisites

* Docker & Docker Compose
* Node.js (v20+)
* Python (v3.11+)

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/Muthu324/Neuroflow-CRM.git
cd Neuroflow-CRM

```


2. **Start the development environment**:
```bash
docker-compose up --build

```


3. **Access the application**:
* **Frontend**: `http://localhost:3000`
* **API**: `http://localhost:8000`



## 📊 Deployment

Neuroflow CRM is optimized for production deployment using:

* **Vercel**: For high-performance static frontend hosting.
* **Render**: For scalable, containerized FastAPI backend hosting.
* **Supabase**: For secure, managed PostgreSQL database instances.

*See `PRODUCTION_SETUP.md` for detailed environment variable configuration and deployment steps.*

## 📈 Roadmap

* [ ] Implement automated DM follow-up triggers.
* [ ] Advanced sentiment analysis for CRM lead interactions.
* [ ] Multi-user team collaboration features.

---

*Built with precision for the modern AI-first consultant.*
