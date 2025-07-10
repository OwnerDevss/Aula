document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    let currentSlideIndex = 0;

    // --- Funções de Navegação dos Slides ---

    // Função para mostrar um slide específico
    function showSlide(index) {
        // Impede a navegação se o índice for menor que 0 (antes do primeiro slide)
        if (index < 0) {
            return;
        }
        // Impede a navegação se o índice for maior ou igual ao número total de slides (depois do último slide)
        if (index >= slides.length) {
            return;
        }

        // Oculta o slide atualmente ativo
        slides[currentSlideIndex].classList.remove('active');
        // Ativa o novo slide
        slides[index].classList.add('active');
        // Atualiza o índice do slide atual
        currentSlideIndex = index;

        // Reinicia os GIFs do slide ativo para garantir que eles toquem do início
        restartGifsInCurrentSlide();

        // Lógica para o Slide 16 (Gestão Digital de Documentos)
        // Garante que a primeira aba (Documentos) esteja ativa e seu conteúdo visível ao entrar neste slide
        if (currentSlideIndex === 15) { // O slide 16 tem o índice 15 (contagem a partir de 0)
            const sidebarItems = document.querySelectorAll('.sidebar-item');
            const fileGrids = document.querySelectorAll('.file-grid');

            // Primeiro, remove a classe 'active' de todos os itens da sidebar e oculta todas as grades de arquivos
            sidebarItems.forEach(item => item.classList.remove('active'));
            fileGrids.forEach(grid => grid.classList.add('hidden'));

            // Em seguida, ativa o item 'Documentos' na sidebar
            const documentosSidebarItem = document.querySelector('.sidebar-item[data-folder="documentos"]');
            if (documentosSidebarItem) {
                documentosSidebarItem.classList.add('active');
            }

            // E mostra a grade de arquivos correspondente à pasta 'Documentos'
            const documentosFileGrid = document.getElementById('folder-documentos');
            if (documentosFileGrid) {
                documentosFileGrid.classList.remove('hidden');
            }
        }
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
    // Esses event listeners controlam o comportamento de clique nas abas do explorador
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
