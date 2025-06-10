document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.fade-in');
    const telaInicial = document.getElementById('tela-inicial');
    const convite = document.getElementById('convite');
    const audio = document.getElementById('audio');
    const btnEntrar = document.getElementById('btn-entrar');
    const iconeInterativo = document.querySelector('.icone-interativo');

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

    function iniciarConvite() {
        telaInicial.style.display = "none";
        convite.style.display = "block";
        sincronizarFrases();
        if(audio) {
            audio.currentTime = 0;
            audio.play().catch(() => {
                // Se não tocar, não há problema
            });
        }
    }

    // Usuário pode clicar no botão ou no SVG
    btnEntrar.addEventListener('click', iniciarConvite);
    iconeInterativo.addEventListener('click', iniciarConvite);

    // Para acessibilidade: enter barra de espaço ativa também
    btnEntrar.addEventListener('keyup', function(e) {
        if(e.key === "Enter" || e.key === " ") iniciarConvite();
    });
    iconeInterativo.addEventListener('keyup', function(e) {
        if(e.key === "Enter" || e.key === " ") iniciarConvite();
    });
});