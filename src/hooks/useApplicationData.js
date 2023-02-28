import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
      .catch((err) => console.log(err));

  }, []);

  const bookInterview = (id, interview) => {

    let days = state.days;

    /*
     Check to see if the appointment is being created from a previously null appointment
     if so, updating days to decrease the number of spots available for that day
     */
    if (!state.appointments[id].interview) {
      days = state.days.map((day) => {
        const dayCopy = { ...day };
        if (dayCopy.appointments.includes(id)) {
          dayCopy.spots--;
          return dayCopy;
        } else {
          return dayCopy;
        }
      });
    }

    const appointment = { ...state.appointments[id], interview: { ...interview } };
    const appointments = { ...state.appointments, [id]: appointment };

    setState({ ...state, appointments });

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(response => {
        setState({
          ...state, days,
          appointments
        });
      });
  };


  function cancelInterview(id) {

    const nullAppointment = {
      ...state.appointments[id],
      interview: { ...state.appointments[id].interview }
    };

    nullAppointment.interview.interviewer = null;
    nullAppointment.interview.student = null;

    const appointments = {
      ...state.appointments,
      [id]: nullAppointment
    };

    /*
     Updating days to increase the interview spots available on the day where the interview is being deleted
   */
    const days = state.days.map((day) => {
      const dayCopy = { ...day };
      if (dayCopy.appointments.includes(id)) {
        dayCopy.spots++;
        return dayCopy;
      } else {
        return dayCopy;
      }
    });

    return axios.delete(`api/appointments/${id}`)
      .then(response => {
        setState({
          ...state, days,
          appointments
        });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };


}

