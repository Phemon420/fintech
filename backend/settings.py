from pathlib import Path
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "My FastAPI App"
    PORT: int = 8000
    HOST: str = "0.0.0.0"
    DATABASE_URL: str
    JWT_SECRET: str
    saltRounds: int
    salt: str
    SMTP_HOST: str
    SMTP_PORT: int
    SMTP_USER: str
    SMTP_PASS: str

    @field_validator("HOST", mode="before")
    @classmethod
    def normalize_host(cls, value: str) -> str:
        host = value.strip() if isinstance(value, str) else value
        if host and isinstance(host, str) and host.lower() == "local":
            return "127.0.0.1"
        return host

    model_config = SettingsConfigDict(
        env_file=Path(__file__).resolve().with_name(".env"),
        extra="ignore",
    )


settings = Settings()
