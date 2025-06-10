const ground = document.getElementById('ground');
const tree = document.getElementById('tree');
const flowers = document.getElementById('flowers');
const rain = document.getElementById('rain');
const invite = document.getElementById('invite');
const hint = document.getElementById('hint');

let activated = false;

function createRainDrops() {
    rain.innerHTML = '';
    for (let i = 0; i < 60; i++) {
        const drop = document.createElement('div');
        drop.className = 'drop';
        drop.style.left = `${Math.random() * 100}vw`;
        drop.style.animationDuration = `${0.8 + Math.random() * 0.6}s`;
        rain.appendChild(drop);
    }
}

ground.addEventListener('click', () => {
    if (activated) return;
    activated = true;
    createRainDrops();
    rain.classList.add('active');
    hint.style.display = 'none';

    // Crescimento da árvore e flores
    setTimeout(() => {
        tree.classList.add('grow');
    }, 1300);

    setTimeout(() => {
        flowers.classList.add('bloom');
    }, 2300);

    // Aparece o convite e para a chuva
    setTimeout(() => {
        invite.classList.add('show');
        rain.classList.remove('active');
    }, 4200);
});