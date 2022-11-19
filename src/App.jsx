import { useState, useEffect, useContext } from "react";
import "./App.sass";
import Header from "./components/Header";
import SingleCard from "./components/SingleCard";
import { ThemeContext } from "./Context/ThemeContext";

const sportsImg = [
  { src: "/images/football.png", matched: false },
  { src: "/images/badminton.png", matched: false },
  { src: "/images/baseball.png", matched: false },
  { src: "/images/basketball.png", matched: false },
  { src: "/images/rugby.png", matched: false },
  { src: "/images/volleyball.png", matched: false },
];

const animalsImg = [
  { src: "/images/football.png", matched: false },
  { src: "/images/badminton.png", matched: false },
  { src: "/images/baseball.png", matched: false },
  { src: "/images/basketball.png", matched: false },
  { src: "/images/rugby.png", matched: false },
  { src: "/images/volleyball.png", matched: false },
  { src: "/images/baseball.png", matched: false },
  { src: "/images/basketball.png", matched: false },
  { src: "/images/rugby.png", matched: false },
  { src: "/images/volleyball.png", matched: false },
];

function App() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle
  const shuffleCards = () => {
    let images;
    if (theme === "sports") {
      images = sportsImg;
    } else {
      images = animalsImg;
    }
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
  };

  //handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  //reset choice
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  //start new game
  useEffect(() => {
    shuffleCards();
  }, [theme]);

  return (
    <div className="App">
      <Header shuffleCards={shuffleCards} setTheme={setTheme} />

      <div className={theme === "sports" ? "sports-grid" : "animals-grid"}>
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
