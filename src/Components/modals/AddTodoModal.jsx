import { useState } from "react";
import { useTodo } from "../../context/TodoContext";
import { Modal } from "./Modal";

export function AddTodoModal({ isOpen, onClose }) {
  const { state, dispatch, activeProject } = useTodo();

  const defaultProjectId = activeProject
    ? activeProject.id
    : state.projects[0]?.id || "";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [projectId, setProjectId] = useState(defaultProjectId);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    const targetProject = activeProject ? activeProject.id : projectId;
    if (!targetProject) {
      setError("Please create a project first.");
      return;
    }

    dispatch({
      type: "ADD_TODO",
      payload: {
        projectId: targetProject,
        title: title.trim(),
        description: description.trim(),
        dueDate,
        priority,
      },
    });

    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");
    setError("");
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Task">
      <form onSubmit={handleSubmit} className="todo-form">
        {error && <p className="form-error">{error}</p>}

        {!activeProject && state.projects.length > 0 && (
          <div className="form-group">
            <label>Project</label>
            <select
              value={projectId || state.projects[0].id}
              onChange={(e) => setProjectId(e.target.value)}
            >
              {state.projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            placeholder="e.g. Finish React reducer logic"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="3"
            placeholder="Add details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Add Task
          </button>
        </div>
      </form>
    </Modal>
  );
}