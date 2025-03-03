import { FaKey } from "react-icons/fa";

// connectedStudentsColumns.js
export const connectedStudentsColumns = (disconnectHandler) => [
  {
    name: "Photo",
    selector: (row) => row.imageUrl,
    cell: (row) => (
      <img src={row.imageUrl} alt="Student" className="w-10 h-10 rounded-full" />
    ),
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Class",
    selector: (row) => row.class,
    sortable: true,
  },
  {
    name: "Campus",
    selector: (row) => row.campus,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <button
        className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
        onClick={() => disconnectHandler(row)}
      >
        <span>Disconnect</span>
      </button>
    ),
  },
];
