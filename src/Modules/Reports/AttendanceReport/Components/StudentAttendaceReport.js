import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsAll } from "../../../StudentInfo/StudentInformation/service";
import { useReactToPrint } from "react-to-print";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";

const AttendanceReport = () => {
  const dispatch = useDispatch();
  const { data: students } = useSelector((state) => state.getAllStudents);

  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const componentRef = useRef();

  useEffect(() => {
    dispatch(getStudentsAll()); // Fetch student data on mount
  }, [dispatch]);

  useEffect(() => {
    if (students) {
      let filtered = students;

      // Filter by class
      if (selectedClass) {
        filtered = filtered.filter(
          (student) => student.class === selectedClass
        );
      }

      // Filter by section
      if (selectedSection) {
        filtered = filtered.filter(
          (student) => student.section === selectedSection
        );
      }

      // Search by student name
      if (searchTerm) {
        filtered = filtered.filter((student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredStudents(filtered);
    }
  }, [students, selectedClass, selectedSection, searchTerm]);

  // Print function
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
  
    if (!printWindow) {
      alert("Please allow pop-ups to print the report.");
      return;
    }
  
    const tableContent = `
      <html>
      <head>
        <title>Attendance Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; margin: 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
          th { background-color: #f4f4f4; }
          .present { color: green; font-weight: bold; }
          .absent { color: red; font-weight: bold; }
          @media print {
            body { zoom: 100%; } /* Ensures full-page printing */
            table { page-break-before: avoid; page-break-inside: auto; }
            th, td { font-size: 12px; }
            thead { display: table-header-group; }
            tbody { display: table-row-group; }
            tr { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <h2 style="text-align:center;">Attendance Report</h2>
        <p><strong>Class:</strong> ${selectedClass || "All Classes"} | <strong>Section:</strong> ${selectedSection || "All Sections"} | <strong>Month:</strong> ${selectedMonth || "All Months"}</p>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>Total Present</th>
              <th>Total Absent</th>
              ${Array.from({ length: daysInMonth }, (_, i) => `<th>${i + 1}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${filteredStudents
              .map((student) => {
                const { id, name, studentCode, class: studentClass, section, attendances } = student;
  
                const attendanceMap = attendances.reduce((acc, record) => {
                  const day = new Date(record.date).getDate();
                  acc[day] = record.status;
                  return acc;
                }, {});
  
                const totalPresent = attendances.filter((a) => a.status === "present").length;
                const totalAbsent = attendances.filter((a) => a.status === "absent").length;
  
                return `
                  <tr>
                    <td>${studentCode}</td>
                    <td>${name}</td>
                    <td>${studentClass}</td>
                    <td>${section}</td>
                    <td class="present">${totalPresent}</td>
                    <td class="absent">${totalAbsent}</td>
                    ${Array.from({ length: daysInMonth }, (_, i) => {
                      const status = attendanceMap[i + 1] || "-";
                      return `
                        <td class="${status === "present" ? "present" : status === "absent" ? "absent" : ""}">
                          ${status === "present" ? "✔️" : status === "absent" ? "❌" : "-"}
                        </td>
                      `;
                    }).join("")}
                  </tr>
                `;
              })
              .join("")}
          </tbody>
        </table>
        <script>
          window.onload = function() {
            window.print();
            setTimeout(() => window.close(), 500);
          };
        </script>
      </body>
      </html>
    `;
  
    printWindow.document.write(tableContent);
    printWindow.document.close();
  };
  
  

  const daysInMonth = new Date(2024, selectedMonth, 0).getDate(); // Get days in selected month

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-bold text-center mb-4">Attendance Report</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          className="border p-2"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">All Classes</option>
          <option value="Class 1">Class 1</option>
          <option value="Class 2">Class 2</option>
          <option value="Class 3">Class 3</option>
        </select>

        <select
          className="border p-2"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          <option value="">All Sections</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
        </select>

        <select
          className="border p-2"
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

        <input
          type="text"
          placeholder="Search by student name"
          className="border p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
              <th className="border p-2">Class</th>
              <th className="border p-2">Section</th>
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
            {filteredStudents.map((student) => {
              const {
                id,
                name,
                studentCode,
                class: studentClass,
                section,
                attendances,
              } = student;

              // Filter attendance based on selected month
              const monthlyAttendance = attendances.filter(
                (record) =>
                  new Date(record.date).getMonth() + 1 === selectedMonth
              );

              // Create an attendance map for the selected month
              const attendanceMap = monthlyAttendance.reduce((acc, record) => {
                const day = new Date(record.date).getDate();
                acc[day] = record.status;
                return acc;
              }, {});

              // Calculate totals for the selected month
              const totalPresent = monthlyAttendance.filter(
                (a) => a.status === "present"
              ).length;
              const totalAbsent = monthlyAttendance.filter(
                (a) => a.status === "absent"
              ).length;

              return (
                <tr key={id}>
                  <td className="border p-2">{studentCode}</td>
                  <td className="border p-2">{name}</td>
                  <td className="border p-2">{studentClass}</td>
                  <td className="border p-2">{section}</td>
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

      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Print Attendance Sheet
      </button>
    </div>
  );
};

export default AttendanceReport;
