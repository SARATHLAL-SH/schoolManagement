import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Dashboard from "./Dashbord";
import { getAllFee } from "../Modules/FeeManagement/service";
import { useDispatch, useSelector } from "react-redux";


const attendanceData = [
  { name: "Present", value: 7 },
  { name: "Absent", value: 3 },
];

const COLORS = ["#00C49F", "#FF8042"];

function ChartData() {
  const dispatch = useDispatch();
  const { data: feeData } = useSelector((state) => state.getAllFee);
 

  useEffect(() => {
    dispatch(getAllFee());
  }, [dispatch]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const data = months.map((month) => ({ month, income: 0 }));
  
  feeData?.forEach(({ month, amountPaid }) => {
    data[month - 1].income += amountPaid;
 
  });
  return (
    <>
      <Dashboard />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "20px",
        }}
      >
        {/* Line Chart */}
        <div style={{ width: "50%" }}>
          <h3>Month Wise Income Report</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="income" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div style={{ width: "30%" }}>
          <h3>Staff Attendance Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={attendanceData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                fill="#8884d8"
                label
              >
                {attendanceData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ textAlign: "center", marginTop: "-30px" }}>
            <h4>Staff Present Today</h4>
            <h2>{attendanceData[0].value}</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChartData;
