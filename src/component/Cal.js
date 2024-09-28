import React, { useState } from 'react';
import cn from './Cal.module.css'

export const Cal = ({ curDate = new Date(), dateRng = { 'start': null, 'end': null }}) => {
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const today = new Date();
  const mon = today.getMonth() + 1;
  const year = today.getFullYear() + 1;

  return (
      <div className={`${cn.Cal}`}>
        <div className={`${cn.CalMonNav}`}>
          <div className={`${cn.CalMonNavArrow}`}>&lt;</div>
          <div className={`${cn.CalMonNavDate}`}>{year}年{mon}月</div>
          <div className={`${cn.CalMonNavArrow}`}>&gt;</div>
        </div>
      Calendar
      </div>
  )
}

