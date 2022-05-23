import { useState } from 'react';

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});
  const [isTooShort, setIsTooShort] = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(false);

  // format a guess into an array of letter objects
  // eg [{key: 'a', color: yellow}]
  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((char) => {
      return { key: char, color: 'grey' };
    });

    // find any green chars
    formattedGuess.forEach((char, i) => {
      if (char.key === solutionArray[i]) {
        char.color = 'green';
        solutionArray[i] = null; // necessary to avoid double match, ie. coloring yellow later
      }
    });

    // find any yellow chars
    formattedGuess.forEach((char, i) => {
      if (solutionArray.includes(char.key) && char.color !== 'green') {
        char.color = 'yellow';
        solutionArray[solutionArray.indexOf(char.key)] = null;
      }
    });
    return formattedGuess;
  };

  // add new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });

    setTurn((prevTurn) => prevTurn + 1);

    setUsedKeys((prevUSedKeys) => {
      let newKeys = { ...prevUSedKeys };

      formattedGuess.forEach((letter) => {
        const currentColor = newKeys[letter.key];

        if (letter.color === 'green') {
          newKeys[letter.key] = 'green';
          return;
        }
        if (letter.color === 'yellow' && currentColor !== 'green') {
          newKeys[letter.key] = 'yellow';
          return;
        }
        if (letter.color === 'grey' && currentColor !== ('green' || 'yellow')) {
          //                                          && currentColor !== 'yellow'
          newKeys[letter.key] = 'grey';
          return;
        }
      });

      return newKeys;
    });

    setCurrentGuess('');
  };

  // handle keyup event and track current guess
  // if user presses enter, add the new guess
  const handleKeyUp = ({ key }) => {
    if (key === 'Enter') {
      // only add guess if turn is < 5
      if (turn > 5) {
        return;
      }
      // do not allow duplicated guesses
      if (history.includes(currentGuess)) {
        setAlreadyExists(true);
        console.log('already tried that word');
        setTimeout(() => setAlreadyExists(false), 2000);
        return;
      }
      // guess should be 5 chars long
      if (currentGuess.length !== 5) {
        console.log('word must be 5 characters long');
        setIsTooShort(true);
        setTimeout(() => setIsTooShort(false), 2000);
        return;
      }

      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    if (key === 'Backspace') {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      // console.log(key);
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyUp, isTooShort, alreadyExists };
};

export default useWordle;
