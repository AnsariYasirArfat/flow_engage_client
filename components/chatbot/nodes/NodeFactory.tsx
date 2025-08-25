"use client";

// Import React for components, NodeProps/NodeTypes from React Flow.
// Also import Node (the base node type) to extend it.
import React from "react";
import { NodeProps, NodeTypes, Node } from "@xyflow/react";

// Import the specific node component and its data type.
// Assume MessageNodeData = { text: string } from MessageNode.tsx.
import MessageNode, { MessageNodeData } from "./MessageNode";

// Define data interfaces for each node type (add more for future types).
// This ensures each type has its own required data structure.
interface NodeDataMap {
  message: MessageNodeData; // e.g., { text: string }
  // condition: ConditionNodeData; // Future: e.g., { condition: string }
  // delay: DelayNodeData; // Future: e.g., { delayInSeconds: number }
}

// Create a union type for all custom nodes.
// This uses 'type' to discriminate (tell apart) the data shape.
// React Flow will use this to type props correctly.
type CustomNode = {
  [K in keyof NodeDataMap]: Node<NodeDataMap[K]> & { type: K };
}[keyof NodeDataMap];

// Define node types as keys of NodeDataMap (for TS safety).
export type NodeType = keyof NodeDataMap;

// Node type to component mapping.
// Each value is a component typed for its specific data.
export const nodeComponents: {
  [K in NodeType]: React.FC<NodeProps<Extract<CustomNode, { type: K }>>>;
} = {
  message: MessageNode,
  // Future: condition: ConditionNode,
  // delay: DelayNode,
};

// Function to get the component for a type.
// Typed to return the correct component for that type's data.
export const getNodeComponent = <T extends NodeType>(
  type: T
): React.FC<NodeProps<Extract<CustomNode, { type: T }>>> => {
  return (nodeComponents[type] || MessageNode) as React.FC<
    NodeProps<Extract<CustomNode, { type: T }>>
  >;
};

// The factory wrapper, typed for CustomNode (handles all types safely).
// This ensures props.data matches the type (e.g., has 'text' for 'message').
const NodeFactory: React.FC<NodeProps<CustomNode>> = (props) => {
  // Narrow the type based on props.type (TS now knows data shape).

  const NodeComponent = getNodeComponent(props.type as NodeType);
  return <NodeComponent {...props} />; // No error: data matches.
};

// Dynamically generate nodeTypes map.
// All types point to NodeFactory (which handles the specifics).
export const nodeTypes: NodeTypes = Object.fromEntries(
  Object.keys(nodeComponents).map((type) => [type, NodeFactory])
);

// Export factory as default.
export default NodeFactory;
