'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { useAppDispatch } from '@/store/hook';
import { setSelectedNode } from '@/store/reducers/flowSlice';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useFlowPanels } from '@/hooks/useFlowPanels';
import { useDebounce } from '@/hooks/useDebounce';
import { MessageNodeData } from '../nodes/MessageNode';

const SettingsPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedNodeId, selectedNode, updateNodeData } = useFlowPanels();
  
  // Local state for textarea value
  const [localText, setLocalText] = useState('');
  
  // Debounced value that will trigger the actual update
  const debouncedText = useDebounce(localText, 300);

  // Update local state when selected node changes
  useEffect(() => {
    if (selectedNode) {
      const textValue = (selectedNode.data as MessageNodeData)?.text || '';
      setLocalText(textValue);
    }
  }, [selectedNode]);

  // Update node data when debounced value changes
  useEffect(() => {
    if (selectedNodeId && debouncedText !== undefined) {
      console.log('Updating node with debounced text:', debouncedText);
      updateNodeData(selectedNodeId, { text: debouncedText });
    }
  }, [debouncedText, selectedNodeId, updateNodeData]);

  const handleTextChange = useCallback((text: string) => {
    console.log('Text changed to:', text);
    setLocalText(text);
  }, []);

  const handleBackClick = () => {
    dispatch(setSelectedNode(null));
  };

  if (!selectedNode) {
    return null;
  }

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
            value={localText}
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