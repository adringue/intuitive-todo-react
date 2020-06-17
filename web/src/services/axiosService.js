

import axios from 'axios';


class AxiosService {
  axiosInstance;
  constructor(){
     this.initInstance();
  }
    initInstance(){
    this.axiosInstance=axios.create({
      // baseURl:'/api/todo',
      timeout:5000
    });
    this.axiosInstance.interceptors.request.use((config)=> {
        const token = localStorage.getItem("todo_login_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }
    );
  }
  get todoAxios(){
  return this.axiosInstance;
   }
}

export default new AxiosService();
