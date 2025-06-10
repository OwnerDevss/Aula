document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.fade-in');
    const audio = document.getElementById('audio');
    let timers = [];

    function sincronizarFrases() {
        elements.forEach(el => el.classList.remove('visible'));
        timers.forEach(t => clearTimeout(t));
        timers = [];
        elements.forEach(el => {
            const delay = parseInt(el.getAttribute('data-delay'), 10) || 0;
            const timer = setTimeout(() => {
                el.classList.add('visible');
            }, delay);
            timers.push(timer);
        });
    }

    // SEMPRE mostra as frases ao carregar a página
    sincronizarFrases();

    // Tenta dar play no áudio automaticamente
    audio.currentTime = 0;
    audio.play().catch(() => {
        // Se o navegador bloquear, apenas não toca
    });
});
