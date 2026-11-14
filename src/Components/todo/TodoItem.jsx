import { useState } from "react";
import { useTodo } from "../../context/TodoContext";
import { PriorityBadge } from "../shared/PriorityBadge";
import { EditTodoModal } from "../modals/EditTodoModal";
import { ConfirmDialog } from "../shared/ConfirmDialog";

export function TodoItem({ todo, projectId, showProjectTag }) {
  const { dispatch } = useTodo();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const todayStr = new Date().toISOString().split("T")[0];
  const isOverdue =
    todo.dueDate && todo.dueDate < todayStr && todo.status !== "done";

  function handleToggle() {
    dispatch({
      type: "TOGGLE_STATUS",
      payload: { id: todo.id, projectId },
    });
  }

  function handleStatusChange(e) {
    dispatch({
      type: "UPDATE_TODO",
      payload: {
        id: todo.id,
        projectId,
        updates: { status: e.target.value },
      },
    });
  }

  function handleDelete() {
    dispatch({
      type: "DELETE_TODO",
      payload: { id: todo.id, projectId },
    });
    setIsConfirmOpen(false);
  }

  return (
    <>
      <div
        className={`todo-item priority-${todo.priority} status-${todo.status} ${
          isOverdue ? "overdue" : ""
        }`}
      >
        <div className="todo-main">
          <input
            type="checkbox"
            checked={todo.status === "done"}
            onChange={handleToggle}
          />
          <div className="todo-content">
            <div className="todo-title-row">
              <span
                className={`todo-title ${
                  todo.status === "done"
                    ? "strikethrough"
                    : todo.status === "in-progress"
                      ? "in-progress-text"
                      : ""
                }`}
              >
                {todo.title}
              </span>
              <PriorityBadge priority={todo.priority} />
              {showProjectTag && todo.projectName && (
                <span className="project-tag">{todo.projectName}</span>
              )}
            </div>

            {todo.description && (
              <p className="todo-description">{todo.description}</p>
            )}

            <div className="todo-meta">
              {todo.dueDate && (
                <span className={`due-date ${isOverdue ? "overdue-text" : ""}`}>
                  {isOverdue ? "⚠️ Overdue: " : "📅 "}
                  {todo.dueDate}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="todo-actions">
          <select
            className="status-select"
            value={todo.status}
            onChange={handleStatusChange}
            aria-label="Task Status"
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <button
            className="btn-icon"
            onClick={() => setIsEditOpen(true)}
            title="Edit"
          >
            ✏️
          </button>
          <button
            className="btn-icon"
            onClick={() => setIsConfirmOpen(true)}
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>

      <EditTodoModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        todo={todo}
        projectId={projectId}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Delete Task"
        message={`Are you sure you want to delete "${todo.title}"?`}
        onConfirm={handleDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </>
  );
}