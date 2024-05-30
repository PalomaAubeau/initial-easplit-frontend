import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    eventUniqueId: null,
    organizer: null,
    name: null,
    eventDate: null,
    paymentDate: null,
    description: null,
    guests: [],
    transactions: [],
    totalSum: null,
    shareAmount: null,
  },
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.value = action.payload;
    },
    removeEvent: (state) => {
      state.value = initialState.value;
    },
    loadEvent: (state, action) => {
      state.value = action.payload;
    },
    addExpense: (state, action) => {
<<<<<<< HEAD
      state.value.transactions.push(action.payload);
=======
    state.value.transactions.push(action.payload);
>>>>>>> ef7e1da735ed648f3a4327881eb26acc3f5a279a
    },
  },
});

export const { addEvent, removeEvent, loadEvent, addExpense } = eventSlice.actions;
export default eventSlice.reducer;