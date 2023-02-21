import React from 'react';
import DayListItem from './DayListItem';

// props days:Array an array of objects (each object represents a day and includes an id, name, and spots)
// props day:String the currently selected day
// props setDay:Function sets the currently selected day and accepts the name of the day eg. "Monday", "Tuesday"

const DayList = (props) => {
  const dayListItems = props.days.map((day) => {
    return (
      <DayListItem
      key ={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
      />
    )
  })

  return (
    <ul>
      {dayListItems}
    </ul>
  )
}

export default DayList
