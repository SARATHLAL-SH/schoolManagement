import React, { useEffect, useState } from "react";
import { getAllFee } from "../../service";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
// Sample Data (Replace with your actual data)

const FeeReport = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [reportType, setReportType] = useState("monthly");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [filterType, setFilterType] = useState("all");
  const { data } = useSelector((state) => state.getAllFee);
  const [filteredData, setFilteredData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFee());
  }, []);

  const filterData = () => {
    const currentDate = new Date();
    const today = currentDate.toISOString().split("T")[0];

    let filtered = data;

    if (reportType === "daily") {
      filtered = data?.filter((fee) => fee.date.startsWith(today));
    } else if (reportType === "monthly") {
      filtered = data?.filter(
        (fee) => new Date(fee.date).getMonth() + 1 === selectedMonth
      );
    } else if (reportType === "yearly") {
      filtered = data?.filter(
        (fee) => new Date(fee.date).getFullYear() === currentDate.getFullYear()
      );
    }

    if (filterType === "paid") {
      filtered = filtered?.filter((fee) => fee.status === "Paid");
    } else if (filterType === "unpaid") {
      filtered = filtered?.filter((fee) => fee.status === "Unpaid");
    }
    return filtered;
  };

  // Function to calculate total fee collected
  const calculateTotal = () => {
    const filtered = filterData();
    return filtered?.reduce((acc, fee) => acc + fee.amountPaid, 0);
  };
  const handleRowSelected = (selected) => {
    setSelectedRows(selected.selectedRows);
  };
  // Print report
  const handlePrint = () => {
    const filteredRows = filterData();
    if (filteredRows?.length === 0) {
      alert("No data available to print!");
      return;
    }

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
        <html>
          <head>
            <title>Print Report</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid black; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <h2>Selected Fee Report</h2>
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Title</th>
                  <th>Amount Paid</th>
                  <th>Due</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${filteredRows
                  .map(
                    (row) => `
                  <tr>
                    <td>${row.student.name}</td>
                    <td>${row.title}</td>
                    <td>₹${row.amountPaid}</td>
                    <td>₹${row.due}</td>
                    <td>${row.status}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
            <script>
              window.onload = function () { window.print(); window.close(); }
            </script>
          </body>
        </html>
      `);
    printWindow.document.close();
  };

  const columns = [
    {
      name: "Student Name",
      selector: (row) => row.student.name,
      sortable: true,
    },
    { name: "Title", selector: (row) => row.title, sortable: true },
    {
      name: "Amount Paid",
      selector: (row) => `₹${row.amountPaid}`,
      sortable: true,
    },
    { name: "Due", selector: (row) => `₹${row.due}`, sortable: true },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          className={`px-2 py-1 w-28 font-bold text-white rounded ${
            row.status === "Paid" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">Fee Report</h1>
      <div className="flex flex-row justify-between items-center">
        {/* Report Type Selection */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setReportType("daily")}
            className={`px-4 py-2 border rounded ${
              reportType === "daily" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Daily Report
          </button>
          <button
            onClick={() => setReportType("monthly")}
            className={`px-4 py-2 border rounded ${
              reportType === "monthly"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Monthly Report
          </button>
          <button
            onClick={() => setReportType("yearly")}
            className={`px-4 py-2 border rounded ${
              reportType === "yearly" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Yearly Report
          </button>
        </div>

        {/* Month Selection for Monthly Report */}
        {reportType === "monthly" && (
          <div className="flex justify-center mb-4">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="p-2 border rounded bg-white shadow-md"
            >
              {[...Array(12)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {new Date(0, index).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Paid / Unpaid Students Filter */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setFilterType("all")}
            className={`px-4 py-2 border rounded ${
              filterType === "all" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            All Students
          </button>
          <button
            onClick={() => setFilterType("paid")}
            className={`px-4 py-2 border rounded ${
              filterType === "paid" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            Paid Students
          </button>
          <button
            onClick={() => setFilterType("unpaid")}
            className={`px-4 py-2 border rounded ${
              filterType === "unpaid" ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
          >
            Unpaid Students
          </button>
        </div>
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={handlePrint}
            className="px-6 py-2 bg-green-500 text-white rounded shadow-lg hover:bg-green-600"
          >
            Print Report 🖨️
          </button>
        </div>
      </div>
      {/* Total Fee Collected */}
      <div className="mb-4 p-4 bg-white rounded shadow-lg text-center">
        <h2 className="text-lg font-semibold">Total Fee Collected</h2>
        <p className="text-2xl font-bold text-green-600">₹{calculateTotal()}</p>
      </div>

      {/* Report Table */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2">{reportType} Report</h2>
        <DataTable
          columns={columns}
          data={filterData()}
          pagination
          highlightOnHover
          responsive
          onSelectedRowsChange={handleRowSelected}
        />
      </div>

      {/* Print Button */}
    </div>
  );
};

export default FeeReport;
