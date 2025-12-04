// ===== MODO DARK =====
const btnDark = document.getElementById('btnDark');
btnDark.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});


// ===== 1. LISTA DE TAREFAS COM PERSISTÊNCIA =====
const tarefaInput = document.getElementById('tarefaInput');
const btnAdicionarTarefa = document.getElementById('btnAdicionarTarefa');
const btnLimparTarefas = document.getElementById('btnLimparTarefas');
const listaTarefas = document.getElementById('listaTarefas');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function renderizarTarefas() {
    listaTarefas.innerHTML = '';
    tarefas.forEach((tarefa, index) => {
        const li = document.createElement('li');
        li.className = tarefa.completa ? 'tarefa-completa' : '';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox-tarefa';
        checkbox.checked = tarefa.completa;
        checkbox.addEventListener('change', () => {
            tarefa.completa = !tarefa.completa;
            salvarTarefas();
            renderizarTarefas();
        });

        const span = document.createElement('span');
        span.textContent = tarefa.texto;

        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.className = 'btn-remover';
        btnRemover.addEventListener('click', () => {
            tarefas.splice(index, 1);
            salvarTarefas();
            renderizarTarefas();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(btnRemover);
        listaTarefas.appendChild(li);
    });
}

btnAdicionarTarefa.addEventListener('click', () => {
    const texto = tarefaInput.value.trim();
    if (texto !== '') {
        tarefas.push({ texto, completa: false });
        salvarTarefas();
        renderizarTarefas();
        tarefaInput.value = '';
    }
});

tarefaInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btnAdicionarTarefa.click();
    }
});

btnLimparTarefas.addEventListener('click', () => {
    if (confirm('Deseja realmente limpar todas as tarefas?')) {
        tarefas = [];
        salvarTarefas();
        renderizarTarefas();
    }
});

// Carregar tarefas ao iniciar
renderizarTarefas();


// ===== 2. CONTADOR COM PLAY/PAUSE/RESET =====
let seconds = 0;
let intervalId = null;
let isRunning = false;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');

function updateDisplay() {
    display.textContent = seconds;
}

function toggleStartPause() {
    if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
        startPauseBtn.textContent = 'Start';
    } else {
        intervalId = setInterval(() => {
            seconds++;
            updateDisplay();
        }, 1000);
        isRunning = true;
        startPauseBtn.textContent = 'Pause';
    }
}

function reset() {
    clearInterval(intervalId);
    isRunning = false;
    seconds = 0;
    updateDisplay();
    startPauseBtn.textContent = 'Start';
}

startPauseBtn.addEventListener('click', toggleStartPause);
resetBtn.addEventListener('click', reset);


// ===== 3. SISTEMA DE CADASTRO =====
const nomeAluno = document.getElementById('nomeAluno');
const idadeAluno = document.getElementById('idadeAluno');
const btnCadastrar = document.getElementById('btnCadastrar');
const listaAlunos = document.getElementById('listaAlunos');

let alunos = [];

function renderizarAlunos() {
    listaAlunos.innerHTML = '';
    alunos.forEach((aluno, index) => {
        const div = document.createElement('div');
        div.className = 'cadastro-item';
        
        const info = document.createElement('span');
        info.textContent = `${aluno.nome} - ${aluno.idade} anos`;
        
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.className = 'btn-remover';
        btnExcluir.addEventListener('click', () => {
            alunos = alunos.filter((_, i) => i !== index);
            renderizarAlunos();
        });

        div.appendChild(info);
        div.appendChild(btnExcluir);
        listaAlunos.appendChild(div);
    });
}

btnCadastrar.addEventListener('click', () => {
    const nome = nomeAluno.value.trim();
    const idade = parseInt(idadeAluno.value);

    if (nome !== '' && idade > 0) {
        alunos.push({ nome, idade });
        renderizarAlunos();
        nomeAluno.value = '';
        idadeAluno.value = '';
    }
});

nomeAluno.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btnCadastrar.click();
    }
});

idadeAluno.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btnCadastrar.click();
    }
});


// ===== 4. GALERIA COM TROCA AUTOMÁTICA =====
const imagemPrincipal = document.getElementById('imagemPrincipal');
const thumbnails = document.querySelectorAll('.thumbnail');
const btnPauseGaleria = document.getElementById('btnPauseGaleria');

