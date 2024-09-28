import React, { useState, forwardRef, useImperativeHandle } from 'react';
import cn from './Cal.module.css'

//export const Cal = forwardRef(({ curDate = new Date(), setCurDate = null, dateRngStart = null, setDateRngStart = null, dateRngEnd = null, setDateRngEnd = null}) => {
export const Cal = forwardRef(({ curDate = new Date(), setCurDate = null, dateRngStart = null, setDateRngStart = null, dateRngEnd = null, setDateRngEnd = null}, ref) => {
  
  const [startDate, setStartDate] = useState(null); //These do NOT affect the visual elements of the page. These are buffers/sanity checkers for dateRng
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

    while(Date.parse(pointerDate) < Date.parse(endDate)) {
      const day = pointerDate.getDate();
      const mon = pointerDate.getMonth();
      const yr = pointerDate.getFullYear();
      let nonCurMonClass = pointerDate.getMonth() !== curMon ? cn.CalMonDayNonCurMon : '';//setting style/class for dates not in current month;
      let todayClass = pointerDate.toDateString() === today.toDateString() ? cn.CalMonDayToday : ''; //setting today style/class 
      const rngStart = dateRngStart;
      const rngEnd = dateRngEnd;
      let rangeClass = '';
        if(rngStart && rngEnd) {
          if(pointerDate >= rngStart && pointerDate <= rngEnd){
          rangeClass = cn.CalMonDayActive;
          nonCurMonClass = '';
          todayClass = '';
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
  pre: dateRng, setDateRng
  post: possible sets dateRng
  logic for setting dateRng.
  ------------------------------------*/
  const clickDate = (year, mon, date) => {
    if(!year || !mon || !date){
    return;
    }
    //first date click
    if(!startDate) {
      setStartDate(new Date(year, mon, date));
      setDateRngStart(new Date(year, mon, date));
      setDateRngEnd(new Date(year, mon, date));
      return;
    }
    const clickDate = new Date(year, mon, date);
    if(clickDate < startDate) {
      setStartDate(new Date(year, mon, date));
      setDateRngStart(new Date(year, mon, date));
      setDateRngEnd(new Date(year, mon, date));
      return;
    }
    if(clickDate >= startDate) {
      setDateRngEnd(new Date(year, mon, date));
    }
  }


  //reference for parent to call clear startDate
  useImperativeHandle(ref, () => {
    return {
      clearDates() {
        setStartDate(null);
      }
    };
  }, []);

  return (
      <div className={`${cn.Cal}`} >
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
});

