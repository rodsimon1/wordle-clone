import { useEffect, useState } from 'react';
import Wordle from './components/Wordle';

function App() {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3001/solutions');
      const json = await res.json();
      // console.log('solutions', json);

      //     generate random int between 0 and 14
      const randomSolution = json[Math.floor(Math.random() * json.length)];
      setSolution(randomSolution.word);
      // console.log('random solution', randomSolution);
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
     -- in victory screen, squares jump one by one before modal
*/

// solution data:
// 1- 3rd party api <-- try that next
// 2- own database (like mongo db)
// 3- json file
