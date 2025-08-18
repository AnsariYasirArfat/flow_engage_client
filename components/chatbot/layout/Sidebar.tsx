'use client';

import React from 'react';
import { useAppSelector } from '@/store/hook';
import { selectSelectedNodeId } from '@/store/reducers/flowSlice';
import SettingsPanel from '@/components/chatbot/panels/SettingsPanel';
import NodesPanel from '@/components/chatbot/panels/NodesPanel';

const Sidebar: React.FC = () => {
  const selectedNodeId = useAppSelector(selectSelectedNodeId);

  return (
    <aside className="w-1/4 border-l border-gray-200 flex flex-col">
      {selectedNodeId ? (
        <SettingsPanel />
      ) : (
        <NodesPanel />
      )}
    </aside>
  );
};

export default Sidebar;
