import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updateNoteLoading: false,
  updateNoteError: null,
  updatedNote: null,
};

const updateNoteSlice = createSlice({
  name: "updateNote",
  initialState: initialState,
  reducers: {
    updateNoteReq: (state) => {
      state.updateNoteLoading = true;
      state.updateNoteError = null;
    },
    updateNoteSuccess: (state, action) => {
      state.updateNoteLoading = false;
      state.updatedNote = action.payload;
    },
    updateNoteFail: (state, action) => {
      state.updateNoteLoading = false;
      state.updateNoteError = action.payload;
    },
  },
});

export const { updateNoteReq, updateNoteSuccess, updateNoteFail } =
  updateNoteSlice.actions;

export default updateNoteSlice.reducer;
