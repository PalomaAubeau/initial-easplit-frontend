import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    name: null,
    amount: null,
    type: null,
    emitter: null,
    recipient: null,
    event: null,
  },
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.value = action.payload;
    },
    removeTransaction: (state) => {
      state.value = initialState.value;
    },
    loadTransaction: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addTransaction, removeTransaction, loadTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;