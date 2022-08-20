//Início do fim
let cardsqntd = Number(prompt(`Com quantas cartas você deseja jogar? 
Digite apenas números pares de 4 a 14`))

while (cardsqntd < 4 || cardsqntd > 14 || cardsqntd % 2 !== 0){
   cardsqntd = Number(prompt("Digite apenas números pares de 4 a 14!"))
}
//Fim do início do fim

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
        setTimeout(()=> {
            alert(`Parabéns você ganhou o jogo dos piriquito em ${njogadas} jogadas!`)
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

    front.style.backgroundImage = `url('../images/${gif}.gif')`

    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener('click', virarCarta)
    card.setAttribute('data-gif', gif)

    return card
}

function iniciarJogo (){

    const cardsDuplicados = [ ... gifs, ... gifs ]
    const cardsEmbaralhados = cardsDuplicados.sort(() => Math.random() - 0.5)

    cardsEmbaralhados.forEach((gif) => {
        const card = creatCards (gif);

        const deck = document.querySelector('.content')
        deck.appendChild(card)
    })
}
// Terminei de criar as cartas do jogo e o fim do mesmo

iniciarJogo()