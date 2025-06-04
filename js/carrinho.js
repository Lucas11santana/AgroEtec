const carrinhoBtn = document.getElementById('abrir-carrinho');
const carrinho = document.getElementById('carrinho-lateral');
const fecharCarrinho = document.getElementById('fechar-carrinho');
const overlay = document.getElementById('carrinho-overlay');
const carrinhoItens = document.getElementById('carrinho-itens');
const carrinhoTotal = document.getElementById('carrinho-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Carrega do localStorage ao iniciar
let carrinhoProdutos = [];
const salvo = localStorage.getItem('carrinhoProdutos');
if (salvo) {
    carrinhoProdutos = JSON.parse(salvo);
}

function salvarCarrinho() {
    localStorage.setItem('carrinhoProdutos', JSON.stringify(carrinhoProdutos));
}

function abrirCarrinho() {
    carrinho.classList.add('aberto');
    overlay.classList.add('ativo');
}
function fecharCarrinhoFunc() {
    carrinho.classList.remove('aberto');
    overlay.classList.remove('ativo');
}
if (carrinhoBtn) carrinhoBtn.onclick = abrirCarrinho;
if (fecharCarrinho) fecharCarrinho.onclick = fecharCarrinhoFunc;
if (overlay) overlay.onclick = fecharCarrinhoFunc;

// Adiciona produto ao carrinho
document.addEventListener('click', function(e) {
    if (e.target.closest('.add-ao-carrinho')) {
        const btn = e.target.closest('.add-ao-carrinho');
        const card = btn.closest('.produto-card');
        const id = card.getAttribute('data-id');
        const nome = card.querySelector('.produto-nome').innerText;
        const preco = parseFloat(card.querySelector('.produto-preco').innerText.replace('R$', '').replace(',', '.'));
        const img = card.querySelector('.produto-imagem').src;

        const existente = carrinhoProdutos.find(p => p.id === id);
        if (existente) {
            existente.qtd += 1;
        } else {
            carrinhoProdutos.push({ id, nome, preco, img, qtd: 1 });
        }
        renderCarrinho();
        abrirCarrinho();
    }
});

function atualizarContadorCarrinho() {
    const contador = document.getElementById('carrinho-contador');
    const totalQtd = carrinhoProdutos.reduce((soma, prod) => soma + prod.qtd, 0);
    if (contador) {
        contador.innerText = totalQtd;
        contador.style.display = totalQtd > 0 ? 'flex' : 'none';
    }
}

function renderCarrinho() {
    carrinhoItens.innerHTML = '';
    let total = 0;
    carrinhoProdutos.forEach(produto => {
        total += produto.preco * produto.qtd;
        const item = document.createElement('div');
        item.className = 'carrinho-item';
        item.innerHTML = `
            <img src="${produto.img}" alt="${produto.nome}">
            <div class="carrinho-item-info">
                <div class="carrinho-item-nome">${produto.nome}</div>
                <div class="carrinho-item-qtd">
                    <button class="menos" data-id="${produto.id}">-</button>
                    <span>${produto.qtd}</span>
                    <button class="mais" data-id="${produto.id}">+</button>
                </div>
                <div>R$ ${(produto.preco * produto.qtd).toFixed(2).replace('.', ',')}</div>
            </div>
            <button class="remover" data-id="${produto.id}" style="background:none;border:none;color:#c00;font-size:1.2rem;cursor:pointer;">&times;</button>
        `;
        carrinhoItens.appendChild(item);
    });
    carrinhoTotal.innerText = 'R$ ' + total.toFixed(2).replace('.', ',');
    // Eventos de quantidade/remover
    carrinhoItens.querySelectorAll('.menos').forEach(btn => {
        btn.onclick = () => {
            const prod = carrinhoProdutos.find(p => p.id === btn.dataset.id);
            if (prod.qtd > 1) prod.qtd--;
            else carrinhoProdutos = carrinhoProdutos.filter(p => p.id !== btn.dataset.id);
            renderCarrinho();
        }
    });
    carrinhoItens.querySelectorAll('.mais').forEach(btn => {
        btn.onclick = () => {
            const prod = carrinhoProdutos.find(p => p.id === btn.dataset.id);
            prod.qtd++;
            renderCarrinho();
        }
    });
    carrinhoItens.querySelectorAll('.remover').forEach(btn => {
        btn.onclick = () => {
            carrinhoProdutos = carrinhoProdutos.filter(p => p.id !== btn.dataset.id);
            renderCarrinho();
        }
    });
    atualizarContadorCarrinho();
    salvarCarrinho(); // Salva sempre que renderiza
}

// Exemplo de ação do checkout
if (checkoutBtn) {
    checkoutBtn.onclick = () => {
        if (carrinhoProdutos.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        window.location.href = './views/checkout.html'; // Crie essa página se desejar
    };
}

// Atualiza o contador e carrinho ao carregar a página
renderCarrinho();