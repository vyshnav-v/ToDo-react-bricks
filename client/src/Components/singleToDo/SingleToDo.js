import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteNoteAction } from "../../actions/notesActions";


const SingleToDo = (props) => {
  const { title, content, _id } = props.task;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const viewNote = () => {
    navigate(`/single-view/${_id}`);
  };
  const DeleteNote=()=>{

dispatch(deleteNoteAction(_id));

  }
 
  const footer = (
    <div className='flex flex-wrap justify-content-end gap-2'>
      <Button label='View' icon='pi pi-file-edit' onClick={viewNote} />
      <Button
        label='Delete'
        icon='pi pi-times'
        className='p-button-outlined p-button-danger'
        onClick={DeleteNote}
      />
    </div>
  );
  // Add a function to truncate content if it exceeds a certain length
  const truncateContent = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "..."; // Add an ellipsis if content is truncated
    }
    return text;
  };
  return (
    <div className='card  '>
      <Card
        title={truncateContent(title, 10)}
        // subTitle='Subtitle'
        footer={footer}
        // header={header}
      >
        <div className=''>
          <p> {truncateContent(content, 15)}</p>
        </div>
      </Card>
    </div>
  );
};

export default SingleToDo;
