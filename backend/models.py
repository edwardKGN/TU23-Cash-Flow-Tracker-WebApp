from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import sessionmaker,  DeclarativeBase, mapped_column, Mapped

from typing import Optional

DATABASE_URL = "sqlite:///./cashflow.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)

class Base(DeclarativeBase):
    pass

class Transaction(Base):
    __tablename__ = "transactions"

    id: Mapped[int] = mapped_column(primary_key=True)
    amount: Mapped[float] = mapped_column()
    transaction_type: Mapped[str] # income / expense
    category: Mapped[Optional[str]] # dining, entertainment, groceries etc User defined
    description: Mapped[Optional[str]] # Implictly implies mapped_column() - User comment

    def __repr__(self) -> str:
        return f"Transaction(id={self.id!r}, amount={self.amount!r}, transaction_type={self.transaction_type!r}, category={self.category!r}"
