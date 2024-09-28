import React, { useState } from 'react';
import cn from './Cal.module.css'

export const Cal = ({ curDate = new Date(), dateRng = { 'start': null, 'end': null }}) => {
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const today = new Date();
  const mon = today.getMonth() + 1;
  const year = today.getFullYear();

  const drawMonCal = () => {
    const days = [1,2,3,4,5,6,7,8,9];
    let dayArr = [];
    for(const day of days){
      dayArr.push(
        (
          <div className={`${cn.CalMonDay}`} key={day} >
            {day}日
          </div>
        )
      );
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

