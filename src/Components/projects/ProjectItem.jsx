
import { useTodo } from "../../context/TodoContext";

export function ProjectItem({ project }) {
  const { state, dispatch } = useTodo();

  const isActive = state.activeProjectId === project.id;

  function handleSelect() {
    dispatch({
      type: "SET_ACTIVE_PROJECT",
      payload: { id: project.id },
    });
  }

  function handleDelete(e) {
    e.stopPropagation();

    if (project.id === "default") {
      alert("You cannot delete the default project.");
      return;
    }

    const confirmed = window.confirm(
      `Delete the "${project.name}" project and all its tasks?`
    );

    if (confirmed) {
      dispatch({
        type: "DELETE_PROJECT",
        payload: { id: project.id },
      });
    }
  }

  return (
    <div
      className={`project-item ${isActive ? "active" : ""}`}
      onClick={handleSelect}
    >
      <span className="project-name">
        📁 {project.name}
      </span>

      <span className="project-count">
        {project.todos.length}
      </span>

      {project.id !== "default" && (
        <button
          className="btn-icon"
          onClick={handleDelete}
          title="Delete project"
        >
          🗑️
        </button>
      )}
    </div>
  );
}
