import { configureStore } from "@reduxjs/toolkit";
import UserSignInReducer from "../features/userSignInSlice";
import UserSignUpReducer from "../features/userSignUpSlice";
import createNoteReducer from "../features/createToDoSlice";
import listNotesReducer from "../features/listNotesSlice";
import fetchSingleNoteReducer from "../features/singleNoteSlice";
import updateNoteReducer from "../features/updateToDoSlice";
import deleteNoteReducer from "../features/deleteNoteSlice";
import searchNotesReducer from "../features/searchToDoSlice"

export const store = configureStore({
  reducer: {
    UserSignIn: UserSignInReducer,
    UserSignUp: UserSignUpReducer,
    createNote: createNoteReducer,
    listNotes: listNotesReducer,
    fetchSingleNote: fetchSingleNoteReducer,
    updateNote: updateNoteReducer,
    deleteNote: deleteNoteReducer,
    searchNotes: searchNotesReducer,
  },
});
