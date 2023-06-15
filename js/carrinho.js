//Variável que mantém o status visível do carrinho
var carritoVisible = false;

//Esperar que todos os elementos da página carreguem para executar o script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    
    //adicionar funcionalidade aos botões remover do carrinho
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    //funcionalidade ao botão adicionar quantidade
    var botonesSumarCantidad = document.getElementsByClassName('somar-quantidade');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',somarQuantidade);
    }

     //funcionalidade ao botão subtrair quantidade
    var botonesRestarCantidad = document.getElementsByClassName('restar-quantidade');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    //funcionalidade ao botão Adicionar ao carrinho
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    //funcionalidade ao botão comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}
//Esconde todos os elementos do carrinho
function pagarClicked(){
    //Remove tds elementos do carrinho
    var carritoItems = document.getElementsByClassName('carrinho-items')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}
//controla o botão clicado para adicionar ao carrinho
function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var preco = item.getElementsByClassName('preco-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, preco, imagenSrc);

    hacerVisibleCarrito();
}

//Função que torna o carrinho visível
function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrinho = document.getElementsByClassName('carrinho')[0];
    carrinho.style.marginRight = '0';
    carrinho.style.opacity = '1';

    var items =document.getElementsByClassName('container-items')[0];
    items.style.width = '60%';
}

//adiciona um item ao carrinho
function agregarItemAlCarrito(titulo, preco, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrinho = document.getElementsByClassName('carrinho-items')[0];

    //Verificação se o item que está tentando inserir ja n está no carrinho
    var nombresItemsCarrito = itemsCarrinho.getElementsByClassName('carrinho-item-titulo');
    for(var i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("item ta no carrinho");
            return;
        }
    }

    var ConteudoItemCarrinhos = `
        <div class="carrinho-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrinho-item-detalles">
                <span class="carrinho-item-titulo">${titulo}</span>
                <div class="selector-quantidade">
                    <i class="fa-solid fa-minus restar-quantidade"></i>
                    <input type="text" value="1" class="carrinho-item-quantidade" disabled>
                    <i class="fa-solid fa-plus somar-quantidade"></i>
                </div>
                <span class="carrinho-item-preco">${preco}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = ConteudoItemCarrinhos;
    itemsCarrinho.append(item);

    //funcionalidade de exclusão ao novo item
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //subtrair a quantidade do novo item
    var botonRestarQuantidade = item.getElementsByClassName('restar-quantidade')[0];
    botonRestarQuantidade.addEventListener('click',restarCantidad);

    //quantidade de adição do novo item
    var botonSomarQuantidade = item.getElementsByClassName('somar-quantidade')[0];
    botonSomarQuantidade.addEventListener('click',somarQuantidade);

    //Atualiza o total do carrinho
    actualizarTotalCarrito();
}
//Aumenta a quantidade do elemento selecionado em um
function somarQuantidade(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrinho-item-quantidade')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrinho-item-quantidade')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrinho-item-quantidade')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Subtrair por um a quantidade do elemento selecionad
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrinho-item-quantidade')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrinho-item-quantidade')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrinho-item-quantidade')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

//remove o item selecionado do carrinho
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Atualiza o total do carrinho
    actualizarTotalCarrito();

    //vverifica se tem algo no carrinho, se não tiver, ocultamos ele
    ocultarCarrito();
}
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrinho-items')[0];
    if(carritoItems.childElementCount==0){
        var carrinho = document.getElementsByClassName('carrinho')[0];
        carrinho.style.marginRight = '-100%';
        carrinho.style.opacity = '0';
        carritoVisible = false;
    
        var items =document.getElementsByClassName('container-items')[0];
        items.style.width = '100%';
    }
}
//Atualiza o total do carrinho
function actualizarTotalCarrito(){
    //selecionamos o container carrinho
    var carritoContenedor = document.getElementsByClassName('carrinho')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrinho-item');
    var total = 0;
    //percorre cada elemento do carrinho para atualizar o total
    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrinho-item-preco')[0];
        //remover o símbolo de peso e o ponto de milésimos.
        var preco = parseFloat(precioElemento.innerText.replace('R$','').replace('.',''));
        var cantidadItem = item.getElementsByClassName('carrinho-item-quantidade')[0];
        console.log(preco);
        var quantidade = cantidadItem.value;
        total = total + (preco * quantidade);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('carrinho-preco-total')[0].innerText = 'R$'+total.toLocaleString("pt") + ",00";

}