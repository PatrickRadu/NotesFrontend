import React from "react";

interface NoteProps {
    note:any
}
const Note:React.FC<NoteProps> = ({note})=>{
return (
    <div>
        <li>{note.content}</li>
        <p>{note.important ? "Important":"Not Important"}</p>  
    </div>
)
}

export default Note;