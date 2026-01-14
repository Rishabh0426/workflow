import AddNodePlaceholder from "./AddNodePlaceholder";

export default function NodeComponent({ node, onAdd, onDelete, onEdit }) {
  const isCondition = node.type === "condition";

  const handleRename = () => {
    const name = prompt("Rename Step:", node.label);
    if (name) onEdit(node.id, name);
  };

  return (
    <div className="node-wrapper">
      <div className={`node-card ${node.type}`} onClick={handleRename}>
        <div className="node-header">
          <span className="node-icon">
            {node.type === "start" && "🚀"}
            {node.type === "action" && "⚡"}
            {node.type === "condition" && "🤔"}
            {node.type === "end" && "🛑"}
          </span>
          <div className="node-info">
            <span className="node-type-text">{node.type.toUpperCase()}</span>
            <span className="node-label">{node.label}</span>
          </div>
        </div>

        {node.type !== "start" && (
          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(node.id);
            }}
          >
            ×
          </button>
        )}
      </div>

      {node.type !== "end" && (
        <div className="connections-container">
          <div className="line-vertical" />

          {isCondition ? (
            <div className="branch-container">
              {[0, 1].map((i) => (
                <div key={i} className="branch-path">
                  <div className={`branch-badge ${i === 0 ? "yes" : "no"}`}>
                    {i === 0 ? "YES" : "NO"}
                  </div>
                  {node.children[i] ? (
                    <NodeComponent
                      node={node.children[i]}
                      onAdd={onAdd}
                      onDelete={onDelete}
                      onEdit={onEdit}
                    />
                  ) : (
                    <AddNodePlaceholder
                      parentId={node.id}
                      index={i}
                      onAdd={onAdd}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="single-path">
              {node.children[0] ? (
                <NodeComponent
                  node={node.children[0]}
                  onAdd={onAdd}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ) : (
                <AddNodePlaceholder
                  parentId={node.id}
                  index={0}
                  onAdd={onAdd}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
