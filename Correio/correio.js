// Mensagens do Correio Elegante (adicione/remova à vontade)
const mensagens = [
    {
        destinatario: "Ana",
        mensagem: "Seu sorriso ilumina a festa inteira! ✨"
    },
    {
        destinatario: "Pedro",
        mensagem: "Dançar forró com você é pura alegria! 🔥"
    },
    {
        destinatario: "Maria",
        mensagem: "Que seu São João seja tão lindo quanto você! 💖"
    },
    {
        destinatario: "João",
        mensagem: "A melhor quadrilha é com você ao lado! 🌽"
    },
    {
        destinatario: "Para todos os forrozeiros",
        mensagem: "Feliz São João, meu povo! 🎉 Que a alegria contamine a todos!"
    }
];

let indice = 0;
let timer = null;
const INTERVALO = 5000; // milissegundos (EX: 4000 = 4s)

const mensagemBox = document.getElementById('mensagemBox');
const btnStart = document.getElementById('autoStart');
const btnStop = document.getElementById('autoStop');

function mostrarMensagem(i) {
    if(!mensagens[i]) return;
    mensagemBox.innerHTML = `
        <div class="mensagem-destinatario">Para: ${mensagens[i].destinatario}</div>
        <div class="mensagem-texto">${mensagens[i].mensagem}</div>
    `;
}

function proximaMensagem() {
    if (indice < mensagens.length - 1) {
        indice++;
        mostrarMensagem(indice);
        atualizarEstadoSetas();
    }
}

function mensagemAnterior() {
    if (indice > 0) {
        indice--;
        mostrarMensagem(indice);
        atualizarEstadoSetas();
    }
}

function iniciarAuto() {
    if (timer) return;
    timer = setInterval(() => {
        if (indice < mensagens.length - 1) {
            indice++;
            mostrarMensagem(indice);
            atualizarEstadoSetas();
        } else {
            // Volta para o início após a última mensagem
            indice = 0;
            mostrarMensagem(indice);
            atualizarEstadoSetas();
        }
    }, INTERVALO);
    btnStart.style.opacity = "0.1";
    btnStop.style.opacity = "0.7";
}

function pararAuto() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    btnStart.style.opacity = "0.7";
    btnStop.style.opacity = "0.1";
}

// Atualiza o estado das setas (bloqueia para início/fim)
function atualizarEstadoSetas() {
    // A lógica de setas não afeta a exibição do texto, então está ok assim
}

// Adiciona navegação por setas do teclado
document.addEventListener('keydown', function(e) {
    if (e.key === "ArrowRight") {
        pararAuto();
        proximaMensagem();
    } else if (e.key === "ArrowLeft") {
        pararAuto();
        mensagemAnterior();
    }
});

btnStart.addEventListener('click', iniciarAuto);
btnStop.addEventListener('click', pararAuto);

// Configuração inicial quando a página carrega
btnStart.style.opacity = "0.7";
btnStop.style.opacity = "0.1";

mostrarMensagem(indice); // Exibe a primeira mensagem
atualizarEstadoSetas(); // Atualiza o estado das setas para a primeira mensagem
iniciarAuto(); // Inicia o slideshow automático
