const cardsArray = [
    { name: 'A', img: 'A' },
    { name: 'B', img: 'B' },
    { name: 'C', img: 'C' },
    { name: 'D', img: 'D' },
    { name: 'E', img: 'E' },
    { name: 'F', img: 'F' },
    { name: 'G', img: 'G' },
    { name: 'H', img: 'H' }
];

const gameContainer = document.querySelector('.game-container');
const restartButton = document.getElementById('restart');
let cards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Duplicate and shuffle the cards
function shuffleCards() {
    const shuffledArray = [...cardsArray, ...cardsArray]
        .sort(() => 0.5 - Math.random());

    shuffledArray.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = item.name;
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">${item.img}</div>
            </div>
        `;
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
        cards.push(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function restartGame() {
    gameContainer.innerHTML = '';
    cards = [];
    shuffleCards();
}

restartButton.addEventListener('click', restartGame);

// Initialize the game
shuffleCards();
