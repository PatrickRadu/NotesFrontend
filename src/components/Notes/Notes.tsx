import React from "react";


import Note from "./Note";
interface NotesProps {
    notes?: any
}


const Notes:React.FC<NotesProps> = ({notes}) => {
    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes && notes.map((note:any, index:any) => (
                    <Note key={index} note={note} />
                ))}
            </ul>
        </div>
    )
}

export default Notes;