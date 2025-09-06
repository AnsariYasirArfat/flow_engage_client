"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageNodeData } from "../nodes/MessageNode";
import { useReactFlow } from "@xyflow/react";
import FlowPreviewContent from "./FlowPreviewContent";

interface FlowPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  onCancel: () => void;
}

const FlowPreviewDialog: React.FC<FlowPreviewDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  onCancel,
}) => {
  const { getNodes } = useReactFlow();
  const nodes = getNodes();

  // Check for empty text warnings
  const nodesWithEmptyText = nodes.filter((node) => {
    const nodeData = node.data as MessageNodeData;
    return !nodeData?.text || nodeData.text.trim() === "";
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="backdrop-blur w-full max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0 !gap-0.5">
          <DialogTitle className="text-xl font-bold text-gray-800 text-center">
            Flow Preview
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-center">
            Review your message flow before saving.{" "}
            {nodesWithEmptyText.length > 0 && (
              <span className="text-amber-600 font-medium">
                {nodesWithEmptyText.length} node
                {nodesWithEmptyText.length > 1 ? "s" : ""} have empty message
                text.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 min-h-0 flex justify-center items-center border rounded-lg">
          <FlowPreviewContent />
        </div>

        <DialogFooter className="flex-shrink-0 gap-2">
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={onSave}
            className="bg-custom-blue hover:bg-custom-blue/90 text-white"
            disabled={nodes.length === 0 || nodesWithEmptyText.length > 0}
          >
            Save Flow
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FlowPreviewDialog;
