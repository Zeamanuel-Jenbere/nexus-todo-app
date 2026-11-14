import { useMemo } from "react";

const PRIORITY_WEIGHT = {
  urgent: 4,
  high: 3,
  medium: 2,
  low: 1,
};

export function useFilteredTodos(todos, filters) {
  return useMemo(() => {
    const todayStr = new Date().toISOString().split("T")[0];

    const filtered = todos.filter((todo) => {
      if (
        filters.search &&
        !todo.title.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      if (filters.status !== "all" && todo.status !== filters.status) {
        return false;
      }

      if (filters.priority !== "all" && todo.priority !== filters.priority) {
        return false;
      }

      if (filters.dueDate === "overdue") {
        if (!todo.dueDate || todo.dueDate >= todayStr || todo.status === "done")
          return false;
      } else if (filters.dueDate === "today") {
        if (todo.dueDate !== todayStr) return false;
      } else if (filters.dueDate === "upcoming") {
        if (!todo.dueDate || todo.dueDate <= todayStr) return false;
      }

      return true;
    });

    return [...filtered].sort((a, b) => {
      if (filters.sortBy === "dueDate") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (filters.sortBy === "priority") {
        return PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority];
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [todos, filters]);
}