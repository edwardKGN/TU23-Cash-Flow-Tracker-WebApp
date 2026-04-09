from sqlalchemy import select, func
from models import SessionLocal, Transaction

if __name__ == """__main__""":
    print(f"Test Script Running")

    session = SessionLocal()

    # Sum income
    income = session.scalar(
        select(
            func.sum(Transaction.amount)).where(
                Transaction.transaction_type == "income")
                )
    
    print(f"income > {income}")
