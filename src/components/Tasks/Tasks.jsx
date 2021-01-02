import React, { useEffect } from 'react';
import { firebase } from '../../firebase';
import { FaTrash } from 'react-icons/fa';
import { collatedTasks } from '../../constants';
import { useProjectsValue, useSelectedProjectValue } from '../../context';
import { collatedTasksExist, getCollatedTitle, getTitle } from '../../helpers';
import { useTasks } from '../../hooks/useTasks/tasks';
import { Checkbox } from '../Checkbox/Checkbox';
import { AddTask } from './AddTask/AddTask';

export const Tasks = () => {
  //get all the projects
  const { projects } = useProjectsValue();
  //get selected Project Id
  const { selectedProject } = useSelectedProjectValue();
  const { tasks } = useTasks(selectedProject);
  let projectName = '';

  const deleteTasks = (docId) => {
    firebase
      .firestore()
      .collection('tasks')
      .doc(docId)
      .delete()
      .then(() => {
        //        setProjects([...tasks]);
      });
  };

  // console.log("tasks===", tasks);
  // console.log("projects===", projects);
  // console.log("selectedProject ===", selectedProject);
  // console.log(
  //   "!collatedTasksExist(selectedProject) ===",
  //   !collatedTasksExist(selectedProject)
  // );

  //if projects does not exist in INBOX NEXT7DAYS or TODAY
  if (projects && selectedProject && !collatedTasksExist(selectedProject)) {
    projectName = getTitle(projects, selectedProject)?.name;
    //    console.log('collatedTasksExist!==', projectName);
  }

  //if projects exist in INBOX NEXT7DAYS or TODAY
  if (selectedProject && collatedTasksExist(selectedProject)) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).value;
    //    console.log('collatedTasksExist===', projectName);
  }

  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  });

  return (
    <div
      className={tasks.length !== 0 ? 'tasks' : 'tasks tasks--empty'}
      data-testid="tasks"
    >
      <h2 data-testid="project-name">{projectName}</h2>
      <ul className="tasks__list">
        {tasks.map(({ id, task, done }) => (
          <li key={id}>
            <Checkbox id={id} task={task} done={done} />
            <span className={done ? 'done' : undefined}>{task}</span>
            <span className="delete" onClick={() => deleteTasks(id)}>
              <FaTrash />
            </span>
          </li>
        ))}
      </ul>
      <AddTask />
    </div>
  );
};
