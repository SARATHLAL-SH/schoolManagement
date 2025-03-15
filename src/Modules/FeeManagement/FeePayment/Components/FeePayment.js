// components/FeePayment.js
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStudentsAll } from "../../../StudentInfo/StudentInformation/service";
import FeeDetailsPopup from "../../Modals/FeeDetailsPopup";
import { getFeebyId, updateFeebyId, feeCreation } from "../../service";
import { TbCashRegister } from "react-icons/tb";
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

const FeePayment = () => {
  const dispatch = useDispatch();
  const [selectedRecord, setSelectedRecord] = useState(null);
  const {
    data: students,
    status,
    error,
  } = useSelector((state) => state.getAllStudents);
  const { data: studentFee } = useSelector((state) => state.getFeebyId);
  const {
    data: createFee,
    isSuccess,
    isError,
  } = useSelector((state) => state.feeCreation);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [lastRunMonth, setLastRunMonth] = useState(null);
  const [feeRecord, setFeeRecord] = useState();
  // Fetch students on component mount
  useEffect(() => {
    dispatch(getStudentsAll());
  }, [dispatch]);

  useEffect(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const lastRun = localStorage.getItem("lastRunMonth");

    if (
      !lastRun ||
      JSON.parse(lastRun).month !== currentMonth ||
      JSON.parse(lastRun).year !== currentYear
    ) {
      runFunction();
      localStorage.setItem(
        "lastRunMonth",
        JSON.stringify({ month: currentMonth, year: currentYear })
      );
    }
  }, []);

  //Advance payment function
  const advancePaymentHandler = (row) => {
    console.log("id=====>", row);
    dispatch(getFeebyId(row.id));
  };
  useEffect(() => {
    if (studentFee && studentFee.length > 0) {
      // Find all "Paid" records
      const paidRecords = studentFee.filter(
        (record) => record.status === "Paid"
      );

      // Get the latest "Paid" record, or if none exist, take the first record from all data
      const latestRecord =
        paidRecords.length > 0
          ? paidRecords.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )[0]
          : studentFee[0]; // Take the first record from the dataset if no "Paid" records exist

      setSelectedRecord(latestRecord); // Store the correct record in state
      console.log("Selected Record:", latestRecord);
    }
  }, [studentFee]);

  const runFunction = async () => {
    console.log("Function executed on the first day of the month!");

    const today = new Date();
    const currentMonth = today.getMonth() + 1; // JS months are 0-indexed
    const currentDate = today.toISOString();

    for (const student of students) {
      try {
        let feeRecords = [];
        let existingMonths = new Set();

        try {
          let feeRecords = [];
          let existingMonths = new Set();

          // Dispatch the action to get student fee details
          dispatch(getFeebyId(student.id));

          if (studentFee && studentFee?.length > 0) {
            feeRecords = studentFee;
            existingMonths = new Set(feeRecords.map((record) => record.month));
          } else {
            console.warn(
              `No fee records found for ${student.name} (ID: ${student.id}). Creating new entries.`
            );
          }
        } catch (error) {
          console.error(`Error processing student ${student.name}:`, error);
        }

        let lastPaidMonth =
          feeRecords?.length > 0
            ? feeRecords.sort(
                (a, b) =>
                  new Date(b.updatedAt || b.createdAt) -
                  new Date(a.updatedAt || a.createdAt)
              )[0].month
            : new Date(student.admissionDate).getMonth() + 1;

        console.log("Last paid month:", lastPaidMonth);

        const monthlyFee = student.monthlyFee || 0;
        let credit = student.credit || 0;
        let cumulativeDue = 0;

        // Loop from lastPaidMonth to currentMonth to create missing records
        for (let month = lastPaidMonth; month <= currentMonth; month++) {
          if (existingMonths.has(month)) continue; // Skip if record already exists

          let due = monthlyFee + cumulativeDue - credit;
          due = Math.max(due, 0);
          cumulativeDue += monthlyFee;

          const requestBody = {
            StudentId: student.id,
            date: currentDate,
            month: month,
            amountPaid: 0,
            lateFee: 0,
            recieved: "",
            discount: 0,
            due: 0,
            type: "Monthly Fee",
          };

          try {
            dispatch(feeCreation(requestBody));

            if (createFee?.length > 0) {
              console.log(
                `Fee entry added for ${student.name} (ID: ${student.id}), Month: ${month}, Due: ${due}`
              );
            } else {
              console.error(
                `Failed to create fee entry for ${student.name}, Month: ${month}`
              );
            }
          } catch (postError) {
            console.error(
              `Error creating fee entry for ${student.name}, Month: ${month}:`,
              postError
            );
          }
        }
      } catch (error) {
        console.error(`Error processing student ${student.name}:`, error);
      }
    }
  };

  const lastRun = localStorage.getItem("lastRunMonth");
  // Filter students by name or parent name
  const filteredStudents = useMemo(() => {
    if (!students) return [];
    return students.filter(
      (student) =>
        student.name?.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        student.fatherName
          ?.toLowerCase()
          .startsWith(searchQuery.toLowerCase()) ||
        student.fatherEmail?.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }, [students, searchQuery]);

  // Handle student click

  const handleOpenPopup = (student) => {
    dispatch(getFeebyId(student.id));
    setIsPopupOpen(true);
    dispatch(getStudentsAll());

    setSelectedStudent(student);
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const handleSubmit = (data) => {
    console.log("data in console", data);
  };

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const columns = [
    {
      accessorKey: "name",
      header: "Student Name",
    },
    {
      accessorKey: "fatherName",
      header: "Father's Name",
    },
    {
      accessorKey: "fatherEmail",
      header: "Father's Email",
    },
    {
      accessorKey: "monthlyFee",
      header: "Monthly Fee",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex flex-row gap-2">
          <button
            className="bg-green-600 text-white p-1 rounded flex flex-row items-center"
            onClick={() => handleOpenPopup(row.original)}
          >
            Payment
            <label className="ml-1">
              <TbCashRegister />
            </label>
          </button>
          {/* <button
            className="bg-green-600 text-white p-1 rounded flex flex-row items-center"
            onClick={() => advancePaymentHandler(row.original)}
          >
            Advance Payment
          </button> */}
        </div>
      ),
    },
  ];

  // **React Table Instance**
  const table = useReactTable({
    data: filteredStudents,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 20 } },
  });
  return (
    <div>
      <h1>Fee Payment</h1>
      <input
        type="text"
        placeholder="Search by student name or parent name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      <table className="table-auto border-collapse border border-gray-300 w-full mt-4">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border border-gray-300 px-4 py-2"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-200">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-gray-300 px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="pagination bg-green-200 flex items-center">
        <button
          className={`text-white font-bold m-2 px-2 flex flex-row items-center 
    ${
      table.getCanPreviousPage()
        ? "bg-green-600 hover:bg-green-800"
        : "bg-gray-400 cursor-not-allowed"
    }`}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <label>
            <GrCaretPrevious />
          </label>
          Previous
        </button>

        <span className="font-bold text-gray-600">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>

        <button
          className={`text-white font-bold m-2 px-2 flex flex-row items-center 
              ${
                table.getCanNextPage()
                  ? "bg-green-600 hover:bg-green-800"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
          <label>
            <GrCaretNext />
          </label>
        </button>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[10, 20, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
      {selectedStudent && (
        <FeeDetailsPopup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          student={studentFee}
        />
      )}
    </div>
  );
};

export default FeePayment;
