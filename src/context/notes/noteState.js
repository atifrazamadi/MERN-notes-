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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyM2U3ODk2OWNlY2I5ZTM4ZjljYmEzIn0sImlhdCI6MTY5Njg1MTg1M30.HxX1jLNol8su6WLaQf2ft7d1_vEb5t9p2jimEAEtumo"
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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyM2U3ODk2OWNlY2I5ZTM4ZjljYmEzIn0sImlhdCI6MTY5Njg1MTg1M30.HxX1jLNol8su6WLaQf2ft7d1_vEb5t9p2jimEAEtumo",
      },
      body: JSON.stringify({title,description,tag}
      ), // body data type must match "Content-Type" header
    });
    // eslint-disable-next-line
    const json= await response.json();
   
    const note = {
      _id: "61322f119553781a8ca8d0e08",
      user: "6131dc5e3e4037cd4734a0664",
      title: title,
      description: description,
      tag: tag,
      date: "2021-09-03T14:20:09.668Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  // Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes//deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyM2U3ODk2OWNlY2I5ZTM4ZjljYmEzIn0sImlhdCI6MTY5Njg1MTg1M30.HxX1jLNol8su6WLaQf2ft7d1_vEb5t9p2jimEAEtumo",
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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyM2U3ODk2OWNlY2I5ZTM4ZjljYmEzIn0sImlhdCI6MTY5Njg1MTg1M30.HxX1jLNol8su6WLaQf2ft7d1_vEb5t9p2jimEAEtumo",
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
