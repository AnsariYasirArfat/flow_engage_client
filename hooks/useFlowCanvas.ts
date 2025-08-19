"use client";

import { useCallback, useRef } from "react";
import {
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
} from "@xyflow/react";
import { useAppDispatch } from "@/store/hook";
import { setSelectedNode } from "@/store/reducers/flowSlice";

export const useFlowCanvas = () => {
  const dispatch = useAppDispatch();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  // React Flow state management
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  // Handle node changes
  const handleNodesChange: OnNodesChange = useCallback(
    (changes) => {
      onNodesChange(changes);
      console.log("Node Changes: ", changes);

      // Sync selection to Redux
      const selectedChanges = changes.filter(
        (change) => change.type === "select"
      );
      if (selectedChanges.length) {
        console.log("selected node: ", selectedChanges);
        const selectedNode = selectedChanges.find((node) => node.selected);
        console.log("selected node: ", selectedNode)
        if (selectedNode) {
          dispatch(setSelectedNode(selectedNode.id));
        } else {
          dispatch(setSelectedNode(null));
        }
      }
    },
    [onNodesChange, dispatch]
  );

  // Handle edge changes
  const handleEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      onEdgesChange(changes);
    },
    [onEdgesChange]
  );

  // Handle new connections
  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      if (connection.source && connection.target) {
        const newEdge: Edge = {
          id: `e${connection.source}-${connection.target}`,
          source: connection.source,
          target: connection.target,
          type: "smoothstep",
        };
        setEdges((eds) => addEdge(newEdge, eds));
      }
    },
    [setEdges]
  );

  // Handle drag and drop
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const data = event.dataTransfer.getData("application/reactflow");

      if (!data) return;

      const { type, data: nodeData } = JSON.parse(data);
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: nodeData,
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );

  return {
    // State
    nodes,
    edges,
    reactFlowWrapper,

    // Event handlers
    handleNodesChange,
    handleEdgesChange,
    onConnect,
    onDragOver,
    onDrop,
  };
};
