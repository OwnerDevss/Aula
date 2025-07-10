document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    let currentSlideIndex = 0;

    // --- Funções de Navegação dos Slides ---

    // Função para mostrar um slide específico
    function showSlide(index) {
        // Garante que o índice esteja dentro dos limites dos slides
        if (index < 0) {
            index = slides.length - 1; // Volta para o último slide se for o primeiro e o usuário tentar ir para trás
        } else if (index >= slides.length) {
            index = 0; // Vai para o primeiro slide se for o último e o usuário tentar ir para frente
        }

        // Oculta o slide atualmente ativo
        slides[currentSlideIndex].classList.remove('active');
        // Ativa o novo slide
        slides[index].classList.add('active');
        // Atualiza o índice do slide atual
        currentSlideIndex = index;

        // Reinicia os GIFs do slide ativo para garantir que eles toquem do início
        restartGifsInCurrentSlide();
    }

    // Função para reiniciar os GIFs no slide atualmente visível
    function restartGifsInCurrentSlide() {
        const activeSlide = slides[currentSlideIndex];
        // Seleciona todas as tags <img> cujo atributo 'src' termina com '.gif' dentro do slide ativo
        const gifs = activeSlide.querySelectorAll('img[src$=".gif"]');

        gifs.forEach(gif => {
            const originalSrc = gif.src;
            // Limpa o src temporariamente para forçar o navegador a recarregar o GIF
            gif.src = '';
            // Restaura o src original para que o GIF comece a tocar do início
            gif.src = originalSrc;
        });
    }

    // --- Lógica para Simulação do Explorer de Documentos (Slide 16) ---

    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const fileGrids = document.querySelectorAll('.file-grid');

    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove a classe 'active' de todos os itens da sidebar
            sidebarItems.forEach(sItem => sItem.classList.remove('active'));
            // Adiciona a classe 'active' ao item clicado
            item.classList.add('active');

            const targetFolder = item.dataset.folder; // Obtém o nome da pasta do atributo data-folder

            // Oculta todas as grades de arquivos
            fileGrids.forEach(grid => grid.classList.add('hidden'));
            // Exibe a grade de arquivos correspondente à pasta clicada
            document.getElementById(`folder-${targetFolder}`).classList.remove('hidden');
        });
    });

    // --- Inicialização e Event Listeners Globais ---

    // Adiciona event listeners para navegação usando as setas do teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { // Seta para a direita: avança para o próximo slide
            showSlide(currentSlideIndex + 1);
        } else if (e.key === 'ArrowLeft') { // Seta para a esquerda: volta para o slide anterior
            showSlide(currentSlideIndex - 1);
        }
    });

    // Garante que o primeiro slide esteja visível e seus GIFs reiniciados ao carregar a página
    showSlide(0); // Chame showSlide com 0 para garantir que o primeiro slide seja configurado corretamente
});