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
  },
});

export const { addEvent, removeEvent, loadEvent } = eventSlice.actions;
export default eventSlice.reducer;