import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../Components/navbar/Navbar";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleNoteAction,
  updateNoteAction,
} from "../../actions/notesActions";
import { useNavigate, useParams } from "react-router-dom";
import SimpleBackdrop from "../../Components/loader/MuiBackdrop";
import { updateNoteFail } from "../../features/updateToDoSlice";

const ViewEditToDo = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useRef(null);
  const fetchData = useSelector((state) => state.fetchSingleNote);
  const { singleNote, fetchSingleNoteLoading, fetchSingleNoteError } =
    fetchData;
  const updateData = useSelector((state) => state.updateNote);
  const { updateNoteLoading, updateNoteError, updatedNote } = updateData;
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchSingleNoteAction(id));
  }, [dispatch, id]);

  // Update local state when the fetched data changes
  useEffect(() => {
    if (singleNote) {
      setTitle(singleNote.title);
      setContent(singleNote.content);
    }
  }, [singleNote]);
  const CancelHandle = () => {
    navigate("/home");
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    dispatch(updateNoteAction(id, formData));
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Successfully Updated",
      life: 3000,
    });
  };
  // useEffect(() => {
  //   if (updatedNote) {
  //     toast.current.show({
  //       severity: "success",
  //       summary: "Success",
  //       detail: "Successfully Updated",
  //       life: 3000,
  //     });
  //   }
  // }, [updatedNote]);
  useEffect(() => {
    if (updateNoteError) {
      toast.current.show({
        severity: "error",
        summary: "Task Updating Failed",
        detail: updateNoteError,
        life: 3000,
      });
    }
    dispatch(updateNoteFail(null));
  }, [dispatch,updateNoteError]);

  return (
    <>
      <Navbar />
      <SimpleBackdrop loading={(fetchSingleNoteLoading, updateNoteLoading)} />
      <Toast ref={toast} />
      <div className='flex justify-center items-center  h-screen bg-blue-300'>
        <div className='container mx-auto my-4 px-4 lg:px-20'>
          <div className='w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl'>
            <div className='flex'>
              <h1 className='font-bold uppercase text-5xl'>
                You can Edit the <br /> Task
              </h1>
            </div>
            <form onSubmit={handleFormSubmit}>
              <input
                className='w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='Title*'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className='grid grid-cols-1 gap-5 md:grid-cols-2 mt-5'></div>
              <div className='my-4'>
                <textarea
                  placeholder='Content*'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className='w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline'
                ></textarea>
              </div>
              <div className='grid grid-cols-1 gap-5 md:grid-cols-2 mt-5'>
                <button
                  className='uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
                      focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  Update
                </button>
                <button
                  className='uppercase text-sm font-bold tracking-wide bg-red-600 text-gray-100 p-3 rounded-lg w-full 
                      focus:outline-none focus:shadow-outline'
                  onClick={CancelHandle}
                >
                  Back to Home
                </button>
              </div>
            </form>
          </div>
          <div class='w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-blue-900 rounded-2xl'>
            <div class='flex flex-col text-white'>
              <h1
                class='font-bold uppercase text-4xl my-4'
                style={{ overflow: "hidden", wordWrap: "break-word" }}
              >
                {title}
              </h1>
              <p
                class='text-gray-400'
                style={{ overflow: "hidden", wordWrap: "break-word" }}
              >
                {content}
              </p>

              <div class='flex my-4 w-2/3 lg:w-1/2'>
                <a
                  href='https://www.facebook.com/ENLIGHTENEERING/'
                  target='_blank'
                  rel='noreferrer'
                  class='rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1'
                >
                  <i class='fab fa-facebook-f text-blue-900' />
                </a>
                <a
                  href='https://www.linkedin.com/company/enlighteneering-inc-'
                  target='_blank'
                  rel='noreferrer'
                  class='rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1'
                >
                  <i class='fab fa-linkedin-in text-blue-900' />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewEditToDo;
