import { useState } from "react";
import { useTodo } from "../../context/TodoContext";
import { ProjectList } from "../projects/ProjectList";

export function Sidebar({ isOpen, onClose, darkMode, setDarkMode }) {
  const { dispatch } = useTodo();
  const [newProjectName, setNewProjectName] = useState("");

  function handleAddProject(e) {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    dispatch({
      type: "ADD_PROJECT",
      payload: { name: newProjectName.trim() },
    });
    setNewProjectName("");
  }

  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Nexus Tasks</h2>
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle Dark Mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <ProjectList onSelectMobile={onClose} />

        <form className="add-project-form" onSubmit={handleAddProject}>
          <input
            type="text"
            placeholder="New project name..."
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <button type="submit" className="btn-primary">
            +
          </button>
        </form>
      </aside>
    </>
  );
}