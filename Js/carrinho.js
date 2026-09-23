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

    if (produtos.length === 0) {
        listaProdutos.innerHTML = `
            <div class="carrinhoVazio">
                Seu carrinho está vazio.
            </div>
        `
        return
    }

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
                <img src="../${produto.imgProduto}" class="fotoPro">
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
 }).join("") + 
 // O map() gera um array de strings HTML. O join("") junta tudo em uma única string para o innerHTML. Depois disso, qualquer HTML concatenado com + será renderizado após todos os produtos."

`
    <div class="resumoCarrinho">
        <p class="precoTotal">Preço Total: R$ ${totalPrecoCarrinho.toFixed(2)}</p>
        <button class="continuarButton" onclick="abrirFormularioEntrega()">Continuar</button>
    </div>
`
}



function gerarFormularioEntrega() {
    return `
        <div class="areaCheckout">
            <div class="blocoEndereco">
                <h2 class="tituloCheckout">Endereço de entrega</h2>

                <div class="linhaFormulario">
                    <label class="campoFormulario">
                        <span>Nome completo</span>
                        <input id="nomeCompleto" type="text" placeholder="Ex: João da Silva" />
                    </label>

                    <label class="campoFormulario">
                        <span>Telefone</span>
                        <input id="telefoneUsuario" type="tel" placeholder="(11) 99999-9999" />
                    </label>
                </div>

                <div class="linhaFormulario">
                    <label class="campoFormulario campoFormularioGrande">
                        <span>Rua</span>
                        <input id="ruaUsuario" type="text" placeholder="Ex: Rua das Palmeiras" />
                    </label>

                    <label class="campoFormulario campoFormularioPequeno">
                        <span>Número</span>
                        <input id="numeroUsuario" type="text" placeholder="123" />
                    </label>
                </div>

                <div class="linhaFormulario">
                    <label class="campoFormulario">
                        <span>Complemento</span>
                        <input id="complementoUsuario" type="text" placeholder="Ex: Apt 202" />
                    </label>

                    <label class="campoFormulario">
                        <span>Bairro</span>
                        <input id="bairroUsuario" type="text" placeholder="Ex: Centro" />
                    </label>
                </div>

                <div class="linhaFormulario">
                    <label class="campoFormulario">
                        <span>Cidade</span>
                        <input id="cidadeUsuario" type="text" placeholder="Ex: São Paulo" />
                    </label>

                    <label class="campoFormulario">
                        <span>Estado</span>
                        <select id="estadoUsuario">
                            <option value="">Selecione</option>
                            <option value="SP">SP</option>
                            <option value="RJ">RJ</option>
                            <option value="MG">MG</option>
                            <option value="PR">PR</option>
                            <option value="SC">SC</option>
                            <option value="RS">RS</option>
                        </select>
                    </label>
                </div>

                <label class="campoFormulario campoFormularioCompleto">
                    <span>CEP</span>
                    <input id="cepUsuario" type="text" placeholder="Ex: 01000-000" />
                </label>

                <div class="blocoPagamento">
                    <h3 class="tituloCheckout tituloPagamento">Pagamento fictício</h3>

                        <div class="opcoesPagamento">
                            <label class="opcaoPagamento">
                                <input type="radio" name="formaPagamento" value="cartao" onchange="trocarFormaPagamento(this.value)" checked />
                                <span class="conteudoOpcaoPagamento">
                                    <strong>Cartão</strong>
                                    <small>Crédito ou débito</small>
                                </span>
                            </label>

                            <label class="opcaoPagamento">
                                <input type="radio" name="formaPagamento" value="pix" onchange="trocarFormaPagamento(this.value)" />
                                <span class="conteudoOpcaoPagamento">
                                    <strong>PIX</strong>
                                    <small>Pagamento instantâneo</small>
                                </span>
                            </label>

                            <label class="opcaoPagamento">
                                <input type="radio" name="formaPagamento" value="boleto" onchange="trocarFormaPagamento(this.value)" />
                                <span class="conteudoOpcaoPagamento">
                                    <strong>Boleto</strong>
                                    <small>Vencimento em 2 dias</small>
                                </span>
                            </label>
                    </div>

                        <div id="dadosCartao" class="dadosPagamento">
                            <div class="linhaFormulario">
                                <label class="campoFormulario">
                                    <span>Titular do cartão</span>
                                    <input id="titularCartao" type="text" placeholder="Ex: João da Silva" />
                                </label>

                                <label class="campoFormulario">
                                    <span>Número do cartão</span>
                                    <input id="numeroCartao" type="text" placeholder="1234 5678 9012 3456" />
                                </label>
                            </div>

                            <div class="linhaFormulario">
                                <label class="campoFormulario">
                                    <span>CVV</span>
                                    <input id="cvvCartao" type="text" placeholder="123" />
                                </label>

                                <label class="campoFormulario">
                                    <span>Parcelas</span>
                                    <select id="parcelasCartao">
                                        <option value="">Selecione</option>
                                        <option value="1x sem juros">1x sem juros</option>
                                        <option value="2x sem juros">2x sem juros</option>
                                        <option value="3x sem juros">3x sem juros</option>
                                        <option value="4x com juros">4x com juros</option>
                                    </select>
                                </label>
                            </div>
                        </div>

                        <div id="mensagemPix" class="mensagemPagamento" hidden>
                            Depois de confirmar, seria gerado um código PIX fictício para este pedido.
                        </div>

                        <div id="mensagemBoleto" class="mensagemPagamento" hidden>
                            Depois de confirmar, seria gerado um boleto fictício com vencimento em 2 dias.
                        </div>
                    </div>

                <div class="botaoArea">
                    <button class="botaoConfirmarPedido" onclick="finalizarPedido()">Confirmar compra</button>
                </div>
            </div>
        </div>
    `
}

