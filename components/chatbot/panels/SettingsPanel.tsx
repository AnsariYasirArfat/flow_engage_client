"use client";

import React, { useCallback, useState, useEffect, useRef } from "react";
import { useAppDispatch } from "@/store/hook";
import { setSelectedNode } from "@/store/reducers/flowSlice";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useFlowPanels } from "@/hooks/useFlowPanels";
import { useDebounce } from "@/hooks/useDebounce";
import { MessageNodeData } from "../nodes/MessageNode";
import { toast } from "sonner";

const SettingsPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedNodeId, selectedNode, updateNodeData } = useFlowPanels();
  const textRef = useRef<HTMLTextAreaElement>(null);
  // Local state for textarea value
  const [localText, setLocalText] = useState("");
  // Debounced value that will trigger the actual update
  const debouncedText = useDebounce(localText, 500);

  const CHARACTER_LIMIT = 1000;

  console.log("MessageFIX localText: ", localText);
  console.log("MessageFIX debouncedText: ", debouncedText);

  // Update local state when selected node changes
  useEffect(() => {
    if (selectedNode) {
      console.log("MessageFIX selectedNode: ", selectedNode);
      const textValue = (selectedNode.data as MessageNodeData)?.text || "";
      console.log("MessageFIX message text: ", textValue);
      setLocalText(textValue);
      
        if (textRef.current) {
          textRef.current.focus();
        }
    }
  }, [selectedNodeId]);

  // Update node data when debounced value changes
  useEffect(() => {
    console.log("MessageFIX  debounced");
    if (selectedNodeId && debouncedText !== undefined) {
      console.log("Updating node with debounced text:", debouncedText);
      updateNodeData(selectedNodeId, { text: debouncedText });
    }
  }, [debouncedText]);

  const handleTextChange = useCallback((text: string) => {
    console.log("MessageFIX Text changed to:", text);
    // Limit text to CHARACTER_LIMIT characters
    if (text.length <= CHARACTER_LIMIT) {
      setLocalText(text);
    } else {
      toast("Character limit exceeded");
    }
  }, []);

  const handleBackClick = () => {
    dispatch(setSelectedNode(null));
  };

  if (!selectedNode) {
    return null;
  }

  return (
    <section className="p-6 h-full flex flex-col" aria-label="Node Settings">
      {/* Panel Header */}
      <header className="flex items-center mb-6 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackClick}
          className="mr-3 p-1 hover:bg-gray-100 rounded"
          aria-label="Back to nodes panel"
        >
          <ArrowLeft size={20} />
        </Button>
        <h2 className="text-lg font-semibold text-gray-900">
          Message Settings
        </h2>
      </header>

      {/* Settings Form */}
      <form
        className="flex-1 flex flex-col space-y-4 overflow-hidden"
        onSubmit={(e) => e.preventDefault()}
      >
        <fieldset className="flex-1 flex flex-col space-y-2 min-h-0">
          <Label htmlFor="message-text" className="text-sm font-medium text-gray-700 mb-2">
            Message Text
          </Label>
          <div className="flex-1 flex flex-col min-h-0">
            <Textarea
              ref={textRef}
              id="message-text"
              value={localText}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Enter your message..."
              className="flex-1 min-h-[120px] max-h-[300px] resize-none overflow-y-auto focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-describedby="message-help"
              maxLength={CHARACTER_LIMIT}
            />
            <div className="flex justify-between items-center mt-2">
              <p id="message-help" className="text-sm text-gray-500">
                This text will be displayed in the message node
              </p>
              <span
                className={`text-sm font-medium ${
                  localText.length >= CHARACTER_LIMIT
                    ? "text-red-500"
                    : localText.length >= CHARACTER_LIMIT * 0.9
                    ? "text-orange-500"
                    : "text-gray-500"
                }`}
              >
                {localText.length}/{CHARACTER_LIMIT}
              </span>
            </div>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default SettingsPanel;
