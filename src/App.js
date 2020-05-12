import React from "react";
import "./App.css";
import Card from "./components/Card";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cardSet: [
                {id: 1, img: "1", isOpen: false, isHidden: false},
                {id: 2, img: "2", isOpen: false, isHidden: false},
                {id: 3, img: "3", isOpen: false, isHidden: false},
                {id: 4, img: "4", isOpen: false, isHidden: false},
                {id: 5, img: "5", isOpen: false, isHidden: false},
                {id: 6, img: "6", isOpen: false, isHidden: false},
                {id: 7, img: "7", isOpen: false, isHidden: false},
                {id: 8, img: "8", isOpen: false, isHidden: false},
                {id: 9, img: "9", isOpen: false, isHidden: false},
                {id: 10, img: "10", isOpen: false, isHidden: false},
                {id: 11, img: "11", isOpen: false, isHidden: false},
                {id: 12, img: "12", isOpen: false, isHidden: false},
                {id: 13, img: "13", isOpen: false, isHidden: false},
                {id: 14, img: "14", isOpen: false, isHidden: false},
                {id: 15, img: "15", isOpen: false, isHidden: false},
                {id: 16, img: "16", isOpen: false, isHidden: false},
                {id: 17, img: "17", isOpen: false, isHidden: false},
                {id: 18, img: "18", isOpen: false, isHidden: false},
                {id: 19, img: "1", isOpen: false, isHidden: false},
                {id: 20, img: "2", isOpen: false, isHidden: false},
                {id: 21, img: "3", isOpen: false, isHidden: false},
                {id: 22, img: "4", isOpen: false, isHidden: false},
                {id: 23, img: "5", isOpen: false, isHidden: false},
                {id: 24, img: "6", isOpen: false, isHidden: false},
                {id: 25, img: "7", isOpen: false, isHidden: false},
                {id: 26, img: "8", isOpen: false, isHidden: false},
                {id: 27, img: "9", isOpen: false, isHidden: false},
                {id: 28, img: "10", isOpen: false, isHidden: false},
                {id: 29, img: "11", isOpen: false, isHidden: false},
                {id: 30, img: "12", isOpen: false, isHidden: false},
                {id: 31, img: "13", isOpen: false, isHidden: false},
                {id: 32, img: "14", isOpen: false, isHidden: false},
                {id: 33, img: "15", isOpen: false, isHidden: false},
                {id: 34, img: "16", isOpen: false, isHidden: false},
                {id: 35, img: "17", isOpen: false, isHidden: false},
                {id: 36, img: "18", isOpen: false, isHidden: false},

            ],
        };
    }

    shuffleCards(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }


    openCard(element, index) {
        this.setState(state => state.cardSet[index].isOpen = true);
    }

    closeCard(element, index) {
        this.setState(state => state.cardSet[index].isOpen = false);
    }

    toggleCardOpening(element, item, index) {
        item.isOpen ? this.closeCard(element, index) : this.openCard(element, index);
    }

    componentDidMount() {
        this.setState({cardSet: this.shuffleCards(this.state.cardSet)});
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>MEMORY GAME</h1>
                </header>
                <main>
                    <div className="cardsGrid">
                        { this.state.cardSet.map((item, index) => {
                            return <Card
                                key={item.id}
                                item={item}
                                index={index}
                                toggleCardOpening={this.toggleCardOpening.bind(this)}/>;
                        }) }
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
