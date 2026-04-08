from pydantic import BaseModel
from typing import Optional

class TransactionCreate(BaseModel):
    amount: float
    type: str
    category: Optional[str] = None
    description: Optional[str] = None

class TransactionResponse(TransactionCreate):
    id: int

    class Config:
        from_attributes = True 