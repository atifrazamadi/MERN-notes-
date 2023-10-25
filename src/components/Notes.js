import React, { useContext, useEffect,useRef ,useState} from "react";
import NoteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
const Notes = () => {
  const context = useContext(NoteContext);
  
  const { notes, getNotes,updateCurrentNote } = context;
  const ref =useRef(null)
  const refClose =useRef(null)
  
  const [note, setNote] = useState({id:"",utitle: "", udescription: "", utag: ""})
  const handleClick = (e)=>{
    console.log("updating the note....",note)
    updateCurrentNote(note.id,note.utitle,note.udescription,note.utag)
    refClose.current.click()
    
  }
  
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  
  
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  const updateNote=(currentNote)=>{
    ref.current.click()
    setNote({id:currentNote._id,utitle:currentNote.title,udescription:currentNote.description,utag:currentNote.tag})
    
  }
 

  return (
    <>
      <AddNote />
      <button  type="button" ref={ref} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal"  tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="utitle" className="form-label">Title</label>
                    <input type="text" className="form-control" value={note.utitle} id="utitle" name="utitle" aria-describedby="emailHelp" onChange={onChange} /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="udescription" className="form-label">Description</label>
                    <input type="text" className="form-control" value={note.udescription} id="udescription" name="udescription" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="utag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="utag" value={note.utag} name="utag" onChange={onChange} />
                </div>
            </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
            
      <div className="row">
        <h2>your Notes</h2>
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} updateNote={updateNote} />
        ))}
      </div>
    </>
  );
};

export default Notes;
