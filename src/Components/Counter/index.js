import React, {useState} from 'react'
import axios from 'axios';
import "./style.css";

const MAX_VALUE = 1000; //get this value from env (setup later);
export default function Counter(props) {
  const {count, setCount} = props;
  const [loading, setLoading] = useState(0);

  const handleInput = (e) =>{
    setLoading(1);
    updateCounter(e.target.value);
  }

  const handleIncOrDec = debounce((type) => {
    setLoading(1);
    if(type === '+'){
      updateCounter(count + 1)
    }else{
      updateCounter(count - 1)
    }
  }, 100);

  const updateCounter = async(value) => {
    if(value >= MAX_VALUE) return;

    try {
      const {data } =  await axios.put(`https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json`, {counter1 : value});
      setCount(value);
      setLoading(0);
    } catch (error) {
      console.log(error);
      setLoading(0);
    }
  }

  return (
    <>
      <div className='loader'>{loading ? "Saving counter value" : ""} </div>
      <div className="counter-conatiner">
        <button className='inc' onClick={() => handleIncOrDec('-')}> - </button>
         <input value={count} className='value' onChange={handleInput}/>
        <button className='dec' onClick={() => handleIncOrDec('+')}> + </button>
      </div>
    </>
  )
}



const debounce =(fn, time) => {
  let timeoutId
  return wrapper
  function wrapper (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      timeoutId = null
      fn(...args)
    }, time)
  }
}