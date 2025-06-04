document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("favoritos-container");
    const urlParams = new URLSearchParams(window.location.search);
    const page = window.location.pathname; // Identifica a página atual

    // Se estivermos na página de favoritos
    if (page.includes("favoritos.html")) {
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

        if (favoritos.length === 0) {
            container.innerHTML = "<p style='text-align:center;'>Nenhum produto favoritado ainda.</p>";
            return;
        }

        favoritos.forEach(produto => {
            const imagemCorrigida = produto.imagem.startsWith(".") ? `../${produto.imagem}` : produto.imagem;

            const card = document.createElement("div");
            card.classList.add("produto-card");
            card.setAttribute("data-id", produto.id);

            card.innerHTML = `
                <div class="produto-imagem-container">
                    <img src="${imagemCorrigida}" alt="${produto.nome}" class="produto-imagem">
                    <a href="#" class="remover-fav" data-id="${produto.id}" title="Remover dos favoritos">
                        <i class="fa-solid fa-heart " style="color:#d9534f; font-size:1.2rem;"></i>
                    </a>
                </div>
                <p class="produto-nome">${produto.nome}</p>
                <div class="preco-add">
                    <p class="produto-preco">${produto.preco}</p>
                    <button class="add-ao-carrinho">
                        <span>Comprar</span>
                        <a href="#"><img src="../img/shopping-bag-white-icon.png" alt="carrinho"></a>
                    </button>
                </div>
            `;

            container.appendChild(card);
        });

        // Remover dos favoritos
        container.addEventListener("click", e => {
            if (e.target.closest(".remover-fav")) {
                e.preventDefault();
                const id = e.target.closest(".remover-fav").getAttribute("data-id");

                favoritos = favoritos.filter(p => p.id !== id);
                localStorage.setItem("favoritos", JSON.stringify(favoritos));

                const card = e.target.closest(".produto-card");
                card.remove();

                if (favoritos.length === 0) {
                    container.innerHTML = "<p style='text-align:center;'>Nenhum produto favoritado ainda.</p>";
                }
            }
        });

        // Adicionar ao carrinho (aqui só com um alert de exemplo)
        container.addEventListener("click", e => {
            if (e.target.closest(".add-ao-carrinho")) {
                const card = e.target.closest(".produto-card");
                const nome = card.querySelector(".produto-nome").textContent;
                alert(`Produto "${nome}" adicionado ao carrinho!`);
            }
        });
    }

    // Se estivermos na página principal
    else if (page.includes("main.html")) {
        const produtoCards = document.querySelectorAll('.produto-card');

        produtoCards.forEach(card => {
            const heart = card.querySelector('.heart');
            const produtoId = card.getAttribute('data-id');

            let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
            const produtoFavorito = favoritos.find(p => p.id === produtoId);

            if (produtoFavorito) {
                heart.classList.add("favoritado");
            }

            heart.addEventListener('click', function (e) {
                e.preventDefault();

                const produtoNome = card.querySelector('.produto-nome').textContent;
                const produtoPreco = card.querySelector('.produto-preco').textContent;
                const produtoImagem = card.querySelector('img').src;

                favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
                const produtoExistente = favoritos.find(p => p.id === produtoId);

                if (!produtoExistente) {
                    favoritos.push({
                        id: produtoId,
                        nome: produtoNome,
                        preco: produtoPreco,
                        imagem: produtoImagem
                    });
                    heart.classList.add("favoritado");
                    localStorage.setItem("favoritos", JSON.stringify(favoritos));
                    
                } else {
                    favoritos = favoritos.filter(p => p.id !== produtoId);
                    heart.classList.remove("favoritado");
                    localStorage.setItem("favoritos", JSON.stringify(favoritos));
                    
                }
            });
        });
    }
});
