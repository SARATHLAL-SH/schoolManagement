import React, { useEffect, useState, useRef } from "react";
import { FaDownload, FaPrint, FaFileExcel } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { getStudentsAll } from "../../StudentInfo/StudentInformation/service";
import { useDispatch, useSelector } from "react-redux";

const AdmissionForm = () => {
  // const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    campus: "",
    class: "",
    section: "",
    range: "all",
  });

  const [campusOptions, setCampusOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const printableRef = useRef([]);
  const dispatch = useDispatch();
  const { data: students } = useSelector((state) => state.getAllStudents);
  useEffect(() => {
    dispatch(getStudentsAll());
    // Extract unique options dynamically
    setCampusOptions([...new Set(students?.map((student) => student.campus))]);
    setClassOptions([...new Set(students?.map((student) => student.class))]);
    setSectionOptions([...new Set(students?.map((student) => student.section))]);
  }, []);

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

  // Handle Print
  const handlePrint = () => {
    // Combine all student data by iterating over the printableRefs
    const printContents = printableRef.current
      .map((ref) => (ref ? ref.innerHTML : "")) // Get the inner HTML of each student div
      .join(""); // Combine them into a single string

    if (printContents) {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
          <head>
            <title>Student Form</title>
            <style>
              @media print {
                body {
                  font-family: Arial, sans-serif;
                  font-size: 12px;
                }
                img {
                  width: 48px; /* Adjust the width for print */
                  height: 52px; /* Maintain aspect ratio */
                  margin-bottom: 10px;
                }
                h1 {
                  font-size: 18px;
                }
                p {
                  font-size: 14px;
                }
              }
            </style>
          </head>
          <body>
            ${printContents}  <!-- The combined content of all students -->
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
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
          Print Admission Form
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
          onClick={handlePrint}
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
        filteredStudents.map((student, index) => (
          <div
            key={student.id}
            ref={(el) => (printableRef.current[index] = el)}
            className="bg-white  rounded-md border-2 border-black shadow-md p-6 mb-8 space-y-6"
          >
            <div className="flex w-24 flex-col items-center">
              <img
                src={student.photo}
                alt={`${student.name}'s photo`}
                className="w-24 h-28 rounded-md object-cover mt-2"
              />
              <p className="text-gray-400 text-xl uppercase font-bold ">
                {student.name}
              </p>
            </div>
            {/* Student Information */}
            <div className="flex w-full flex-row justify-space-between">
              <div className="flex-grow border-2 border-black p-4 mr-12">
                <h2 className="text-2xl font-bold text-white pl-2  bg-amber-200  pb-2 mb-4">
                  Student Information
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <p className="text-gray-700">
                    <strong>Name:</strong> {student.name}
                  </p>
                  <p className="text-gray-700">
                    <strong>Date of Birth:</strong>{" "}
                    {new Date(student.dateofBirth).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">
                    <strong>Gender:</strong> {student.gender}
                  </p>
                </div>
              </div>

              {/* Parent Information */}
              <div className="flex-grow border-2 border-black p-4">
                <h2 className="text-2xl font-bold text-white pl-2  bg-amber-200  pb-2 mb-4">
                  Parent Information
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <p className="text-gray-700">
                    <strong>Father's Name:</strong> {student.fatherName}
                  </p>
                  <p className="text-gray-700">
                    <strong>Father's Email:</strong> {student.fatherEmail}
                  </p>
                  <p className="text-gray-700">
                    <strong>Father's Phone:</strong> {student.fatherPhone}
                  </p>
                  <p className="text-gray-700">
                    <strong>Mother's Phone:</strong> {student.motherPhone}
                  </p>
                </div>
              </div>
            </div>
            {/* Academic Information */}
            <div>
              <h2 className="text-2xl font-bold text-white pl-2  bg-amber-200 border-b-2 border-purple-200 pb-2 mb-4">
                Academic Information
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <p className="text-gray-700">
                  <strong>Class:</strong> {student.class}
                </p>
                <p className="text-gray-700">
                  <strong>Section:</strong> {student.section}
                </p>
                <p className="text-gray-700">
                  <strong>Previous School:</strong> {student.previousSchool}
                </p>
                <p className="text-gray-700">
                  <strong>Admission Date:</strong>{" "}
                  {new Date(student.admissionDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Other Information */}
            <div>
              <h2 className="text-2xl font-bold text-white pl-2  bg-amber-200 border-b-2 border-red-200 pb-2 mb-4">
                Other Information
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <p className="text-gray-700">
                  <strong>Religion:</strong> {student.religion}
                </p>
                <p className="text-gray-700">
                  <strong>Transport Route:</strong> {student.transportRoute}
                </p>
                <p className="text-gray-700">
                  <strong>Generate Admission Fee:</strong>{" "}
                  {student.generateAdmissionFee}
                </p>
                <p className="text-gray-700">
                  <strong>Monthly Fee:</strong> ₹{student.monthlyFee}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No students found.</p>
      )}

      {/* Action Buttons */}
    </div>
  );
};

export default AdmissionForm;
