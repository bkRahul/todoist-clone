import React, { useState } from 'react';
import moment from 'moment';
import { useSelectedProjectValue } from '../../../context';
import { firebase } from '../../../firebase';
import { FaRegCalendarAlt, FaRegListAlt } from 'react-icons/fa';
import { ProjectOverlay } from '../../Projects/ProjectOverlay/ProjectOverlay';
import { TaskDateOverlay } from '../../Projects/TaskDateOverlay/TaskDateOverlay';

export const AddTask = ({
  showAddTaskMain = true,
  shouldShowMain = false,
  showQuickAddTask,
  setShowQuickAddTask,
}) => {
  const [task, setTask] = useState('');
  const [taskdate, setTaskDate] = useState('');
  const [project, setProject] = useState('');
  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskdateOverlay, setShowTaskdateOverlay] = useState(false);

  const { selectedProject } = useSelectedProjectValue();

  const addTask = () => {
    let collatedDate = '';
    const projectId = project || selectedProject;
    if (projectId === 'TODAY') {
      collatedDate = moment().format('DD/MM/YYYY');
    } else if (projectId === 'NEXT_&_DAYS') {
      collatedDate = moment().add(7, 'days').format('DD/MM/YYYY');
    }
    return (
      task &&
      projectId &&
      firebase
        .firestore()
        .collection('tasks')
        .add({
          archived: false,
          date: collatedDate || taskdate,
          projectId,
          task,
          userId: 'chtjuMWL3bEWyMN',
        })
        .then(function (docRef) {
          //console.log("Document written with ID: ", docRef.id);
          setTask('');
          setProject('');
          setShowMain('');
          setShowProjectOverlay(false);
        })
        .catch(function (error) {
          console.error('Error adding document: ', error);
        })
    );
  };

  return (
    <div
      className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'}
      data-testid="add-task-comp"
    >
      {showAddTaskMain && (
        <div
          className="add-task__shallow"
          data-testid="show-main-action"
          onClick={() => setShowMain(!showMain)}
        >
          <span className="add-task__plus">+</span>
          <span className="add-task__text">Add Task</span>
        </div>
      )}
      {(showMain || showQuickAddTask) && (
        <div className="add-task__main" data-testid="add-task-main">
          {showQuickAddTask && (
            <>
              <div data-testid="quick-add-task">
                <h2 className="header">Quick Add Task</h2>
                <span
                  className="add-task__cancel-x"
                  data-testid="add-task-quick-cancel"
                  onClick={() => {
                    setShowMain(false);
                    setShowProjectOverlay(false);
                    setShowQuickAddTask(false);
                  }}
                >
                  X
                </span>
              </div>
            </>
          )}
          <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />
          <TaskDateOverlay
            setTaskDate={setTaskDate}
            showTaskdateOverlay={showTaskdateOverlay}
            setShowTaskdateOverlay={setShowTaskdateOverlay}
          />
          <input
            className="add-task__content"
            data-testid="add-task-content"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            type="button"
            className="add-task__submit"
            data-testid="add-task"
            onClick={() =>
              showQuickAddTask
                ? addTask() && setShowQuickAddTask(false)
                : addTask
            }
          >
            Add Task
          </button>
          {!showQuickAddTask && (
            <span
              className="add-task__cancel"
              data-testid="add-task-main-cancel"
              onClick={() => {
                setShowMain(false);
                setShowProjectOverlay(false);
              }}
            >
              Cancel
            </span>
          )}
          <span
            className="add-task__project"
            data-testid="show-project-overlay"
            onClick={() => setShowProjectOverlay(!showProjectOverlay)}
          >
            <FaRegListAlt />
          </span>
          <span
            className="add-task__date"
            data-testid="show-task-date-overlay"
            onClick={() => setShowTaskdateOverlay(!showTaskdateOverlay)}
          >
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  );
};
