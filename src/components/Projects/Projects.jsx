import React from 'react';
import { useProjectsValue, useSelectedProjectValue } from '../../context';
import { AddProject } from './AddProject/AddProject';
import { Project } from './Project/Project';

export const Projects = ({ active, setActive, projects }) => {
  const { setSelectedProject } = useSelectedProjectValue();
  // const { projects } = useProjectsValue();

  return (
    <>
      {projects &&
        projects.map((project) => (
          <li
            data-testid="project-list"
            key={project.projectId}
            data-doc-id={project.docId}
            className={
              active === project.projectId
                ? ' active sidebar__project'
                : 'sidebar__project'
            }
          >
            <button
              data-testid="project-action"
              className="sidebar__project--single"
              onKeyDown={() => {
                setActive(project.projectId);
                setSelectedProject(project.projectId);
              }}
              onClick={() => {
                setActive(project.projectId);
                setSelectedProject(project.projectId);
              }}
              tabIndex={0}
            >
              <Project project={project} />
            </button>
          </li>
        ))}
      <AddProject setActive={setActive} />
    </>
  );
};
