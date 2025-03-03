import React, { useState } from "react";
import DataTable from "react-data-table-component";
import {
  FaFileCsv,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
  FaSms,
} from "react-icons/fa";
import { exportToExcel } from "../../../helpers/exportToExcel";
import { exportToPDFInquiries } from "../../../helpers/exportTopdf";
import EnqueryModal from "../../../Modals/EnqueryModal";


const AdmissionInquiries = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([
    {
      id: 13,
      name: "test",
      parent: "demo",
      birthday: "03-01-2020",
      gender: "female",
      phone: "3442555335",
      address: "2020",
      dateAdded: "01-01-1970 00:00:00",
    },
    {
      id: 14,
      name: "Student1",
      parent: "Parent",
      birthday: "07-01-2015",
      gender: "male",
      phone: "11111",
      address: "abc road",
      dateAdded: "07-08-2022 08:24:17",
    },
    {
      id: 15,
      name: "Ali",
      parent: "Ahmed",
      birthday: "12-11-2022",
      gender: "male",
      phone: "0331234567",
      address: "Karachi",
      dateAdded: "12-11-2022 17:18:57",
    },
  ]);
  const handleAdmitClick = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRow(null);
  };
  // Sample Data

  const handleUpdate = (updatedStudent) => {
    setData((prev) =>
      prev.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  };
  // Table Columns
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Parent",
      selector: (row) => row.parent,
    },
    {
      name: "Birthday",
      selector: (row) => row.birthday,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Date Added",
      selector: (row) => row.dateAdded,
      sortable: true,
    },
    {
      name: "Admit",
      cell: (row) => (
        <button
          onClick={() => handleAdmitClick(row)}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          Admit
        </button>
      ),
    },
    {
      name: "Send SMS",
      cell: () => (
        <button className="bg-green-500 text-white px-3 py-1 flex items-center whitespace-nowrap  rounded hover:bg-green-600">
          <FaSms className="inline mr-2" />
          Send SMS
        </button>
      ),
    },
    {
      name: "Action",
      cell: () => (
        <button className="bg-gray-500 text-white px-3 py-1  rounded hover:bg-gray-600">
          Action
        </button>
      ),
    },
  ];

  // Custom Styles for the DataTable
  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#f5f5f5",
        fontWeight: "bold",
        fontSize: "14px",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
      },
    },
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Inquiries List</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add New Inquiry
        </button>
      </div>

      {/* Action Buttons */}
      <div className="mb-4 flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => exportToExcel(data, "AdmissionEnquiry")}
            className="flex items-center bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
          >
            <FaFileExcel className="mr-2" /> Excel
          </button>
          <button className="flex items-center bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600">
            <FaFileCsv className="mr-2" /> CSV
          </button>
          <button
            onClick={() => exportToPDFInquiries(data)}
            className="flex items-center bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
          >
            <FaFilePdf className="mr-2" /> PDF
          </button>
          <button className="flex items-center bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600">
            <FaPrint className="mr-2" /> Print
          </button>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="border p-2 rounded w-1/4"
        />
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={data}
        pagination
        customStyles={customStyles}
      />
      <EnqueryModal
        isOpen={showModal}
        onClose={closeModal}
        title="Admit Details"
        student={selectedRow}
        onUpdate={handleUpdate}
      ></EnqueryModal>
    </div>
  );
};

export default AdmissionInquiries;
