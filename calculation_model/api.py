# api.py
from fastapi import FastAPI
from pydantic import BaseModel
from ragbot import RAGBot  # wherever your class lives

app = FastAPI()
bot = RAGBot()

class QuestionRequest(BaseModel):
    question: str

@app.post("/ask")
def ask_question(req: QuestionRequest):
    answer, retrieved = bot.answer(req.question)
    return {
        "answer": answer,
        "sources": retrieved
    }