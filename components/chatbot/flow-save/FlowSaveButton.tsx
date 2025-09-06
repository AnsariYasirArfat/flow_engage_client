"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useFlowSave } from "@/hooks/useFlowSave";
import FlowPreviewDialog from "./FlowPreviewDialog";

const FlowSaveButton: React.FC = () => {
  const {
    showPreview,
    setShowPreview,
    handleSaveChanges,
    handleSaveFlow,
    handleCancelSave,
  } = useFlowSave();

  return (
    <>
      <Button
        variant="outline"
        onClick={handleSaveChanges}
        className="rounded-sm border-solid border-2 border-custom-blue hover:border-custom-blue/80 text-custom-blue ml-auto mr-12"
      >
        Save Changes
      </Button>

      <FlowPreviewDialog
        open={showPreview}
        onOpenChange={setShowPreview}
        onSave={handleSaveFlow}
        onCancel={handleCancelSave}
      />
    </>
  );
};

export default FlowSaveButton;