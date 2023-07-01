import "./App.scss";
import { AppTitle } from "../appTitle/AppTitle";
import { GameControlButtons } from "../gameControlButtons/GameControlButtons";
import { Deposit } from "../deposit/Deposit";
import { GameHands } from "../gameHands/GameHands";

import { useState, useEffect } from "react";

function App() {
    useEffect(() => {
        startGame();
    }, []);

    const [deck, setDeck] = useState([]);
    const [dealer, setDealer] = useState(null);
    const [player, setPlayer] = useState(null);
    const [deposit, setDeposit] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [currentBet, setCurrentBet] = useState(null);
    const [informationMessage, setInformationMessage] = useState(false);
    const [isGameOver, setGameOver] = useState(false);

    function createNewDeck() {
        const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
        const suits = ["♦", "♣", "♥", "♠"];
        const deck = [];

        for (let suit of suits) {
            for (let number of cards) {
                deck.push({ suit, number });
            }
        }
        return deck;
    }

    function getRandomCard(deck) {
        const randomIndex = Math.floor(Math.random() * deck.length);
        const card = deck[randomIndex];
        const updatedDeck = [...deck.slice(0, randomIndex), ...deck.slice(randomIndex + 1)];

        return {
            card,
            updatedDeck,
        };
    }

    function startGame(type) {
        if (type === "continue") {
            if (deposit > 0) {
                const newDeck = deck.lenght < 10 ? createNewDeck() : deck;
                const { updatedDeck, player, dealer } = dealCards(newDeck);
                setDeck(updatedDeck);
                setPlayer(player);
                setDealer(dealer);
                setCurrentBet(null);
                setGameOver(false);
                setInformationMessage(null);
            } else {
                setInformationMessage("Game over! You can start a new game");
            }
        } else {
            const newDeck = createNewDeck();
            const { updatedDeck, player, dealer } = dealCards(newDeck);

            setDeck(updatedDeck);
            setPlayer(player);
            setDealer(dealer);
            setDeposit(350);
            setInputValue("");
            setCurrentBet(null);
            setGameOver(false);
            setInformationMessage(null);
        }
    }

    function cardsCount(cards) {
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
    }

    function dealerDraw(dealer, deck) {
        const { card, updatedDeck } = getRandomCard(deck);
        dealer.cards.push(card);
        dealer.count = cardsCount(dealer.cards);
        return { dealer, updatedDeck };
    }

    function hit() {
        if (!isGameOver) {
            if (currentBet) {
                const { card, updatedDeck } = getRandomCard(deck);
                const playerCopy = player;
                playerCopy.cards.push(card);
                playerCopy.count = cardsCount(playerCopy.cards);
                if (playerCopy.count > 21) {
                    setPlayer(playerCopy);
                    setGameOver(true);
                    setInformationMessage("You lose");
                } else {
                    setDeck(updatedDeck);
                    setPlayer(playerCopy);
                }
            } else {
                setInformationMessage("Please, place the Bet");
            }
        } else {
            setInformationMessage("Game over");
        }
    }

    function pass() {
        if (!isGameOver) {
            const randomCard = getRandomCard(deck);
            let copyDeck = randomCard.updatedDeck;
            let copyDealer = dealer;
            copyDealer.cards.pop();
            copyDealer.cards.push(randomCard.card);
            copyDealer.count = cardsCount(copyDealer.cards);

            while (copyDealer.count < 17) {
                const draw = dealerDraw(copyDealer, copyDeck);
                copyDealer = draw.dealer;
                copyDeck = draw.updatedDeck;
            }

            if (copyDealer.count > 21) {
                setDeck(copyDeck);
                setDealer(copyDealer);
                setDeposit((prevDeposit) => prevDeposit + currentBet * 2);
                setGameOver(true);
                setInformationMessage("Dealer lost, You win");
            } else {
                const winner = getWinner(copyDealer, player);
                let copyDeposit = deposit;
                let message;

                if (winner === "dealer") {
                    message = "Dealer wins";
                } else if (winner === "player") {
                    copyDeposit += currentBet * 2;
                    message = "You win!";
                } else {
                    copyDeposit += currentBet;
                    message = "Push";
                }

                setDeck(copyDeck);
                setDealer(copyDealer);
                setDeposit(copyDeposit);
                setGameOver(true);
                setInformationMessage(message);
            }
        } else {
            setInformationMessage("Game over! Start a new game");
        }
    }

    function getWinner(dealer, player) {
        if (dealer.count > player.count) {
            return "dealer";
        } else if (dealer.count < player.count) {
            return "player";
        } else {
            return "push";
        }
    }

    function dealCards(deck) {
        const playerCard1 = getRandomCard(deck);
        const dealerCard1 = getRandomCard(playerCard1.updatedDeck);
        const playerCard2 = getRandomCard(dealerCard1.updatedDeck);
        //
        const playerStartHand = [playerCard1.card, playerCard2.card];
        const dealerStartHand = [dealerCard1.card, {}];

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
    }

    return (
        <div className="app">
            <AppTitle title="BlackJack" />
            <GameControlButtons startGame={startGame} hit={hit} pass={pass} />
            <Deposit
                startGame={startGame}
                isGameOver={isGameOver}
                deposit={deposit}
                inputValue={inputValue}
                setInformationMessage={setInformationMessage}
                setInputValue={setInputValue}
                setDeposit={setDeposit}
                currentBet={currentBet}
                setCurrentBet={setCurrentBet}
            />
            <GameHands dealer={dealer} player={player} />
        </div>
    );
}

export default App;
