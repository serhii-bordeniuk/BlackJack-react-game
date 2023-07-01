import "./index.scss";
import { Card } from "../../components";

const GameHands = ({ dealer, player }) => {
    return (
        <div className="gameHands">
            <div className="gameHandscontainer">
                <div className="gameHandsInner">
                    <div className="playerHand">
                        <p className="handTitle">Your hand ({player?.count})</p>
                        <div className="cardsWrapper">
                            {player?.cards.map((card, i) => {
                                return <Card key={i} number={card.number} suit={card.suit} />;
                            })}
                        </div>
                    </div>
                    <div className="dealerHand">
                        <p className="handTitle">Dealer's hand ({dealer?.count})</p>
                        <div className="cardsWrapper">
                            {dealer?.cards.map((card, i) => {
                                console.log(dealer.cards);
                                return <Card key={i} number={card.number} suit={card.suit} />;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameHands;
