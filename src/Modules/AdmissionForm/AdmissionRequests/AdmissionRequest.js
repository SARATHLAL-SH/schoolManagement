import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";

import "jspdf-autotable";
import { handlePrint } from "../../../helpers/handlePrint";
import { exportToPDF } from "../../../helpers/exportTopdf";
import { exportToExcel } from "../../../helpers/exportToExcel";
const AdmissionRequest = () => {
  // Sample data
  const [admissionRequests, setAdmissionRequests] = useState([]);

  // Define columns
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Student",
      selector: (row) => row.studentName,
      sortable: true,
    },
    {
      name: "Parent",
      selector: (row) => row.parentName,
      sortable: true,
    },
    {
      name: "Request For Class",
      selector: (row) => row.requestClass,
      sortable: true,
    },
    {
      name: "Date Of Birth",
      selector: (row) => row.dob,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Request Status",
      selector: (row) => row.requestStatus,
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded ${
            row.requestStatus === "Approved"
              ? "bg-green-200 text-green-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {row.requestStatus}
        </span>
      ),
    },
    {
      name: "Options",
      cell: (row) => (
        <button
          className="text-blue-500 hover:underline"
          onClick={() => handleOptionClick(row)}
        >
          View Details
        </button>
      ),
    },
  ];
  const csvHeaders = [
    { label: "Student Name", key: "studentName" },
    { label: "Parent Name", key: "parentName" },
    { label: "Request Class", key: "requestClass" },
    { label: "Date Of Birth", key: "dob" },
    { label: "Gender", key: "gender" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Request Status", key: "requestStatus" },
  ];

  // Fetch data (replace this with your API call)
  useEffect(() => {
    const fetchData = async () => {
      const data = [
        {
          studentName: "John Doe",
          parentName: "Jane Doe",
          requestClass: "Class 1",
          dob: "2008-01-01",
          gender: "Male",
          email: "john@example.com",
          phone: "1234567890",
          requestStatus: "Pending",
        },
        {
          studentName: "Abraham",
          parentName: "John Abraham",
          requestClass: "Class 2",
          dob: "2018-01-01",
          gender: "Male",
          email: "Abraham@example.com",
          phone: "1234567890",
          requestStatus: "Pending",
        },
      ];
      setAdmissionRequests(data);
    };

    fetchData();
  }, []);

  const handleOptionClick = (row) => {
    alert(`Viewing details for ${row.studentName}`);
  };

  // Custom pagination
  const paginationOptions = {
    rowsPerPageText: "Rows per page",
    rangeSeparatorText: "of",
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Admission Requests</h2>
      <div className="mb-4 flex justify-end gap-2">
        <button
          onClick={() => exportToExcel(admissionRequests, "AdmissionRequests")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Excel
        </button>

        <CSVLink
          data={admissionRequests}
          headers={csvHeaders}
          filename="admission_requests.csv"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          CSV
        </CSVLink>

        <button
          onClick={() => exportToPDF(admissionRequests)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          PDF
        </button>
        <button
          onClick={() => handlePrint(admissionRequests)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Print
        </button>
      </div>
      <DataTable
        columns={columns}
        data={admissionRequests}
        pagination
        paginationComponentOptions={paginationOptions}
        noDataComponent="No records found."
        highlightOnHover
        striped
      />
    </div>
  );
};

export default AdmissionRequest;
