import React from "react";

export default function (props) {
    return <div
        className={ props.item.isOpen ? "cardsGrid__item opened" : "cardsGrid__item" }
        onClick={ event => {
            props.toggleCardOpening(event.currentTarget, props.item, props.index);
        } }
    >{ props.item.img }</div>;
}