import { useEffect, useState } from 'react';

const Keypad = ({ usedKeys }) => {
  const [letters, setLetters] = useState(null);

  useEffect(() => {
    const fetchLetters = async () => {
      const res = await fetch('http://localhost:3001/letters');
      const json = await res.json();
      setLetters(json);
    };
    fetchLetters();
  }, []);

  return (
    <div className="keypad">
      {letters &&
        letters.map((letter) => {
          const color = usedKeys[letter.key];
          return (
            <div key={letter.key} className={color}>
              {letter.key}
            </div>
          );
        })}
    </div>
  );
};

export default Keypad;
