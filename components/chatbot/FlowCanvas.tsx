"use client";

import React from "react";
import { Controls, MiniMap, NodeTypes, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useFlowCanvas } from "@/hooks/useFlowCanvas";
import MessageNode from "./nodes/MessageNode";
import { nodeTypes } from "./nodes/NodeFactory";

const FlowCanvas: React.FC = () => {
  const {
    nodes,
    edges,
    reactFlowWrapper,
    handleNodesChange,
    handleEdgesChange,
    onConnect,
    onDragOver,
    onDrop,
  } = useFlowCanvas();

  return (
    <div ref={reactFlowWrapper} className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        className="bg-gray-50"
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;
