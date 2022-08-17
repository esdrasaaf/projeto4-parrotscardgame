let cardsqntd = Number(prompt(`Com quantas cartas você deseja jogar? 
Digite apenas números pares de 4 a 14`))

while (cardsqntd < 4 || cardsqntd > 14 || cardsqntd % 2 !== 0){
   cardsqntd = Number(prompt("Digite apenas números pares de 4 a 14!"))
}




// Criando as cartas do jogo
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

function creatCards (gif) {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.innerHTML = `<img src="./images/${gif}.gif" alt="Gif de parrot">`
    back.innerHTML = `<img src="./images/front.png" alt="Parrot">`

    card.appendChild(front)
    card.appendChild(back)

    return card
}

function iniciarJogo (){

    const cardsDuplicados = [ ... gifs, ... gifs ]

    cardsDuplicados.forEach((gif) => {
        const card = creatCards (gif);

        const deck = document.querySelector('.content')
        deck.appendChild(card)
    })
}
// Terminou de criar as cartas do jogo

iniciarJogo()