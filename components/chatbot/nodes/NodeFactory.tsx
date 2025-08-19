// 'use client';

// import React from 'react';
// import { NodeProps } from '@xyflow/react';
// import MessageNode from './MessageNode';

// // Define node types
// export type NodeType = 'message';

// // Node type to component mapping
// const nodeComponents = {
//   message: MessageNode,
//   // Future node types can be added here:
//   // condition: ConditionNode,
//   // delay: DelayNode,
// };

// // Factory function to get the appropriate node component
// export const getNodeComponent = (type: NodeType) => {
//   return nodeComponents[type] || MessageNode; // Default to MessageNode
// };

// // Generic node wrapper that uses the factory
// const NodeFactory: React.FC<NodeProps> = (props) => {
//   const NodeComponent = getNodeComponent(props.type as NodeType);
//   return <NodeComponent {...props} />;
// };

// export default NodeFactory;
