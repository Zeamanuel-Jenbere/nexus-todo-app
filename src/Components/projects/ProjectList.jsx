import { useTodo } from "../../context/TodoContext";
import { ProjectItem } from "./ProjectItem";

export function ProjectList({ onSelectMobile }) {
  const { state, dispatch, allTodos } = useTodo();
  const isAllActive = state.activeProjectId === "all";
  const allOpenCount = allTodos.filter((t) => t.status !== "done").length;

  return (
    <div className="project-list">
      <div
        className={`project-item all-tasks-item ${isAllActive ? "active" : ""}`}
        onClick={() => {
          dispatch({ type: "SET_ACTIVE_PROJECT", payload: { id: "all" } });
          if (onSelectMobile) onSelectMobile();
        }}
      >
        <span className="project-name">📂 All Tasks</span>
        <span className="count-badge">{allOpenCount}</span>
      </div>

      <div className="sidebar-section-label">PROJECTS</div>

      {state.projects.map((project) => (
        <ProjectItem
          key={project.id}
          project={project}
          onSelectMobile={onSelectMobile}
        />
      ))}
    </div>
  );
}