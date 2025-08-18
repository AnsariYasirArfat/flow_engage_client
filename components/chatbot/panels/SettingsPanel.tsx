'use client';

import React, { useCallback } from 'react';
import { useAppDispatch } from '@/store/hook';
import { setSelectedNode } from '@/store/reducers/flowSlice';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useFlowPanels } from '@/hooks/useFlowPanels';

const SettingsPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedNodeId, selectedNode, updateNodeData } = useFlowPanels();

  const handleTextChange = useCallback((text: string) => {
    if (selectedNodeId) {
      console.log('Updating text:', text); // Debug log
      updateNodeData(selectedNodeId, { text });
    }
  }, [selectedNodeId, updateNodeData]);

  const handleBackClick = () => {
    dispatch(setSelectedNode(null));
  };

  if (!selectedNode) {
    return null;
  }

  // Safely extract text value with proper typing
  const textValue = (selectedNode.data as { text?: string })?.text || '';

  return (
    <section className="p-6" aria-label="Node Settings">
      {/* Panel Header */}
      <header className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackClick}
          className="mr-3 p-1 hover:bg-gray-100 rounded"
          aria-label="Back to nodes panel"
        >
          <ArrowLeft size={20} />
        </Button>
        <h2 className="text-lg font-semibold text-gray-900">Message Settings</h2>
      </header>
      
      {/* Settings Form */}
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <fieldset className="space-y-2">
          <Label htmlFor="message-text">Message Text</Label>
          <Textarea
            id="message-text"
            value={textValue}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Enter your message..."
            className="min-h-[120px] resize-none"
            aria-describedby="message-help"
          />
          <p id="message-help" className="text-sm text-gray-500">
            This text will be displayed in the message node
          </p>
        </fieldset>
      </form>
    </section>
  );
};

export default SettingsPanel;