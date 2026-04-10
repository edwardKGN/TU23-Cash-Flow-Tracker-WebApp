from pydantic import BaseModel
from typing import Optional
from datetime import date

# Base CRUD for Transactions
class TransactionCreate(BaseModel):
    date: Optional[date] = None  # Note this one refers to user entry
    amount: float
    transaction_type: str
    category: Optional[str] = None
    description: Optional[str] = None

class TransactionResponse(TransactionCreate):
    id: int
    date: date  # Need to explicitly declare that this entry will not be none due to database sets default value to current_date()
    amount: float
    transaction_type: str
    category: Optional[str] = None
    description: Optional[str] = None

    class Config:
        from_attributes = True

# Summarization
class SummaryResponse(BaseModel):
    income: float
    expense: float
    net: float

# Category Aggregation
class CategorySummary(BaseModel):
    category:str
    total: float

# Type Aggregation
class TypeSummary(BaseModel):
    transaction_type:str
    total: float
