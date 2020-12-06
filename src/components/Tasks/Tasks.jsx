import React from "react";
import { useEffect } from "react";
import { collatedTasks } from "../../constants";
import { useProjectsValue, useSelectedProjectValue } from "../../context";
import { collatedTasksExist, getCollatedTitle, getTitle } from "../../helpers";
import { useTasks } from "../../hooks/useTasks/tasks";
import { Checkbox } from "../Checkbox/Checkbox";
import { AddTask } from "./AddTask/AddTask";

export const Tasks = () => {
  //get all the projects
  const { projects } = useProjectsValue();
  //get selected Project Id
  const { selectedProject } = useSelectedProjectValue();
  const { tasks } = useTasks(selectedProject);
  let projectName = "";

  // console.log("tasks===", tasks);
  // console.log("projects===", projects);
  // console.log("selectedProject ===", selectedProject);
  // console.log(
  //   "!collatedTasksExist(selectedProject) ===",
  //   !collatedTasksExist(selectedProject)
  // );

  //if projects does not exist in INBOX NEXT7DAYS or TODAY
  if (projects && selectedProject && !collatedTasksExist(selectedProject)) {
    projectName = getTitle(projects, selectedProject).name;
    //    console.log("collatedTasksExist!==", projectName);
  }

  //if projects exist in INBOX NEXT7DAYS or TODAY
  if (selectedProject && collatedTasksExist(selectedProject)) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).value;
    //    console.log("collatedTasksExist===", projectName);
  }

  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  });

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">{projectName}</h2>
      <ul className="tasks__list">
        {tasks.map(({ id, task }) => (
          <li key={id}>
            <Checkbox id={id} />
            <span>{task}</span>
          </li>
        ))}
      </ul>
      <AddTask />
    </div>
  );
};
