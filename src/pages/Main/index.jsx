import { useState, useEffect } from "react";

import { AppTitle, Deposit, GameControlButtons, GameHands } from "../../components";
import {
    createNewDeck,
    dealCards,
    getRandomCard,
    cardsCount,
    dealerDraw,
    getWinner,
} from "../../utils/helper";

const telegram = window.Telegram.WebApp;

const Main = () => {
    const [deck, setDeck] = useState([]);
    const [dealer, setDealer] = useState(null);
    const [player, setPlayer] = useState(null);
    const [deposit, setDeposit] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [currentBet, setCurrentBet] = useState(null);
    const [informationMessage, setInformationMessage] = useState(false);
    const [isGameOver, setGameOver] = useState(false);
    useEffect(() => {
        startGame();
        telegram.ready();
    }, []);

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
                setInformationMessage("");
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
            setInformationMessage("");
        }
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
            if (currentBet) {
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
                setInformationMessage("Please, place the Bet");
            }
        } else {
            setInformationMessage("Game over! Start a new game");
        }
    }

    return (
        <div className="app">
            <AppTitle title="♣BlackJack♠" informationMessage={informationMessage} />
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
            <GameControlButtons startGame={startGame} hit={hit} pass={pass} />
            <GameHands dealer={dealer} player={player} />
        </div>
    );
};

export default Main;
