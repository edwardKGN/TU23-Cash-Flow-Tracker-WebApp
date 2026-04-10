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

    # Retrieve and Group Expenses together
    # results = session.execute(
    #         select(
    #             Transaction.category,
    #             func.sum(Transaction.amount).label("total")
    #             ).where(Transaction.transaction_type == "expense").group_by(Transaction.category)
    #             ).all()
    

    # print(f"results > {results}")

    # dict_category_grp = [
    #     {"category": r[0] or "Uncategrorized", "total": r[1]} 
    #     for r in results
    # ]

    # Get All
    # transactions = session.scalars(select(Transaction)).all()

    # print(f"transactions > {transactions}")

    # Retrieve and Group Expenses together, and then filter by year and/or month
    # year = '2026'
    # month = '3'

    # stmt = select(
    #     Transaction.category,
    #     func.sum(Transaction.amount).label("total")
    #     ).where(Transaction.transaction_type == "expense")
    
    # # Apply filters
    # if year:
    #     stmt = stmt.where(func.extract('year', Transaction.date) == year)
    
    # if month:
    #     stmt = stmt.where(func.extract('month', Transaction.date) == month)

    # stmt = stmt.group_by(Transaction.category)

    # results = session.execute(stmt).all()

    # print(f"results > {results}")

    # dict_category_grp = [
    #     {"category": r[0] or "Uncategrorized", "total": r[1]} 
    #     for r in results
    # ]

    year = 2026

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

    print(f"results > {results}")

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

    print(f"summary > {summary}")
