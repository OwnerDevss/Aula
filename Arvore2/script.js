document.addEventListener("DOMContentLoaded", function() {
    console.log("Página carregada. Iniciando animação das mensagens...");
    const elements = document.querySelectorAll('.fade-in');
    let timers = [];

    function sincronizarFrases() {
        console.log("Sincronizando frases...");
        elements.forEach(el => el.classList.remove('visible'));
        timers.forEach(t => clearTimeout(t));
        timers = [];
        elements.forEach(el => {
            const delay = parseInt(el.getAttribute('data-delay'), 10) || 0;
            const timer = setTimeout(() => {
                el.classList.add('visible');
                console.log('Mensagem exibida:', el.textContent.trim());
            }, delay);
            timers.push(timer);
        });
    }

    sincronizarFrases();

    const audio = document.getElementById('audio');
    if (audio) {
        audio.currentTime = 0;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log("Áudio iniciado com sucesso!");
                })
                .catch((err) => {
                    console.warn(
                        "O navegador bloqueou o autoplay do áudio ou ocorreu um erro:",
                        err
                    );
                });
        } else {
            console.log("Navegador não retornou uma promise para o play() do áudio.");
        }
    } else {
        console.warn("Elemento de áudio não encontrado!");
    }
});
