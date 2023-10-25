import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the search notes slice
const initialState = {
  searchResults: [],
  searchResultsLoading: false,
  searchResultsError: null,
};


const searchNotesSlice = createSlice({
  name: "searchNotes",
  initialState,
  reducers: {
    searchNotesReq: (state) => {
      state.searchResultsLoading = true;
      state.searchResultsError = null;
    },
    searchNotesSuccess: (state, action) => {
      state.searchResults = action.payload;
      state.searchResultsLoading = false;
      state.searchResultsError = null;
    },
    searchNotesFail: (state, action) => {
      state.searchResultsLoading = false;
      state.searchResultsError = action.payload;
    },
  },
});


export const { searchNotesReq, searchNotesSuccess, searchNotesFail } =
  searchNotesSlice.actions;


export default searchNotesSlice.reducer;
