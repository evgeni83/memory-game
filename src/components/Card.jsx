import React from "react";

export default function (props) {
    let className = "cardsGrid__item";

    if (props.item.isOpen) {
        className += " opened";
    }

    if (props.item.isHidden) {
        className += " hidden";
    }

    return <div
        className={className}
        onClick={ event => {
            props.openCard(props.index);
        } }
    >
        <div>{ props.item.img }</div>
        <div className="back"></div>
    </div>;
}