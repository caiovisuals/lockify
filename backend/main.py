from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
import string

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def generate_password(
    size=12,
    letters=True,
    numbers=True,
    symbols=True
):
    characters = ""

    if letters:
        characters += string.ascii_letters
    if numbers:
        characters += string.digits
    if symbols:
        characters += string.punctuation

    if not characters:
        raise ValueError("Selecione pelo menos um tipo de caractere")

    return ''.join(random.choice(characters) for _ in range(size))

@app.get("/generate-password")
def generate(
    size: int = 12,
    letters: bool = True,
    numbers: bool = True,
    symbols: bool = True
):
    password = generate_password(size, letters, numbers, symbols)
    return {"password": password}