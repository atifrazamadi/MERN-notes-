import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);
  
  
  // Get all notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token'),
      }
    });
    const json = await response.json()
   
    setNotes(json)
  }
  
  //Add Note
  const addNote = async(title, description, tag) => {
    
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({title,description,tag}
      ), // body data type must match "Content-Type" header
    });
    
    const note= await response.json();
    setNotes(notes.concat(note));
   
    
  };
  // Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes//deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
         },
      
    });
    // eslint-disable-next-line
     const json = response.json();
   



   
    const newNotes = notes.filter((note) => note._id !== id);

    setNotes(newNotes);
  };

  // Update a Note

  const updateCurrentNote = async (id, title, description, tag) => {
   
    const response = await fetch(`${host}/api/notes//updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    // eslint-disable-next-line
    const json= await response.json();
    
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag= tag;
        break;
      }
      
    }
    setNotes(newNotes)
  };

  return (
    <NoteContext.Provider value={{ notes, addNote,getNotes, deleteNote, updateCurrentNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
