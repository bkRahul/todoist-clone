import React, { useState } from 'react';
import { FaMoon, FaSun, FaPlus, FaBars } from 'react-icons/fa';
import logo from '../../../assets/images/logo.png';
import { AddTask } from '../../Tasks/AddTask/AddTask';

export const Header = ({
  darkMode,
  setDarkMode,
  setShowSidebar,
  showSidebar,
}) => {
  const [showMain, setShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);

  const logoText = {
    color: '#fff',
    marginLeft: '10px',
    fontWeight: '500',
  };
  console.log(showSidebar);
  return (
    <header className="header" data-testid="header">
      <nav>
        <div className={showSidebar ? 'menu' : 'menu sidebar-closed'}>
          <span
            onClick={() => {
              setShowSidebar(!showSidebar);
            }}
          >
            <FaBars />
          </span>
        </div>
        <div className="logo">
          <img src={logo} alt="logo" />
          <p style={logoText}>Todoist Clone</p>
        </div>
        <div className="settings">
          <ul>
            <li className="settings__add">
              <button
                data-testid="quick-add-task-action"
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
            <li className="settings__darkmode">
              <button
                data-testid="dark-mode-action"
                tabIndex={0}
                onClick={() => setDarkMode(!darkMode)}
              >
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
  );
};
