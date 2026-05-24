from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import json
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Path to the menu JSON file
MENU_FILE = ROOT_DIR / 'data' / 'menu.json'

app = FastAPI()
api_router = APIRouter(prefix="/api")


class MenuItem(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    name: str
    price: int
    category: str
    image: str
    description: Optional[str] = ""


def load_menu():
    """Load menu items from the JSON file. Edit /app/backend/data/menu.json to update menu."""
    try:
        with open(MENU_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail=f"Menu file not found at {MENU_FILE}")
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Invalid JSON in menu file: {e}")


@api_router.get("/")
async def root():
    return {"message": "Maa Harsiddhi Darbar Foods API"}


@api_router.get("/menu", response_model=List[MenuItem])
async def get_menu():
    return load_menu()


@api_router.get("/menu/categories")
async def get_categories():
    """Return list of unique categories in the order they appear in menu.json."""
    items = load_menu()
    seen = []
    for item in items:
        if item['category'] not in seen:
            seen.append(item['category'])
    return {"categories": seen}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
