import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';

import { firebase } from '../../firebase';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    //    console.log('inside use Projects Hook');
    firebase
      .firestore()
      .collection('projects')
      .where('userId', '==', 'chtjuMWL3bEWyMN')
      .orderBy('projectId')
      .get()
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: project.id,
        }));

        //need to check to avoid infinite loop
        !isEqual(allProjects, projects) && setProjects(allProjects);
        //        console.log(projects, allProjects);
      });
  }, [projects]);

  return { projects, setProjects };
};
