import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/TitanTsai/JS-Daily-Project/',
    withCredentials: false,
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application.json'
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