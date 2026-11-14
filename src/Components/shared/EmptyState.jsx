
export function EmptyState({
  message,
  subMessage,
  onAction,
  actionLabel
}) {
  return (
    <div className="empty-state">

      <div className="empty-icon">📋</div>

      <h3>{message}</h3>

      {subMessage && <p>{subMessage}</p>}

      {onAction && (
        <button
          className="btn-primary"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}

    </div>
  );
}
