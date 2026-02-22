from typing import Optional
from sqlmodel import SQLModel, Field

class Users(SQLModel,table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(min_length=1, max_length=50, unique=True)
    email: str = Field(unique=True)
    password: str= Field(min_length=8)

class EarlyAccess(SQLModel,table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True)