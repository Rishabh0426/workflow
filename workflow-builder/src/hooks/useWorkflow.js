import { useState } from "react";
import { generateId } from "../utils/idGenerator";

export function useWorkflow(initialState) {
  const [tree, setTree] = useState(initialState);
  const [history, setHistory] = useState([]);

  const updateTree = (newTree) => {
    setHistory((prev) => [...prev, tree]);
    setTree(newTree);
  };

  const undo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setTree(previous);
  };

  const save = () => {
    console.log("Saved JSON:", JSON.stringify(tree, null, 2));
    alert("Workflow saved! Check console.");
  };

  const insertNode = (targetId, type, childIndex) => {
    const recursive = (node) => {
      if (node.id === targetId) {
        const newNode = {
          id: generateId(),
          type,
          label:
            type === "condition"
              ? "New Condition"
              : type === "end"
              ? "End Workflow"
              : "New Action",
          children: []
        };

        const existingChild = node.children[childIndex];
        if (existingChild) newNode.children = [existingChild];

        const newChildren = [...node.children];
        newChildren[childIndex] = newNode;
        return { ...node, children: newChildren };
      }

      return { ...node, children: node.children.map(recursive) };
    };

    updateTree(recursive(tree));
  };

  const deleteNode = (targetId) => {
    if (targetId === "root") return;

    const recursive = (node) => {
      const index = node.children.findIndex(c => c?.id === targetId);
      if (index !== -1) {
        const toDelete = node.children[index];
        const promoted = toDelete.children[0];
        const newChildren = [...node.children];

        if (promoted) newChildren[index] = promoted;
        else newChildren.splice(index, 1);

        return { ...node, children: newChildren };
      }

      return { ...node, children: node.children.map(recursive) };
    };

    updateTree(recursive(tree));
  };

  const updateLabel = (id, label) => {
    const recursive = (node) => {
      if (node.id === id) return { ...node, label };
      return { ...node, children: node.children.map(recursive) };
    };

    updateTree(recursive(tree));
  };

  return {
    tree,
    history,
    insertNode,
    deleteNode,
    updateLabel,
    undo,
    save
  };
}
