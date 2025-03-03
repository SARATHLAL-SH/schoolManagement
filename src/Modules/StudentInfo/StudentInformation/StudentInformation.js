import React, { useEffect, useState, useRef } from "react";
import { FaDownload, FaPrint, FaIdBadge, FaFileExcel } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { columns } from "./Helper/helper";
import DataTable from "react-data-table-component";
import Modal from "../Modal/Modal";
import IDCardModal from "../Modal/IDCardModal";
import axios from "axios";
import { getStudentsAll } from "./service";
import { useDispatch, useSelector } from "react-redux";
import { handlePrint } from "../../../helpers/printUtils";

const AdmissionForm = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.getAllStudents);
  const [filters, setFilters] = useState({
    campus: "",
    class: "",
    section: "",
    range: "all",
  });

  const [campusOptions, setCampusOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIdCardModalOpen, setIsIdCardModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const tableRef = useRef([]);

  const tableContent = document.getElementById(
    "studentTableWrapper"
  )?.outerHTML;

  useEffect(() => {
    // Dispatch the fetchStudents action
    dispatch(getStudentsAll());
  }, [dispatch]);

  useEffect(() => {
    if (data?.length > 0) {
      // setFilteredStudents(data);
      setStudents(data);
      setCampusOptions([...new Set(data.map((student) => student.campus))]);
      setClassOptions([...new Set(data.map((student) => student.class))]);
      setSectionOptions([...new Set(data.map((student) => student.section))]);
    }
  }, [data]);

  // Handle Filtering
  useEffect(() => {
    let filtered = students;

    if (filters.campus) {
      filtered = filtered.filter(
        (student) => student.campus === filters.campus
      );
    }
    if (filters.class) {
      filtered = filtered.filter((student) => student.class === filters.class);
    }
    if (filters.section) {
      filtered = filtered.filter(
        (student) => student.section === filters.section
      );
    }
    if (filters.range === "specific" && search) {
      filtered = filtered.filter((student) =>
        student.name.toLowerCase().startsWith(search.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
  }, [filters, search, students]);

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
  const handleClickPrint = () => {
    if (tableContent) {
      handlePrint(tableContent);
    }
  };

  // Handle PDF Export
  const handlePDFExport = () => {
    const doc = new jsPDF();
    doc.text("Admission Form Details", 20, 10);
    filteredStudents.forEach((student, index) => {
      doc.autoTable({
        head: [["Field", "Value"]],
        body: Object.entries(student).map(([key, value]) => [key, value]),
        startY: index > 0 ? doc.lastAutoTable.finalY + 10 : 20,
      });
    });
    doc.save("Filtered_Admission_Forms.pdf");
  };

  // Handle Excel Export
  const handleExcelExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredStudents);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Admission Forms");
    XLSX.writeFile(workbook, "Filtered_Admission_Forms.xlsx");
  };

  // Handle Filter Changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 bg-gradient-to-r from-gray-100 to-gray-300 shadow-md rounded-lg">
      {/* Filter Section */}
      <div className="bg-blue-900 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold text-white mb-4">
          Student Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Campus Filter */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Campus
            </label>
            <select
              name="campus"
              onChange={handleFilterChange}
              value={filters.campus}
              className="w-full border-gray-300 py-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Campuses</option>
              {campusOptions.map((campus) => (
                <option key={campus} value={campus}>
                  {campus}
                </option>
              ))}
            </select>
          </div>

          {/* Class Filter */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Class
            </label>
            <select
              name="class"
              onChange={handleFilterChange}
              value={filters.class}
              className="w-full border-gray-300 py-2 rounded-md  shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Classes</option>
              {classOptions.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Section Filter */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Section
            </label>
            <select
              name="section"
              onChange={handleFilterChange}
              value={filters.section}
              className="w-full border-gray-300  py-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Sections</option>
              {sectionOptions.map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>

          {/* Range Filter */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Range
            </label>
            <select
              name="range"
              onChange={handleFilterChange}
              value={filters.range}
              className="w-full border-gray-300 py-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All Students</option>
              <option value="specific">Specific Student</option>
            </select>
          </div>
        </div>

        {/* Search Input */}
        {filters.range === "specific" && (
          <div className="mt-6">
            <label className="block text-sm font-medium  text-white mb-2">
              Search by Student Name
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter student name"
              className="w-full border-gray-300 py-2  pl-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}
      </div>
      <div className="flex justify-end m-4 space-x-6">
        <button
          onClick={handleClickPrint}
          className="flex items-center bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
        >
          <FaPrint className="mr-2" />
          Print
        </button>
        <button
          onClick={handlePDFExport}
          className="flex items-center bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
        >
          <FaDownload className="mr-2" />
          Export as PDF
        </button>
        <button
          onClick={handleExcelExport}
          className="flex items-center bg-yellow-500 text-white py-2 px-6 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300"
        >
          <FaFileExcel className="mr-2" />
          Export to Excel
        </button>
      </div>

      {/* Display Section */}
      {filteredStudents.length > 0 ? (
        <div id="studentTableWrapper" ref={tableRef}>
          <DataTable
            title="Student Admission Details"
            id="studentTable"
            columns={columnsWithHandler}
            data={filteredStudents}
            pagination
            highlightOnHover
            responsive
            noDataComponent="No students found"
          />
        </div>
      ) : (
        <p className="text-center text-gray-500">No students found.</p>
      )}
      {isModalOpen && (
        <Modal
          student={selectedStudent}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isIdCardModalOpen && (
        <IDCardModal
          student={selectedStudent}
          onClose={() => setIsIdCardModalOpen(false)}
        />
      )}
      {/* Action Buttons */}
    </div>
  );
};

export default AdmissionForm;
