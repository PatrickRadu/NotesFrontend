import axios from 'axios'
const baseUrl = '/api/notes'


let token:any = null


const setToken = (newToken: string): void => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const create = async (newObject:any) => {
  const config = {
    headers: { Authorization: token },
  }


  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id:any, newObject:any) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}


export default { getAll, create, update, setToken }