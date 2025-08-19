"use client";

import React, { memo } from "react";
import { Handle, Position, NodeProps, Node } from "@xyflow/react";
import { MessageCircleMore } from "lucide-react";
import Image from "next/image";

export type MessageNodeData = {
  text: string;
};

const MessageNode: React.FC<NodeProps<Node<MessageNodeData>>> = memo(
  ({ data, selected }) => {
    const textValue = data?.text || "";
    return (
      <div
        className={`shadow-lg rounded-md bg-white border-2 overflow-hidden ${
          selected ? "border-custom-blue" : "border-none"
        }`}
      >
        {/* Source Handle - Right side */}
        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3 bg-custom-blue border-2 border-white"
        />

        {/* Target Handle - Left side */}
        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 bg-custom-blue border-2 border-white"
        />

        <div className="bg-custom-teal px-4 py-1 border-b border-gray-200 flex items-center gap-2 justify-between flex-wrap min-w-72">
          <div className="flex items-center gap-1">
            <MessageCircleMore size={12} />
            <span className="text-sm font-bold text-gray-800">
              Send Message
            </span>
          </div>
          <div className="relative w-5 h-5 flex items-center p-1 bg-white rounded-full">
            <Image
              src="/images/whatsapp-logo.png"
              alt="WhatsApp"
              fill
              // width={20}
              // height={20}
              className="rounded-full object-cover"
            />
          </div>
        </div>

        {/* Node Content - White Background */}
        <div className="px-4 py-3 bg-white">
          <div className="text-sm text-gray-700 font-medium">
            {textValue || "Text node"}
          </div>
        </div>
      </div>
    );
  }
);

MessageNode.displayName = "MessageNode";

export default MessageNode;
