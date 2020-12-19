import React from 'react';
import { firebase } from '../../../firebase';
import { useState } from 'react';
import { useProjectsValue, useSelectedProjectValue } from '../../../context';
import { FaTrashAlt } from 'react-icons/fa';

export const Project = ({ project }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  const deleteProject = (docID) => {
    firebase
      .firestore()
      .collection('projects')
      .doc(docID)
      .delete()
      .then(() => {
        setProjects([...projects]);
        setSelectedProject('INBOX');
      });
  };
  //  console.log({ project });
  return (
    <>
      <span className="sidebar__dot">&bull;</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span
        className="sidebar__project-delete"
        data-testid="delete-project"
        onClick={() => setShowConfirm(!showConfirm)}
        onKeyDown={() => setShowConfirm(!showConfirm)}
        tabIndex={0}
        role="button"
      >
        <FaTrashAlt />
        {showConfirm && (
          <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p>Are you sure you want to delete the project ?</p>
              <button onClick={() => deleteProject(project.docId)} tabIndex={0}>
                Delete
              </button>
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                onKeyDown={() => setShowConfirm(!showConfirm)}
                tabIndex={0}
                role="button"
              >
                Cancel
              </span>
            </div>
          </div>
        )}
      </span>
    </>
  );
};
