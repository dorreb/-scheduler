
/*  returns an array of all the appointments for a specified day */
export function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find(d => d.name === day);
  if (!dayObj) {
    return [];
  }
  const appointments = dayObj.appointments.map(id => state.appointments[id]);
  return appointments;
}


/* ------------------------------------------------------------------------------- */

/*  returns an array of all the interviewers for a specified day */
export function getInterviewersForDay(state, day) {
  const dayObj = state.days.find(d => d.name === day);
  if (!dayObj || !dayObj.interviewers) {
    return [];
  }
  const interviewers = dayObj.interviewers.map(id => state.interviewers[id]);
  return interviewers;
}


/* ------------------------------------------------------------------------------- */

/*  returns an object for an interview, containing the student name and an interviewer object containing the id, name and avatar */
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewObj = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };

  return interviewObj;
}

