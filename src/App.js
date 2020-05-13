import React from "react";
import "./App.css";
import StartScreen from "./components/StartScreen";
import CommonTimer from "./components/CommonTimer";
import FinalScreen from "./components/FinalScreen";
import CardsGrid from "./components/CardsGrid";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cardSet: [
                {id: 1, img: "images/001-flat.png", isOpen: false, isHidden: false},
                {id: 2, img: "images/001-viburnum-fruit.png", isOpen: false, isHidden: false},
                {id: 3, img: "images/002-oranges.png", isOpen: false, isHidden: false},
                {id: 4, img: "images/002-organic.png", isOpen: false, isHidden: false},
                {id: 5, img: "images/003-organic.png", isOpen: false, isHidden: false},
                {id: 6, img: "images/003-raspberry-pi.png", isOpen: false, isHidden: false},
                {id: 7, img: "images/004-vegetables.png", isOpen: false, isHidden: false},
                {id: 8, img: "images/004-viburnum-fruit.png", isOpen: false, isHidden: false},
                {id: 9, img: "images/005-healthy-food.png", isOpen: false, isHidden: false},
                {id: 10, img: "images/005-vegetables.png", isOpen: false, isHidden: false},
                {id: 11, img: "images/006-healthy.png", isOpen: false, isHidden: false},
                {id: 12, img: "images/006-vegetal-oil.png", isOpen: false, isHidden: false},
                {id: 13, img: "images/007-organic-1.png", isOpen: false, isHidden: false},
                {id: 14, img: "images/008-fattening.png", isOpen: false, isHidden: false},
                {id: 15, img: "images/008-organic-2.png", isOpen: false, isHidden: false},
                {id: 16, img: "images/009-cucumbers.png", isOpen: false, isHidden: false},
                {id: 17, img: "images/009-organic-2.png", isOpen: false, isHidden: false},
                {id: 18, img: "images/010-healthy-food-1.png", isOpen: false, isHidden: false},
                {id: 19, img: "images/001-flat.png", isOpen: false, isHidden: false},
                {id: 20, img: "images/001-viburnum-fruit.png", isOpen: false, isHidden: false},
                {id: 21, img: "images/002-oranges.png", isOpen: false, isHidden: false},
                {id: 22, img: "images/002-organic.png", isOpen: false, isHidden: false},
                {id: 23, img: "images/003-organic.png", isOpen: false, isHidden: false},
                {id: 24, img: "images/003-raspberry-pi.png", isOpen: false, isHidden: false},
                {id: 25, img: "images/004-vegetables.png", isOpen: false, isHidden: false},
                {id: 26, img: "images/004-viburnum-fruit.png", isOpen: false, isHidden: false},
                {id: 27, img: "images/005-healthy-food.png", isOpen: false, isHidden: false},
                {id: 28, img: "images/005-vegetables.png", isOpen: false, isHidden: false},
                {id: 29, img: "images/006-healthy.png", isOpen: false, isHidden: false},
                {id: 30, img: "images/006-vegetal-oil.png", isOpen: false, isHidden: false},
                {id: 31, img: "images/007-organic-1.png", isOpen: false, isHidden: false},
                {id: 32, img: "images/008-fattening.png", isOpen: false, isHidden: false},
                {id: 33, img: "images/008-organic-2.png", isOpen: false, isHidden: false},
                {id: 34, img: "images/009-cucumbers.png", isOpen: false, isHidden: false},
                {id: 35, img: "images/009-organic-2.png", isOpen: false, isHidden: false},
                {id: 36, img: "images/010-healthy-food-1.png", isOpen: false, isHidden: false},
            ],
            cardsToCompare: [],
            isGameStarted: false,
            timer: 0,
            localTimer: 0,
            isGameOver: false,
        };
    }

    shuffleCards(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    startCommonTimer() {
        this.timerID = setInterval(() => {
            this.setState({
                timer: this.state.timer + 1
            });
        }, 1000);
    };

    startLocalTimer() {
        this.localTimerID = setInterval(() => {
            this.setState({
                localTimer: this.state.localTimer + 1
            });
        }, 1000);
    };

    startTheGame() {
        this.setState(state => state.cardSet.forEach(elem => {
            elem.isHidden = false;
            return elem;
        }));
        this.setState({cardSet: this.shuffleCards(this.state.cardSet)});
        this.setState({
            cardsToCompare: [],
            isGameStarted: true,
            timer: 0,
            isGameOver: false,
        });
        this.startCommonTimer();
    }

    openCard(index) {
        if (this.state.cardsToCompare.length === 0) {
            this.startLocalTimer()
        }
        if (this.state.cardsToCompare.length < 2) {
            if (this.state.cardSet[index].isOpen === false) {
                this.setState(state => state.cardSet[index].isOpen = true);
                this.setState({
                    cardsToCompare: [...this.state.cardsToCompare, this.state.cardSet[index]]
                });
                this.compareOpenedCards();
            }
        } else {
            return false;
        }
    }

    compareOpenedCards() {
        setTimeout(() => {
            if (this.state.cardsToCompare.length >= 2) {
                if (this.state.cardsToCompare[0].img === this.state.cardsToCompare[1].img) {
                    this.setState(state => state.cardSet.forEach(elem => {
                        if (elem.id === state.cardsToCompare[0].id || elem.id === state.cardsToCompare[1].id) {
                            elem.isHidden = true;
                            return elem;
                        }
                        return elem;
                    }));

                    if (this.state.cardSet.length === this.state.cardSet.filter(elem => elem.isHidden).length) {
                        this.stopTheGame();
                    }
                }
                this.closeCards();
            }
        }, 2000);
    }

    closeCards() {
        this.setState(state => state.cardSet.forEach(el => {
            el.isOpen = false;
            return el;
        }));
        this.setState({cardsToCompare: []});
        this.stopLocalTimer();
    }

    stopLocalTimer() {
        clearInterval(this.localTimerID);
        this.setState({localTimer: 0});
    }

    stopTheGame() {
        this.setState({isGameOver: true});
        clearInterval(this.timerID);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.localTimer >= 5) {
            this.closeCards()
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>MEMORY GAME</h1>
                    <CommonTimer timer={ this.state.timer }/>
                </header>
                <main>
                    <StartScreen
                        isGameStarted={ this.state.isGameStarted }
                        startTheGame={ this.startTheGame.bind(this) }
                    />
                    <FinalScreen
                        isGameOver={ this.state.isGameOver }
                        startTheGame={ this.startTheGame.bind(this) }
                    />
                    <CardsGrid
                        cardSet={this.state.cardSet}
                        openCard={ this.openCard.bind(this) }
                    />
                </main>
            </div>
        );
    }
}

export default App;
