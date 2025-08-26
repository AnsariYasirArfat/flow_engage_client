"use client";

import React from "react";
import { Node, Edge } from "@xyflow/react";
import { MessageCircleMore, AlertTriangle } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageNodeData } from "./nodes/MessageNode";

interface FlowPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nodes: Node[];
  edges: Edge[];
  onSave: () => void;
  onCancel: () => void;
}

const FlowPreviewDialog: React.FC<FlowPreviewDialogProps> = ({
  open,
  onOpenChange,
  nodes,
  edges,
  onSave,
  onCancel,
}) => {
  // Create a map of node connections for easy lookup
  const nodeConnections = new Map<string, { incoming: string[], outgoing: string[] }>();
  
  nodes.forEach(node => {
    nodeConnections.set(node.id, { incoming: [], outgoing: [] });
  });
  
  edges.forEach(edge => {
    const sourceConnections = nodeConnections.get(edge.source);
    const targetConnections = nodeConnections.get(edge.target);
    
    if (sourceConnections) {
      sourceConnections.outgoing.push(edge.target);
    }
    if (targetConnections) {
      targetConnections.incoming.push(edge.source);
    }
  });

  // Find source nodes (nodes with no incoming edges)
  const sourceNodes = nodes.filter(node => {
    const connections = nodeConnections.get(node.id);
    return connections && connections.incoming.length === 0;
  });

  // Check for empty text warnings
  const nodesWithEmptyText = nodes.filter(node => {
    const nodeData = node.data as MessageNodeData;
    return !nodeData?.text || nodeData.text.trim() === "";
  });

  // Build flow display
  const renderFlowStep = (nodeId: string, visited: Set<string> = new Set()): React.ReactNode => {
    if (visited.has(nodeId)) return null;
    visited.add(nodeId);
    
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return null;
    
    const connections = nodeConnections.get(nodeId);
    const nodeData = node.data as MessageNodeData;
    const text = nodeData?.text || "";
    const isEmpty = !text || text.trim() === "";
    
    return (
      <div key={nodeId} className="mb-4">
        <div className="flex items-start gap-3">
          {/* Node representation */}
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-custom-teal rounded-full flex items-center justify-center">
              <MessageCircleMore size={16} className="text-white" />
            </div>
          </div>
          
          {/* Message content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-800">Send Message</span>
                <div className="relative w-4 h-4">
                  <Image
                    src="/images/whatsapp-logo.png"
                    alt="WhatsApp"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
              
              <div className="text-sm text-gray-700">
                {isEmpty ? (
                  <span className="text-gray-400 italic">Empty message</span>
                ) : (
                  text
                )}
              </div>
              
              {isEmpty && (
                <div className="mt-2 flex items-center gap-2 text-amber-600 text-xs">
                  <AlertTriangle size={12} />
                  <span>Warning: Empty message text</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Render connected nodes */}
        {connections?.outgoing.map(targetId => (
          <div key={targetId} className="ml-8 mt-2">
            <div className="w-px h-4 bg-gray-300 ml-4"></div>
            {renderFlowStep(targetId, new Set(visited))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="backdrop-blur w-full max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[95%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Flow Preview
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Review your message flow before saving. {nodesWithEmptyText.length > 0 && (
              <span className="text-amber-600 font-medium">
                {nodesWithEmptyText.length} node{nodesWithEmptyText.length > 1 ? 's' : ''} have empty message text.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {sourceNodes.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No source nodes found. Please ensure your flow has starting points.
            </div>
          ) : (
            <div className="space-y-2">
              {sourceNodes.map(sourceNode => renderFlowStep(sourceNode.id))}
            </div>
          )}
        </div>
        
        <DialogFooter className="gap-2">
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
            disabled={nodesWithEmptyText.length > 0}
          >
            Save Flow
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FlowPreviewDialog;
