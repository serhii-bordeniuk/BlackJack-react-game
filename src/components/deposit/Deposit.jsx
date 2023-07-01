import React from "react";
import "./deposit.scss";

export const Deposit = ({
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
        const bet = inputValue;
        if (bet > deposit) {
            setInformationMessage("Not enough items to bet");
        } else if (bet % 1 !== 0) {
            setInformationMessage("Please, type whole numbers only");
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
                                Bet
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
