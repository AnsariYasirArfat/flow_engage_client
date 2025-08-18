'use client';

import React from 'react';
import { NodeTypes, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import NodeFactory from './nodes/NodeFactory';
import { useFlowCanvas } from '@/hooks/useFlowCanvas';

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

  // Define node types for React Flow
const nodeTypes: NodeTypes = {
  message: NodeFactory,
};

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
      />
    </div>
  );
};

export default FlowCanvas;
