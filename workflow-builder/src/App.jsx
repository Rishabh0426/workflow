import "./App.css";
import NodeComponent from "./components/NodeComponent";
import { INITIAL_STATE } from "./utils/constants";
import { useWorkflow } from "./hooks/useWorkflow";

export default function App() {
  const {
    tree,
    history,
    insertNode,
    deleteNode,
    updateLabel,
    undo,
    save
  } = useWorkflow(INITIAL_STATE);

  return (
    <div className="app-container">
      <header className="toolbar">
        <div className="logo">
          <span className="logo-icon">⚡</span>
          <h1>Workflow Builder</h1>
        </div>

        <div className="actions" >
          <button className="btn secondary" onClick={undo} disabled={history.length === 0}>
            ↺ Undo
          </button>
          <button className="btn primary" onClick={save}>Save Workflow</button>
        </div>
      </header>

      <div className="canvas">
        <div className="tree-wrapper">
          <NodeComponent
            node={tree}
            onAdd={insertNode}
            onDelete={deleteNode}
            onEdit={updateLabel}
          />
        </div>
      </div>
    </div>
  );
}
