const Modal = ({ isCorrect, turn, solution }) => {
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h2>You won!</h2>
          <p className="solution">{solution}</p>
          {turn === 1 ? <p>Solved on your first try, impressive!</p> : <p>You solved it in {turn} guesses =)</p>}
        </div>
      )}
      {!isCorrect && (
        <div>
          <h2>Out of guesses! =(</h2>
          <p className="solution">The word was {solution}</p>
          <p>Better luck next time</p>
        </div>
      )}
    </div>
  );
};

export default Modal;
