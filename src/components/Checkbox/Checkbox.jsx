import React from 'react';
import { firebase } from '../../firebase';
import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa';

export const Checkbox = ({ id, task, done }) => {
  const taskStatusToggle = () => {
    firebase.firestore().collection('tasks').doc(id).update({ done: !done });
  };
  return (
    <div className="checkTask">
      {!done ? (
        <FaRegCircle onClick={taskStatusToggle} />
      ) : (
        <FaRegCheckCircle onClick={taskStatusToggle} />
      )}
    </div>
  );
};
