from fastapi import APIRouter
from pydantic import BaseModel
from ollama import Client
from dotenv import load_dotenv
import os

load_dotenv()

router = APIRouter()

client = Client(
    host="https://ollama.com",
    headers={"Authorization": f"Bearer {os.getenv('API_KEY')}"}
)

class PromptRequest(BaseModel):
    prompt: str

@router.post("/generate")
def generate(data: PromptRequest):
    response = client.chat(
        model="gpt-oss:120b",  # Note: use "gpt-oss:120b" NOT "gpt-oss:120b-cloud"
        messages=[
            {
                "role": "user",
                "content": data.prompt
            }
        ]
    )

    return {
        "response": response["message"]["content"]
    }