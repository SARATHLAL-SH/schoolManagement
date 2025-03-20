import axios from "axios";

const API_URL = "http://localhost:8081/api/syllabus";

export const getSyllabusByCourseId = async (courseId) => {
  const response = await axios.get(`${API_URL}/${courseId}`);
  return response.data;
};

export const addSyllabus = async (syllabusData) => {
  const response = await axios.post(API_URL, syllabusData);
  return response.data;
};

export const updateSyllabus = async (id, syllabusData) => {
  const response = await axios.put(`${API_URL}/${id}`, syllabusData);
  return response.data;
};

export const deleteSyllabus = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