// Declaração de uma função chamada 'trocarFormaPagamento' que recebe um parâmetro (formaPagamento)
function trocarFormaPagamento(formaPagamento) { // Function para usuário escolher forma de pagamento

    // Procura no documento HTML o elemento exato que possui o ID 'dadosCartao' e guarda esse bloco na constante 'dadosCartao'
    const dadosCartao = document.querySelector("#dadosCartao") 

    // Procura no documento HTML o elemento exacto que possui o ID 'mensagemPix' e guarda esse bloco na constante 'mensagemPix'
    const mensagemPix = document.querySelector("#mensagemPix")

    // Procura no documento HTML o elemento exacto que possui o ID 'mensagemBoleto' e guarda esse bloco na constante 'mensagemBoleto'
    const mensagemBoleto = document.querySelector("#mensagemBoleto")

    // Início de uma validação de segurança (um 'if' de proteção)
    // Se o cartão, o pix OU o boleto forem nulos/não existirem na tela, passará reto pela condição.
    if (!dadosCartao || !mensagemPix || !mensagemBoleto) {
        return // ...o código pára imediatamente aqui e sai da função para o navegador não arrebentar com erros.
    }

    // Altera a propriedade .hidden (escondido: true ou false) do bloco do cartão
    // O operador '!==' pergunta: "o que o utilizador escolheu é DIFERENTE de 'cartao'?"
    // Se for diferente, o hidden fica 'true' (esconde). Se for igual, fica 'false' (mostra).
    dadosCartao.hidden = formaPagamento !== "cartao"

    // Faz exatamente a mesma pergunta, mas focada na opção "pix"
    // Se o utilizador escolheu pix, isto da 'false' no hidden (mostra o pix) e 'true' nos outros.
    mensagemPix.hidden = formaPagamento !== "pix"

    // Faz exatamente a mesma pergunta, mas focada na opção "boleto"
    // Se o utilizador escolheu boleto, isto dá 'false' no hidden (mostra o boleto) e 'true' nos outros.
    mensagemBoleto.hidden = formaPagamento !== "boleto"
    
}


