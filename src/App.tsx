
import { useEffect,useRef,useState } from 'react'
import './App.css'
import Notes from './components/Notes/Notes'
const baseUrl = 'http://localhost:3001/api/notes'
import axios from 'axios'
import {login} from "../services/login"
import noteService from "../services/noteService";
import LoginForm from './components/Notes/LoginForm'
import Toggable from './components/Notes/Toggable'

function App() {

  const [notes, setNotes] = useState([])
  const [username,setUsername] = useState('') 
  const [password,setPassword] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const noteFormRef=useRef<any>()
  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={(e:any) => setUsername(e.target.value)}
            handlePasswordChange={(e:any) => setPassword(e.target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }
  useEffect(() => {
    noteService
      .getAll().then(initialNotes => {
        console.log("Initial Notes",initialNotes)
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (noteObject:any) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const [user, setUser] = useState(null)
  
  const handleLogin = async (event:any) => {
    event.preventDefault()
    
    try {
      const user = await login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
     
      setTimeout(() => {
      }, 5000)
    }
  }
  console.log("User",user)
  return (
    <>
    
    {loginVisible && loginForm()}
    <button onClick={() => setLoginVisible(true)}>See Login</button>
    <button onClick={(() => setLoginVisible(false))}>cancel</button>    
    {user && 
    <Toggable buttonLabel="new note" ref={noteFormRef}>
    <Notes createNote={addNote} />
    </Toggable>
    }
    {user && <>
      <h2>Notes</h2>
      <ul>
        {notes.map((note:any) =>
          <li key={note.id}>{note.content} - {note.important ? "important":"not important"}</li>
        )}
      </ul>
    </>}

    </>
  )
}

export default App
