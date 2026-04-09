from sqlalchemy import select, func
from models import SessionLocal, Transaction

if __name__ == """__main__""":
    print(f"Test Script Running")

    session = SessionLocal()

    # Sum income
    # income = session.scalar(
    #     select(
    #         func.sum(Transaction.amount)).where(
    #             Transaction.transaction_type == "income")
    #             )
    
    # print(f"income > {income}")

    results = session.execute(
            select(
                Transaction.category,
                func.sum(Transaction.amount).label("total")
                ).where(Transaction.transaction_type == "expense").group_by(Transaction.category)
                ).all()
    

    print(f"results > {results}")

    dict_category_grp = [
        {"category": r[0] or "Uncategrorized", "total": r[1]} 
        for r in results
    ]
