import React from "react";
import { Tasks } from "../../Tasks/Tasks";
import { Sidebar } from "../Sidebar/Sidebar";

export const Content = () => {
  return (
    <div className="content">
      <Sidebar />
      <Tasks />
    </div>
  );
};
