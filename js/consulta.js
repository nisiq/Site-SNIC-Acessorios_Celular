//Consultar o CEP (aba: compras.html)
//Definição de quais informações irei utilizar do meu HTML

let cep = document.querySelector('#confirmCEP');
let rua = document.querySelector('#rua');
let bairro = document.querySelector('#bairro');
let cidade = document.querySelector('#cidade');

cep.value = '13052-550'; 

cep.addEventListener('blur', function(e) { //quando sair desse campo, acontece a ação
    let cep = e.target.value;
    let script = document.createElement('script');
    script.src = 'https://viacep.com.br/ws/'+cep+'/json/?callback=popularForm';
    document.body.appendChild(script);
});
//mensagem de erro pra cep errados
function popularForm(resposta) {

    if("erro" in resposta) {
        alert("CEP não encontrado");
        return;
    }
//validação das infos pelo VIACEP
    console.log(resposta);
    rua.value = resposta.logradouro;
    bairro.value = resposta.bairro;
    cidade.value = resposta.localidade;
}
