"use client";

import { useAppSelector } from "@/store/hook";
import { selectSelectedNodeId } from "@/store/reducers/flowSlice";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

export const useFlowPanels = () => {
  const selectedNodeId = useAppSelector(selectSelectedNodeId);
  const { getNodes, setNodes } = useReactFlow();

  const selectedNode = selectedNodeId
    ? getNodes().find((node) => node.id === selectedNodeId)
    : null;

  const updateNodeData = useCallback((nodeId: string, newData: Record<string, unknown>) => {
    const currentNodes = getNodes();
    const updatedNodes = currentNodes.map((node) =>
      node.id === nodeId 
        ? { 
            ...node, 
            data: { 
              ...node.data, 
              ...newData 
            } 
          } 
        : node
    );
    setNodes(updatedNodes);
  }, [getNodes, setNodes]);

  return {
    selectedNodeId,
    selectedNode,
    updateNodeData,
    getNodes,
    setNodes,
  };
};
