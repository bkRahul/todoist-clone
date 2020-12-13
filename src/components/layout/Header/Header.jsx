import React, { useState } from 'react';
import { FaMoon, FaSun, FaPlus } from 'react-icons/fa';
import logo from '../../../assets/images/logo.png';
import { AddTask } from '../../Tasks/AddTask/AddTask';

export const Header = ({ darkMode, setDarkMode }) => {
  const [showMain, setShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);

  return (
    <div>
      <header className="header" data-testid="header">
        <nav>
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="settings">
            <ul>
              <li data-testid="quick-add-task-action" className="settings__add">
                <button
                  tabIndex={0}
                  onClick={() => {
                    setShowMain(true);
                    setShowQuickAddTask(true);
                  }}
                  onKeyDown={() => {
                    setShowMain(true);
                    setShowQuickAddTask(true);
                  }}
                >
                  <FaPlus />
                </button>
              </li>
              <li data-testid="dark-mode-action" className="settings__darkmode">
                <button tabIndex={0} onClick={() => setDarkMode(!darkMode)}>
                  {darkMode ? <FaSun /> : <FaMoon />}
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <AddTask
          showAddTaskMain={false}
          shouldShowMain={showMain}
          showQuickAddTask={showQuickAddTask}
          setShowQuickAddTask={setShowQuickAddTask}
        />
      </header>
    </div>
  );
};
