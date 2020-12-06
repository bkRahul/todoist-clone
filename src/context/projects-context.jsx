import React, { useContext, createContext } from "react";
import { useProjects } from "../hooks/useProjects/projects";

export const ProjectContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const { projects, setProjects } = useProjects();
  return (
    <ProjectContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectsValue = () => useContext(ProjectContext);
