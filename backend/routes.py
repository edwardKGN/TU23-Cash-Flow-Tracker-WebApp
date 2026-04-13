from fastapi import APIRouter, Query, HTTPException, Depends
from fastapi.security import HTTPBearer
from sqlalchemy import select, func

from models import SessionLocal, Transaction, User
from schemas import TransactionCreate, TransactionResponse, SummaryResponse, CategorySummary, TypeSummary, UserCreate, UserLogin
from auth import hash_password, verify_password

from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=1)

    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

router = APIRouter()
security = HTTPBearer()

def get_current_user(token=Depends(security)):
    try:
        payload = jwt.decode(token.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return payload["sub"]
    except:
        raise HTTPException(status_code=401,detail="Invalid token")

# CRUD OPS
# CREATE transaction
@router.post("/transactions", response_model=TransactionResponse)
def create_transaction(transaction: TransactionCreate):
    session = SessionLocal()
    db_transaction = Transaction(**transaction.dict(exclude_unset=True))

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
def summary_by_category(
    year: int = Query(None),
    month: int = Query(None)
):
    session = SessionLocal()

    stmt = select(
        Transaction.category,
        func.sum(Transaction.amount).label("total")
        ).where(Transaction.transaction_type == "expense")
    
    # Apply filters
    if year:
        stmt = stmt.where(func.extract('year', Transaction.date) == year)
    
    if month:
        stmt = stmt.where(func.extract('month', Transaction.date) == month)

    stmt = stmt.group_by(Transaction.category)

    results = session.execute(stmt).all()

    session.close()

    return [
        {"category": r[0] or "Uncategrorized", "total": r[1]} 
        for r in results
    ]

# Type Summarization
@router.get("/summary/by-type", response_model=list[TypeSummary])
def summary_by_type(
    year: int = Query(None),
    month: int = Query(None)
):
    session = SessionLocal()

    stmt = select(
        Transaction.transaction_type,
        func.sum(Transaction.amount).label("total")
        )
    
    # Apply filters
    if year:
        stmt = stmt.where(func.extract('year', Transaction.date) == year)
    
    if month:
        stmt = stmt.where(func.extract('month', Transaction.date) == month)

    stmt = stmt.group_by(Transaction.transaction_type)

    results = session.execute(stmt).all()

    session.close()

    # Configure this to ensure both income and expense types are always listed
    summary = {"income": 0, "expense": 0}

    for t, total in results:
        summary[t] = total

    return[
        {"transaction_type": "income", "total": summary["income"]},  # Ensure that return matches pydantic as well
        {"transaction_type": "expense", "total": summary["expense"]}
    ]

# Monthly Summary
@router.get("/summary/monthly")
def monthly_summary(year: int):
    session = SessionLocal()

    stmt = select(
        func.extract('month', Transaction.date).label("month"),
        Transaction.transaction_type,
        func.sum(Transaction.amount).label("total")
    ).where(
        func.extract('year', Transaction.date) == year
    ).group_by(
        "month",
        Transaction.transaction_type
    )

    results = session.execute(stmt).all()

    session.close()

    summary = {}

    for month, t_type, total in results:
        month = int(month)

        if month not in summary:
            summary[month] = {
                "month": month,
                "income": 0,
                "expense": 0
            }
        
        summary[month][t_type] = total

    # Cover missing months for plotting continuous line-chart
    for m in range(1, 13):
        if m not in summary:
            summary[m] = {"month": m, "income": 0, "expense": 0}
    # NOTE Data will be out of order. Need to re-order at front-end
    
    return list(summary.values())

# Authentication System
@router.post("/register")
def register(user: UserCreate):
    session = SessionLocal()

    hashed_pw = hash_password(user.password)

    new_user = User(
        username=user.username,
        password_hash=hashed_pw
    )

    session.add(new_user)
    session.commit()
    session.close()

    return {"message": "User created"}

@router.post("/login")  # TODO Test LOGIN
def login(user: UserLogin):
    session = SessionLocal()

    db_user = session.scalar(
        select(User).where(User.username == user.username)
        )

    # print(f"user > {user}, db_user > {db_user}")

    if not db_user or not verify_password(
        user.password, db_user.password_hash
    ):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": db_user.username})

    session.close()

    return {"access_token": token}
