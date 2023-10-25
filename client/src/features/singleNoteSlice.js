import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singleNote: null, 
  fetchSingleNoteLoading: false,
  fetchSingleNoteError: null,
};

const fetchSingleNoteSlice = createSlice({
  name: "fetchSingleNote",
  initialState,
  reducers: {
    fetchSingleNoteReq: (state) => {
      state.fetchSingleNoteLoading = true;
      state.fetchSingleNoteError = null;
    },
    fetchSingleNoteSuccess: (state, action) => {
      state.fetchSingleNoteLoading = false;
      state.singleNote = action.payload; 
    },
    fetchSingleNoteFail: (state, action) => {
      state.fetchSingleNoteLoading = false;
      state.fetchSingleNoteError = action.payload;
    },
  },
});

export const {
  fetchSingleNoteReq,
  fetchSingleNoteSuccess,
  fetchSingleNoteFail,
} = fetchSingleNoteSlice.actions;

export default fetchSingleNoteSlice.reducer;
