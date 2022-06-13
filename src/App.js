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

      <footer>
        Made with React by <a href="https://www.linkedin.com/in/rodrigo-simon/">Rodrigo Simon</a>
      </footer>
    </div>
  );
}

export default App;
