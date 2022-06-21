const button = document.querySelector("input[type='submit']")
button.addEventListener("click", el => {
    el.preventDefault()
    window.location.assign("http://127.0.0.1:5500/home.html")
})
