import axios from "axios";

const API_URL = "http://localhost:8081"; // Backend API

export const getCourses = async () => {
  const response = await axios.get(`${API_URL}/get_courses`);
  return response.data;
};

export const addCourse = async (courseData) => {
  try {
    const response = await axios.post(`${API_URL}/add_course`, courseData);
    return response.data;
  } catch (error) {
    console.log("error",error)
  }
 
};

export const updateCourse = async (id, courseData) => {
  const response = await axios.put(`${API_URL}/${id}`, courseData);
  return response.data;
};

export const deleteCourse = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
