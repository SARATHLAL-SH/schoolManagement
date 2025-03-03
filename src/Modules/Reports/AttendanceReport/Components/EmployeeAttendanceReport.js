import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEmployeeAttendanceDate,
  getAllEmployeeAttendance,
} from "../service";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";

const EmployeeAttendanceReport = () => {
  const dispatch = useDispatch();
  const { data: employee } = useSelector(
    (state) => state.getAllEmployeeAttendance
  );

  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const componentRef = useRef();

  useEffect(() => {
    dispatch(getAllEmployeeAttendance());
  }, [dispatch]);

  useEffect(() => {
    if (employee) {
      let filtered = employee;

      // Filter by designation
      if (selectedDesignation) {
        filtered = filtered.filter(
          (emp) => emp.designation === selectedDesignation
        );
      }

      // Filter by gender
      if (selectedSection) {
        filtered = filtered.filter((emp) => emp.gender === selectedSection);
      }

      // Search by employee name
      if (searchTerm) {
        filtered = filtered.filter((emp) =>
          emp.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filter attendance by selected month
      filtered = filtered.map((emp) => {
        const filteredAttendance =
          emp.empAttendances?.filter((attendance) => {
            const attendanceMonth = new Date(attendance.date).getMonth() + 1;
            return attendanceMonth === selectedMonth;
          }) || [];

        return { ...emp, empAttendances: filteredAttendance };
      });

      setFilteredEmployees(filtered);
    }
  }, [
    employee,
    selectedDesignation,
    selectedSection,
    searchTerm,
    selectedMonth,
  ]);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert("Please allow pop-ups to print the report.");
      return;
    }

    printWindow.document.write(`
      <html>
      <head>
        <title>Attendance Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
          th { background-color: #f4f4f4; }
        </style>
      </head>
      <body>
        ${componentRef.current.innerHTML}
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };
  const daysInMonth = new Date(2024, selectedMonth, 0).getDate();
  return (
    <div>
      <h2>Employee Attendance Report</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedDesignation}
          onChange={(e) => setSelectedDesignation(e.target.value)}
        >
          <option value="">All Designations</option>
          <option value="Teacher">Teacher</option>
          <option value="Admin">Admin</option>
        </select>

        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        >
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>

        <button onClick={handlePrint}>Print</button>
      </div>

      {/* Attendance Table */}
      <div
        className="w-[75vw] overflow-y-auto border rounded-lg"
        ref={componentRef}
      >
        <table className="min-w-max w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Designation</th>
              <th className="border p-2">Gender</th>
              <th className="border p-2">Total Present</th>
              <th className="border p-2">Total Absent</th>
              {Array.from({ length: daysInMonth }, (_, i) => (
                <th key={i} className="border p-2">
                  {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => {
              const { id, name, designation, gender, empAttendances } = emp;

              // Filter attendance records for the selected month
              const monthlyAttendance = empAttendances.filter(
                (record) =>
                  new Date(record.date).getMonth() + 1 === selectedMonth
              );

              // Create an attendance map for quick lookup
              const attendanceMap = monthlyAttendance.reduce((acc, record) => {
                const day = new Date(record.date).getDate();
                acc[day] = record.status;
                return acc;
              }, {});

              // Calculate totals
              const totalPresent = monthlyAttendance.filter(
                (a) => a.status === "present"
              ).length;
              const totalAbsent = monthlyAttendance.filter(
                (a) => a.status === "absent"
              ).length;

              return (
                <tr key={id}>
                  <td className="border p-2">{id}</td>
                  <td className="border p-2">{name}</td>
                  <td className="border p-2">{designation}</td>
                  <td className="border p-2">{gender}</td>
                  <td className="border p-2 text-green-600 font-bold">
                    {totalPresent}
                  </td>
                  <td className="border p-2 text-red-600 font-bold">
                    {totalAbsent}
                  </td>
                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const status = attendanceMap[i + 1] || "-";
                    return (
                      <td
                        key={i}
                        className={`border p-2 ${
                          status === "absent" ? "text-red-500 font-bold" : ""
                        }`}
                      >
                        {status === "present" ? (
                          <TiTick className="text-green-600" />
                        ) : status === "absent" ? (
                          <IoClose className="text-red-600 font-bold" />
                        ) : (
                          "-"
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeAttendanceReport;
