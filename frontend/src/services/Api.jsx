import axios from "axios";

// baseURL should match your backend (example: http://localhost:5000 or deployed server URL)
const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // if using cookies/sessions
});

// export const partnerAPi = axios.create({
//     baseURL: "http://localhost:8000/api",
//     withCredentials: true,
// })

 export default api;