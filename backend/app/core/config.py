from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    database_url: str
    origin: str
    secret_key: str
    algorithm: str
    access_token_expire_hours: int

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings() # type: ignore