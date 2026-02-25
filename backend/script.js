const resultInput = document.getElementById("result")
const toast = document.getElementById("toast")

async function generatePassword() {
    const size = document.getElementById("size").value
    const letters = document.getElementById("letters").checked
    const numbers = document.getElementById("numbers").checked
    const symbols = document.getElementById("symbols").checked

    const url = `http://localhost:8000/generate-password?size=${size}&letters=${letters}&numbers=${numbers}&symbols=${symbols}`

    const response = await fetch(url)
    const data = await response.json()
    updateStrength(data.password)

    resultInput.value = data.password
    resultInput.classList.add("has-value")
}

resultInput.addEventListener("click", async () => {
    if (!resultInput.value) return

    try {
        await navigator.clipboard.writeText(resultInput.value)
        showToast("Senha copiada!")
    } catch (err) {
        console.error("Erro ao copiar senha", err)
    }
})

function updateStrength(pw) {
    const fill = document.getElementById('strengthFill');
    const text = document.getElementById('strengthText');
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 16) score++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^a-zA-Z0-9]/.test(pw)) score++;

    const levels = [
        { pct: '25%', color: '#ff4d6d', label: 'Muito fraca' },
        { pct: '40%', color: '#ff9f43', label: 'Fraca' },
        { pct: '60%', color: '#ffd32a', label: 'Média' },
        { pct: '80%', color: '#00b8ff', label: 'Forte' },
        { pct: '100%', color: '#00e5a0', label: 'Muito forte' },
    ];

    const lvl = levels[Math.max(0, score - 1)];
    fill.style.width = lvl.pct;
    fill.style.background = lvl.color;
    text.textContent = lvl.label;
    text.style.color = lvl.color;
}

function showToast(message) {
    toast.textContent = message
    toast.classList.add("show")

    setTimeout(() => {
        toast.classList.remove("show")
    }, 2000)
}
