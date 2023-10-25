import React, { useRef, useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import SimpleBackdrop from "../loader/MuiBackdrop";
import { createNoteAction, listNotes } from "../../actions/notesActions";
import { createNoteFail } from "../../features/createToDoSlice";
import SingleToDo from "./SingleToDo.js";
import { deleteNoteFail } from "../../features/deleteNoteSlice";
import { listNotesFail } from "../../features/listNotesSlice";

const CreateToDo = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  const dispatch = useDispatch();
  const itemsPerPage = 8; // Number of items to show per page
  const [currentPage, setCurrentPage] = useState(1);

  const { userInfo } = useSelector((state) => state.UserSignIn);
  const createNote = useSelector((state) => state.createNote);
  const { createNoteLoading, noteInfo, createNoteError } = createNote;

  const notesData = useSelector((state) => state.listNotes);
  const { fetchNotes, listNotesLoading, listNotesError } = notesData;
const deleteData = useSelector((state) => state.deleteNote);
const { deleteNoteLoading, deleteNoteError } = deleteData;
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("userId", userInfo.user._id);
    dispatch(createNoteAction(formData));
  };
  
  

  useEffect(() => {
    dispatch(listNotes());
  }, [dispatch, noteInfo, deleteNoteLoading]);

  useEffect(() => {
    if (noteInfo) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Successfully Added",
        life: 3000,
      });
    }

    setTitle("");
    setContent("");
  }, [noteInfo]);

  useEffect(() => {
    if (createNoteError) {
      toast.current.show({
        severity: "error",
        summary: "Task Creating Failed",
        detail: createNoteError,
        life: 3000,
      });
    }
    dispatch(createNoteFail(null));
  }, [dispatch,createNoteError]);
useEffect(() => {
  if (deleteNoteError) {
    toast.current.show({
      severity: "error",
      summary: "Task Deleting Failed",
      detail: deleteNoteError,
      life: 3000,
    });
  }
  dispatch(deleteNoteFail(null));
}, [dispatch,deleteNoteError]);

useEffect(() => {
  if (listNotesError) {
    toast.current.show({
      severity: "error",
      summary: "No Tasks found",
      detail: listNotesError,
      life: 3000,
    });
  }
  dispatch(listNotesFail(null));
}, [dispatch,listNotesError]);
  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(fetchNotes.data?.length / itemsPerPage);

  return (
    <>
      <div className='container'>
        <div className='card flex flex-wrap  mt-14 justify-center'>
          <div className='grid gap-6  mt-3 '>
            <SimpleBackdrop
              loading={(createNoteLoading, listNotesLoading, deleteNoteLoading)}
            />
            <Toast ref={toast} />

            <Button
              label='Add Task'
              icon='pi pi-external-link'
              onClick={() => setVisible(true)}
            />
            <Dialog
              header='Add New Task'
              visible={visible}
              onHide={() => setVisible(false)}
              style={{ width: "50vw" }}
              breakpoints={{ "960px": "75vw", "641px": "100vw" }}
            >
              <div className='flex   justify-center'>
                <form onSubmit={handleFormSubmit}>
                  <div className='grid gap-6 '>
                    <div className='mb-6'>
                      <label
                        htmlFor='description'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Add Task
                      </label>

                      <div className='card gap-6  justify-content-center'>
                        <input
                          type='text'
                          className='bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          placeholder='Enter Task Title'
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <br />
                        <div className=''>
                          <InputTextarea
                            autoResize
                            value={content}
                            placeholder='Enter task'
                            onChange={(e) => setContent(e.target.value)}
                            rows={5}
                            cols={30}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type='submit'
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  >
                    Create
                  </button>
                </form>
              </div>
            </Dialog>
          </div>
        </div>
      </div>

      <div className='bg-blue-300   flex justify-center items-center '>
        <div className='w-full md:w-3/4 lg:w-2/3 xl:w-1/2'>
          <h2 className='mb-4 self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
            ToDo
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {fetchNotes.data?.slice(startIndex, endIndex).map((task) => (
              <div
                className='flex items-center mb-5 justify-center'
                key={task._id}
              >
                <SingleToDo task={task} />
              </div>
            ))}
          </div>
          <div className='flex items-center justify-center mt-4'>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateToDo;
