"use client";

import React from "react";
import { MessageCircleMore } from "lucide-react";
import FlowMessageCard from "./FlowMessageCard";
import { Node } from "@xyflow/react";

interface FlowStepProps {
  node: Node;
  connections: { incoming: string[]; outgoing: string[] };
  onRenderChild: (nodeId: string) => React.ReactNode;
}

const FlowStep: React.FC<FlowStepProps> = ({
  node,
  connections,
  onRenderChild,
}) => {
  const nodeData = node.data as { text?: string };
  const text = nodeData?.text || "";

  return (
    <div className="mb-4">
      <FlowMessageCard text={text}/>

      {/* Render connected nodes */}
      {connections?.outgoing.map((targetId) => (
        <div key={targetId} className="ml-8 mt-2">
          <div className="w-px h-4 bg-gray-300 ml-4"></div>
          {onRenderChild(targetId)}
        </div>
      ))}
    </div>
  );
};

export default FlowStep;
