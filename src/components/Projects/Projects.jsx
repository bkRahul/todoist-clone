import React from 'react';
import { useState } from 'react';
import { useProjectsValue, useSelectedProjectValue } from '../../context';
import { Project } from './Project/Project';

export const Projects = ({ activeValue = null }) => {
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  return (
    projects &&
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
    ))
  );
};
