const título = document.getElementById("título")
const btnTrocarTexto = document.getElementById("btnTrocarTexto")


btnTrocarTexto.addEventListener("click", function() {
    título.textContent = "O título foi alterado via DOM";
} );

const descricao = document.getElementsByClassName("descricao");
const btnDestaque = document.getElementById("btnDestaque");

btnDestaque.addEventListener("click", function() {
    for (let item of descricao){
        item.classList.toggle("highlight")
    }
});