import React from "react";
import { useEffect } from "react";
import "./App.scss";
import { Content } from "./components/layout/Content/Content";
import { Header } from "./components/layout/Header/Header";
import { ProjectsProvider, SelectedProjectProvider } from "./context";
import { addCollectionsAndDocs } from "./helpers/firebase";

// const projectData = [
//   {
//     name: "🎯 React Basics",
//     projectId: 1,
//     userId: "chtjuMWL3bEWyMN",
//   },
//   {
//     name: "🎷 Chat App",
//     projectId: 2,
//     userId: "chtjuMWL3bEWyMN",
//   },
//   {
//     name: "🐶 Trello Clone",
//     projectId: 3,
//     userId: "chtjuMWL3bEWyMN",
//   },
//   {
//     name: "🛒 React Ecomm",
//     projectId: 4,
//     userId: "chtjuMWL3bEWyMN",
//   },
//   {
//     name: "🎲 Nodejs Learn",
//     projectId: 5,
//     userId: "chtjuMWL3bEWyMN",
//   },
// ];

export const App = () => {
  // useEffect(() => {
  //   addCollectionsAndDocs(
  //     "projects",
  //     projectData.map(({ name, projectId, userId }) => ({
  //       name,
  //       projectId,
  //       userId,
  //     }))
  //   );
  // }, []);
  return (
    <ProjectsProvider>
      <SelectedProjectProvider>
        <div>
          <Header />
          <Content />
        </div>
      </SelectedProjectProvider>
    </ProjectsProvider>
  );
};
