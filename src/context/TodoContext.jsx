import { createContext, useContext, useReducer, useEffect } from "react";
import { todoReducer } from "./todoReducer";

const TodoContext = createContext();

const INITIAL_STATE = {
  activeProjectId: "default",
  projects: [
    {
      id: "default",
      name: "Personal",
      createdAt: new Date().toISOString(),
      todos: [],
    },
  ],
};

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, INITIAL_STATE, () => {
    const saved = localStorage.getItem("nexus-todo-state");
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem("nexus-todo-state", JSON.stringify(state));
  }, [state]);

  const activeProject =
    state.projects.find((p) => p.id === state.activeProjectId) ?? null;

  const allTodos = state.projects.flatMap((p) =>
    p.todos.map((t) => ({ ...t, projectName: p.name, projectId: p.id })),
  );

  return (
    <TodoContext.Provider value={{ state, dispatch, activeProject, allTodos }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used inside a TodoProvider");
  }
  return context;
}