import React, { useEffect, useState } from "react";
import { getCourses, deleteCourse } from "../services/courseService";
import { toast } from "react-toastify";
import CourseManagement from "../components/CourseManagement";
import axios from "axios";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const API_URL = "http://localhost:8081";

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/get_courses`);
      if (response.data) {
        setCourses(response.data);
      }
    } catch (error) {}
  };

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      toast.success("Course deleted successfully!");
      fetchCourses();
    } catch (error) {
      toast.error("Failed to delete course");
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setShowForm(true)}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Course
      </button>

      {showForm && (
        <CourseManagement
          course={selectedCourse}
          onSave={() => {
            setShowForm(false);
            fetchCourses();
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {courses.map((course) => (
          <div key={course.id} className="border p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">{course.name}</h3>
            <p>Category: {course.category}</p>
            <p>Duration: {course.duration}</p>
            <p>Syllabus: {course.syllabus}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  setSelectedCourse(course);
                  setShowForm(true);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(course.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
