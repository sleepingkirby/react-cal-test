import React, { useState } from 'react';
import cn from './Cal.module.css'

export const Cal = ({ curDate = new Date(), dateRng = { 'start': null, 'end': null }}) => {
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);



  return (
      <div className={`${cn.Cal}`}>
      Calendar
      </div>
  )
}

