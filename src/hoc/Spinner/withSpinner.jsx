import React, { useState, useEffect } from 'react';
import { useProjectsValue } from '../../context';
import { useTasksValue } from '../../context/tasks-context';
import { useLocalStorage } from '../../hooks/useLocalStorage/localStorage';
import './withSpinner.scss';

const withSpinner = (WrappedComponent) => {
  const Spinner = ({ ...props }) => {
    const { projects } = useProjectsValue();
    const { tasks } = useTasksValue();
    const [darkMode] = useLocalStorage('darkmode');

    const [isLoading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
      projects.length === 0 && setMessage('Loading Projects...');
      tasks.length === 0 && setMessage('Loading Tasks..');
      if (projects.length !== 0 && tasks.length !== 0) {
        setLoading(false);
        setMessage('');
      }
    }, [projects, tasks]);
    return isLoading ? (
      <div
        className={darkMode ? 'loader-container darkMode' : 'loader-container'}
      >
        <svg className="loader" viewBox="0 0 24 24">
          <circle className="loader__value" cx="12" cy="12" r="10" />
          <circle className="loader__value" cx="12" cy="12" r="10" />
          <circle className="loader__value" cx="12" cy="12" r="10" />
          <circle className="loader__value" cx="12" cy="12" r="10" />
          <circle className="loader__value" cx="12" cy="12" r="10" />
          <circle className="loader__value" cx="12" cy="12" r="10" />
        </svg>
        <p>{message}</p>
      </div>
    ) : (
      <WrappedComponent {...props} />
    );
  };
  return Spinner;
};

export default withSpinner;
