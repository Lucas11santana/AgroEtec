const slider = document.getElementById("slider");
const btnEsquerda = document.querySelector(".seta.esquerda");
const btnDireita = document.querySelector(".seta.direita");

btnEsquerda.addEventListener("click", () => {
  slider.scrollBy({ left: -300, behavior: "smooth" });
});

btnDireita.addEventListener("click", () => {
  slider.scrollBy({ left: 300, behavior: "smooth" });
});
