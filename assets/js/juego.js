let deck = [];
const suits = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];
let playerScore = 0,
    computerScore = 0;

const btnNuevo = document.querySelector('#btnNuevo');
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const scores = document.querySelectorAll('small');
const playerCards = document.querySelector('#jugador-cartas');
const computerCards = document.querySelector('#computadora-cartas');

const createDeck =  () => {
    for (let i = 2; i <= 10; i++) {
        for (let suit of suits){
            deck.push(i + suit)
        }
    }

    for (let suit of suits) {
        for (let special of specials) {
            deck.push(special + suit);
        }
    }

    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
};

createDeck();

// Función para pedir una carta

const askCard = () => {
    if (deck.length === 0){
        throw 'No quedan cartas en el mazo'
    }
    let card = deck.pop();
    return card;
};

// askCard();

const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    return (isNaN(value)) ?
            (value === 'A') ? 11 : 10
            : value * 1;
};

// Turno de la computadora

const computerTurn = (scoreToBeat) => {
    do {
        const card = askCard();
        computerScore = computerScore + cardValue(card);
        scores[1].innerText = computerScore;

        const imgCard = document.createElement('img');
        imgCard.src = `assets/img/${card}.png`;
        imgCard.classList.add('carta');
        computerCards.append(imgCard);

        if (scoreToBeat > 21) {
            break;
        }
    } while ((computerScore < scoreToBeat) && (scoreToBeat <= 21));

    setTimeout(() => {
        if (computerScore === scoreToBeat) {
            alert('Empate')
        } else if (scoreToBeat > 21) {
            alert('Has perdido :(')
        } else if (computerScore > 21) {
            alert('¡Has ganado!');
        } else {
            alert('Has perdido :(')
        }
    }, 20)
};

// Eventos

btnPedir.addEventListener('click', () => {
    const card = askCard();
    playerScore = playerScore + cardValue(card);
    scores[0].innerText = playerScore;

    const imgCard = document.createElement('img');
    imgCard.src = `assets/img/${card}.png`;
    imgCard.classList.add('carta');
    playerCards.append(imgCard);

    if (playerScore > 21) {
        console.warn('Has perdido');
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        computerTurn(playerScore);
    } else if (playerScore === 21) {
        console.log('¡21, muy bien!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        computerTurn(playerScore);
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    computerTurn(playerScore);
});

btnNuevo.addEventListener(('click'), () => {
    console.clear();

    deck = [];
    deck = createDeck();

    playerScore = 0;
    computerScore = 0;
    scores[0].innerText = 0;
    scores[1].innerText = 0;

    playerCards.innerHTML = '';
    computerCards.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
});