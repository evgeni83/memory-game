import React from "react";
import Card from "./Card";

export default function ({cardSet, openCard}) {
    return (
        <div className="cardsGrid">
            { cardSet.map((item, index) => {
                return <Card
                    key={ item.id }
                    item={ item }
                    index={ index }
                    openCard={ openCard }/>;
            }) }
        </div>
    )
}