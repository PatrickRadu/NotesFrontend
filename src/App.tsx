
import { useEffect,useState } from 'react'
import './App.css'
import Notes from './components/Notes/Notes'
const baseUrl = 'http://localhost:3001/api/notes'
import axios from 'axios'
function App() {

  const [notes, setNotes] = useState([])
  useEffect(() => {
    axios.get(baseUrl).then(response => {
      setNotes(response.data)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  return (
    <>
    <Notes notes={notes} />
    </>
  )
}

export default App
