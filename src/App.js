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

      // const res = await fetch('http://localhost:3001/solutions');
      // const json = await res.json();
      // // console.log('solutions', json);

      // //     generate random int between 0 and 14
      // const randomSolution = json[Math.floor(Math.random() * json.length)];
      // setSolution(randomSolution.word);
      // // console.log('random solution', randomSolution);
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
