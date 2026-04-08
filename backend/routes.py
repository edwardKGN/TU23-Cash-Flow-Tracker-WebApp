from fastapi import APIRouter
from sqlalchemy import select

from models import SessionLocal, Transaction
from schemas import TransactionCreate, TransactionResponse

router = APIRouter()

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
    