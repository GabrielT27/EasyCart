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
 
// Percorre o array de produtos com map, em cada volta, a arrow function recebe um produto do array, e o parâmetro "produto" representa esse item individualmente.
 
        const precoTotal = Number(produto.preco || 0) * Number(produto.quantidade || 0) // Variável para cálculo do preco Total de cada produto, OU caso não tenha valor, retorna 0
 
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
    }).join("") + // O map() gera um array de strings HTML. O join("") junta tudo em uma única string para o innerHTML. Depois disso, qualquer HTML concatenado com + será renderizado após todos os produtos."
 
     `
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
 
    // Encontra o input de quantidade que está dentro do mesmo elemento pai do botão clicado.
    const input = botao.parentElement.querySelector(".qtd")
 
    // Converte o valor atual para número e soma 1 à quantidade.
    // Caso o input esteja vazio, utiliza 0 como valor padrão.
    input.value = Number(input.value || 0) + 1
 
    // input.dispatchEvent(new Event("change")) simula uma alteração no input, para que a função atualizarQuantidade() seja executada, e é essa função que atualiza o localStorage e seu valor.
    input.dispatchEvent(new Event("change"))
}
 
// Diminui a quantidade e também dispara o evento para re-renderizar com o novo valor.
function subQtd(botao) {
    const input = botao.parentElement.querySelector(".qtd")
    const valorAtual = Number(input.value || 0)
   
    const novoValor = valorAtual > 1 ? valorAtual - 1 : 0 // Se a quantidade for maior que 1, diminui 1 unidade. Caso contrário, mantém o valor em 0 para evitar quantidades negativas.
 
    input.value = novoValor // Atualiza o valor exibido no campo de quantidade.
   
    input.dispatchEvent(new Event("change"))
}
 
// Atualiza a quantidade do produto no localStorage e recalcula o valor total.
function atualizarQuantidade(nomeProduto, input) {

    const novaQuantidade = Math.max(0, Number(input.value) || 0) // Math.max garante que o maior número que esta dentro do input seja impresso

    const carrinho = getCarrinho() // Busca a lista atual dos produtos salvos no carrinho

    const produto = carrinho.find(item => item.nome === nomeProduto) // Procura dentro do array carrinho o item cujo nome seja igual ao nomeProduto passado na função.
 
    // Se o produto não existir, interrompe a atualização.
    if (!produto) return
 
    produto.quantidade = novaQuantidade // Atualiza a quantidade do produto encontrado com o novo valor validado.

    produto.precoTotal = Number(produto.preco) * novaQuantidade // Atualiza o valor do preço Total
 
    localStorage.setItem("carrinho", JSON.stringify(carrinho)) // Salva o array (carrinho) e atualiza o localStorage(memória do servidor)

    renderCarrinho() // Ela pega os dados que acabaram de ser modificados (e salvos) e reconstrói a tabela ou lista na tela do usuário
     
   // O renderCarrinho() mexe direto no HTML e no DOM da página. Ele pega os elementos (como <tr>, <td>, <span>, ou <h1> dos preços) e atualiza os textos e valores visuais para que o usuário veja a mudança acontecendo na hora, sem precisar dar F5 na página.

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