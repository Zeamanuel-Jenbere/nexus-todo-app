import { Modal } from "../modals/Modal";

export function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title}>
      <p className="confirm-message">{message}</p>
      <div className="modal-actions">
        <button className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn-danger" onClick={onConfirm}>
          Delete
        </button>
      </div>
    </Modal>
  );
}