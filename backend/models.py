from sqlalchemy import create_engine, func, Column, Integer, String, Float, Date
from sqlalchemy.orm import sessionmaker,  DeclarativeBase, mapped_column, Mapped

import datetime

from typing import Optional

DATABASE_URL = "sqlite:///./cashflow.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)

class Base(DeclarativeBase):
    pass

class Transaction(Base):
    __tablename__ = "transactions"

    id: Mapped[int] = mapped_column(primary_key=True)
    date: Mapped[datetime.date] = mapped_column(Date, server_default=func.current_date())
    amount: Mapped[float] = mapped_column()
    transaction_type: Mapped[str] # income / expense
    category: Mapped[Optional[str]] # dining, entertainment, groceries etc User defined
    description: Mapped[Optional[str]] # Implictly implies mapped_column() - User comment

    def __repr__(self) -> str:
        return f"Transaction(id={self.id!r}, date={self.date!r}, amount={self.amount!r}, transaction_type={self.transaction_type!r}, category={self.category!r}"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(unique=True)
    password_hash: Mapped[str]

    def __repr__(self) -> str:
        return f"User(id={self.id!r}, username={self.username!r}, password_hash={self.password_hash!r}"
