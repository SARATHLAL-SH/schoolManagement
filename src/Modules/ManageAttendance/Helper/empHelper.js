import {
  FaPrint,
  FaDownload,
  FaIdBadge,
  FaFileExcel,
  FaKey,
  FaUser,
  FaArrowDown,
} from "react-icons/fa";
import { attendanceStatusChange } from "../service";
import { useDispatch, useSelector } from "react-redux";

const formatDate = (dateString) => {
  console.log(dateString);
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

export const columns = (handleAttendanceStatusChange) => [
  {
    name: "Photo",
    selector: (row) => (
      <img
        src={row.imageUrl}
        alt={`${row.name}'s photo`}
        className="w-20 h-20 rounded-md object-cover"
      />
    ),
    sortable: false,
    width: "100px",
  },
  //   {
  //     name: "Student Code",
  //     selector: (row) => row.studentCode,
  //     sortable: true,
  //   },
  {
    name: "Emp. Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Designation",
    selector: (row) => row.designation,
    sortable: true,
  },
  {
    name: "Gender",
    selector: (row) => row.gender,
    sortable: true,
  },
  {
    name: "Father Name",
    selector: (row) => row.fatherName,
    sortable: true,
  },

  {
    name: "Attendance Status",
    cell: (row) => (
      <div className="flex space-x-2">
        <select
          onChange={(e) => handleAttendanceStatusChange(row, e.target.value)}
          className="bg-gray-100 text-gray-800 py-1 px-3 rounded-md"
        >
          <option value="undefined">
            {row?.empAttendances[0]?.status || "Undefined"}
          </option>
          <option value="absent">Absent</option>
          <option value="present">Present</option>
          <option value="late">Late</option>
          <option value="half day">Half Day</option>
          <option value="sunday">Sunday</option>
          <option value="holiday">Holiday</option>
          <option value="onleave">On Leave</option>
        </select>
      </div>
    ),
    ignoreRowClick: true,
  },
];