let galeriaInterval = null;
let galeriaAtiva = true;
let indiceAtual = 0;

function trocarImagem(index) {
    indiceAtual = index;
    imagemPrincipal.src = thumbnails[index].src;
    
    thumbnails.forEach(thumb => thumb.classList.remove('ativa'));
    thumbnails[index].classList.add('ativa');
}

function proximaImagem() {
    indiceAtual = (indiceAtual + 1) % thumbnails.length;
    trocarImagem(indiceAtual);
}

thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        trocarImagem(index);
    });
});

btnPauseGaleria.addEventListener('click', () => {
    if (galeriaAtiva) {
        clearInterval(galeriaInterval);
        btnPauseGaleria.textContent = 'Retomar Auto-Troca';
        galeriaAtiva = false;
    } else {
        galeriaInterval = setInterval(proximaImagem, 3000);
        btnPauseGaleria.textContent = 'Pausar Auto-Troca';
        galeriaAtiva = true;
    }
});

// Iniciar troca automática
galeriaInterval = setInterval(proximaImagem, 3000);


// ===== 5. QUIZ COM PONTUAÇÃO =====
const perguntas = [
    {
        pergunta: "Qual método é usado para adicionar um elemento ao final de um array?",
        opcoes: ["push()", "pop()", "shift()", "unshift()"],
        correta: 0
    },
    {
        pergunta: "O que significa DOM?",
        opcoes: ["Data Object Model", "Document Object Model", "Digital Online Method", "Direct Object Manipulation"],
        correta: 1
    },
    {
        pergunta: "Qual é o operador de igualdade estrita em JavaScript?",
        opcoes: ["==", "!=", "===", "!=="],
        correta: 2
    },
    {
        pergunta: "Qual método é usado para remover o último elemento de um array?",
        opcoes: ["shift()", "pop()", "slice()", "splice()"],
        correta: 1
    },
    {
        pergunta: "Como declaramos uma constante em JavaScript?",
        opcoes: ["var", "let", "const", "define"],
        correta: 2
    }
];

const quizContainer = document.getElementById('quizContainer');
const btnFinalizarQuiz = document.getElementById('btnFinalizarQuiz');
const resultadoQuiz = document.getElementById('resultadoQuiz');

function renderizarQuiz() {
    quizContainer.innerHTML = '';
    perguntas.forEach((pergunta, index) => {
        const divPergunta = document.createElement('div');
        divPergunta.className = 'quiz-pergunta';
        
        const titulo = document.createElement('h3');
        titulo.textContent = `${index + 1}. ${pergunta.pergunta}`;
        divPergunta.appendChild(titulo);

        pergunta.opcoes.forEach((opcao, opcaoIndex) => {
            const label = document.createElement('label');
            label.className = 'quiz-opcao';
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `pergunta${index}`;
            radio.value = opcaoIndex;
            
            label.appendChild(radio);
            label.appendChild(document.createTextNode(opcao));
            divPergunta.appendChild(label);
        });

        quizContainer.appendChild(divPergunta);
    });
}

btnFinalizarQuiz.addEventListener('click', () => {
    let pontuacao = 0;
    
    perguntas.forEach((pergunta, index) => {
        const selecionada = document.querySelector(`input[name="pergunta${index}"]:checked`);
        if (selecionada && parseInt(selecionada.value) === pergunta.correta) {
            pontuacao++;
        }
    });

    resultadoQuiz.innerHTML = '';
    
    if (pontuacao === 5) {
        resultadoQuiz.style.background = '#d4edda';
        resultadoQuiz.style.color = '#155724';
        resultadoQuiz.innerHTML = `🏆 <strong>EXCELENTE!</strong> Você acertou todas as ${perguntas.length} perguntas!`;
    } else if (pontuacao >= 3) {
        resultadoQuiz.style.background = '#fff3cd';
        resultadoQuiz.style.color = '#856404';
        resultadoQuiz.innerHTML = `👍 <strong>BOM!</strong> Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;
    } else {
        resultadoQuiz.style.background = '#f8d7da';
        resultadoQuiz.style.color = '#721c24';
        resultadoQuiz.innerHTML = `📚 <strong>ESTUDE MAIS!</strong> Você acertou apenas ${pontuacao} de ${perguntas.length} perguntas.`;
    }
});

// Renderizar quiz ao carregar
renderizarQuiz();