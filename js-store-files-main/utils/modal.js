const modal = document.getElementById("modal")
const info = document.getElementById("error-info")
const closeButton = document.getElementById("close-button")

const modalDeleter = () => {
    modal.style.display = "none"
}

const modalHandler = (data) => {
    modal.style.display = "flex"
    info.innerText = data
    closeButton.addEventListener("click" , modalDeleter)
}

export default modalHandler