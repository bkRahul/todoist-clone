import moment from "moment";
import { firebase } from "../../firebase";
import { useState, useEffect } from "react";
//all tasks merged into one
import { collatedTasksExist } from "../../helpers";

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);
  console.log("selectedProject ===", selectedProject);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("tasks")
      .where("userId", "==", "chtjuMWL3bEWyMN");

    // unsubscribe =
    //   selectedProject && !collatedTasksExist(selectedProject)
    //     ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
    //     : selectedProject === 'TODAY'
    //     ? (unsubscribe = unsubscribe.where(
    //         'date',
    //         '==',
    //         moment().format('DD/MM/YYYY')
    //       ))
    //     : selectedProject === 'INBOX' || selectedProject === 0
    //     ? (unsubscribe = unsubscribe.where('date', '==', ''))
    //     : unsubscribe;

    //if selected project does not exist in collatedTasks

    if (selectedProject && !collatedTasksExist(selectedProject)) {
      unsubscribe = unsubscribe.where("projectId", "==", selectedProject);
      console.log(
        "selectedProject === ID & !collated tasks =>>>>",
        unsubscribe
      );
    } else if (selectedProject === "TODAY") {
      unsubscribe = unsubscribe.where(
        "date",
        "==",
        moment().format("DD/MM/YYYY")
      );
      console.log("selectedProject === TODAY =>>>>", unsubscribe);
    } else if (selectedProject === "INBOX" || selectedProject === 0) {
      unsubscribe = unsubscribe.where("date", "==", "");
      console.log(
        "selectedProject === INBOX || selectedProject === 0 =>>>>",
        unsubscribe
      );
    }

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));

      setTasks(
        selectedProject === "NEXT_7"
          ? newTasks.filter(
              (task) =>
                moment(task.date, "DD-MM-YYYY").diff(moment(), "days") <= 7 &&
                task.archived !== true
            )
          : newTasks.filter((task) => task.archived !== true)
      );
      setArchivedTasks(newTasks.filter((task) => task.archived !== false));
    });

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};