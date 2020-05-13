import React from "react";

export default function ({isGameStarted, startTheGame}) {
    return (
    <div className={isGameStarted ? "start-wrapper hidden" : "start-wrapper"}>
        <button
            className="start-btn"
            onClick={startTheGame}
        >Start</button>
    </div>
    );
}