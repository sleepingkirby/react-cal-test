import React, { useState } from 'react';
import './App.css';
import { Cal } from './component/Cal.js'

function App() {

  const [curDate, setCurDate] = useState(new Date()); //defaults to today
  const [dateRng, setDateRng] = useState({ 'start': null, 'end': null }); //date range selected

  return (
    <div className="App">
      <Cal curDate={curDate} dateRng={dateRng} setCurDate={setCurDate} />
    </div>
  );
}

export default App;
