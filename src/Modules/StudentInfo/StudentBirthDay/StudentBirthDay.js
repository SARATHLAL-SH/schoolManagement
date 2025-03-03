import React, { useEffect, useState, useRef } from "react";
import { FaDownload, FaPrint, FaIdBadge, FaFileExcel } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { columns } from "../StudentBirthDay/Helper/helper";
import DataTable from "react-data-table-component";
import Modal from "../Modal/Modal";
import BirthdayModal from "./Modals/BirthDayModal";
import { getStudentsAll } from "../StudentInformation/service"; 
import { useDispatch, useSelector } from "react-redux";

const StudentBirthDay = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    campus: "",
    class: "",
    section: "",
    range: "all",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIdCardModalOpen, setIsIdCardModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const printableRef = useRef([]);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.getAllStudents);
  console.log("data===>", data);
  useEffect(() => {
    // Dispatch the fetchStudents action
    dispatch(getStudentsAll());
  }, [dispatch]);

  useEffect(() => {
    if (data?.length > 0) {
      setStudents(data);

      // Get today's month and day
      const today = new Date();
      const todayMonth = today.getMonth() + 1; // Months are 0-indexed, so add 1
      const todayDay = today.getDate();

      // Filter students whose dateofBirth matches today's month and day
      const filtered = data?.filter((student) => {
        const studentDate = new Date(student.dateofBirth);
        return (
          studentDate.getMonth() + 1 === todayMonth &&
          studentDate.getDate() === todayDay
        );
      });

      setFilteredStudents(filtered);
    }
  }, [data]);

  // Handle Filtering

  const handleViewProfile = (student) => {
    setSelectedStudent(student); // Store student info to display in the modal
    setIsModalOpen(true); // Open the modal
  };
  const handleIdCardView = (student) => {
    setSelectedStudent(student); // Store student info to display in the modal
    setIsIdCardModalOpen(true); // Open the modal
  };
  const columnsWithHandler = columns(handleViewProfile, handleIdCardView);
  // Handle Print

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 bg-gradient-to-r from-gray-100 to-gray-300 shadow-md rounded-lg">
      {/* Filter Section */}
      <div className="bg-blue-900 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Student Birthdays</h2>

        {/* Search Input */}
      </div>

      {/* Display Section */}
      {filteredStudents.length > 0 ? (
        <DataTable
          title="Student Admission Details"
          columns={columnsWithHandler}
          data={filteredStudents}
          pagination
          highlightOnHover
          responsive
          noDataComponent="No students found"
        />
      ) : (
        <p className="text-center text-gray-500">No BirthDays Find Today.</p>
      )}

      {/* Action Buttons */}
      {isModalOpen && (
        <BirthdayModal
          student={selectedStudent}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default StudentBirthDay;
