import React from 'react';
import './App.scss';
import { Content } from './components/layout/Content/Content';
import { ProjectsProvider, SelectedProjectProvider } from './context';
import { TasksProvider } from './context/tasks-context';
import WithLayout from './hoc/Layout/WithLayout';
//import { addCollectionsAndDocs } from './helpers/firebase';

// const projectData = [
//   {
//     name: '🎯 React Basics',
//     projectId: 1,
//     userId: 'chtjuMWL3bEWyMN',
//     archived: false,
//   },
//   {
//     name: '🎷 Chat App',
//     projectId: 2,
//     userId: 'chtjuMWL3bEWyMN',
//     archived: false,
//   },
//   {
//     name: '🐶 Trello Clone',
//     projectId: 3,
//     userId: 'chtjuMWL3bEWyMN',
//     archived: false,
//   },
//   {
//     name: '🛒 React Ecomm',
//     projectId: 4,
//     userId: 'chtjuMWL3bEWyMN',
//     archived: false,
//   },
//   {
//     name: '🎲 Nodejs Learn',
//     projectId: 5,
//     userId: 'chtjuMWL3bEWyMN',
//     archived: false,
//   },
// ];

export const App = () => {
  // useEffect(() => {
  //   addCollectionsAndDocs(
  //     'projects',
  //     projectData.map(({ name, projectId, userId, archived }) => ({
  //       name,
  //       projectId,
  //       userId,
  //       archived,
  //     }))
  //   );
  // }, []);
  return (
    <ProjectsProvider>
      <SelectedProjectProvider>
        <TasksProvider>
          <WithLayout>
            <Content />
          </WithLayout>
        </TasksProvider>
      </SelectedProjectProvider>
    </ProjectsProvider>
  );
};
