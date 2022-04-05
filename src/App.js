import React, { useState, useEffect } from 'react'
import './App.css';
import Counter from './Components/Counter';
import axios from 'axios';


const INITIAL_DEFAULT_VALUE =1;
function App() {
  const [count, setCount] = useState(INITIAL_DEFAULT_VALUE);

  useEffect(() => {
    getData()
  }, []);

  const getData = async() => {
    const {data} = await axios.get('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json');
    if(data) setCount(data);
    else setCount(INITIAL_DEFAULT_VALUE);
  }
  return (
    <div className="App">
      <div className="counter">
        <Counter
          count={count}
          setCount={setCount}
        />
        <p className='value-text'>Counter value : {count}</p>
      </div>
    </div>
  );
}

export default App;
