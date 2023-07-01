import React from "react";
import "./index.scss";

const GameControlButtons = ({ startGame, hit, pass }) => {
    return (
        <div className="gameControlButtonscontainer">
            <div className="gameControlButtonsInner">
                <div className="mainButtonArea">
                    <button
                        className="startButton button"
                        onClick={() => {
                            startGame();
                        }}
                    >
                        Start new game
                    </button>
                </div>
                <div className="buttonsArea">
                    <button
                        className="hitButton button"
                        onClick={() => {
                            hit();
                        }}
                    >
                        Hit
                    </button>
                    <button
                        className="passButton button"
                        onClick={() => {
                            pass();
                        }}
                    >
                        Pass
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameControlButtons;
