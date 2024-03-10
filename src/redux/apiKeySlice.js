import { createSlice } from "@reduxjs/toolkit";

export const apiKeySlice = createSlice({
  name: "apiKey",
  initialState: {
    apiKey: "",
  },
  reducers: {
    updateApiKey: (state, action) => {
      state.apiKey = action.payload;
    },
  },
});

export const { updateApiKey } = apiKeySlice.actions;
export const apiKey = (state) => state.apiKey;

export default apiKeySlice.reducer;
