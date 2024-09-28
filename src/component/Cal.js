import React, { useState } from 'react';
import cn from './Cal.module.css'

export const Cal = ({ curDate = new Date(), dateRng = { 'start': null, 'end': null }, setCurDate = null}) => {
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const mon = curDate.getMonth() + 1;
  const year = curDate.getFullYear();

  const drawMonCal = () => {
    const curMon = curDate.getMonth();
    let dayArr = [];
    let pointerDate = new Date(curDate.getFullYear(), curDate.getMonth(), 1);
    pointerDate = new Date(pointerDate.getFullYear(), pointerDate.getMonth(), (1 - pointerDate.getDay()) % 7);
    let endDate = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0);
    endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()+(7-endDate.getDay()));

    while(Date.parse(pointerDate) < Date.parse(endDate)){
      const day = pointerDate.getDate();
      const mon = pointerDate.getMonth();
      const nonCurMonClass = pointerDate.getMonth() !== curMon ? cn.CalMonDayNonCurMon : '';//setting style/class for dates not in current month;
      const todayClass = pointerDate.toDateString() === curDate.toDateString() ? cn.CalMonDayToday : ''; //setting today style/class 
      dayArr.push(
        (
          <div className={`${cn.CalMonDay} ${nonCurMonClass} ${todayClass}`} key={`${mon}=${day}`} >
            {day}日
          </div>
        )
      );
      pointerDate.setDate(pointerDate.getDate() + 1);
    }
    return dayArr;
  }

  const setCurMonth = (val = 0) => {
    if(!val) {
    return;
    }
    let dt = new Date(curDate);
    console.log(dt.setMonth(dt.getMonth() + val));
    console.log(dt.getMonth());
    setCurDate(new Date(dt));
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

