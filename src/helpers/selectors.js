export function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find(d => d.name === day);
  if (!dayObj) {
    return [];
  }
  const appointments = dayObj.appointments.map(id => state.appointments[id]);
  return appointments;
}


/* ------------------------------------------------------------------------------- */

export function getInterviewersForDay(state, day) {
  const dayObj = state.days.find(d => d.name === day);
  if (!dayObj || !dayObj.interviewers) {
    return [];
  }
  const interviewers = dayObj.interviewers.map(id => state.interviewers[id]);
  return interviewers;
}

/* ------------------------------------------------------------------------------- */


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerObj = state.interviewers.data[interview.interviewer];
  // if i remove .data it passes all tests but then my localhost is blank because its not accessing the data...

  return {
    student: interview.student,
    interviewer: {
      id: interviewerObj.id,
      name: interviewerObj.name,
      avatar: interviewerObj.avatar
    }
  };
}
