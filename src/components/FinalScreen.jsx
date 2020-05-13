import React from "react";

export default function (props) {
    return (
    <div className={`final-screen ${props.isGameOver ? "" : "hidden"}`}>
        you win!
        <button
            className="restart-btn"
            onClick={props.startTheGame}
        >Restart</button>
    </div>
    );
}