// Mensagens do Correio Elegante (adicione/remova à vontade)
const mensagens = [
    {
        destinatario: "CORREIO ELEGANTE",
        mensagem: "SUA MENSAGEM AQUI 💌" // Apenas uma mensagem placeholder
    },
    {
        destinatario: "CORREIO ELEGANTE!!",
        mensagem: "SUA MENSAGEM AQUI !!💌" // Apenas uma mensagem placeholder
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
    // Com apenas uma mensagem, esta função não fará nada visível,
    // pois não há uma próxima mensagem para ir.
    if (indice < mensagens.length - 1) {
        indice++;
        mostrarMensagem(indice);
        atualizarEstadoSetas();
    }
}

function mensagemAnterior() {
    // Com apenas uma mensagem, esta função não fará nada visível,
    // pois não há uma mensagem anterior para ir.
    if (indice > 0) {
        indice--;
        mostrarMensagem(indice);
        atualizarEstadoSetas();
    }
}

function iniciarAuto() {
    // Se há apenas uma mensagem, o loop automático não terá para onde avançar.
    // Ele vai tentar ir para 'indice = 1', que não existe, e parar.
    // Para uma única mensagem, o `setInterval` não é muito útil para transição.
    // Se quiser que ele 'reexiba' a mesma mensagem, pode ajustar aqui,
    // mas para uma só, não há transição de fato.
    if (timer) return;
    timer = setInterval(() => {
        // Se houver apenas 1 mensagem, indice sempre será 0 e (mensagens.length - 1) também será 0.
        // A condição `indice < mensagens.length - 1` sempre será falsa.
        // Portanto, o `else` será executado imediatamente no primeiro tick.
        // E como `indice = 0` já é a mensagem atual, não haverá mudança visível.
        if (indice < mensagens.length - 1) {
            indice++;
            mostrarMensagem(indice);
            atualizarEstadoSetas();
        } else {
            // Volta para o início após a última mensagem (que é a única, neste caso)
            indice = 0;
            mostrarMensagem(indice);
            atualizarEstadoSetas();
            // Se você quiser que o auto-play pare completamente após exibir a única mensagem,
            // descomente a linha abaixo e remova as duas linhas acima (`indice = 0; mostrarMensagem(indice);`).
            // pararAuto();
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
    // Nenhuma mudança visual para setas com apenas 1 mensagem.
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

mostrarMensagem(indice); // Exibe a primeira (e única) mensagem
atualizarEstadoSetas(); // Atualiza o estado das setas
iniciarAuto(); // Inicia o "slideshow" automático (que vai exibir a mesma mensagem repetidamente, ou parar)
