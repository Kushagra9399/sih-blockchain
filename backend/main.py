from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Temporary storage
transactions = []

class Transaction(BaseModel):
    sender: str
    receiver: str
    amount: float

@app.get("/")
def root():
    return {"message": "Blockchain API running!"}

@app.get("/transactions", response_model=List[Transaction])
def get_transactions():
    return transactions

@app.post("/transactions")
def add_transaction(tx: Transaction):
    transactions.append(tx)
    return {"status": "success", "transaction": tx}
