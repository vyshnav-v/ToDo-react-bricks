import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  noteInfo: null,
  createNoteLoading: false,
  createNoteError: null,
};

const createNoteSlice = createSlice({
  name: "createNote",
  initialState: initialState,
  reducers: {
    createNoteReq: (state) => {
      state.createNoteLoading = true;
      state.createNoteError = null;
    },
    createNoteSuccess: (state, action) => {
      state.createNoteLoading = false;
      state.noteInfo = action.payload;
    },
    createNoteFail: (state, action) => {
      state.createNoteLoading = false;
      state.createNoteError = action.payload;
    },
  },
});

export const { createNoteReq, createNoteSuccess, createNoteFail } =
  createNoteSlice.actions;

export default createNoteSlice.reducer;
