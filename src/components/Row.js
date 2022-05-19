const Row = ({ guess, currentGuess }) => {
  //
  if (guess) {
    return (
      <div className="row past">
        {guess.map((char, i) => (
          <div key={i} className={char.color}>
            {char.key}
          </div>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    return (
      <div className="row current">
        {currentGuess.split('').map((char, i) => (
          <div key={i} className="filled">
            {char}
          </div>
        ))}
        {/*                              underscore for unused value */}
        {[...Array(5 - currentGuess.length)].map((_, i) => (
          <div key={i}></div>
        ))}
      </div>
    );
  }

  return (
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Row;
