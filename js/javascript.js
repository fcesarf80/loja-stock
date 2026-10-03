// ===============================
// CARTAS 3D
// ===============================

const imagensProduto = document.querySelectorAll(".produto-imagem");

imagensProduto.forEach(imagem => {

    imagem.addEventListener("click", () => {
        // Ao clicar, mantém a carta virada para o modelo
        imagem.classList.add("virado");
    });

    imagem.addEventListener("mouseleave", () => {
        // Ao sair do produto, volta para a imagem original
        imagem.classList.remove("virado");
    });

});


// ===============================
// CARRINHO
// ===============================

let carrinhoProdutos = [];

const botoesComprar = document.querySelectorAll(".btn-comprar");
const quantidadeCarrinho = document.getElementById("quantidadeCarrinho");
const carrinho = document.getElementById("carrinho");
const btnCarrinho = document.getElementById("btnCarrinho");


// Adicionar produto
botoesComprar.forEach((botao, indice) => {

    botao.addEventListener("click", () => {

        const card = botao.closest(".card");

        const nome = card.querySelector("h2").textContent;
        const precoTexto = card.querySelector(".preco").textContent;

        const preco = parseFloat(
            precoTexto.replace("€", "").replace(",", ".").trim()
        );

        const produtoExistente = carrinhoProdutos.find(
            produto => produto.nome === nome
        );

        if (produtoExistente) {

            produtoExistente.quantidade++;

        } else {

            carrinhoProdutos.push({
                nome: nome,
                preco: preco,
                quantidade: 1
            });

        }

        atualizarQuantidade();
        mostrarMensagem(botao);
    });

});


// Atualizar número do carrinho
function atualizarQuantidade() {

    let quantidade = 0;

    carrinhoProdutos.forEach(produto => {
        quantidade += produto.quantidade;
    });

    quantidadeCarrinho.textContent = quantidade;
}


// Mostrar mensagem no botão
function mostrarMensagem(botao) {

    botao.textContent = "✓ ADICIONADO";

    setTimeout(() => {
        botao.innerHTML = "🛒 &nbsp; ADICIONAR AO CARRINHO";
    }, 1000);
}


// Mostrar / esconder carrinho
btnCarrinho.addEventListener("click", () => {

    if (carrinho.style.display === "block") {

        carrinho.style.display = "none";

    } else {

        renderizarCarrinho();

        carrinho.style.display = "block";
    }

});


// Mostrar produtos do carrinho
function renderizarCarrinho() {

    if (carrinhoProdutos.length === 0) {

        carrinho.innerHTML = `
            <h2>SEU CARRINHO</h2>
            <p>Seu carrinho está vazio.</p>
        `;

        return;
    }


    let html = `
        <h2>SEU CARRINHO</h2>
    `;

    let total = 0;


    carrinhoProdutos.forEach(produto => {

        const subtotal = produto.preco * produto.quantidade;

        total += subtotal;

        html += `
            <div class="item-carrinho">
                <div>
                    <strong>${produto.nome}</strong>
                    <p>
                        ${produto.quantidade} x € ${produto.preco.toFixed(2).replace(".", ",")}
                    </p>
                </div>

                <strong>
                    € ${subtotal.toFixed(2).replace(".", ",")}
                </strong>
            </div>
        `;
    });


    html += `
        <div class="total-carrinho">
            <span>TOTAL</span>
            <strong>€ ${total.toFixed(2).replace(".", ",")}</strong>
        </div>
    `;

    carrinho.innerHTML = html;
}