import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: null, firstName: null, email: null },
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
    updateFirstName: (state, action) => {
      state.value.firstName = action.payload;
    },
  },
});

export const { login, logout, updateFirstName } = userSlice.actions;
export default userSlice.reducer;
