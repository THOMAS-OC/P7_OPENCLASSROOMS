// Animation du coeur

document.addEventListener("click", (el) => {
    if(el.target.className == "like"){
        el.target.innerHTML = `<i class="fa-solid fa-heart"></i>
        <i class="fa-solid fa-heart heart-fly"></i>`
    }
})