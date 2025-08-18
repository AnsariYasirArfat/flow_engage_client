import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the flow state interface
export interface FlowState {
  selectedNodeId: string | null;
  error: string | null;
}

// Initial state
const initialState: FlowState = {
  selectedNodeId: null,
  error: null,
};

// Create the flow slice
export const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    setSelectedNode: (state, action: PayloadAction<string | null>) => {
      state.selectedNodeId = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Export actions
export const {
  setSelectedNode,
  setError,
  clearError,
} = flowSlice.actions;

// Export selectors
export const selectSelectedNodeId = (state: { flow: FlowState }) => state.flow.selectedNodeId;
export const selectError = (state: { flow: FlowState }) => state.flow.error;

// Export reducer
export default flowSlice.reducer;
