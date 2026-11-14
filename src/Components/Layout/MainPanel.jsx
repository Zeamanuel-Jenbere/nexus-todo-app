
import { useState } from "react";
import { useTodo } from "../../context/TodoContext";
import { useFilteredTodos } from "../../hooks/useFilteredTodos";
import { TodoStats } from "../todo/TodoState";
import { TodoFilters } from "../todo/TodoFilters";
import { TodoList } from "../todo/TodoList";
import { AddTodoModal } from "../modals/AddTodoModal";

export function MainPanel({ onOpenSidebar }) {
  const { state, activeProject, allTodos } = useTodo();

  const [isAddOpen, setIsAddOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    priority: "all",
    dueDate: "all",
    sortBy: "createdAt",
  });

  const isAllView = state.activeProjectId === "all";

  const currentTodos = isAllView
    ? allTodos
    : activeProject?.todos || [];

  const filteredTodos = useFilteredTodos(currentTodos, filters);

  const hasActiveFilters =
    filters.search !== "" ||
    filters.status !== "all" ||
    filters.priority !== "all" ||
    filters.dueDate !== "all";

  return (
    <main className="main-panel">
      <header className="main-header">
        <div className="header-left">
          <button
            className="mobile-menu-btn"
            onClick={onOpenSidebar}
          >
            ☰
          </button>

          <h1>
            {isAllView
              ? "All Tasks"
              : activeProject?.name || "Tasks"}
          </h1>
        </div>

        <button
          className="btn-primary"
          onClick={() => setIsAddOpen(true)}
        >
          + Add Task
        </button>
      </header>

      <TodoStats todos={currentTodos} />

      <TodoFilters
        filters={filters}
        setFilters={setFilters}
      />

      <TodoList
        todos={filteredTodos}
        activeProjectId={state.activeProjectId}
        onOpenAddModal={() => setIsAddOpen(true)}
        hasActiveFilters={hasActiveFilters}
      />

      <AddTodoModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
      />
    </main>
  );
}
