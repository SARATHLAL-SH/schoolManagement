import React, { useEffect, useState, useRef } from "react";
import { FaDownload, FaPrint, FaIdBadge, FaFileExcel } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { columns } from "../Helper/helper";
import DataTable from "react-data-table-component";
import Modal from "../Modal/Modal";
import IDCardModal from "../Modal/IDCardModal";
import AddEmployeeModal from "../Modal/AddEmployeeModal";
import { getAllEmployee,addEmployee } from "../service";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


const StaffManagement = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [employeewithState, setEmployeewithState] = useState([]);
  const { register, watch,reset } = useForm(); // Initialize useForm
  const searchTerm = watch("searchTerm", "");
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.getAllEmployee);
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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const printableRef = useRef([]);
  useEffect(() => {
    // Dispatch the fetchStudents action
    dispatch(getAllEmployee());

  }, [dispatch]);

  useEffect(() => {
    // Initialize dropdown state for each parent
    const employeeWithDropdown = (data || []).map((employee) => ({
      ...employee,
      isDropdownOpen: false,
    }));
    setEmployeewithState(employeeWithDropdown);
  }, [data]);

  const handleAddEmployee = async(data) => {
    try{
      
      dispatch(getAllEmployee());
      toast.success("Employee Details Added Successfully");
      
    }catch (error) {
      console.error("Error adding employee:", error);
    
    // API call or submission logic here
  };
}

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

  

  const filteredEmployee = employeewithState.filter((employee) => {
    const name = employee.name?.toLowerCase() || ""; // Safely handle null/undefined
    const employeeId = employee.EmployeeId?.toLowerCase() || ""; // Safely handle null/undefined
  
    return `${name} ${employeeId}`.startsWith(searchTerm.toLowerCase());
  });
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 bg-gradient-to-r from-gray-100 to-gray-300 shadow-md rounded-lg">
      {/* Filter Section */}
      <div className="bg-blue-900 p-6 rounded-lg shadow-md mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white mb-2">Staff Management</h2>
        <button onClick={() => setIsAddModalOpen(true)} className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
        Add Employee +
        </button>
        </div>
        <form>
          <input
            {...register("searchTerm")} // Register input field with useForm
            type="text"
            className="border rounded w-full p-2"
            placeholder="Search by name or Employee ID"
          />
        </form>
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
        <DataTable
          title="Employee Details"
          columns={columnsWithHandler}
          data={filteredEmployee}
          pagination
          highlightOnHover
          responsive
          noDataComponent="No students found"
        />
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
      {isAddModalOpen && (
        <AddEmployeeModal
        isOpen = {isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddEmployee}
        />
      )}
    </div>
  );
};

export default StaffManagement;
