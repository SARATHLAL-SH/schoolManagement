import React from "react";
import DataTable from "react-data-table-component";
import { connectedStudentsColumns } from "./connectedStudentsColumns";

const ConnectedStudentsModal = ({ students, onClose }) => {
  const disconnectHandler = async (row) => {
    console.log("Disconnect clicked for student:", row);
  };
  const column = connectedStudentsColumns(disconnectHandler);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg h-2/4 w-2/4 overflow-y-scroll">
        <h2 className="text-lg font-bold mb-4">Connected Students</h2>
        <DataTable
          columns={column}
          data={students}
          pagination
          highlightOnHover
          responsive
          className="text-sm"
        />
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ConnectedStudentsModal;
