"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useReactFlow } from "@xyflow/react";
import FlowPreviewDialog from "../FlowPreviewDialog";

const Header: React.FC = () => {
  const { getNodes, getEdges } = useReactFlow();
  const [showPreview, setShowPreview] = useState(false);

  const handleSaveChanges = () => {
    const nodes = getNodes();
    const edges = getEdges();

    if (nodes.length <= 1) {
      return;
    }

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
    // Close the dialog
    setShowPreview(false);
    
    // Show success message
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

  return (
    <>
      <header className="bg-custom-blue/5 border-b border-gray-200 px-4 py-4 flex justify-between items-center">
        <Button
          variant={"outline"}
          onClick={handleSaveChanges}
          className="rounded-sm border-solid border-2 border-custom-blue hover:border-custom-blue/80 text-custom-blue ml-auto mr-12"
        >
          Save Changes
        </Button>
      </header>

      <FlowPreviewDialog
        open={showPreview}
        onOpenChange={setShowPreview}
        nodes={getNodes()}
        edges={getEdges()}
        onSave={handleSaveFlow}
        onCancel={handleCancelSave}
      />
    </>
  );
};

export default Header;
