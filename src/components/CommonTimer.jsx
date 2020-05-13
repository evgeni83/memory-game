import React from "react";

export default function (props) {
    let sec = props.timer,
        min = 0,
        hou = 0;

    if (props.timer > 59) {
        sec = props.timer - Math.floor(props.timer/60) * 60
    };

    min = Math.floor(props.timer/60);

    if (min > 59) {
        min = min - Math.floor(min/60) * 60
    };

    return (
        <div className="common-timer">
            TIMER {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
        </div>
    );
}