import React from "react";
import DayListItem from "./DayListItem";

// props days:Array an array of objects (each object represents a day and includes an id, name, and spots)
// props value:String the currently selected day
// props sonChange:Function sets the currently selected day and accepts the name of the day eg. "Monday", "Tuesday"

const DayList = (props) => {
  const dayListItems = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
      />
    );
  });

  return <ul>{dayListItems}</ul>;
};

export default DayList;
