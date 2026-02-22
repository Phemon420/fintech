from typing import Optional
from sqlmodel import SQLModel, Field
from datetime import datetime

class Api_Logs(SQLModel,table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    endpoint: str = Field(min_length=1, max_length=50)
    created_at: datetime = Field(default=datetime.now())
    time_taken: float = Field(min_length=1, max_length=50)
    status_code: int = Field(min_length=1, max_length=50)
    request_body: str = Field(min_length=1, max_length=50)
    response_body: str = Field(min_length=1, max_length=50)