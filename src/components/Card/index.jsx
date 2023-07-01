import React from "react";
import "./index.scss";

const Card = ({ number, suit }) => {
    const color = suit === "♦" || suit === "♥" ? "card red" : "card";
    const totalValue = number ? `${number}${suit}` : null;

    return (
        <div className={color}>
            <div className="cardInner">
                <div className="cardTitle">{totalValue}</div>
                <div className="cardTitleBottom">{totalValue}</div>
            </div>
        </div>
    );
};

export default Card;
