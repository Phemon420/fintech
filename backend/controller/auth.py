from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from backend.models.users import *
from backend.services.auth import *
from backend.services.email import *

async def signup_controller(username: str, email: str, password: str, db: AsyncSession):
    if await get_user_by_email(email, db):
        raise HTTPException(status_code=400, detail="Email already registered")

    if await get_user_by_username(username, db):
        raise HTTPException(status_code=400, detail="Username already taken")

    hashed = hash_password(password)
    user = Users(username=username, email=email, password=hashed)
    db.add(user)
    await db.commit()
    await db.refresh(user)

    send_welcome_email(email, username)
    token = create_jwt_token(user.id, user.email)
    return {
        "message": "Account created successfully",
        "token": token,
        "user": {"id": user.id, "username": user.username, "email": user.email},
    }


async def login_controller(email: str, password: str, db: AsyncSession) :
    user = await get_user_by_email(email, db)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_jwt_token(user.id, user.email)
    return {
        "message": "Login successful",
        "token": token,
        "user": {"id": user.id, "username": user.username, "email": user.email},
    }

async def early_access_controller(email: str, db: AsyncSession):
    if await get_user_by_email(email, db):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    early_access = EarlyAccess(email=email)
    db.add(early_access)
    await db.commit()
    await db.refresh(early_access)
    
    return {"message": "Early access request submitted successfully"}
