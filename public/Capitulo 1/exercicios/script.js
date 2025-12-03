// ===== TROCAR TEXTO DO TÍTULO =====
const título = document.getElementById("título");
const btnTrocarTexto = document.getElementById("btnTrocarTexto");

btnTrocarTexto.addEventListener("click", function () {
    título.textContent = "✨ O TÍTULO FOI ALTERADO VIA DOM ✨";
});


// ===== DESTACAR DESCRIÇÃO =====
const descricao = document.getElementsByClassName("descricao");
const btnDestaque = document.getElementById("btnDestaque");

btnDestaque.addEventListener("click", function () {
    for (let item of descricao) {
        item.classList.toggle("highlight");
    }
});


// ===== QUERYSELECTOR =====
const btnQuery = document.getElementById("btnQuery");

btnQuery.addEventListener("click", function () {
    const primeiroParagrafo = document.querySelector("#container p");
    primeiroParagrafo.style.color = "#e74c3c";
    primeiroParagrafo.style.fontWeight = "bold";
});


// ===== QUERYSELECTORALL =====
const btnQueryAll = document.getElementById("btnQueryAll");

btnQueryAll.addEventListener("click", function () {
    const paragrafo = document.querySelectorAll("#container p");

    paragrafo.forEach(p => {
        p.style.border = "2px solid #667eea";
        p.style.margin = "8px 0";
        p.style.padding = "10px";
    });
});


// ===== CRIAR PARÁGRAFO =====
const btnCriar = document.getElementById("btnCriar");

btnCriar.addEventListener("click", function () {
    const novo = document.createElement("p");
    novo.textContent = "🎉 Eu fui criado dinamicamente!";
    novo.classList.add("descricao");
    document.getElementById("container").appendChild(novo);
});


// ===== TOGGLE VISIBILIDADE =====
const box = document.getElementById('box');
const btn = document.getElementById('toggleBtn');

btn.addEventListener('click', () => {
    box.classList.toggle('hidden');
    box.classList.toggle('visible');
});


// ===== CONTADOR =====
const valorEl = document.getElementById('valor');
const btnMais = document.getElementById('btnMais');
const btnMenos = document.getElementById('btnMenos');

let valor = 0;

btnMais.addEventListener('click', () => {
    valor++;
    valorEl.textContent = valor;
});

btnMenos.addEventListener('click', () => {
    valor--;
    valorEl.textContent = valor;
});


// ===== LISTA DE NOMES =====
const input = document.getElementById('nomeInput');
const btnAdicionar = document.getElementById('btnAdicionar');
const btnLimpar = document.getElementById('btnLimpar');
const lista = document.getElementById('listaNomes');

btnAdicionar.addEventListener('click', () => {
    const nome = input.value.trim();

    if (nome !== "") {
        const li = document.createElement('li');
        li.textContent = nome;
        lista.appendChild(li);
        input.value = "";
    }
});

btnLimpar.addEventListener('click', () => {
    lista.innerHTML = "";
});


// ===== MODO DARK =====
const btnDark = document.getElementById('btnDark');

btnDark.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});


// ===== REMOÇÃO SELETIVA =====
const listaRemocao = document.getElementById('listaRemocao');

listaRemocao.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-remover')) {
        const item = e.target.parentNode;
        item.style.opacity = '0';
        item.style.transform = 'translateX(-100%)';
        
        setTimeout(() => {
            item.remove();
        }, 300);
    }
});


// ===== FILTRO DE BUSCA =====
const buscaInput = document.getElementById('buscaInput');
const itensBusca = document.querySelectorAll('.item-busca');

