"use client";

import React from "react";
import FlowStep from "./FlowStep";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useReactFlow } from "@xyflow/react";


const FlowPreviewContent: React.FC = () => {
  const { getNodes, getEdges } = useReactFlow();
  const nodes = getNodes();
  const edges = getEdges();
  // Create a map of node connections for easy lookup
  const nodeConnections = new Map<
    string,
    { incoming: string[]; outgoing: string[] }
  >();

  nodes.forEach((node) => {
    nodeConnections.set(node.id, { incoming: [], outgoing: [] });
  });

  edges.forEach((edge) => {
    const sourceConnections = nodeConnections.get(edge.source);
    const targetConnections = nodeConnections.get(edge.target);

    if (sourceConnections) {
      sourceConnections.outgoing.push(edge.target);
    }
    if (targetConnections) {
      targetConnections.incoming.push(edge.source);
    }
  });

  // Find source nodes (nodes with no incoming edges)
  const sourceNodes = nodes.filter((node) => {
    const connections = nodeConnections.get(node.id);
    return connections && connections.incoming.length === 0;
  });

  const renderFlowStep = (
    nodeId: string,
  ): React.ReactNode => {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return null;

    const connections = nodeConnections.get(nodeId);

    return (
      <FlowStep
        key={nodeId}
        node={node}
        connections={connections || { incoming: [], outgoing: [] }}
        onRenderChild={renderFlowStep}
      />
    );
  };

  if (sourceNodes.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Your flow doesn’t have a starting message yet.
        <br />
        Add a <span className="font-medium text-gray-700">Message Node</span> to
        begin.
      </div>
    );
  }

  return (
    <ScrollArea className="h-full w-full p-4">
      <div className="space-y-2">
        {sourceNodes.map((sourceNode) => renderFlowStep(sourceNode.id))}
      </div>
    </ScrollArea>
  );
};

export default FlowPreviewContent;