function abrirFormularioEntrega() {  // Cria uma função chamada abrirFormularioEntrega.


    const listaProdutos = document.querySelector(".listaProdutos") // Procura no HTML o primeiro elemento que possui a classe "listaProdutos". O elemento encontrado é armazenado na variável listaProdutos para podermos manipulá-lo depois.

    if (!listaProdutos) 
    // Verifica se listaProdutos NÃO foi encontrada.
    // Caso não exista o elemento, a função é encerrada
    // imediatamente com return para evitar erros.
    return

    const areaCheckoutExistente = document.querySelector(".areaCheckout")
    // Procura no HTML um elemento com a classe "areaCheckout". Se encontrar, guarda o elemento. Se não encontrar, retorna null.

    if (areaCheckoutExistente) {
        // Verifica se a área de checkout foi encontrada.
        // É equivalente a:
        // if (areaCheckoutExistente !== null)

        areaCheckoutExistente.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
        // Faz a página rolar automaticamente até o elemento.
        // scrollIntoView() = "leve a tela até este elemento"
        // behavior: "smooth"
        // Faz a rolagem ser suave, deslizando pela página.
        // Sem isso:
        // a página "teleporta" para o elemento.
        // block: "start"
        // Faz o elemento ficar alinhado no topo da área visível da tela.

        return
    }

    listaProdutos.insertAdjacentHTML( // insertAdjacentHTML() insere HTML na página, mas não deixa exclusiva dela, como innerHtml, apenas acrescenta.

        "beforeend",  // Inserir o conteúdo dentro da listaProdutos, logo antes da tag de fechamento.

        gerarFormularioEntrega() // gerarFormularioEntrega() retorna
    // uma string contendo todo o HTML do formulário.

    )
  
}


