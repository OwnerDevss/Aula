// Habilitando o arrastar e soltar
document.querySelectorAll('.draggable').forEach(item => {
    item.addEventListener('dragstart', event => {
        event.dataTransfer.setData('text/plain', event.target.dataset.value);
    });
});

document.querySelectorAll('.dropzone').forEach(zone => {
    zone.addEventListener('dragover', event => {
        event.preventDefault();
    });

    zone.addEventListener('drop', event => {
        event.preventDefault();
        const value = event.dataTransfer.getData('text/plain');
        const correctAnswer = zone.getAttribute('data-answer');

        // Permitir apenas valores corretos
        if (value === correctAnswer) {
            zone.textContent = value;
            zone.style.backgroundColor = '#22c55e';
            zone.style.color = '#ffffff';
            checkCompletion();
        } else {
            alert('❌ Resposta incorreta. Tente novamente!');
        }
    });
});

function checkCompletion() {
    const allZones = document.querySelectorAll('.dropzone');
    let allFilled = true;

    allZones.forEach(zone => {
        if (zone.textContent.trim() === '') {
            allFilled = false;
        }
    });

    if (allFilled) {
        const nome = document.querySelector('[data-answer="João"]').textContent.trim();
        const idade = document.querySelector('[data-answer="30"]').textContent.trim();
        document.getElementById('result').textContent = `${nome} tem ${idade} anos.`;
    }
}