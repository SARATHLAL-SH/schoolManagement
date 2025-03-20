import React, { useEffect, useState } from "react";
import { addCourse, updateCourse } from "../services/courseService";
import { toast } from "react-toastify";
import axios from "axios";

const CourseManagement = ({ course, onSave }) => {
  const [syllabuses, setSyllabuses] = useState();
  const API_URL = "http://localhost:8081";
  const [formData, setFormData] = useState(
    course || {
      category: "",
      duration: "",
      name: "",
      syllabus: "",
    }
  );

  useEffect(async () => {
    const fetchSyllabus = async () => {
      const response = await axios.get(`${API_URL}/get_Syllubus`);
      if (response?.data) {
        setSyllabuses(response?.data || []);
      }
    };
    fetchSyllabus();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log("formdata", formData);
    try {
      if (course) {
        const response = await axios.put(`${API_URL}/${course.id}`, formData);
        if (response.data) {
          toast.success("Course updated successfully!");
        }
      } else {
        const response = await axios.post(`${API_URL}/add_course`, formData);
        if (response.data) {
          toast.success("Course added successfully!");
        }
      }
    } catch (error) {
      console.error("Error saving course:", error);
      toast.error("Error saving course!");
    }
  };
const addSyllabusHandler = async (name) =>{
try {
  const response =  await axios.post(`${API_URL}/add_Syllubus`,{name} );
  if(response.data){
    console.log("response", response.data)
  }
} catch (error) {
  console.log(error);
}
}
  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg">
      <div className="mb-4">
        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="package">Package</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className="mb-4">
        <label>Duration:</label>
        <select
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="1 Month">1 Month</option>
          <option value="3 Months">3 Months</option>
          <option value="6 months">6 Months</option>
          <option value="9 months">9 Months</option>
          <option value="1 Year">1 Year</option>
          <option value="1.6 Years">1.6 Years</option>
          <option value="2 Years">2 Years</option>
          <option value="3 Years">3 Years</option>
        </select>
      </div>

      <div className="mb-4">
        <label>Course Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label>Syllabus:</label>
        <select
          name="syllabus"
          value={formData.syllabus}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select</option>
          {syllabuses?.map((syl) => (
            <option value={syl.name}>{syl.name}</option>
          ))}
        </select>
        <button type="button" onClick={addSyllabusHandler} className="bg-green-600 p-4"> Add</button>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  );
};

export default CourseManagement;
