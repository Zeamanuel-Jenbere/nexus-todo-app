import { TodoItem } from "./TodoItem";
import { EmptyState } from "../shared/EmptyState";

export function TodoList({
  todos,
  activeProjectId,
  onOpenAddModal,
  hasActiveFilters,
}) {
  if (todos.length === 0) {
    return (
      <EmptyState
        message={
          hasActiveFilters
            ? "No tasks match your current filters."
            : "No tasks in this view yet."
        }
        subMessage={
          hasActiveFilters
            ? "Try adjusting your search or filter selections."
            : "Create your first task to get started!"
        }
        onAction={!hasActiveFilters ? onOpenAddModal : null}
        actionLabel="+ Add Task"
      />
    );
  }

  const isAllView = activeProjectId === "all";

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          projectId={isAllView ? todo.projectId : activeProjectId}
          showProjectTag={isAllView}
        />
      ))}
    </div>
  );
}