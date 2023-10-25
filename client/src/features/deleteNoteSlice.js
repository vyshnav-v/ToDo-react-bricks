import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deleteNoteLoading: false,
  deleteNoteError: null,
};

const deleteNoteSlice = createSlice({
  name: "deleteNote",
  initialState,
  reducers: {
    deleteNoteReq: (state) => {
      state.deleteNoteLoading = true;
      state.deleteNoteError = null;
    },
    deleteNoteSuccess: (state) => {
      state.deleteNoteLoading = false;
    },
    deleteNoteFail: (state, action) => {
      state.deleteNoteLoading = false;
      state.deleteNoteError = action.payload;
    },
  },
});

export const { deleteNoteReq, deleteNoteSuccess, deleteNoteFail } =
  deleteNoteSlice.actions;

export default deleteNoteSlice.reducer;
