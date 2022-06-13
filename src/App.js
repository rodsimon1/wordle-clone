import { useEffect, useState } from 'react';
import Wordle from './components/Wordle';

function App() {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    const fetchData = async (word) => {
      const res = await fetch(`https://random-word-api.herokuapp.com/word?length=5`);
      const json = await res.json();
      // console.log(json[0]);
      setSolution(json[0]);
    };
    fetchData();
  }, [setSolution]);

  return (
    <div className="App">
      <h1>Wordle Clone</h1>

      {solution && <Wordle solution={solution} />}
    </div>
  );
}

export default App;

/* 
// json-server ./data/db.json --port 3001

  TO DO:
     -- button to start new game
*/
