import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: false,
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default{
    getTasks(){
        return apiClient.get('/taskList')
    },

    getCategory(){
        return apiClient.get('/types')
    }
}