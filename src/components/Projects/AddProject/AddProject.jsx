import React from "react";
import { useState } from "react";
import { useProjectsValue } from "../../../context";
import { firebase } from "../../../firebase";
import { generatePushId } from "../../../helpers";

export const AddProject = ({ shouldShow = false }) => {
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState("");
  const {projects, setProjects } = useProjectsValue();
  const projectId = generatePushId();

  const addProject = () => {
    projectName &&
      firebase
        .firestore()
        .collection("projects")
        .add({
          projectId,
          name: projectName,
          userId: "chtjuMWL3bEWyMN",
        })
        .then(function (docRef) {
          //console.log("Document written with ID: ", docRef.id);
          setProjects([...projects]);
          setProjectName("");
          setShow(false);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
  };
  return (
    <div className="add-project" data-tesid="add-project">
      {show && (
        <div className="add-project__input">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project Name"
            data-testid="project-name"
            className="add-project__name"
          />
          <button
            onClick={() => addProject()}
            className="add-project__submit"
            data-testid="add-project-submit"
          >
            Add Project
          </button>
          <span
            onClick={() => setShow(false)}
            className="add-project__cancel"
            data-testid="add-project-cancel"
          >
            Cancel
          </span>
        </div>
      )}
      <span className="add-project__plus">+</span>
      <span
        data-testid="add-project-action"
        className="add-project__text"
        onClick={() => setShow(!show)}
      >
        Add Project
      </span>
    </div>
  );
};
