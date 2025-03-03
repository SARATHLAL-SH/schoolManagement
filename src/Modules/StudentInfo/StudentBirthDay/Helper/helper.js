import {
  FaPrint,
  FaDownload,
  FaIdBadge,
  FaFileExcel,
  FaKey,
  FaUser,
  FaArrowDown,
} from "react-icons/fa";

const formatDate = (dateString) => {
  console.log(dateString);
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

export const columns = (handleViewProfile, handleIdCardView) => [
  {
    name: "Photo",
    selector: (row) => (
      <img
        src={row.photo}
        alt={`${row.name}'s photo`}
        className="w-20 h-20 rounded-md object-cover"
      />
    ),
    sortable: false,
    width: "100px",
  },
  {
    name: "Student",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Class",
    selector: (row) => row.class,
    sortable: true,
  },
  {
    name: "Section",
    selector: (row) => row.section,
    sortable: true,
  },
  {
    name: "Birthdays",
    selector: (row) => formatDate(row.dateofBirth),
    sortable: true,
  },

  {
    name: "Status",
    cell: (row) => (
      <div className="flex space-x-2">
        <button
          onClick={() => handleIdCardView(row)}
          className="flex bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600"
        >
          {" "}
          Today is there BirthDay
          <span className="mt-1">
            <FaIdBadge />
          </span>
        </button>
      </div>
    ),
    ignoreRowClick: true,
    button: true,
  },
 
  {
    name: "Wish",
    cell: (row) => (
      <div className="flex space-x-12">
        <button
          onClick={() => handleViewProfile(row)}
          className=" flex bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 "
        >
          {" "}
          Print BirthDay Card
          <span className="mt-1">
            <FaUser />
          </span>
        </button>
      </div>
    ),
    ignoreRowClick: true,
    button: true,
  },
  {
    name: "Birthday Card",
    cell: (row) => (
      <div className="flex space-x-12">
        <button
          onClick={() => console.log("Export to PDF", row)}
          className=" flex align-center  bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
        >
          Click to Wish{" "}
          <span className="mt-1">
            <FaArrowDown />
          </span>
        </button>
      </div>
    ),
    ignoreRowClick: true,
    button: true,
  },
];
