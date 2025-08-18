"use client";

import React from "react";
import { MessageCircleMore } from "lucide-react";

// Define draggable node types
export interface DraggableNode {
  type: "message";
  label: string;
  icon: React.ReactNode;
  defaultData: { text: string };
}

const draggableNodes: DraggableNode[] = [
  {
    type: "message",
    label: "Message",
    icon: <MessageCircleMore size={24} />,
    defaultData: { text: "" },
  },
  // Future node types can be added here:
];

const NodesPanel: React.FC = () => {
  const onDragStart = (
    event: React.DragEvent,
    nodeType: string,
    defaultData: { text: string }
  ) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({
        type: nodeType,
        data: defaultData,
      })
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <section className="p-4" aria-label="Available Nodes">
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Nodes Panel</h2>
        <p className="text-sm text-gray-600">Drag nodes to the canvas to build your flow</p>
      </header>
      
      <nav className="grid grid-cols-2 gap-3" aria-label="Node Types">
        {draggableNodes.map((node) => (
          <button
            key={node.type}
            className="p-4 rounded-sm border-solid border-2 border-custom-blue hover:border-custom-blue/80 text-custom-blue cursor-grab transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-offset-2"
            draggable
            onDragStart={(event) =>
              onDragStart(event, node.type, node.defaultData)
            }
            aria-label={`Add ${node.label} node`}
            type="button"
          >
            <div className="flex flex-col items-center space-y-1">
              {node.icon}
              <span className="font-medium text-sm">{node.label}</span>
            </div>
          </button>
        ))}
      </nav>
    </section>
  );
};

export default NodesPanel;
