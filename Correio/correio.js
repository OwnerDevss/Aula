// Mensagens do Correio Elegante (adicione/remova à vontade)
const mensagens = [
    {
        destinatario: "CORREIO ELEGANTE",
        mensagem: "SUA MENSAGEM AQUI 💌"
    },
    {
        destinatario: "TESTANDO",
        mensagem: "TESTANDO A SUA MENSAGEM"
    },
    {
        destinatario: "PARA O SÃO JOÃO",
        mensagem: "Que a alegria te encontre neste arraiá! 🔥"
    },
    {
        destinatario: "DE UM ADMIRADOR(A)",
        mensagem: "Você é a estrela mais brilhante da minha noite de São João! ✨"
    }
];

let indice = 0;
let timer = null;
const INTERVALO = 5000; // milissegundos (EX: 4000 = 4s)

const mensagemBox = document.getElementById('mensagemBox');
const btnStart = document.getElementById('autoStart');
const btnStop = document.getElementById('autoStop');

function mostrarMensagem(i) {
    // Garante que o índice é válido para o array de mensagens
    if (!mensagens[i]) {
        console.warn(`Índice ${i} fora dos limites do array de mensagens.`);
        return;
    }
    mensagemBox.innerHTML = `
        <div class="mensagem-destinatario">Para: ${mensagens[i].destinatario}</div>
        <div class="mensagem-texto">${mensagens[i].mensagem}</div>
    `;
}

function proximaMensagem() {
    // Avança para a próxima mensagem ou volta para o início se for a última
    if (mensagens.length === 0) return; // Não faz nada se não houver mensagens

    if (indice < mensagens.length - 1) {
        indice++;
    } else {
        indice = 0; // Volta para a primeira mensagem
    }
    mostrarMensagem(indice);
    atualizarEstadoSetas(); // Mantido para consistência, mesmo sem setas visíveis
}

function mensagemAnterior() {
    // Volta para a mensagem anterior ou vai para o final se for a primeira
    if (mensagens.length === 0) return; // Não faz nada se não houver mensagens

    if (indice > 0) {
        indice--;
    } else {
        indice = mensagens.length - 1; // Volta para a última mensagem
    }
    mostrarMensagem(indice);
    atualizarEstadoSetas(); // Mantido para consistência, mesmo sem setas visíveis
}

function iniciarAuto() {
    if (timer) return; // Impede múltiplos timers

    // Inicia o intervalo para trocar de mensagens
    timer = setInterval(() => {
        proximaMensagem(); // Chama a função para avançar a mensagem
    }, INTERVALO);

    // Ajusta a opacidade dos botões
    btnStart.style.opacity = "0.1";
    btnStop.style.opacity = "0.7";
}

function pararAuto() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    // Ajusta a opacidade dos botões
    btnStart.style.opacity = "0.7";
    btnStop.style.opacity = "0.1";
}

// Atualiza o estado das setas (função mantida, mas pode ser expandida se adicionar setas visíveis)
function atualizarEstadoSetas() {
    // Por enquanto, esta função não faz nada visualmente, pois não há botões de seta no HTML.
    // Se adicionar botões de seta (voltar/avançar), você pode habilitá-los/desabilitá-los aqui.
}

// Adiciona navegação por setas do teclado
document.addEventListener('keydown', function(e) {
    if (e.key === "ArrowRight") {
        pararAuto(); // Para o slideshow automático ao usar as setas manuais
        proximaMensagem();
    } else if (e.key === "ArrowLeft") {
        pararAuto(); // Para o slideshow automático ao usar as setas manuais
        mensagemAnterior();
    }
});

// Adiciona os event listeners para os botões de controle
btnStart.addEventListener('click', iniciarAuto);
btnStop.addEventListener('click', pararAuto);

// Configuração inicial quando a página carrega
// Exibe a primeira mensagem (se houver)
if (mensagens.length > 0) {
    mostrarMensagem(indice);
} else {
    // Caso não haja mensagens, exibe uma mensagem padrão
    mensagemBox.innerHTML = `
        <div class="mensagem-destinatario">Ops!</div>
        <div class="mensagem-texto">Nenhuma mensagem cadastrada ainda.</div>
    `;
}

atualizarEstadoSetas(); // Atualiza o estado das setas (inicial)
iniciarAuto(); // Inicia o slideshow automático ao carregar a página
