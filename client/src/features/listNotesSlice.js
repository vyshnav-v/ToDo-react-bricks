import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetchNotes: [],
  listNotesLoading: false,
  listNotesError: null,
};

const listNotesSlice = createSlice({
  name: "listNotes",
  initialState,
  reducers: {
    listNotesReq: (state) => {
      state.listNotesLoading = true;
      state.listNotesError = null;
    },
    listNotesSuccess: (state, action) => {
      state.listNotesLoading = false;
      state.fetchNotes = action.payload;
    },
    listNotesFail: (state, action) => {
      state.listNotesLoading = false;
      state.listNotesError = action.payload;
    },
  },
});

export const { listNotesReq, listNotesSuccess, listNotesFail } =
  listNotesSlice.actions;

export default listNotesSlice.reducer;
