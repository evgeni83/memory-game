import React from "react";
import CommonTimer from "./CommonTimer";

export default function ({isGameOver, startTheGame, timer, results}) {
    return (
        <div className={ `final-screen ${ isGameOver ? "" : "hidden" }` }>
            you win!
            <span className="time-is">your time is</span>
            <CommonTimer timer={ timer }/>
            <button
                className="restart-btn"
                onClick={ startTheGame }
            >Restart
            </button>
            <h2 className="results-title">your last results</h2>
            <div className="last-results">
                { results.map((item, i) => {
                    return (
                        <div className="result" key={ i }>
                            { i + 1 }. <CommonTimer timer={ item }/>
                        </div>
                    );
                }) }
            </div>
        </div>
    );
}