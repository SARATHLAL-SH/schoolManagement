import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsAll } from "../Modules/StudentInfo/StudentInformation/service";
import { getAllEmployee } from "../Modules/StaffManagement/service";
import { getAllFee } from "../Modules/FeeManagement/service";
import { getAttendancebyDate } from "../Modules/ManageAttendance/service";

// Register Chart.js components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [totalgirls, setTotalGirls] = useState(0);
  const [totalboys, setTotalBoys] = useState(0);
  const [maleEmployees, setMaleEmployees] = useState(0);
  const [femaleEmployees, setFemaleEmployees] = useState(0);
  const {
    data: students,
    loading,
    error,
  } = useSelector((state) => state.getAllStudents);
  const {
    data: employees,
    loading: employeeLoading,
    error: employeeError,
  } = useSelector((state) => state.getAllEmployee);
  const { data: attendance } = useSelector(
    (state) => state.getAllStudnetsAttendance
  );
  const { data: feeData } = useSelector((state) => state.getAllFee);
  console.log("attendance", attendance);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    dispatch(getStudentsAll());
    dispatch(getAllEmployee());
    dispatch(getAllFee());
    dispatch(getAttendancebyDate(today));
  }, [dispatch, location]);
  const totalStudents = students?.length;
  const presentCount = attendance?.filter((student) =>
    student?.attendances?.some((attendance) => attendance.status === "Present")
  ).length;
  const attendancePesentage = (presentCount / totalStudents) * 100;
  useEffect(() => {
    setTotalBoys(
      students?.filter((student) => student?.gender.toLowerCase() === "male")
        .length || 0
    );
    setTotalGirls(
      students?.filter((student) => student?.gender.toLowerCase() === "female")
        .length || 0
    );
    setMaleEmployees(
      employees?.filter((employee) => employee?.gender.toLowerCase() === "male")
        .length || 0
    );
    setFemaleEmployees(
      employees?.filter(
        (employee) => employee?.gender.toLowerCase() === "female"
      ).length || 0
    );
  }, [students, employees]);
  // Chart data

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  // ** Extract unique months from feeData **
  const availableMonths = [
    ...new Set(feeData?.map(({ month }) => month))
  ].sort((a, b) => a - b); // Sort in ascending order
  
  // ** Use available months OR full months **
  const labels = availableMonths.length ? availableMonths?.map(m => monthNames[m - 1]) : monthNames;
  
  // ** Initialize data arrays **
  const paidCounts = new Array(labels.length).fill(0);
  const unpaidCounts = new Array(labels.length).fill(0);
  
  // ** Count Paid & Unpaid for each month **
  feeData?.forEach(({ month, status }) => {
    const index = labels.indexOf(monthNames[month - 1]);
    if (index !== -1) {
      if (status === "Paid") {
        paidCounts[index] += 1;
      } else if (status === "Unpaid") {
        unpaidCounts[index] += 1;
      }
    }
  });
  
  // ** Construct chartData **
  const chartData = {
    labels,
    datasets: [
      {
        label: "Paid",
        data: paidCounts,
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Green
      },
      {
        label: "Unpaid",
        data: unpaidCounts,
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Red
      },
    ],
  };
  

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Month Wise Paid/Unpaid Fee Report For Current Year",
      },
    },
  };

  return (
    <div className="flex flex-wrap p-4">
      {/* Bar Chart Section */}
      <div className="w-full md:w-3/4 p-4">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Data Cards Section */}
      <div className="w-full md:w-1/4 p-4 flex flex-col gap-4">
        {/* Total Students Card */}
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold">Total Students</h3>
          <p>Boys: {totalboys || 0}</p>
          <p>Girls: {totalgirls || 0}</p>
        </div>

        {/* Total Parents Card */}
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold">Parents</h3>
          <p>Total Registered Parents: 10</p>
        </div>

        {/* Staff Attendance Card */}
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold">Staff</h3>
          <p>Male: {maleEmployees || 0}</p>
          <p>Female: {femaleEmployees || 0}</p>
        </div>

        {/* Present Students Today Card */}
        <div className="bg-indigo-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold">Present Students Today</h3>
          <p>Attendance Percentage: {attendancePesentage || 0}%</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
