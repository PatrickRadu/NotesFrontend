import React, { useState } from "react";

import Note from "./Note";
import axios from "axios";
const baseUrl = 'http://localhost:3001/api/notes'
interface NotesProps {
  notes?: any;
}

const Notes: React.FC<NotesProps> = ({ notes }) => {
  const [note, setNote] = useState({
    content: "",
    important: false,
  });

  const handleChangeNote = (e: any) => {
    setNote({
      ...note,
      [e.target.name]: e.target.name!="important"? e.target.value : e.target.checked,
    });
  };
  console.log("Note",note);

  const handleSubmit = (e:any)=>{
    e.preventDefault();
    axios.post(baseUrl,{
        content: note.content,
        important: note.important
    }).then(response => {
        console.log(response.data)
    }).catch(error => {
        console.log(error)
    })
  }
  return (
    <div>
      <h1>Notes</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Content:
          <input type="text" name="content" onChange={handleChangeNote} />
        </label>
        <label>
          Important:
          <input type="checkbox" name="important" onChange={handleChangeNote} checked={note.important} />
        </label>
        <button type="submit">Add Note</button>
      </form>

      <ul>
        {notes &&
          notes.map((note: any, index: any) => (
            <Note key={index} note={note} />
          ))}
      </ul>
    </div>
  );
};

export default Notes;
