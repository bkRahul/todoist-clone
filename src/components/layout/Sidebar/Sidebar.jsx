import React from "react";
import { useState } from "react";
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendar,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { useSelectedProjectValue } from "../../../context";
import { AddProject } from "../../Projects/AddProject/AddProject";
import { Projects } from "../../Projects/Projects";

export const Sidebar = () => {
  const { setSelectedProject } = useSelectedProjectValue();
  const [active, setActive] = useState("inbox");
  const [showProjects, setShowProjects] = useState(true);

  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li
          data-testid="inbox"
          className={active === "inbox" ? "active" : undefined}
          onClick={() => {
            setSelectedProject("INBOX");
            setActive("inbox");
          }}
        >
          <span>
            <FaInbox />
          </span>
          Inbox
        </li>
        <li
          data-testid="today"
          className={active === "today" ? "active" : undefined}
          onClick={() => {
            setSelectedProject("TODAY");
            setActive("today");
          }}
        >
          <span>
            <FaRegCalendar />
          </span>
          Today
        </li>
        <li
          data-testid="next_7"
          className={active === "next_7" ? "active" : undefined}
          onClick={() => {
            setSelectedProject("NEXT_7_DAYS");
            setActive("next_7");
          }}
        >
          <span>
            <FaRegCalendarAlt />
          </span>
          Next 7 days
        </li>
      </ul>
      <div
        className="sidebar__middle"
        onClick={() => setShowProjects(!showProjects)}
      >
        <span>
          <FaChevronDown
            className={!showProjects ? "hidden-projects" : undefined}
          />
        </span>
        <h2>Projects</h2>
      </div>
      <ul className="sidebar__projects">{showProjects && <Projects />}</ul>
      <AddProject />
    </div>
  );
};