function finalizarPedido() {  // Cria a função finalizarPedido. Todo o código dentro das chaves será executado quando essa função for chamada.
    
   
    const formaPagamento = document.querySelector("input[name='formaPagamento']:checked")?.value

     // Procura no HTML um input com name="formaPagamento" que esteja marcado (:checked). 
    // O ?.value significa que se o elemento existir, pegue seu value
    // Evita erro caso nenhum input esteja selecionado.


   
    
    const camposEndereco = document.querySelectorAll( // querySelectorAll() retorna uma NodeList contendo todos os elementos encontrados. 

    // NodeList é o nome dado ao resultado que o querySelectorAll() retorna.


       
        "#nomeCompleto, #telefoneUsuario, #ruaUsuario, #numeroUsuario, #bairroUsuario, #cidadeUsuario, #estadoUsuario, #cepUsuario"

        // procura no HTML os elementos que já existem com esses IDs e os coloca dentro de uma NodeList.

    )


    // Cria a constante camposPagamento.
    const camposPagamento = formaPagamento === "cartao"

        // Verifica se a forma de pagamento escolhida foi cartão.
        // Se for, busca os campos relacionados ao cartão.
        ? document.querySelectorAll(

        
        // procura no HTML os elementos que já existem com esses IDs e os coloca dentro de uma NodeList.

        "#titularCartao, #numeroCartao, #cvvCartao, #parcelasCartao"

        )

        // Caso não seja cartão (Pix ou Dinheiro, por exemplo) retorna um array vazio para não exigir esses campos.
        : []

    
    const camposVazios = [...camposEndereco, ...camposPagamento] // O operador ... (spread operator) pega todos os elementos de camposEndereco e de camposPagamento e junta tudo em uma única lista (array) chamada temporariamente para a filtragem

        // Percorre todos os campos do array.
        .filter(campo =>

            // campo representa cada input individualmente.
            // campo.value pega o texto digitado pelo usuário.
            // trim() remove espaços em branco do início e do fim.
            // === "" verifica se o campo ficou vazio.
            // Se retornar true, o campo será adicionado ao array camposVazios.
            campo.value.trim() === ""
        )

    // Verifica duas condições:
    //
    // !formaPagamento
    // Significa:
    // "Nenhuma forma de pagamento foi selecionada."
    //
    // camposVazios.length > 0
    // Significa:
    // "Existe pelo menos um campo obrigatório vazio."
    if (!formaPagamento || camposVazios.length > 0) {

        // Chama a função responsável por abrir um modal de aviso.
        abrirModalDados(

            // Operador ternário.
            // Funciona como um if resumido.
            !formaPagamento

                // Se nenhuma forma de pagamento foi escolhida
                ? "Escolha uma forma de pagamento para continuar."

                // Caso exista pagamento selecionado,
                // mas algum campo esteja vazio,
                // mostra esta outra mensagem.
                : "Preencha todos os campos obrigatórios antes de confirmar a compra."
        )

        // camposVazios[0] Escolhe qual input vai receber a ação (o primeiro que estiver vazio).

        // ?.focus() É a ação em si que joga o foco e o cursor para dentro daquele input vazio para ser preenchido.
        
        // O ? evita erro caso não exista nenhum elemento.
        camposVazios[0]?.focus()

        
        return
    }




    const nome = document.querySelector("#nomeCompleto")?.value.trim() || "Cliente" // Se o usuário não preencheu ou o campo não existir, entra o operador || e ele assume o nome padrão de "Cliente" (value.trim) tira todos os espaços do nome preenchido no campo (no inicio ou no fim, sem ver ou querer).
    
    const totalCarrinho = getCarrinho().reduce((total, produto) => {
        return total + Number(produto.preco || 0) * Number(produto.quantidade || 0)
    }, 0) 

     // Reduce faz reduzir todos os itens do array ao preço total da compra 
            
     // (Return) Garante que o valor é um número e, se estiver vazio ou indefinido, usa 0.

    const numeroPedido = `EASY-${Math.floor(Math.random() * 9000) + 1000}`  
    
    // `EASY` é fixo atrás de cada nome do pedido
    // Math.floor arredonda o número sorteado pelo Math.random, que multiplicado por 9000, e o +1000 seria para ser um número gerado de 4 algarismos 


    const listaProdutos = document.querySelector(".listaProdutos") // Pega o valor da div no html e salva como constante

    if (listaProdutos) { // Condição para buscar no html se existe essa div

        listaProdutos.innerHTML = `

            <div class="sucessoPedido">
                <h2 class="tituloCheckout">Pedido Confirmado</h2>

                
                <p class="textoPedido">Olá, ${nome.split(" ")[0]}! O seu pedido ${numeroPedido} foi registrado com sucesso.</p>

                <p class="textoPedido">Valor total: R$ ${totalCarrinho.toFixed(2)}</p>
                <p class="textoPedido">Status: Em separação para entrega.</p>
                <p class="textoPedido">Observação: Este é um fluxo simulado para demonstração do checkout.</p>
            </div>

        `
        // split() divide o valor do nome em arrays, [G, M, T], e pega o primeiro item [0], imprimindo só esse array.
    }

    localStorage.removeItem("carrinho")
}

function abrirModalDados(mensagem) {
    const modal = document.querySelector("#modalDadosIncorretos") // Cria constante para aparecer caso campo não seja preenchido corretamente
    
    const mensagemModal = document.querySelector("#mensagemModalDados") // Cria constante para aparecer caso campo seja preenchido corretamente

    if (!modal || !mensagemModal)
        
        return

    mensagemModal.textContent = mensagem // mensagemModal.textContent = mensagem: Pega o texto que enviei quando chamei a função (o parâmetro mensagem) e joga ele para dentro do HTML do modal.

    modal.hidden = false // Hidden faz o modal ficar escondido, como se fosse um (displa: none), mas quando altero o estado dele para falso, deixo de esconder ele, e ele aparece para o usuário.
}

function fecharModalDados() {  // Function para fechar modal

    const modal = document.querySelector("#modalDadosIncorretos") // Ela vai lá no HTML e busca a caixinha de aviso pelo ID.

    if (modal) modal.hidden = true // Depois de executar a função, altero o estado do hidden do modal para verdadeiro de novo, e volta a ficar escondido.
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