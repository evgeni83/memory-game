import React from "react";

export default function ({item, index, openCard}) {
    let className = "cardsGrid__item";

    if (item.isOpen) {
        className += " opened";
    }

    if (item.isHidden) {
        className += " hidden";
    }

    return <div
        className={ className }
        onClick={ () => {
            openCard(index);
        } }
    >
        <div className="img-wrap"><img className="img" src={ item.img } alt="icon"/></div>
    </div>;
}