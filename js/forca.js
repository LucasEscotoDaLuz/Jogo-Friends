alert("INSTRUÇÕES:\n \n \nEste jogo é semelhante ao tradicional jogo da forca.\nVocê terá seis tentativas, onde usará o teclado virtual para o jogo.\nCada erro, fará com que a imagem esta icônica vá completando.\nPara reiniciar o jogo, clique no botão com o desenho do macaco.");

let vidas = 6;  
let listaSorteioDePalavras = []; 
let sorteioDaPalavra;
let buscarDadosDoJogo;
const palavras = [
    palavra01={
        nome: "EMILY",
        dica: "Foi a personagem mais odiada da série e participou na 4ª temporada."
        
    },
    palavra02={
        nome: "RICHARD",
        dica: "Médico e conhecido pelo seu bigode."
        
    },
    palavra03={
        nome: "PORSHE",
        dica: "Mônica ganhou de presente de seu pai."
        
    },
    palavra04={
        nome: "LONDRES",
        dica: "Onde inicia o romance de Mônica e Chandler."
        
    },
    palavra05={
        nome: "TEMPO",
        dica: "Rachel e Ross deram ou não um..."
        
    },
    palavra06={
        nome: "MASSOTERAPEUTA",
        dica: "Profissão da Phoebe."
        
    }

];

criarPalavraSecreta();
function criarPalavraSecreta(){
    const indexPalavra = parseInt(Math.random() * palavras.length)
    
    buscarDadosDoJogo = palavras[indexPalavra].nome;
    sorteioDaPalavra = palavras[indexPalavra].dica;
}

montarPalavraNaTela();
function montarPalavraNaTela(){
    const dica = document.getElementById("dica");
    dica.innerHTML = sorteioDaPalavra;

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";
   
    for(i = 0; i < buscarDadosDoJogo.length; i++){
        if(listaSorteioDePalavras[i] == undefined){
            listaSorteioDePalavras[i] = "&nbsp;"
            palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaSorteioDePalavras[i] + "</div>"
        }
        else{
            palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaSorteioDePalavras[i] + "</div>"
        }
    }
}

//função para acrescentar uma letra no jogo e impedir que uma letra repetida seja adicionada, onde se uma letra errada for repetida, poderá gerar novos erros e diminuir 
// o número de tentativas de modo incorreto
function verificaLetraEscolhida(letra){
    document.getElementById("chutar-" + letra).disabled = true;
    if(vidas > 0)
    {
        mudarStyleLetra("chutar-" + letra);
        //alterar "tecla-" para "letrasChutadas"
        comparalistas(letra);
        montarPalavraNaTela();
    }    
}

/* função para mudar cor da letra ao clicar na tecla */
function mudarStyleLetra(tecla){
    document.getElementById(tecla).style.background = "#C71585";
    document.getElementById(tecla).style.color = "#FFFFFF";
}

/* função para saber se a letra tem na palavra e  se existe, em qual posição ela se encontra. 
    NO "IF" se não existir a letra na palavra, será diminuida uma tentativa "tentativas --"*/
function comparalistas(letra){
    const pos = buscarDadosDoJogo.indexOf(letra)
   if(pos < 0){
        vidas--
            carregaImagemForca();
    
            if(vidas == 0){
        //modal para a mensagem de derrota no jogo
            buscarEstado("OH MY GOD... A palavra correta é " + buscarDadosDoJogo);
            }
        //aparecer imagem
        //verificar se ainda tem tentativas // mensagem //
    }
    
    else{
        for(i = 0; i < buscarDadosDoJogo.length; i++){

        // o "i" é o index do array 
        // enquanto o "i" for menor que a palavra sorteada ".lenght"  eu quero incrementar um novo i, sendo o "i ++"
        if(buscarDadosDoJogo[i] == letra){
            listaSorteioDePalavras[i] = letra;
        }
    }
}         
        //se a letra estiver dentro da palavra sorteada, acrescentará na palalavra e não terá uma tentativa diminuida. 
            
        // Cada erro, será diminuido em um nº de tentativas onde o máximo é 6. 
        let vitoria = true;
        for(i = 0; i < buscarDadosDoJogo.length; i++){
            //se na posição dinamica a letra for diferente da correta, ele tornará diferente
            if(buscarDadosDoJogo[i] != listaSorteioDePalavras[i]){
                vitoria = false;
            }
        }
        //se o jogador vencer, irá zerar as tentativas para encerrar o jogo e reiniciar para uma nova partida
        if(vitoria == true) {
        
        //modal para mensagem de vitória
            buscarEstado("Parabéns, assim como o Ross, você tem Unagi.");
            
            vidas=0;
        }
}

//Função para carregar imagens conforme as tentativas forem erradas 
//lembrar de ao acrescentar imagem colocar o endereço da seguinte forma ('./img/....)
function carregaImagemForca(){
    switch(vidas){
        case 5:
            document.getElementById("imagem").style.background  = "url('./img/imagem1.png')";
            break;
        case 4:
            document.getElementById("imagem").style.background  = "url('./img/imagem2.png')";
            break;
        case 3:
            document.getElementById("imagem").style.background  = "url('./img/imagem3.png')";
            break;
        case 2:
            document.getElementById("imagem").style.background  = "url('./img/imagem4.png')";
            break;
        case 1:
            document.getElementById("imagem").style.background  = "url('./img/imagem5.png')";
            break;
        case 0:
            document.getElementById("imagem").style.background  = "url('./img/imagem6.png')";
            break;

    }
}

//modal de mensagens de vitória ou derrota 
function buscarEstado(titulo, mensagem){
    let modalTitulo = document.getElementById("exampleModalLabel");
    modalTitulo.innerText = titulo;

    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = mensagem;

    $("#myModal").modal({
        show: true
    });
}

//opção de ao clicar no controle de video game, reiniciar o jogo
let bntReiniciar = document.querySelector("#btnReiniciar")
bntReiniciar.addEventListener("click", function(){
    location.reload();
});
