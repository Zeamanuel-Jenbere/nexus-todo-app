
export function TodoStats({ todos }) {
  const todayStr = new Date().toISOString().split("T")[0];

  const total = todos.length;

  const completed = todos.filter(
    (todo) => todo.status === "done"
  ).length;

  const inProgress = todos.filter(
    (todo) => todo.status === "in-progress"
  ).length;

  const overdue = todos.filter(
    (todo) =>
      todo.dueDate &&
      todo.dueDate < todayStr &&
      todo.status !== "done"
  ).length;

  return (
    <div className="todo-stats">
      <div className="stat-card">
        <span className="stat-value">{total}</span>
        <span className="stat-label">Total</span>
      </div>

      <div className="stat-card">
        <span className="stat-value">{inProgress}</span>
        <span className="stat-label">In Progress</span>
      </div>

      <div className="stat-card">
        <span className="stat-value">{completed}</span>
        <span className="stat-label">Completed</span>
      </div>

      <div className={`stat-card ${overdue > 0 ? "stat-overdue" : ""}`}>
        <span className="stat-value">{overdue}</span>
        <span className="stat-label">Overdue</span>
      </div>
    </div>
  );
}
