import React from "react";

export default function ({timer}) {
    let sec = timer,
        min = 0;

    if (timer > 59) {
        sec = timer - Math.floor(timer/60) * 60
    }

    min = Math.floor(timer/60);

    if (min > 59) {
        min = min - Math.floor(min/60) * 60
    }

    return (
        <div className="common-timer">
            TIMER {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
        </div>
    );
}