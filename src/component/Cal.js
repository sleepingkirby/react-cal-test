import React, { useState } from 'react';
import cn from './Cal.module.css'

export const Cal = ({ curDate = new Date(), dateRng = { 'start': null, 'end': null }, setCurDate = null, setDateRng = null}) => {
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const mon = curDate.getMonth() + 1;
  const year = curDate.getFullYear();


  /*------------------------------------
  pre: curDate
  post: none (by itself)
  params: none
  returns: array of components to render
  generates all the days in a calendar, with proper styling, pushes them in order into an array and returns the array to be rendered
  ------------------------------------*/
  const drawMonCal = () => {
    const today = new Date()
    const curMon = curDate.getMonth();
    let dayArr = [];
    let pointerDate = new Date(curDate.getFullYear(), curDate.getMonth(), 1);
    pointerDate = new Date(pointerDate.getFullYear(), pointerDate.getMonth(), (1 - pointerDate.getDay()) % 7);
    let endDate = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0);
    endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()+(7-endDate.getDay()));

    while(Date.parse(pointerDate) < Date.parse(endDate)){
      const day = pointerDate.getDate();
      const mon = pointerDate.getMonth();
      const yr = pointerDate.getFullYear();
      const nonCurMonClass = pointerDate.getMonth() !== curMon ? cn.CalMonDayNonCurMon : '';//setting style/class for dates not in current month;
      const todayClass = pointerDate.toDateString() === today.toDateString() ? cn.CalMonDayToday : ''; //setting today style/class 
      const rngStart = dateRng?.start;
      const rngEnd = dateRng?.End;
      let rangeClass = '';
        if(dateRng && rngStart && rngEnd ) {
          if(pointerDate >= rngStart && pointerDate <= rngEnd){
          rangeClass = cn.CalMonDayActive;
          }
        }

      dayArr.push(
        (
          <div
            className={`${cn.CalMonDay} ${nonCurMonClass} ${todayClass} ${rangeClass}`}
            key={`${mon}=${day}`}
            onClick={() => {clickDate(yr, mon, day);}}
          >
            {day}日
          </div>
        )
      );
      pointerDate.setDate(pointerDate.getDate() + 1);
    }
    return dayArr;
  }


  /*------------------------------------
  pre: setCurDate
  post: updates curDate state if applicable
  params: val(number)
  returns: none
  takes in param 'val' and increments or decrements the curDate's month.
  ------------------------------------*/
  const setCurMonth = (val = 0) => {
    if(!val) {
    return;
    }
    let dt = new Date(curDate);
    dt.setMonth(dt.getMonth() + val);
    setCurDate(new Date(dt));
  }

  
  /*------------------------------------

  ------------------------------------*/
  const clickDate = (year, mon, date) => {
  console.log(year, mon, date);
  }

  return (
      <div className={`${cn.Cal}`}>
        <div className={`${cn.CalMonHeader}`}>
          <div className={`${cn.CalMonHeaderSelect}`} onClick={() => setCurMonth(-1)}>&lt;</div>
          <div className={`${cn.CalMonHeaderDate}`}>{year}年{mon}月</div>
          <div className={`${cn.CalMonHeaderSelect}`} onClick={() => setCurMonth(1)}>&gt;</div>
        </div>
        <div className={`${cn.CalMon}`}>
          {drawMonCal()}
        </div>
      </div>
  )
}

