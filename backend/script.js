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

function showToast(message) {
    toast.textContent = message
    toast.classList.add("show")

    setTimeout(() => {
        toast.classList.remove("show")
    }, 2000)
}