buscaInput.addEventListener('input', () => {
    const termoBusca = buscaInput.value.toLowerCase();

    itensBusca.forEach(item => {
        const texto = item.textContent.toLowerCase();
        
        if (texto.includes(termoBusca)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});


// ===== MINI QUIZ =====
const btnFinalizarQuiz = document.getElementById('btnFinalizarQuiz');
const resultadoQuiz = document.getElementById('resultadoQuiz');

btnFinalizarQuiz.addEventListener('click', () => {
    const respostasCorretas = document.querySelectorAll('input[value="certo"]:checked');
    const totalPerguntas = 3;
    const acertos = respostasCorretas.length;

    resultadoQuiz.innerHTML = "";

    if (acertos === totalPerguntas) {
        resultadoQuiz.style.color = "green";
        resultadoQuiz.style.background = "#e6ffe6";
        resultadoQuiz.innerHTML = `🎉 <strong>Perfeito!</strong> Você acertou todas as ${totalPerguntas} perguntas! 🏆`;
    } else if (acertos >= 2) {
        resultadoQuiz.style.color = "#f39c12";
        resultadoQuiz.style.background = "#fff9e6";
        resultadoQuiz.innerHTML = `👍 <strong>Muito bem!</strong> Você acertou ${acertos} de ${totalPerguntas} perguntas!`;
    } else if (acertos === 1) {
        resultadoQuiz.style.color = "#e67e22";
        resultadoQuiz.style.background = "#ffe6d9";
        resultadoQuiz.innerHTML = `📚 Você acertou ${acertos} de ${totalPerguntas} perguntas. Continue estudando!`;
    } else {
        resultadoQuiz.style.color = "red";
        resultadoQuiz.style.background = "#ffe6e6";
        resultadoQuiz.innerHTML = `❌ Você não acertou nenhuma pergunta. Revise o conteúdo e tente novamente!`;
    }
});


// ===== SISTEMA DE ATRIBUTOS =====
let pontos = 10;
const pontosRestantesEl = document.getElementById("pontosRestantes");
const resultadoAtributos = document.getElementById("resultadoAtributos");

let atributos = {
    forca: 0,
    agi: 0,
    int: 0,
    carisma: 0,
    defesa: 0
};

const btnMaisAttr = document.querySelectorAll(".mais");
const btnMenosAttr = document.querySelectorAll(".menos");

function atualizarTela() {
    document.getElementById("forcaValor").textContent = atributos.forca;
    document.getElementById("agiValor").textContent = atributos.agi;
    document.getElementById("intValor").textContent = atributos.int;
    document.getElementById("carismaValor").textContent = atributos.carisma;
    document.getElementById("defesaValor").textContent = atributos.defesa;

    pontosRestantesEl.textContent = pontos;

    if (pontos === 0) {
        pontosRestantesEl.style.color = "#e74c3c";
    } else {
        pontosRestantesEl.style.color = "#667eea";
    }
}

btnMaisAttr.forEach(botao => {
    botao.addEventListener("click", () => {
        const atributo = botao.dataset.atributo;

        if (pontos > 0) {
            atributos[atributo]++;
            pontos--;
            atualizarTela();
        }
    });
});

btnMenosAttr.forEach(botao => {
    botao.addEventListener("click", () => {
        const atributo = botao.dataset.atributo;

        if (atributos[atributo] > 0) {
            atributos[atributo]--;
            pontos++;
            atualizarTela();
        }
    });
});

document.getElementById("confirmar").addEventListener("click", () => {
    resultadoAtributos.textContent = "";

    if (pontos > 0) {
        resultadoAtributos.style.color = "red";
        resultadoAtributos.style.background = "#ffe6e6";
        resultadoAtributos.textContent = "⚠️ Você ainda tem pontos para distribuir!";
    } else {
        resultadoAtributos.style.color = "green";
        resultadoAtributos.style.background = "#e6ffe6";
        resultadoAtributos.innerHTML =
            `✅ Distribuição completa!<br><br>
            💪 Força: ${atributos.forca}<br>
            🏃 Agilidade: ${atributos.agi}<br>
            🧠 Inteligência: ${atributos.int}<br>
            ✨ Carisma: ${atributos.carisma}<br>
            🛡️ Defesa: ${atributos.defesa}`;
    }
});

atualizarTela();