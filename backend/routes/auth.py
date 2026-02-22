from fastapi import APIRouter, Depends
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession

from backend.config import get_db
from backend.controller.auth import *

router = APIRouter(prefix="/auth", tags=["auth"])

class SignupRequest(BaseModel):
    username: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class EarlyAccessRequest(BaseModel):
    email: EmailStr

@router.post("/signup")
async def signup(body: SignupRequest, db: AsyncSession = Depends(get_db)):
    return await signup_controller(body.username, body.email, body.password, db)


@router.post("/login")
async def login(body: LoginRequest, db: AsyncSession = Depends(get_db)):
    return await login_controller(body.email, body.password, db)

@router.post("/early-access")
async def early_access(body: EarlyAccessRequest, db: AsyncSession = Depends(get_db)):
    return await early_access_controller(body.email, db)
