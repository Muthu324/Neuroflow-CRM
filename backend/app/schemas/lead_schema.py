from pydantic import BaseModel

class LeadCreate(BaseModel):
    name: str
    company: str
    status: str