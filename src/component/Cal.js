import React, { useState } from 'react';
import cn from './Cal.module.css'

export const Cal = ({ curDate = new Date(), dateRng = { 'start': null, 'end': null }}) => {
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const today = new Date();
  const mon = today.getMonth() + 1;
  const year = today.getFullYear();

  const drawMonCal = () => {
    const curMon = curDate.getMonth();
    let dayArr = [];
    let pointerDate = new Date(curDate.getFullYear(), curDate.getMonth(), 1);
    pointerDate = new Date(pointerDate.getFullYear(), pointerDate.getMonth(), (1 - pointerDate.getDay()) % 7);
    console.log(pointerDate); 
    let endDate = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0);
    //endDt.getDate()+(7-endDt.getDay())
    endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()+(7-endDate.getDay()));
    console.log(endDate);

    while(Date.parse(pointerDate) < Date.parse(endDate)){
    const day = pointerDate.getDate();
    const mon = pointerDate.getMonth(); 
      dayArr.push(
        (
          <div className={`${cn.CalMonDay}`} key={`${mon}=${day}`} >
            {day}日
          </div>
        )
      );
      pointerDate.setDate(pointerDate.getDate() + 1);
    }
    return dayArr;
  }

  const arrtest= [(<div>yes</div>), (<div>1</div>) , (<div>2</div>)]


  return (
      <div className={`${cn.Cal}`}>
        <div className={`${cn.CalMonNav}`}>
          <div className={`${cn.CalMonNavArrow}`}>&lt;</div>
          <div className={`${cn.CalMonNavDate}`}>{year}年{mon}月</div>
          <div className={`${cn.CalMonNavArrow}`}>&gt;</div>
        </div>
        <div className={`${cn.CalMon}`}>
          {drawMonCal()}
        </div>
      </div>
  )
}

