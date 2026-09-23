function addCar(botao) {
    let produto = botao.closest(".produto")
    let modal = produto.querySelector(".modais")

    modal.style.display = "flex"
}

function closeModal(botao) {
    let produto = botao.closest(".produto")
    let modal = produto.querySelector(".modais")

    modal.style.display = "none"
}

function addQtd(botao) {

    // pega a div pai
    let container = botao.parentElement

    // procura o input dentro dela
    let input = container.querySelector('.qtd')

    // lê o valor
    let valor = Number(input.value)

    // soma 1
    valor++

    // coloca de volta
    input.value = valor
}


function subQtd(botao) {
    let input = botao.parentElement.querySelector('.qtd')
    let valor = Number(input.value)

    valor--



    if (valor < 0) {
        valor = 0
    }

    input.value = valor
}

function irCarrinho(botao, nomeProduto, preco, imgProduto) {


    //     botao = qual botão foi clicado.
    // closest() = encontra o produto daquele botão.
    // querySelector(".qtd") = encontra a quantidade daquele produto.

    let produto = botao.closest(".produto")
    let input = produto.querySelector(".qtd")
    let qtd = Number(input.value)
    

    localStorage.setItem("nomeProduto", nomeProduto)
    localStorage.setItem("qtd", qtd)
    localStorage.setItem("preco", preco)
    localStorage.setItem("imgProduto", imgProduto)
   



    window.location.href = "Pages/carrinho.html"

}






function adicionarCarrinho(botao, nomeProduto, preco, imgProduto) {
    let produto = botao.closest(".produto") // Filta para pegar tudo dentro da div produto
    let input = produto.querySelector(".qtd") // acha o input dentro da div acima com querySelector 

    let qtd = Number(input.value) // pega a quantidade (valor do input)
    


    let addAcar = JSON.parse( // transforma o texto JSON novamente em array
        localStorage.getItem("carrinho")) // Busca os produtos salvos no Local Storage
        || [] // Se não existir carrinho salvo, cria um array vazio


    let existe = addAcar.find(produto => {
        return produto.nome === nomeProduto

        
    })
    if (existe) {
        existe.quantidade += qtd
        
    }

    else {
        addAcar.push({
            nome: nomeProduto,
            preco: preco,
            quantidade: qtd,
            imgProduto
        })


    }

    localStorage.setItem(
        "carrinho",
        JSON.stringify(addAcar)
    )




    // addAcar.push ({ // Pega o array addAcar e puxa ele incluindo os dados
    //     nome: nomeProduto,
    //     preco: preco,
    //     quantidade: qtd,
    //     imgProduto

    //     })

    //     localStorage.setItem( // Salva informaçõe no navegador
    //         "carrinho", // chave ou "gaveta" para armazenar todos os dados dos produtos dentro dela 
    //         JSON.stringify(addAcar) // Transforma os dados recebidos em texto 


    //         // Eu só transformei ele em stringify para salvar no localStorage, que só aceita dados em forma de string
    //     )

    console.log("ADICIONOU")
    console.log(addAcar)


}


