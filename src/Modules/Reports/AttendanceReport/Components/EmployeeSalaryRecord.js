import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployeeAttendance } from "../service";

const EmployeeSalaryRecord = () => {
  const dispatch = useDispatch();
  const { data: employee } = useSelector(
    (state) => state.getAllEmployeeAttendance
  );

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [salaryRecords, setSalaryRecords] = useState([]);

  useEffect(() => {
    dispatch(getAllEmployeeAttendance());
  }, [dispatch]);

  useEffect(() => {
    if (employee) {
      const updatedRecords = employee.map((emp) => {
        const monthlyAttendance =
          emp.empAttendances?.filter((attendance) => {
            const attendanceMonth = new Date(attendance.date).getMonth() + 1;
            return attendanceMonth === selectedMonth;
          }) || [];

        const totalAbsent = monthlyAttendance.filter(
          (a) => a.status === "absent"
        ).length;
        const dailySalary = emp.salary / 30;
        const deduction = totalAbsent * dailySalary;
        const finalSalary = emp.salary - deduction;

        return {
          id: emp.id,
          name: emp.name,
          designation: emp.designation,
          totalAbsent,
          salary: emp.salary,
          finalSalary,
        };
      });

      setSalaryRecords(updatedRecords);
    }
  }, [employee, selectedMonth]);

  return (
    <div>
      <h2 className="font-bold text-gray-600">Employee Salary Record</h2>

      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {new Date(2024, i).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>

      <table className="min-w-max w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Designation</th>
            <th className="border p-2">Total Absent</th>
            <th className="border p-2">Base Salary</th>
            <th className="border p-2">Final Salary</th>
          </tr>
        </thead>
        <tbody>
          {salaryRecords.map((record) => {
            const dailySalarySalary = record.finalSalary / 30;
            const monthlySalary =
              record.finalSalary - record.totalAbsent * dailySalarySalary;
            return (
              <tr key={record.id}>
                <td className="border p-2">{record.id}</td>
                <td className="border p-2">{record.name}</td>
                <td className="border p-2">{record.designation}</td>
                <td className="border p-2 text-red-600 font-bold">
                  {record.totalAbsent}
                </td>
                <td className="border p-2">₹{record.salary.toFixed(2)}</td>
                <td className="border p-2 text-green-600 font-bold">
                  ₹{monthlySalary.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeSalaryRecord;
