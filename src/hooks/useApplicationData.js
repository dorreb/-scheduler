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

    const appointment = { ...state.appointments[id], interview: { ...interview } };
    const appointments = { ...state.appointments, [id]: appointment };

    setState({ ...state, appointments });

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(response => {
        setState({
          ...state,
          appointments
        });
      })
      .catch((err) => {
        console.log("error:", err);
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

    return axios.delete(`api/appointments/${id}`)
      .then(response => {
        setState({
          ...state,
          appointments
        });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };


}

