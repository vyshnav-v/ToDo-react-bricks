import axiosConfig from "../config/axios";
import {
  createNoteFail,
  createNoteReq,
  createNoteSuccess,
} from "../features/createToDoSlice";
import { deleteNoteFail, deleteNoteReq, deleteNoteSuccess } from "../features/deleteNoteSlice";
import {
  listNotesFail,
  listNotesReq,
  listNotesSuccess,
} from "../features/listNotesSlice";
import { searchNotesFail, searchNotesReq, searchNotesSuccess } from "../features/searchToDoSlice";
import { fetchSingleNoteFail, fetchSingleNoteReq, fetchSingleNoteSuccess } from "../features/singleNoteSlice";
import { updateNoteFail, updateNoteReq, updateNoteSuccess } from "../features/updateToDoSlice";

export const createNoteAction = (formData) => async (dispatch, getState) => {
  try {
    const title = formData.get("title");
    const content = formData.get("content");
    const userId = formData.get("userId");

    const {
      UserSignIn: { userInfo },
    } = getState();

    const config = {
      headers: {
         "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch(createNoteReq());

    const { data } = await axiosConfig.post(
      `/notes/create`,
      { title, content, userId },
      config
    );

    if (data) {
      dispatch(createNoteSuccess(data));
    }
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch(createNoteFail(errorIs));
  }
};

export const listNotes = () => async (dispatch, getState) => {
  try {
    const {
      UserSignIn: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    dispatch(listNotesReq());
    const notesData = await axiosConfig.get(`/notes/view`, config);

    dispatch(listNotesSuccess(notesData));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(listNotesFail(errorIs));
  }
};


export const fetchSingleNoteAction = (noteId) => async (dispatch, getState) => {
  try {
    const {
      UserSignIn: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch(fetchSingleNoteReq());

     const response = await axiosConfig.get(`/notes/${noteId}`, config);
     const data = response.data;
    dispatch(fetchSingleNoteSuccess(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(fetchSingleNoteFail(errorIs));
  }
};



export const updateNoteAction =
  (noteId, formData) => async (dispatch, getState) => {
    try {
      const title = formData.get("title");
      const content = formData.get("content");

      const {
        UserSignIn: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      dispatch(updateNoteReq());

      const { data } = await axiosConfig.put(
        `/notes/${noteId}`, 
        { title, content },
        config
      );

      if (data) {
        dispatch(updateNoteSuccess(data));
      }
    } catch (error) {
      const errorIs =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(updateNoteFail(errorIs));
    }
  };



  
export const deleteNoteAction = (noteId) => async (dispatch, getState) => {
  try {
    const {
      UserSignIn: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch(deleteNoteReq());

    await axiosConfig.delete(`/notes/${noteId}`, config);

    dispatch(deleteNoteSuccess());
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch(deleteNoteFail(errorIs));
  }
};

export const searchNotesAction =
  (searchQuery) => async (dispatch, getState) => {
    try {
      const {
        UserSignIn: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      dispatch(searchNotesReq());

      const response = await axiosConfig.get(
        `/notes/search?q=${searchQuery}`,
        config
      );
      const data = response.data;

      dispatch(searchNotesSuccess(data));
    } catch (error) {
      const errorIs =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(searchNotesFail(errorIs));
    }
  };
