// Seleciona todos os slides
const slides = document.querySelectorAll('.slide');
let currentSlide = 0; // Índice do slide atual

// Botões de navegação
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

// Adiciona eventos de clique aos botões
prevButton.addEventListener('click', () => {
    changeSlide(-1); // Vai para o slide anterior
});

nextButton.addEventListener('click', () => {
    changeSlide(1); // Vai para o próximo slide
});

// Função para alternar entre os slides
function changeSlide(direction) {
    // Remove a classe 'active' do slide atual
    slides[currentSlide].classList.remove('active');
    
    // Calcula o próximo slide com base na direção (anterior ou próximo)
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    
    // Adiciona a classe 'active' ao novo slide
    slides[currentSlide].classList.add('active');
}