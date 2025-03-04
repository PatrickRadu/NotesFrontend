import { useState } from 'react'


interface NoteFormProps {
  createNote: any
}
const NoteForm:React.FC<NoteFormProps> = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event:any) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true
    })

    setNewNote('')
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={event => setNewNote(event.target.value)}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm