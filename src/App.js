import React, { useState, useRef } from 'react';
import './App.css';
import { Cal } from './component/Cal.js'

function App() {

  const [curDate, setCurDate] = useState(new Date()); //defaults to today
  const [dateRngStart, setDateRngStart] = useState(null); //date range selected
  const [dateRngEnd, setDateRngEnd] = useState(null); //date range selected

  const calRef = useRef();

  const clearDates = () => {
    if(calRef.current){
    setDateRngStart(null);
    setDateRngEnd(null);
    calRef.current.clearDates();
    }
  }


  return (
    <div className="App">
      <button onClick={() => clearDates() } >Clear</button>
      <Cal
        curDate={curDate}
        dateRngStart={dateRngStart}
        dateRngEnd={dateRngEnd}
        setCurDate={setCurDate}
        setDateRngStart={setDateRngStart}
        setDateRngEnd={setDateRngEnd}
        ref={calRef}
      />
    </div>
  );
}

export default App;
