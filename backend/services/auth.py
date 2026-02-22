from datetime import datetime, timedelta, timezone
import bcrypt
from jose import jwt
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from backend.models import *
from backend.settings import settings

def hash_password(password: str):
    salted = f"{settings.salt}{password}"
    hashed = bcrypt.hashpw(
        salted.encode("utf-8"),
        bcrypt.gensalt(rounds=settings.saltRounds),
    )
    return hashed.decode("utf-8")

def verify_password(plain_password: str, hashed_password: str):
    salted = f"{settings.salt}{plain_password}"
    return bcrypt.checkpw(
        salted.encode("utf-8"),
        hashed_password.encode("utf-8"),
    )

def create_jwt_token(user_id: int, email: str):
    payload = {
        "sub": str(user_id),
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=24),
    }
    return jwt.encode(payload, settings.JWT_SECRET, algorithm="HS256")

async def get_user_by_email(email: str, db: AsyncSession):
    query = select(Users).where(Users.email == email)
    result = await db.execute(query)
    return result.scalars().first()

async def get_user_by_username(username: str, db: AsyncSession):
    query = select(Users).where(Users.username == username)
    result = await db.execute(query)
    return result.scalars().first()

