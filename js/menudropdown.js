document.addEventListener('DOMContentLoaded', function () {
    // ...existing code para dropdown...

    // Botão Filtrar
    document.getElementById('btn-filtrar').addEventListener('click', function () {
        const categoria = document.querySelector('#dropdown-categorias a.active')?.dataset.categoria || '';
        const precoMin = parseFloat(document.getElementById('preco-min').value) || 0;
        const precoMax = parseFloat(document.getElementById('preco-max').value) || Infinity;
        const classificacao = document.querySelector('#dropdown-classificacao a.active')?.dataset.classificacao || 'oferta';

        let cards = Array.from(document.querySelectorAll('.produto-card'));

        // Filtro categoria e preço
        cards.forEach(card => {
            let show = true;
            if (categoria && card.dataset.categoria !== categoria) show = false;
            const preco = parseFloat(card.dataset.preco);
            if (!isNaN(preco)) {
                if (preco < precoMin || preco > precoMax) show = false;
            }
            card.style.display = show ? '' : 'none';
        });

        // Ordenação
        let visiveis = cards.filter(card => card.style.display !== 'none');
        if (classificacao === 'preco-asc') {
            visiveis.sort((a, b) => parseFloat(a.dataset.preco) - parseFloat(b.dataset.preco));
        } else if (classificacao === 'preco-desc') {
            visiveis.sort((a, b) => parseFloat(b.dataset.preco) - parseFloat(a.dataset.preco));
        } else if (classificacao === 'nome-az') {
            visiveis.sort((a, b) => a.dataset.nome.localeCompare(b.dataset.nome));
        } else if (classificacao === 'nome-za') {
            visiveis.sort((a, b) => b.dataset.nome.localeCompare(a.dataset.nome));
        } else if (classificacao === 'oferta') {
            // Ordena para mostrar primeiro os produtos com span .oferta-badge visível
            visiveis.sort((a, b) => {
                const aOferta = a.querySelector('.oferta-badge') ? 1 : 0;
                const bOferta = b.querySelector('.oferta-badge') ? 1 : 0;
                return bOferta - aOferta; // Produtos em oferta primeiro
            });
        }
        // Reordena no DOM
        const container = document.querySelector('.Conteiner-produtos');
        visiveis.forEach(card => container.appendChild(card));
    });
});