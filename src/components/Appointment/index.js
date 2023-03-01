import React from 'react';

import './styles.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';


import useVisualMode from 'hooks/useVisualMode';

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const ERROR_SAVE = "SAVING_ERROR";
  const ERROR_MISSING_INFO = "MISSING INFO ERROR";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const ERROR_DELETE = "DELETING_ERROR";
  const EDIT = "EDITING";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  function save(name, interviewer) {

    const interview = {
      student: name,
      interviewer: interviewer
    };

    transition(SAVING);

    if (!interview.interviewer) {
      transition(ERROR_MISSING_INFO, true);
    } else {
      props.bookInterview(props.id, interview)
        .then(() => {
          transition(SHOW);
        })
        .catch(error => {
          transition(ERROR_SAVE, true);
        });
    }
  };

  function confirmation() {
    transition(CONFIRM);
  }

  function cancel() {
    transition(DELETING, true);

    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        transition(ERROR_DELETE, true);
      });
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={confirmation} onEdit={() => transition(EDIT)} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}
      {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={() => transition(SHOW)} onSave={save} />}
      {mode === SAVING && <Status message='Saving' />}
      {mode === DELETING && <Status message='Deleting' />}
      {mode === CONFIRM && <Confirm message='Are you sure you would like to delete?' onCancel={() => back()} onConfirm={cancel} />}
      {mode === ERROR_DELETE && <Error message='Error deleting appointment' onClose={() => back()} />}
      {mode === ERROR_SAVE && <Error message='Error saving appointment' onClose={() => back()} />}
      {mode === ERROR_MISSING_INFO && <Error message='You must select an interviewer' onClose={() => back()} />}
    </article>
  );
};

export default Appointment;
