import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

// interviewer object structure

// const interviewer = {
//   id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png",
// };

// props id:number - the id of the interviewer
// props name:string - the name of the interviewer
// props avatar:url - a url to an image of the interviewer
// props selected:boolean - determines if an interviewer is selected or not and displays the name and applies appropriate styles if selected.
// props setInterviewer:function - is run when the <InterviewerListItem> is clicked. This function receives the interviewer's id as an argument. It sets the selected interviewer.

const InterviewerListItem = (props) => {
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li
      className={interviewerClass}
      onClick={() => props.setInterviewer(props.id)}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};

export default InterviewerListItem;
