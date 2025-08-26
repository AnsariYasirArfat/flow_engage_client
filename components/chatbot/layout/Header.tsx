"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useReactFlow } from "@xyflow/react";

const Header: React.FC = () => {
  const { getNodes, getEdges } = useReactFlow();

  const handleSaveChanges = () => {
    const nodes = getNodes();
    const edges = getEdges();

    if (nodes.length <= 1) {
      return;
    }

    const nodesWithEmptyTargets = nodes.filter((node) => {
      const hasIncomingEdges = edges.some((edge) => edge.target === node.id);
      return !hasIncomingEdges;
    });

    if (nodesWithEmptyTargets.length > 1) {
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

  return (
    <header className="bg-custom-blue/5 border-b border-gray-200 px-4 py-4 flex justify-between items-center">
      <Button
        variant={"outline"}
        onClick={handleSaveChanges}
        className="rounded-sm border-solid border-2 border-custom-blue hover:border-custom-blue/80 text-custom-blue ml-auto mr-12"
      >
        Save Changes
      </Button>
    </header>
  );
};

export default Header;
