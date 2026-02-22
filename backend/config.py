from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel

from .settings import settings


database_url = settings.DATABASE_URL.strip()

engine = create_async_engine(
    url=database_url,
    echo=True,
    pool_size=10,
    max_overflow=20,
)

async_session = sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


async def get_db():
    async with async_session() as session:
        yield session


async def init_db():
    # Import models so SQLModel metadata knows about all tables
    import backend.models  # noqa: F401
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
    print("Database tables created / verified")
