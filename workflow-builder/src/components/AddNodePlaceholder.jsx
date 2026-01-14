import { useState } from "react";

export default function AddNodePlaceholder({ parentId, index, onAdd }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="add-placeholder">
      {!open ? (
        <button className="add-circle-btn" onClick={() => setOpen(true)}>
          +
        </button>
      ) : (
        <div className="add-menu-container">
          <div className="add-menu-overlay" onClick={() => setOpen(false)} />
          <div className="add-menu">
            <div className="menu-header">Add Step</div>
            <button onClick={() => onAdd(parentId, "action", index)}>⚡ Action</button>
            <button onClick={() => onAdd(parentId, "condition", index)}>🤔 Condition</button>
            <button onClick={() => onAdd(parentId, "end", index)}>🛑 End</button>
          </div>
        </div>
      )}
    </div>
  );
}
