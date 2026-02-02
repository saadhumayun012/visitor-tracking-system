from fastapi import FastAPI

from app.routes.admin import router as admin_routers
from app.routes import user_ocr_data, auth, visitor
from app.utils import Base
from app.database import engine

# from passlib.context import CryptContext

app = FastAPI(
    title="Visitor Tracking System"
)

Base.metadata.create_all(bind=engine)

# pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")
# print(pwd.hash("admin123"))
# app.include_router(user_ocr_data.router)

app.include_router(admin_routers)
app.include_router(auth.router)
app.include_router(visitor.router)




