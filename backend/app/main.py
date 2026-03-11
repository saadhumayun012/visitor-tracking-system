from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path

from app.routes.admin import router as admin_routers
from app.routes.receptionist import router as receptionist_routers
from app.routes.common import router as common_routers
from app.routes.branch_officer import router as branch_officer_routers

from app.utils import Base
from app.core.database import engine
from app.core.config import settings

# from passlib.context import CryptContext

app = FastAPI(title="Visitor Tracking System")

Base.metadata.create_all(bind=engine)

# ==========+++++==========+++++==========
# TODO: Update the allowed origins for production deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origin,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========+++++==========+++++==========
# pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")
# print(pwd.hash("admin123"))
# app.include_router(user_ocr_data.router)

# ==========+++++==========+++++==========
app.include_router(admin_routers)
app.include_router(receptionist_routers)
app.include_router(common_routers)
app.include_router(branch_officer_routers)

# ==========+++++==========+++++==========
# ensure uploads directory exists at startup
Path("uploads").mkdir(exist_ok=True)
