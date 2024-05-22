import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: null, firstName: null, email: null, events: [], balance: null },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
      state.value.firstName = action.payload.firstName;
      state.value.balance = action.payload.balance;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.email = null;
      state.value.firstName = null;
      state.value.balance = null; //bien réinitialiser au logout pour éviter les bugs et conflits (et bien reset à zero le champs)
    },
    addEvent: (state, action) => {
      state.value.events.push(action.payload);
    },
    // removeEvent: (state, action) => {
    //   state.value.events = state.value.events.filter(
    //     (e) => e.name !== action.payload
    //   );
    // },
    loadEvents: (state, action) => {
      state.value.events = action.payload;
    },
  },
});

export const { login, logout, addEvent, removeEvent, loadEvents } =
  userSlice.actions;
export default userSlice.reducer;
