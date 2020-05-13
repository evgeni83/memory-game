import React from "react";

export default function (props) {
    return (
    <div className={props.isGameStarted ? "start-wrapper hidden" : "start-wrapper"}>
        <button
            className="start-btn"
            onClick={props.startTheGame}
        >Start</button>
    </div>
    );
}