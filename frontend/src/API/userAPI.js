// import axios from "axios";

// export const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // Register a new user
// export const postUser = async (data) => {
//   try {
//     const response = await API.post("/auth/register", data);
//     return response.data;
//   } catch (error) {
//     console.error("API Error in postUser:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // Log in a user
// export const getUser = async (data) => {
//   try {
//     const response = await API.post("/auth/login", data);
//     return response.data;
//   } catch (error) {
//     console.error("API Error in loginUser:", error.response?.data || error.message);
//     throw error;
//   }
// };
