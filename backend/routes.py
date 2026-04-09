from fastapi import APIRouter
from sqlalchemy import select, func

from models import SessionLocal, Transaction
from schemas import TransactionCreate, TransactionResponse, SummaryResponse, CategorySummary

router = APIRouter()

# CRUD OPS
# CREATE transaction
@router.post("/transactions", response_model=TransactionResponse)
def create_transaction(transaction: TransactionCreate):
    session = SessionLocal()
    db_transaction = Transaction(**transaction.dict())

    session.add(db_transaction)
    session.commit()
    session.refresh(db_transaction)

    session.close()
    return db_transaction

# GET all transactions
@router.get("/transactions", response_model=list[TransactionResponse])
def get_transactions():
    session = SessionLocal()
    transactions = session.scalars(select(Transaction)).all()
    session.close()
    return transactions

# Summarization
@router.get("/summary", response_model=SummaryResponse)
def get_summary():
    session = SessionLocal()

    # Sum income
    income = session.scalar(
        select(
            func.sum(Transaction.amount)).where(
                Transaction.transaction_type == "income")
                )
    
    # Sum expense
    expense = session.scalar(
        select(
            func.sum(Transaction.amount)).where(
                Transaction.transaction_type == "expense")
                )
    
    session.close()

    # Handle None
    income = income or 0
    expense = expense or 0

    return {
        "income": income,
        "expense": expense,
        "net": income - expense
    }
    
# Category Summarization
@router.get("/summary/by-category", response_model=list[CategorySummary])
def summary_by_category():
    session = SessionLocal()

    results = session.execute(
        select(
            Transaction.category,
            func.sum(Transaction.amount).label("total")
            ).where(Transaction.transaction_type == "expense").group_by(Transaction.category)
            ).all()

    session.close()

    return [
        {"category": r[0] or "Uncategrorized", "total": r[1]} 
        for r in results
    ]
