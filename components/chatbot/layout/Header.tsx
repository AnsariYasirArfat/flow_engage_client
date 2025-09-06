import React from "react";
import FlowSaveButton from "@/components/chatbot/flow-save/FlowSaveButton";

const Header: React.FC = () => {
  return (
    <header className="bg-custom-blue/5 border-b border-gray-200 px-4 py-4 flex justify-between items-center">
      <FlowSaveButton />
    </header>
  );
};

export default Header;
