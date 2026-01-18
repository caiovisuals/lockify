import random
import string

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

    senha = ''.join(random.choice(characters) for _ in range(size))
    return senha


print(generate_password(16, letters=True, numbers=True, symbols=True))