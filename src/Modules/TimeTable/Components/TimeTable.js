import { useState, useEffect } from "react";
import axios from "axios";
import { FaWindowClose, FaPrint, FaIdBadge, FaFileExcel } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

function Timetable() {
  const [timetable, setTimetable] = useState([]);
  const [classes, setClasses] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [groupedData, setGroupedData] = useState({});

  const role = localStorage.getItem("role");
  console.log(role, "role");

  const week = [
    { day: "Sunday" },
    { day: "Monday" },
    { day: "Tuesday" },
    { day: "Wednesday" },
    { day: "Thursday" },
    { day: "Friday" },
    { day: "Saturday" },
  ];
  const searchTimetableHandler = () => {
    console.log("selected data", selectedClass, selectedDivision);
    try {
      if (selectedClass && selectedDivision) {
        axios
          .get(
            `http://localhost:8081/get_timetable/${selectedClass}/${selectedDivision}`
          )
          .then((res) => {
            setTimetable(res.data);
            const grouped = res.data.reduce((acc, item) => {
              if (!acc[item.day]) {
                acc[item.day] = [];
              }
              acc[item.day].push(item);
              return acc;
            }, {});

            // Sort periods within each day by startTime
            const sortedGroupedData = Object.fromEntries(
              week
                .filter(({ day }) => grouped[day]) // Keep only existing days
                .map(({ day }) => [
                  day,
                  grouped[day].sort(
                    (a, b) =>
                      new Date(`1970/01/01 ${a.TimePeriod.startTime}`) -
                      new Date(`1970/01/01 ${b.TimePeriod.startTime}`)
                  ),
                ])
            );

            console.log("sortedGroupedData", sortedGroupedData);
            setGroupedData(sortedGroupedData);
          });
      } else {
        console.log("select all fields");
        toast.error("select all fields");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    axios
      .get("http://localhost:8081/get_Classes")
      .then((res) => setClasses(res.data));

    axios
      .get("http://localhost:8081/get_Divisions")
      .then((res) => setDivisions(res.data));
  }, []);

  const handleDelete = async (id) => {
    console.log("id", id);
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this time slot?"
    );

    // If the user confirms, proceed with the delete action
    if (isConfirmed) {
      const response = await axios.delete(
        `http://localhost:8081/delete_timetable/${id}`
      );
      if (response) {
        console.log(response.data);
        searchTimetableHandler();
        toast.success("Deleted Successfully");
      }
      // Add your delete logic here, e.g., an API call or state update
    } else {
      console.log("Delete action canceled.");
    }
  };
  return (
    <div className="bg-white p-5 rounded-lg shadow-lg">
      <Toaster position="top-right" />
      <div className="flex flex-row justify-start gap-x-4 items-end">
        <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
          <h2 className="text-xl font-bold mb-3">Select Class</h2>
          <div className="flex items-center gap-2 ">
            <select
              className="border p-2 w-full"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Select Class</option>
              {classes.map((c, index) => (
                <option key={index} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
          <h2 className="text-xl font-bold mb-3">Select Section</h2>
          <div className="flex items-center gap-2">
            <select
              className="border p-2 w-full"
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
            >
              <option value="">Select Section</option>
              {divisions.map((c, index) => (
                <option key={index} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <button
            className="bg-green-500 text-white px-3 py-2 mb-5 rounded"
            onClick={searchTimetableHandler}
          >
            Get Timetable
          </button>
        </div>
      </div>

      {timetable.length > 0 ? (
        Object.entries(groupedData).map(([day, periods]) => (
          <div key={day} className="mt-4">
            <h2 className="text-xl font-semibold bg-gray-200 p-2 rounded">
              {day}
            </h2>

            <div className="flex flex-row justify-start gap-x-2 mt-2 ">
              {console.log("timetable", timetable)}
              {periods.map((entry) => (
                <div
                  key={entry.id}
                  className="border-b py-2 bg-blue-900 text-white font-bold p-2 rounded-md shadow-md flex flex-col items-center relative"
                >
                  <div>
                    {entry.TimePeriod.startTime} - {entry.TimePeriod.endTime}:{" "}
                  </div>
                  <div className="text-green-300">{entry.Subject.name}</div>
                  {role === "admin" ? (
                    <div
                      className="text-red-600 absolute right-2 bottom-2 hover:text-red-300 cursor-pointer"
                      onClick={() => handleDelete(entry.id)}
                    >
                      <FaWindowClose />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-red-600 font-bold flex justify-center items-center mt-8">
          Timetable Not Created
        </div>
      )}
    </div>
  );
}

export default Timetable;
