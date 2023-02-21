import React from 'react'
import classNames from 'classnames'
import "components/DayListItem.scss";

// props name:String the name of the day
// props spots:Number the number of spots remaining
// props selected:Boolean true or false declaring that this day is selected
// props setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

const DayListItem = (props) => {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected, 
    "day-list__item--full": props.spots === 0,
  });

  const formatSpots = (spots) => {
    if (spots === 0) {
      return 'no spots remaining';
    }
    if (spots === 1) {
      return `1 spot remaining`;
    } else {
      return `${props.spots} spots remaining`;
    }

  }

  return (
    <li className={dayClass} onClick={() =>  props.setDay(props.name)}>
      <h2 className='text--regular'>{props.name}</h2>
      <h3 className='text--light'>{formatSpots(props.spots)}</h3>
    </li>
  )
}

export default DayListItem

