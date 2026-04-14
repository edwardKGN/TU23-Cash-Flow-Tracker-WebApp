from passlib.context import CryptContext

from jose import jwt
from datetime import datetime, timedelta

from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer

pwd_context = CryptContext(schemes=["bcrypt"])

def hash_password(password: str):
    return pwd_context.hash(password[:72])

def verify_password(plain, hashed):
    return pwd_context.verify(plain[:72], hashed)

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=1)

    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

security = HTTPBearer()

def get_current_user(token=Depends(security)):
    try:
        payload = jwt.decode(token.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        
        # print(f"payload > {payload}")
        
        return payload["sub"]
    except:
        raise HTTPException(status_code=401,detail="Invalid token")
