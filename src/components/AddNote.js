import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [tagError, setTagError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleValidation = () => {
    let hasError = false;

    if (note.title.length < 3) {
      setTitleError("Title must be at least 3 characters");
      hasError = true;
    } else {
      setTitleError("");
    }

    if (note.description.length < 5) {
      setDescriptionError("Description must be at least 5 characters");
      hasError = true;
    } else {
      setDescriptionError("");
    }

    if (note.tag.length < 5) {
      setTagError("Tag must be at least 5 characters");
      hasError = true;
    } else {
      setTagError("");
    }

    setIsButtonDisabled(hasError);
  };

  const handleClick = (e) => {
    e.preventDefault();

    handleValidation();

    if (!isButtonDisabled) {
      
      addNote(note.title, note.description, note.tag);
      setNote({
        title: "",
        description: "",
        tag: "",
       
      });
      props.showAlert(" notes added successfully", "success");
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    // Re-run validation on each input change
    handleValidation();
  };

  return (
    <>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              value={note.title}
              onChange={onChange}
            />
            {titleError && <p className="text-danger">{titleError}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
            />
            {descriptionError && (
              <p className="text-danger">{descriptionError}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
            />
            {tagError && <p className="text-danger">{tagError}</p>}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
            disabled={isButtonDisabled}
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
