
export function todoReducer(state, action) {

  switch (action.type) {

    // ADD PROJECT
    case "ADD_PROJECT": {
      const newProject = {
        id: Date.now().toString(),
        name: action.payload.name,
        createdAt: new Date().toISOString(),
        todos: [],
      };

      return {
        ...state,
        projects: [...state.projects, newProject],
        activeProjectId: newProject.id,
      };
    }

    // DELETE PROJECT
    case "DELETE_PROJECT": {
      const remaining = state.projects.filter(
        (project) => project.id !== action.payload.id
      );

      return {
        ...state,
        projects: remaining,
        activeProjectId: remaining[0]?.id ?? "all",
      };
    }

    // CHANGE ACTIVE PROJECT
    case "SET_ACTIVE_PROJECT":
      return {
        ...state,
        activeProjectId: action.payload.id,
      };

    // ADD TODO
    case "ADD_TODO": {
      return {
        ...state,

        projects: state.projects.map((project) =>
          project.id === action.payload.projectId
            ? {
                ...project,

                todos: [
                  ...project.todos,
                  {
                    id: Date.now().toString(),
                    title: action.payload.title,
                    description: action.payload.description,
                    dueDate: action.payload.dueDate,
                    priority: action.payload.priority,
                    status: "todo",
                    createdAt: new Date().toISOString(),
                  },
                ],
              }
            : project
        ),
      };
    }

    // UPDATE TODO
    case "UPDATE_TODO": {
      return {
        ...state,

        projects: state.projects.map((project) =>
          project.id === action.payload.projectId
            ? {
                ...project,

                todos: project.todos.map((todo) =>
                  todo.id === action.payload.id
                    ? {
                        ...todo,
                        ...action.payload.updates,
                      }
                    : todo
                ),
              }
            : project
        ),
      };
    }

    // DELETE TODO
    case "DELETE_TODO": {
      return {
        ...state,

        projects: state.projects.map((project) =>
          project.id === action.payload.projectId
            ? {
                ...project,

                todos: project.todos.filter(
                  (todo) => todo.id !== action.payload.id
                ),
              }
            : project
        ),
      };
    }

    // TOGGLE TODO STATUS
    case "TOGGLE_STATUS": {
      return {
        ...state,

        projects: state.projects.map((project) =>
          project.id === action.payload.projectId
            ? {
                ...project,

                todos: project.todos.map((todo) =>
                  todo.id === action.payload.id
                    ? {
                        ...todo,
                        status:
                          todo.status === "done"
                            ? "todo"
                            : "done",
                      }
                    : todo
                ),
              }
            : project
        ),
      };
    }

    default:
      return state;
  }
}
