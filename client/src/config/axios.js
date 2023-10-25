import axios from 'axios';

const instance = axios.create({
  baseURL: "https://react-todo-563f.onrender.com/api",
});
    
export default instance;