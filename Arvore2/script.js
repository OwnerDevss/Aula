document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.fade-in');
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

    sincronizarFrases();

    // Áudio: tenta tocar, mas não trava nada se não tocar
    const audio = document.getElementById('audio');
    if(audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
    }
});
