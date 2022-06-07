(() => {
    'use strict';

    let deck = [];
    const suits = ['C', 'D', 'H', 'S'],
          specials = ['A', 'J', 'Q', 'K'];
    
    let playerScores = [];

    const btnNuevo = document.querySelector('#btnNuevo'),
          btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener');

    const scores = document.querySelectorAll('small'),
          divCardsPlayers = document.querySelectorAll('.divCards');

    // Función para iniciar el juego

    const startGame = (numPlayers = 2) => {
        deck = createDeck();
        playerScores = [];
        for (let i = 0; i < numPlayers; i++) {
            playerScores.push(0);
        }
        
        scores.forEach(score => score.innerText = 0);
        divCardsPlayers.forEach(elem => elem.innerHTML = '');
        
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    // Función para crear el mazo

    const createDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let suit of suits) {
                deck.push(i + suit)
            }
        }

        for (let suit of suits) {
            for (let special of specials) {
                deck.push(special + suit);
            }
        }
        return _.shuffle(deck);
    };

    // Función para pedir una carta

    const askCard = () => {
        if (deck.length === 0) {
            throw 'No quedan cartas en el mazo'
        }
        return deck.pop();
    };

    // Función para obtener el valor de la carta

    const cardValue = (card) => {
        const value = card.substring(0, card.length - 1);
        return (isNaN(value)) ?
            (value === 'A') ? 11 : 10
            : value * 1;
    };

    const sumPoints = (card, turn) => {
        playerScores[turn] = playerScores[turn] + cardValue(card);
        scores[turn].innerText = playerScores[turn];
        return playerScores[turn];
    }

    // Función para crear carta

    const createCard = (card, turn) => {
        const imgCard = document.createElement('img');
        imgCard.src = `assets/img/${card}.png`;
        imgCard.classList.add('carta');
        divCardsPlayers[turn].append(imgCard);
    };

    // Función para determinar ganador

    const isWinner = () => {
        const [scoreToBeat, computerScore] = playerScores;

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
        }, 100)
    };

    // Turno de la computadora

    const computerTurn = (scoreToBeat) => {
        let computerScore = 0;

        do {
            const card = askCard();
            computerScore = sumPoints(card, playerScores.length - 1)
            createCard(card, playerScores.length - 1)

        } while ((computerScore < scoreToBeat) && (scoreToBeat <= 21));

        isWinner();
    };

    // Eventos

    btnPedir.addEventListener('click', () => {
        const card = askCard();
        const playerScore = sumPoints(card, 0);

        createCard(card, 0);

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

        computerTurn(playerScores[0]);
    });

    btnNuevo.addEventListener(('click'), () => {
        startGame()
    });
})();

