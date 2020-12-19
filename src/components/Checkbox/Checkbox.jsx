import React from 'react';
import { firebase } from '../../firebase';

export const Checkbox = ({ id, task }) => {
  const archiveTask = () => {
    firebase.firestore().collection('tasks').doc(id).update({ archived: true });
  };
  return (
    <div
      className="checkbox-holder"
      data-testid="checkbox-action"
      onClick={archiveTask}
      role="button"
      aria-label={`Mark ${task} as done`}
      tabIndex={0}
    >
      <span className="checkbox" />
    </div>
  );
};
