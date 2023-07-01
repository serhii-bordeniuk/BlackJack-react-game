import React from "react";
import "./index.scss";

const Deposit = ({
    deposit,
    inputValue,
    setInformationMessage,
    setDeposit,
    setInputValue,
    setCurrentBet,
    currentBet,
    isGameOver,
    startGame,
}) => {
    function setBet(e) {
        e.preventDefault();
        const bet = parseInt(inputValue);
        if (bet > deposit) {
            setInformationMessage("Not enough funds to bet");
        } else if (bet % 1 !== 0) {
            setInformationMessage("Please, type whole numbers only");
        } else if (bet <= 0) {
            setInformationMessage("Type the correct number");
        } else {
            const updatedDeposit = deposit - bet;
            setInputValue("");
            setDeposit(updatedDeposit);
            setCurrentBet(bet);
        }
    }

    return (
        <div className="deposit">
            <div className="depositcontainer">
                <div className="depositInner">
                    <p className="depositCounter">{`Deposit:$${deposit}`}</p>
                    {!currentBet ? (
                        <form className="depositInputForm">
                            <input
                                className="depositInput"
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <button
                                onClick={(e) => {
                                    setBet(e);
                                }}
                                className="submitButton"
                            >
                                Place your Bet
                            </button>
                        </form>
                    ) : null}

                    {isGameOver ? (
                        <button
                            className="continueButton"
                            onClick={() => {
                                startGame("continue");
                            }}
                        >
                            Continue
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Deposit;
