document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    let currentSlideIndex = 0;

    // =================================================================
    //  --- Funções de Navegação dos Slides ---
    // =================================================================

    function showSlide(index) {
        // Encontra o índice do slide atual com a classe 'active'
        const currentActiveSlide = document.querySelector('.slide.active');
        if (currentActiveSlide) {
            currentActiveSlide.classList.remove('active');
        }

        // Garante que o índice não saia dos limites
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }

        // Adiciona a classe 'active' ao novo slide
        slides[index].classList.add('active');
        currentSlideIndex = index;
        
        restartGifsInCurrentSlide();
        initializeSlide(currentSlideIndex);
    }

    function restartGifsInCurrentSlide() {
        const activeSlide = slides[currentSlideIndex];
        const gifs = activeSlide.querySelectorAll('img[src$=".gif"]');

        gifs.forEach(gif => {
            const originalSrc = gif.src;
            gif.src = '';
            gif.src = originalSrc;
        });
    }
    
    // =================================================================
    //  --- Lógica para Inicializar Cada Slide Específico ---
    // =================================================================

    function initializeSlide(index) {
        // Slide de Explorador de Documentos
        if (slides[index].id === 'slide-17') {
            const sidebarItems = document.querySelectorAll('#slide-17 .sidebar-item');
            const fileGrids = document.querySelectorAll('#slide-17 .file-grid');

            // Reseta para a pasta "Documentos"
            sidebarItems.forEach(item => item.classList.remove('active'));
            fileGrids.forEach(grid => grid.classList.add('hidden'));

            const documentosSidebarItem = document.querySelector('#slide-17 .sidebar-item[data-folder="documentos"]');
            if (documentosSidebarItem) {
                documentosSidebarItem.classList.add('active');
            }

            const documentosFileGrid = document.getElementById('folder-documentos');
            if (documentosFileGrid) {
                documentosFileGrid.classList.remove('hidden');
            }
        }
        
        // Slide de WMS
        if (slides[index].id === 'slide-wms-demo') {
            initWMSDemo();
        }

        // Slide de FIFO/LIFO
        if (slides[index].id === 'slide-fifo-demo') {
            initFIFOLIFODemo();
        }
    }

    // =================================================================
    //  --- Lógica do Explorador de Documentos (Slide 17) ---
    // =================================================================

    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const fileGrids = document.querySelectorAll('.file-grid');

    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            if (slides[currentSlideIndex].id !== 'slide-17') return;

            sidebarItems.forEach(sItem => sItem.classList.remove('active'));
            item.classList.add('active');

            const targetFolder = item.dataset.folder;
            fileGrids.forEach(grid => grid.classList.add('hidden'));
            document.getElementById(`folder-${targetFolder}`).classList.remove('hidden');
        });
    });

    const trackingFileItems = document.querySelectorAll('.file-item.file-rastreio');
    const FICTITIOUS_TRACKING_CODE = "BR123456789XX";

    trackingFileItems.forEach(item => {
        item.addEventListener('click', async () => {
            if (slides[currentSlideIndex].id !== 'slide-17') return;
            const trackingCodeToCopy = FICTITIOUS_TRACKING_CODE;

            try {
                await navigator.clipboard.writeText(trackingCodeToCopy);
                alert(`Código de rastreio "${trackingCodeToCopy}" copiado para a área de transferência!`);
            } catch (err) {
                console.error('Falha ao copiar o texto: ', err);
                alert('Não foi possível copiar o código de rastreio. Por favor, tente copiar manualmente: ' + trackingCodeToCopy);
            }
        });
    });
    
   // =================================================================
//  --- Simulação de WMS Interativo (Novo Slide) ---
// =================================================================

const initWMSDemo = () => {
    const pallets = document.querySelectorAll('#slide-wms-demo .pallet');
    const tooltip = document.getElementById('wms-tooltip');

    pallets.forEach(pallet => {
        pallet.addEventListener('mouseover', () => {
            const productName = pallet.dataset.productName;
            const location = pallet.dataset.location;
            
            tooltip.innerHTML = `
                <strong>Produto:</strong> ${productName}<br>
                <strong>Local:</strong> ${location}
            `;
            tooltip.classList.remove('hidden');

            // Posiciona o tooltip dinamicamente
            const palletRect = pallet.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            tooltip.style.left = (palletRect.left + palletRect.width / 2) - (tooltipRect.width / 2) + 'px';
            tooltip.style.top = palletRect.top - tooltipRect.height - 15 + 'px'; // 15px de margem
        });
        
        pallet.addEventListener('mouseout', () => {
            tooltip.classList.add('hidden');
        });
    });
};


    // =================================================================
    //  --- Demonstração FIFO/LIFO Interativa (Novo Slide) ---
    // =================================================================

    const initFIFOLIFODemo = () => {
        const boxStack = document.querySelector('#slide-fifo-demo .box-stack');
        const addBoxBtn = document.getElementById('add-box-btn');
        const removeFifoBtn = document.getElementById('remove-fifo-btn');
        const removeLifoBtn = document.getElementById('remove-lifo-btn');
        const logList = document.getElementById('log-list');

        let boxCounter = 0;
        const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#34495e'];

        // Limpa o estado anterior caso o slide seja revisitado
        if (boxStack) boxStack.innerHTML = '';
        if (logList) logList.innerHTML = '';
        boxCounter = 0;

        const addLog = (message, type) => {
            const li = document.createElement('li');
            li.textContent = message;
            li.classList.add(type);
            logList.prepend(li);
        };

        const addBox = () => {
            boxCounter++;
            const box = document.createElement('div');
            box.classList.add('box');
            box.textContent = `Produto #${boxCounter}`;
            box.style.backgroundColor = colors[(boxCounter - 1) % colors.length];
            
            // Adiciona a caixa ao final da pilha (visualmente o topo)
            boxStack.appendChild(box);
            addLog(`Adicionado: Produto #${boxCounter}`, 'add');
        };

        const removeBoxFIFO = () => {
            // Remove o primeiro elemento (FIFO)
            if (boxStack.children.length > 0) {
                const box = boxStack.children[0];
                const boxName = box.textContent;
                box.remove();
                addLog(`Removido (FIFO): ${boxName}`, 'remove-fifo');
            } else {
                addLog('O estoque está vazio!', 'error');
            }
        };

        const removeBoxLIFO = () => {
            // Remove o último elemento (LIFO)
            if (boxStack.children.length > 0) {
                const box = boxStack.lastChild;
                const boxName = box.textContent;
                box.remove();
                addLog(`Removido (LIFO): ${boxName}`, 'remove-lifo');
            } else {
                addLog('O estoque está vazio!', 'error');
            }
        };

        if (addBoxBtn) addBoxBtn.onclick = addBox;
        if (removeFifoBtn) removeFifoBtn.onclick = removeBoxFIFO;
        if (removeLifoBtn) removeLifoBtn.onclick = removeBoxLIFO;
    };
    
    // =================================================================
    //  --- Inicialização e Event Listeners Globais ---
    // =================================================================

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            showSlide(currentSlideIndex + 1);
        } else if (e.key === 'ArrowLeft') {
            showSlide(currentSlideIndex - 1);
        }
    });

    showSlide(0); // Começa no primeiro slide e inicializa o seu conteúdo
});