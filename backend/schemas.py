from pydantic import BaseModel
from typing import Optional

# Base CRUD for Transactions
class TransactionCreate(BaseModel):
    amount: float
    transaction_type: str
    category: Optional[str] = None
    description: Optional[str] = None

class TransactionResponse(TransactionCreate):
    id: int

    class Config:
        from_attributes = True

# Summarization
class SummaryResponse(BaseModel):
    income: float
    expense: float
    net: float
