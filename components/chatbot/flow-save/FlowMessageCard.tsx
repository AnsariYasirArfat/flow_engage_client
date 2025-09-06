"use client";

import React from "react";
import { AlertTriangle, MessageCircleMore } from "lucide-react";
import Image from "next/image";

interface FlowMessageCardProps {
  text: string;
}

const FlowMessageCard: React.FC<FlowMessageCardProps> = ({ text }) => {
  const isEmpty = !text || text.trim() === "";

  return (
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
            <span className="text-sm font-semibold text-gray-800">
              Send Message
            </span>
            <div className="relative w-4 h-4">
              <Image
                src="/images/whatsapp-logo.png"
                alt="WhatsApp"
                fill
                className="rounded-full object-cover"
              />
            </div>
          </div>

          <div className="text-sm text-gray-700 break-words whitespace-pre-wrap">
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
  );
};

export default FlowMessageCard;
