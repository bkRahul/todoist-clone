import React from 'react';
import { Tasks } from '../../Tasks/Tasks';
import { Sidebar } from '../Sidebar/Sidebar';

export const Content = ({ showSidebar }) => {
  return (
    <div className={showSidebar ? 'content' : 'content sidebar--closed'}>
      <Sidebar />
      <Tasks />
    </div>
  );
};
