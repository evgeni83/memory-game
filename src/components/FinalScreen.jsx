import React from "react";

export default function ({isGameOver, startTheGame}) {
    return (
    <div className={`final-screen ${isGameOver ? "" : "hidden"}`}>
        you win!
        <button
            className="restart-btn"
            onClick={startTheGame}
        >Restart</button>
    </div>
    );
}