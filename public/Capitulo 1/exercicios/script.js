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

const btnQuery = document.getElementById("btnQuery");

btnQuery.addEventListener("click", function(){
    const primeiroParagrafo = document.querySelector("#container p");
    primeiroParagrafo.style.color = "red"
})

const btnQueryAll = document.getElementById("btnQueryAll");

btnQueryAll.addEventListener("click", function(){
    const paragrafo = document.querySelectorAll("#container p");

    paragrafo.forEach( p => {
        p.style.border = "1px solid black"
        p.style.margin = "4px 0"
    });
});

const btnCriar = document.getElementById("btnCriar");

btnCriar.addEventListener("click", function(){
    const novo = document.createElement("p");

    novo.textContent = "Eu fui criado dinamicamente";
    novo.classList.add("descricao");

    document.getElementById("container").appendChild(novo);
});

function alterarP1() {
    document.getElementById("p1").innerText = "O parágrafo 1 foi alterado!";
}

function alterarP2() {
    document.getElementById("p2").innerText = "O parágrafo 2 foi modificado!";
}

function alterarP3() {
    document.getElementById("p3").innerText = "Agora o parágrafo 3 tem outro texto!";
}

