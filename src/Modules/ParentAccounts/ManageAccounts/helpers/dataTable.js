import { FaKey, FaUser } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const createColumns = ({
  handleShowStudents,
  handleAction,
  handleResetPassword,
}) => [
  {
    name: "Parent ID",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: false,
  },
 
  {
    name: "Childs",
    cell: (row) => (
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        onClick={() => handleShowStudents(row.email)}
      >
        <FaUser className="mr-2" />
        <span>Connected Students</span>
      </button>
    ),
  },
  {
    name: "Reset Password",
    cell: (row) => (
      <button
        className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
        onClick={() => handleResetPassword(row)}
      >
        <FaKey className="mr-2" />
        <span>Reset Password</span>
      </button>
    ),
  },
  {
    name: "Action",
    cell: (row) => (
      <div className="relative">
        {/* Action Button */}
        <button
          className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
          onClick={() => handleAction("toggleDropdown", row)}
        >
          Action
          <IoMdArrowDropdown className="ml-2" />
        </button>

        {/* Dropdown Menu */}
        {row.isDropdownOpen && (
          <div className="absolute bg-gray-700 text-white border rounded shadow-md mt-2 w-40 z-10">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-200 hover:text-gray-900"
              onClick={() => handleAction("edit", row)}
            >
              Edit
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-200 hover:text-gray-900"
              onClick={() => handleAction("delete", row)}
            >
              Delete
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-200 hover:text-gray-900"
              onClick={() => handleAction("deactivate", row)}
            >
              Deactivate
            </button>
          </div>
        )}
      </div>
    ),
  },
];

export default createColumns;
