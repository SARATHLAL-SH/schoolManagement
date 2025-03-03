import React, { useEffect, useState, useRef } from "react";
import {
  FaDownload,
  FaPrint,
  FaIdBadge,
  FaSearch,
  FaTicketAlt,
  FaCross,
  FaWindowClose,
} from "react-icons/fa";
import { TiTick } from "react-icons/ti";

import { columns } from "../../Helper/empHelper";
import DataTable from "react-data-table-component";
import {
  getAttendancebyDate,
  attendanceStatusChange,
  groupAttendance,
  getEmpAttendancebyDate,
  empAttendanceStatusChange,
} from "../../service";
import { useDispatch, useSelector } from "react-redux";
import BarcodeScanner from "../../../../components/BarcodeScanner/Components/BarCodeScanner";
import toast from "react-hot-toast";
import { messageHandler } from "../../Helper/messageHandler";

const StaffAttendance = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [digitalAttendance, setDigitalAttendance] = useState(false);
  const [manualAttendance, setManualAttendance] = useState(false);
  const { data, loading, error } = useSelector(
    (state) => state.getAllEmpAttendance
  );
  const { isSuccess } = useSelector((state) => state.empAttendaceUpdate);

  const [filters, setFilters] = useState({
    campus: "",
    class: "",
    section: "all Section",
    range: "all",
  });

  const [campusOptions, setCampusOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIdCardModalOpen, setIsIdCardModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const tableRef = useRef([]);
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [scannedValue, setScannedValue] = useState("");

  const tableContent = document.getElementById(
    "studentTableWrapper"
  )?.outerHTML;
  const handleScannedValue = (value) => {
    setScannedValue(value);
  };
  useEffect(() => {
    // Dispatch the fetchStudents action
    dispatch(getEmpAttendancebyDate(selectedDate));
  }, [dispatch]);

  useEffect(() => {
    isSuccess && toast.success("Attendance Uptated");
  }, [isSuccess]);
  console.log("data", data);
  useEffect(() => {
    if (data?.length > 0) {
      // setFilteredStudents(data);
      setStudents(data);
      setCampusOptions([...new Set(data.map((student) => student.campus))]);
      setClassOptions([...new Set(data.map((student) => student.designation))]);
      setSectionOptions([...new Set(data.map((student) => student.gender))]);
    }
  }, [data]);

  // Handle Filtering
  useEffect(() => {
    let filtered = students;

    if (filters.campus === "Manual Attendance") {
      setDigitalAttendance(false);
    }
    if (filters.campus === "Digital Attendance") {
      setManualAttendance(false);
      setDigitalAttendance(true);
    }
    if (filters.class) {
      filtered = filtered.filter(
        (student) => student.designation === filters.class
      );
    }
    if (filters.section && filters.section !== "all Section") {
      filtered = filtered.filter(
        (student) => student.gender === filters.section
      );
    }
    if (filters.range === "specific" && search) {
      filtered = filtered.filter((student) =>
        student.name.toLowerCase().startsWith(search.toLowerCase())
      );
    }
    setFilteredStudents(filtered);
  }, [filters, search, students]);
  console.log("filteredStudents", filteredStudents);

  const handleAttendanceStatusChange = (row, value) => {
    console.log(row, value);
    const formatedDate = new Date(selectedDate)?.toISOString()?.split("T")[0];
    const data = {
      id: row.id,
      status: value,
      date: formatedDate,
    };
    console.log("data===>", data);
    dispatch(empAttendanceStatusChange(data));
    // Handle the logic for updating the attendance status
    console.log(`Updated attendance for ${row.name} to ${value}`);
    if (value === "absent") {
      messageHandler(row);
    }
    // You can update state or make an API call to save the status
  };
  const columnsWithHandler = columns(handleAttendanceStatusChange);

  // Handle Filter Changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const onSubmit = () => {
    setManualAttendance(true);
    setDigitalAttendance(false);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    dispatch(getEmpAttendancebyDate(event.target.value));
    console.log("Selected date:", event.target.value);
  };

  const allPresentHandler = (status) => {
    const dateObject = new Date(selectedDate);
    const data = {
      className: filters.class,
      section: filters.section,
      status: status,
      date: dateObject.toISOString().split("T")[0],
    };
    console.log("all present data", data);
    dispatch(groupAttendance(data));
  };
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 bg-gradient-to-r from-gray-100 to-gray-300 shadow-md rounded-lg">
      {/* Filter Section */}
      <div className="bg-blue-900 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold text-white mb-4">
          Employee Attendacne
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Campus Filter */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Category
            </label>
            <select
              name="campus"
              onChange={handleFilterChange}
              value={filters.campus}
              className="w-full border-gray-300 py-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="Manual Attendance">Manual Attendance</option>
              <option value="Digital Attendance">Digital Attendance</option>
            </select>
          </div>

          {/* Class Filter */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Designation
            </label>
            <select
              name="class"
              onChange={handleFilterChange}
              value={filters.class}
              className="w-full border-gray-300 py-2 rounded-md  shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select</option>
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
              Gender
            </label>
            <select
              name="section"
              onChange={handleFilterChange}
              value={filters.section}
              className="w-full border-gray-300  py-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All</option>
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
              <option value="all">All Employee</option>
              <option value="specific">Specific Student</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end mt-2 bg-blue-900 shadow-lg align-center rounded-md ">
          <button
            type="submit"
            className="bg-blue-600 flex p-2 m-2 rounded-md text-white font-bold items-center justify-center hover:bg-green-800"
            onClick={() => allPresentHandler("present")}
          >
            Mark All Present
            <span className="ml-2">
              <TiTick />
            </span>
          </button>
          <button
            type="button"
            className="bg-red-600 flex p-2 m-2 rounded-md text-white font-bold items-center justify-center hover:bg-green-800"
            onClick={() => allPresentHandler("absent")}
          >
            Mark All Absent
            <span className="ml-2">
              <FaWindowClose />
            </span>
          </button>
          <button
            type="submit"
            className="bg-teal-500 flex p-2 m-2 rounded-md text-white font-bold items-center justify-center hover:bg-green-800"
            onClick={() => allPresentHandler("holiday")}
          >
            Mark All Holiday
            <span className="ml-2">
              <FaWindowClose />
            </span>
          </button>
          <button
            type="button"
            className="bg-red-600 flex p-2 m-2 rounded-md text-white font-bold items-center justify-center hover:bg-green-800"
            onClick={() => allPresentHandler("sunday")}
          >
            Mark All Sunday
            <span className="ml-2">
              <FaWindowClose />
            </span>
          </button>
          <input
            type="date"
            defaultValue={selectedDate}
            onChange={handleDateChange}
            className="border bg-red-300 h-10 mt-2 text-white font-bold border-gray-300 rounded-md p-2"
          />

          <button
            type="submit"
            className="bg-green-600 flex p-2 m-2 rounded-md text-white font-bold items-center justify-center hover:bg-green-800"
            onClick={onSubmit}
          >
            Manage Attendance
            <span className="ml-2">
              <FaSearch />
            </span>
          </button>
        </div>

        {/* Search Input */}
        {filters.range === "specific" && (
          <div className="mt-6">
            <label className="block text-sm font-medium  text-white mb-2">
              Search by Employee Name
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

      <div className="flex justify-center">
        {digitalAttendance && (
          <BarcodeScanner onValueChange={handleScannedValue} />
        )}
      </div>
      {/* Display Section */}

      {manualAttendance &&
        (filteredStudents.length > 0 ? (
          <div id="studentTableWrapper" ref={tableRef}>
            <DataTable
              title="Employee Attendance Details"
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
          <p className="text-center text-gray-500">
            No Employee Record Available.
          </p>
        ))}

      {/* Action Buttons */}
    </div>
  );
};

export default StaffAttendance;
