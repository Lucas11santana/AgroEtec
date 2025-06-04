const produtos = [
    {
        id: 1,
        nome: "Morango (250g)",
        preco: 8.99,
        categoria: "Frutas",
        imagem: "../img/morangos.jpg",
        oferta: true,
        desconto: 15
    },
    {
        id: 2,
        nome: "Alface Crespa",
        preco: 3.50,
        categoria: "Hortaliças",
        imagem: "../img/alface.jpg",
        oferta: false,
        desconto: 0
    },
    {
        id: 3,
        nome: "Cenoura (1kg)",
        preco: 5.20,
        categoria: "Hortaliças",
        imagem: "../img/cenoura.jpg",
        oferta: true,
        desconto: 10
    }
];

function renderizarProdutos(lista) {
    const container = document.getElementById('produtos-lista');
    container.innerHTML = '';
    if (lista.length === 0) {
        container.innerHTML = '<p>Nenhum produto encontrado.</p>';
        return;
    }
    lista.forEach(produto => {
        container.innerHTML += `
            <div class="produto-card" data-id="${produto.id}">
                <div class="produto-imagem-container">
                    <img src="${produto.imagem}" alt="${produto.nome}" class="produto-imagem" />
                    ${produto.oferta ? `<span class="oferta-badge">Oferta</span>` : ''}
                    ${produto.desconto ? `<span class="desconto">-${produto.desconto}%</span>` : ''}
                    <a class="heart" href="#">
                        <i class="fa-regular fa-heart"></i>
                        <i class="fa-solid fa-heart filled"></i>
                    </a>
                </div>
                <div class="produto-info">
                    <a class="produto-categoria" href="#">${produto.categoria}</a>
                    <h3 class="produto-nome">${produto.nome}</h3>
                    <span class="produto-preco">R$ ${produto.preco.toFixed(2).replace('.', ',')}</span>
                    <button class="add-ao-carrinho">
                        <span>Comprar</span>
                        <img src="../img/shopping-bag-white-icon.png" alt="Carrinho" />
                    </button>
                </div>
            </div>
        `;
    });
}

function filtrarProdutos(e) {
    e.preventDefault();
    const categorias = Array.from(document.querySelectorAll('input[name="categoria"]:checked')).map(cb => cb.value);
    const precoMin = parseFloat(document.querySelector('input[name="preco-min"]').value) || 0;
    const precoMax = parseFloat(document.querySelector('input[name="preco-max"]').value) || Infinity;

    const filtrados = produtos.filter(produto => {
        const categoriaOk = categorias.length === 0 || categorias.includes(produto.categoria);
        const precoOk = produto.preco >= precoMin && produto.preco <= precoMax;
        return categoriaOk && precoOk;
    });
    renderizarProdutos(filtrados);
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos(produtos);
    document.getElementById('filtros-form').addEventListener('submit', filtrarProdutos);
});