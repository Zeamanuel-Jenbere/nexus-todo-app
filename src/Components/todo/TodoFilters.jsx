export function TodoFilters({ filters, setFilters }) {
  function updateFilter(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="todo-filters">
      <input
        type="text"
        className="search-input"
        placeholder="Search tasks..."
        value={filters.search}
        onChange={(e) => updateFilter("search", e.target.value)}
      />

      <select
        value={filters.status}
        onChange={(e) => updateFilter("status", e.target.value)}
      >
        <option value="all">All Statuses</option>
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select
        value={filters.priority}
        onChange={(e) => updateFilter("priority", e.target.value)}
      >
        <option value="all">All Priorities</option>
        <option value="urgent">Urgent</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <select
        value={filters.dueDate}
        onChange={(e) => updateFilter("dueDate", e.target.value)}
      >
        <option value="all">Any Due Date</option>
        <option value="overdue">Overdue</option>
        <option value="today">Due Today</option>
        <option value="upcoming">Upcoming</option>
      </select>

      <select
        value={filters.sortBy}
        onChange={(e) => updateFilter("sortBy", e.target.value)}
      >
        <option value="createdAt">Sort: Newest</option>
        <option value="dueDate">Sort: Due Date</option>
        <option value="priority">Sort: Priority</option>
      </select>
    </div>
  );
}