
window.onload = carrinho // Traz todos dados armazenados no localStorage com nome "carrinho" da home, onde os dados da compra foram armzazenados


function getCarrinho() { // Lê o carrinho direto do localStorage para sempre usar o estado mais recente.

    return JSON.parse(localStorage.getItem("carrinho")) || [] // Se não existir nada salvo, cria um array vazio

}


function renderCarrinho() { // Renderiza os itens do carrinho e recalcula o total com base na quantidade atual.

    const produtos = getCarrinho() // Pega o array do carrinho e salva os dados na variável produtos.

    const listaProdutos = document.querySelector(".listaProdutos") // Pega a div onde os produtos serão exibidos através do querySelector

    // Se não houver lista, encerra a função para evitar erro.
    if (!listaProdutos) return

    let totalPrecoCarrinho = 0

    // Soma o total do carrinho usando o preço e a quantidade em tempo real.
    produtos.forEach(produto => {
        totalPrecoCarrinho += Number(produto.preco || 0) * Number(produto.quantidade || 0)
    })

    // Cria o HTML dos produtos com preço unitário e total individual calculados dinamicamente.
    listaProdutos.innerHTML = produtos.map(produto => {
        const precoTotal = Number(produto.preco || 0) * Number(produto.quantidade || 0)

        return `
            <div class="imagin">
                <div class="fundoPro">
                    <img src="${produto.imgProduto}" class="fotoPro">

                    <div class="hiscrita">
                        <p class="nomeProduto pe">
                            Nome: ${produto.nome}
                        </p>

                        <div class="inputin">
                            <p class="preco pe">Quantidade: </p>

                            <button onclick="subQtd(this)" class="subQtd menos">-</button>

                            <input class="qtd"
                                type="number"
                                value="${produto.quantidade}"
                                onchange="atualizarQuantidade('${produto.nome}', this)">

                            <button onclick="addQtd(this)" class="addQtd mais">+</button>
                        </div>

                        <p class="preco pe">
                            Preço Unitário: ${Number(produto.preco).toFixed(2)} R$
                        </p>

                        <p class="preco pe">
                            Preço Total: ${precoTotal.toFixed(2)} R$
                        </p>

                        <button onclick="limparProduto(this, '${produto.nome}')" class="removerItem">
                            Remover Item
                        </button>
                    </div>
                </div>
            </div>
        `
    }).join("") + `
        <p class="precoTotal">
            <button class="removerItem">Continuar</button>
            Preço Total: R$ ${totalPrecoCarrinho.toFixed(2)}
        </p>
    `
}

// Chama a renderização do carrinho ao carregar a página.
function carrinho() {
    renderCarrinho()
}

// Aumenta a quantidade e dispara o evento de mudança para atualizar o carrinho.
function addQtd(botao) {
    const input = botao.parentElement.querySelector(".qtd")
    input.value = Number(input.value || 0) + 1
    input.dispatchEvent(new Event("change"))
}

// Diminui a quantidade e também dispara o evento para re-renderizar com o novo valor.
function subQtd(botao) {
    const input = botao.parentElement.querySelector(".qtd")
    const valorAtual = Number(input.value || 0)
    const novoValor = valorAtual > 1 ? valorAtual - 1 : 0
    input.value = novoValor
    input.dispatchEvent(new Event("change"))
}

// Atualiza a quantidade do produto no localStorage e recalcula o valor total.
function atualizarQuantidade(nomeProduto, input) {
    const novaQuantidade = Math.max(0, Number(input.value) || 0)
    const carrinho = getCarrinho()
    const produto = carrinho.find(item => item.nome === nomeProduto)

    // Se o produto não existir, interrompe a atualização.
    if (!produto) return

    produto.quantidade = novaQuantidade
    produto.precoTotal = Number(produto.preco) * novaQuantidade

    localStorage.setItem("carrinho", JSON.stringify(carrinho))
    renderCarrinho()
}

// Limpa todo o carrinho e renderiza a tela sem itens.
function limparCarrinho() {
    localStorage.removeItem("carrinho")
    renderCarrinho()
}

// Remove apenas o item selecionado e atualiza o carrinho.
function limparProduto(botao, nomeProduto) {
    const novoCarrinho = getCarrinho().filter(produto => produto.nome !== nomeProduto)

    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho))
    
    renderCarrinho()
}




