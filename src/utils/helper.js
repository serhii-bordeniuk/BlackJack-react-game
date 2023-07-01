export const createNewDeck = () => {
    const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
    const suits = ["♦", "♣", "♥", "♠"];
    const deck = [];

    for (let suit of suits) {
        for (let number of cards) {
            deck.push({ suit, number });
        }
    }
    return deck;
};

export const getRandomCard = (deck) => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck[randomIndex];
    const updatedDeck = [...deck.slice(0, randomIndex), ...deck.slice(randomIndex + 1)];

    return {
        card,
        updatedDeck,
    };
};

export const cardsCount = (cards) => {
    const arr = [];
    cards.forEach((card) => {
        if (card.number === "A") {
            arr.push(card);
        } else if (card.number) {
            arr.unshift(card);
        }
    });

    return arr.reduce((total, card) => {
        if (card.number === "J" || card.number === "Q" || card.number === "K") {
            return total + 10;
        } else if (card.number === "A") {
            return total + 11 <= 21 ? total + 11 : total + 1;
            //If the card number is A (ace), we add 11 to the total, if it does not exceed 21. If adding 11 results in a bust (the sum is greater than 21), we add only 1 - according to the rules of the game.
        } else {
            return total + card.number;
        }
    }, 0);
};

export const getWinner = (dealer, player) => {
    if (dealer.count > player.count) {
        return "dealer";
    } else if (dealer.count < player.count) {
        return "player";
    } else {
        return "push";
    }
};

export const dealCards = (deck) => {
    const playerCard1 = getRandomCard(deck);
    const dealerCard1 = getRandomCard(playerCard1.updatedDeck);
    const playerCard2 = getRandomCard(dealerCard1.updatedDeck);
    const playerStartHand = [playerCard1.card, playerCard2.card];
    const dealerStartHand = [dealerCard1.card];

    const player = {
        cards: playerStartHand,
        count: cardsCount(playerStartHand),
    };
    const dealer = {
        cards: dealerStartHand,
        count: cardsCount(dealerStartHand),
    };

    return {
        updatedDeck: playerCard2.updatedDeck,
        player,
        dealer,
    };
};

export const dealerDraw = (dealer, deck) => {
    const { card, updatedDeck } = getRandomCard(deck);
    dealer.cards.push(card);
    dealer.count = cardsCount(dealer.cards);
    return { dealer, updatedDeck };
};
