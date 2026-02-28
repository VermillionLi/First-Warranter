# api.py
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from rag import RAGBot



app = FastAPI()
bot = RAGBot()

class QuestionRequest(BaseModel):
    question: str

@app.post("/test")
def test_question(req: QuestionRequest):
    answer = bot.answer(req.question)
    return {
        "answer": answer
    }

if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8000)