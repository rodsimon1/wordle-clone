import { useEffect, useState } from 'react';
import useWordle from '../hooks/useWordle';
import ErrorModal from './ErrorModal';
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';

const Wordle = ({ solution }) => {
  const { currentGuess, handleKeyUp, guesses, isCorrect, turn, usedKeys, isTooShort, alreadyExists } = useWordle(solution);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 1000);
      window.removeEventListener('keyup', handleKeyUp);
    }

    if (turn > 5 && !isCorrect) {
      setTimeout(() => setShowModal(true), 1000);
      window.removeEventListener('keyup', handleKeyUp);
    }

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp, isCorrect, turn]);

  return (
    <>
      <button onClick={() => console.log('click')}>New Game</button>
      {/* <div>Solution is: {solution}</div>
      <div>Current guess: {currentGuess}</div> */}

      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
      <ErrorModal isTooShort={isTooShort} alreadyExists={alreadyExists} />
    </>
  );
};

export default Wordle;
