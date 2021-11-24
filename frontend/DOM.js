const modalBtn = document.querySelector(".modal-btn");
const modalBg = document.querySelector(".modal-bg");

function showModal (evt) {
modalBg.classList.add('bg-active');
}

modalBtn.addEventListener('click', showModal);
console.log("loaded frontend js");