//Início do fim
let playerName = prompt("Qual o seu nome?")

let cardsqntd = Number(prompt(`Com quantas cartas você deseja jogar? 
Digite apenas números pares de 4 a 14`))

while (cardsqntd < 4 || cardsqntd > 14 || cardsqntd % 2 !== 0){
   cardsqntd = Number(prompt("Digite apenas números pares de 4 a 14!"))
}
//Fim do início do fim

//Inicio do relogio
let segundos = 0

function timer(){
    const cartaCerta = document.querySelectorAll('.acertou')

    this.loop = setInterval(() => {
        const relogio = document.querySelector(".relogio")
        let tempo = segundos
        segundos = segundos + 1

        relogio.innerHTML = `Tempo: ${tempo}`
    }, 1000);
}
//Fim do relogio

// Criando as cartas do jogo e algumas funcionalidades
const gifs = [
'bobrossparrot', 
'explodyparrot', 
'fiestaparrot', 
'metalparrot', 
'revertitparrot', 
'tripletsparrot', 
'unicornparrot'
];

gifs.length = cardsqntd / 2

function createElement(tag, classe){
    const elemento = document.createElement(tag);
    elemento.className = classe;
    return elemento
}

let primeiraCarta = ''
let segundaCarta =''
let njogadas = 0

function fimDoGame(){
    const cartasCertas = document.querySelectorAll('.acertou')

    if (cartasCertas.length === cardsqntd) {
        clearInterval(this.loop);
        
        setTimeout(()=> {
            alert(`Parabéns ${playerName}, você ganhou o jogo dos piriquito em ${njogadas * 2} jogadas!
Seu tempo total foi de ${segundos} segundos!`)

            const resposta = prompt(`Deseja jogar novamente?
(Responda apenas com "sim" ou "não")`)

            if (resposta === "sim") {
                location.reload()
            } 
        }, 300)
        
    }

}

function checkPair () {
    const gif1 = primeiraCarta.getAttribute('data-gif')
    const gif2 = segundaCarta.getAttribute('data-gif')

    if(gif1 === gif2){

        primeiraCarta.classList.add('acertou')
        segundaCarta.classList.add('acertou')

        primeiraCarta = ''
        segundaCarta ='' 

        njogadas++

        fimDoGame()
    } else {
        setTimeout(() => {

            primeiraCarta.classList.remove('virada')
            segundaCarta.classList.remove('virada') 

            primeiraCarta = ''
            segundaCarta =''

            njogadas ++

        }, 1000)   
    }
}

function virarCarta({target}){
    if (target.parentNode.className.includes('virada')){
        return;
    }

    if (primeiraCarta === '') {
      target.parentNode.classList.add('virada')
      primeiraCarta = target.parentNode

    } else if (segundaCarta === '') {
        target.parentNode.classList.add('virada')
        segundaCarta = target.parentNode

        checkPair()
    }
}

function creatCards (gif) {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('./images/${gif}.gif')`

    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener('click', virarCarta)
    card.setAttribute('data-gif', gif)

    return card
}

function iniciarJogo (){
    const name = document.querySelector(".player")
    const cardsDuplicados = [ ... gifs, ... gifs ]
    const cardsEmbaralhados = cardsDuplicados.sort(() => Math.random() - 0.5)

    name.innerHTML = `${playerName}`

    cardsEmbaralhados.forEach((gif) => {
        const card = creatCards (gif);

        const deck = document.querySelector('.content')
        deck.appendChild(card)
    })
}
// Terminei de criar as cartas do jogo e o fim do mesmo
timer()
iniciarJogo()