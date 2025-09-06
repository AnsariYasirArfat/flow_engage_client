import React from "react";
import { ReactFlowProvider } from '@xyflow/react';
import Header from "@/components/chatbot/layout/Header";
import Sidebar from "@/components/chatbot/layout/Sidebar";

export default function ChatbotFlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactFlowProvider>
      <div className="h-screen flex flex-col">
        {/* Header with Save Changes button */}
        <Header />

        {/* Main content area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Flow canvas area */}
          <main className="flex-1 relative">
            {children}
          </main>

          {/* Right sidebar for nodes panel and settings */}
          <Sidebar />
        </div>
      </div>
    </ReactFlowProvider>
  );
}
