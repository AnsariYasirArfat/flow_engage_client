import { useState } from "react";
import { toast } from "sonner";
import { useReactFlow } from "@xyflow/react";

export const useFlowSave = () => {
  const [showPreview, setShowPreview] = useState(false);
  const { getNodes, getEdges } = useReactFlow();
  
  const handleSaveChanges = () => {
    const nodes = getNodes();
    const edges = getEdges();
    console.log("save change", nodes);
    // if (nodes.length <= 1) {
    //   return;
    // }
    // Create lookup maps in a single pass through edges
    const nodesWithIncomingEdges = new Set();
    const nodesWithOutgoingEdges = new Set();

    edges.forEach((edge) => {
      nodesWithIncomingEdges.add(edge.target);
      nodesWithOutgoingEdges.add(edge.source);
    });

    // Check for completely isolated nodes
    const isolatedNodes = nodes.filter(
      (node) =>
        !nodesWithIncomingEdges.has(node.id) &&
        !nodesWithOutgoingEdges.has(node.id)
    );

    if (isolatedNodes.length > 0) {
      toast.custom((id) => (
        <div
          className="bg-red-100 text-base font-bold text-gray-800 px-4 py-2 rounded-lg cursor-pointer"
          role="alert"
          aria-live="polite"
          onClick={() => toast.dismiss(id)}
        >
          Cannot save Flow
        </div>
      ));
      return;
    }

    // Show preview dialog instead of immediately saving
    setShowPreview(true);
  };

  const handleSaveFlow = () => {
    setShowPreview(false);

    toast.custom((id) => (
      <div
        className="bg-green-300 text-base font-bold text-gray-800 px-8 py-2 rounded-lg cursor-pointer"
        role="alert"
        aria-live="polite"
        onClick={() => toast.dismiss(id)}
      >
        Flow Saved!
      </div>
    ));
  };

  const handleCancelSave = () => {
    setShowPreview(false);
  };

  return {
    showPreview,
    setShowPreview,
    handleSaveChanges,
    handleSaveFlow,
    handleCancelSave,
  };
};
