import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    firstName: null,
    email: null,
    events: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
      state.value.firstName = action.payload.firstName;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.email = null;
      state.value.firstName = null;
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
