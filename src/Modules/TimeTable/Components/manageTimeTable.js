import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ManageTimeTable() {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPeriodModal, setShowPeriodModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 'class' or 'subject'
  const [newClass, setNewClass] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newDivision, setNewDivision] = useState("");
  const [newPeriod, setNewPeriod] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");


  const week = [
    { day: "Sunday" },
    { day: "Monday" },
    { day: "Tuesday" },
    { day: "WednesDay" },
    { day: "Thursday" },
    { day: "Friday" },
    { day: "Saturday" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:8081/get_Classes")
      .then((res) => setClasses(res.data));
    axios
      .get("http://localhost:8081/get_Subjects")
      .then((res) => setSubjects(res.data));
    axios
      .get("http://localhost:8081/get_Divisions")
      .then((res) => setDivisions(res.data));
    axios
      .get("http://localhost:8081/get_Timeperiods")
      .then((res) => setPeriods(res.data));
  }, [newSubject, newClass, newDivision, startTime]);

  const addClass = () => {
    axios
      .post("http://localhost:8081/add_Class", { name: newClass })
      .then(() => {
        setClasses([...classes, { name: newClass }]);
        setNewClass("");
        setShowModal(false);
      });
  };
  const addDivision = () => {
    axios
      .post("http://localhost:8081/add_Division", { name: newDivision })
      .then(() => {
        setDivisions([...divisions, { name: newDivision }]);
        setNewDivision("");
        setShowModal(false);
      });
  };
  const addPeriod = async () => {
    try {
      const res = await axios.post("http://localhost:8081/add_TimePeriod", {
        startTime,
        endTime,
      });
      console.log("response", res.data);

      // Update the periods state with the new period
      setPeriods([...periods, { startTime: startTime, endTime: endTime }]);

      // Reset the form fields and close the modal
      setStartTime("");
      setEndTime("");
      setShowPeriodModal(false);
    } catch (error) {
      console.error("Error adding period:", error);
    }
  };

  const addSubject = () => {
    axios
      .post("http://localhost:8081/add_Subject", { name: newSubject })
      .then(() => {
        setSubjects([...subjects, { name: newSubject }]);
        setNewSubject("");
        setShowModal(false);
      });
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };
  const timeTableHandler = async () => {
    console.log(
      "values",
      selectedPeriod,
      selectedDivision,
      selectedClass,
      selectedSubject,
      selectedDay
    );
    try {
      if (
        selectedClass &&
        selectedDay &&
        selectedDivision &&
        selectedPeriod &&
        selectedSubject
      ) {
        const response = await axios.post(
          "http://localhost:8081/add_Timetable",
          {
            classId: selectedClass,
            divisionId: selectedDivision,
            day: selectedDay,
            timePeriodId: selectedPeriod,
            subjectId: selectedSubject,
          }
        );
        if (response.data) {
          console.log(response.data);
          setSelectedPeriod("");
          setSelectedSubject("");
          toast.success("Data added to Timetable");
        }
      } else {
        console.log("Select All Fields");
        toast.error("Select All Fields");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="flex">
      <Toaster position="top-right" />
      {/* Manage Classes */}
      <div className="flex flex-col  gap-y-2">
        <div className="flex flex-row gap-x-2  justify-center items-end">
          <div className="bg-white p-5 rounded-lg shadow-lg ">
            <h2 className="text-xl font-bold mb-3">Select Class</h2>
            <div className="flex items-center gap-2">
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
              <button
                className="bg-blue-500 text-white px-3 py-2 rounded"
                onClick={() => openModal("class")}
              >
                Add
              </button>
            </div>
          </div>

          {/* Manage Section */}
          <div className="bg-white p-5 rounded-lg shadow-lg ">
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
              <button
                className="bg-blue-500 text-white px-3 py-2 rounded"
                onClick={() => openModal("division")}
              >
                Add
              </button>
            </div>
          </div>
          {/* time periods */}

          <div className="bg-white p-5 rounded-lg shadow-lg ">
            <h2 className="text-xl font-bold mb-3">Select Period</h2>
            <div className="flex items-center gap-2">
              <select
                className="border p-2 w-full"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="">Select Period</option>
                {periods.map((s, index) => (
                  <option key={index} value={s.id}>
                    {s.startTime} - {s.endTime}
                  </option>
                ))}
              </select>
              <button
                className="bg-green-500 text-white px-3 py-2 rounded"
                onClick={() => setShowPeriodModal(true)}
              >
                Add
              </button>
            </div>
          </div>

          {/* subject*/}

          <div className="bg-white p-5 rounded-lg shadow-lg ">
            <h2 className="text-xl font-bold mb-3 ">Select Subject</h2>
            <div className="flex items-center gap-2">
              <select
                className="border p-2 w-full"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">Select Subject</option>
                {subjects.map((s, index) => (
                  <option key={index} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <button
                className="bg-green-500 text-white px-3 py-2 rounded"
                onClick={() => openModal("subject")}
              >
                Add
              </button>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-lg w-[260px] min-w-[40px]">
            <h2 className="text-xl font-bold mb-3">Select Day</h2>
            <div className="flex items-center gap-2">
              <select
                className="border p-2 w-full"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                <option value="">Select Class</option>
                {week.map((c, index) => (
                  <option key={index} value={c.day}>
                    {c.day}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-x-2  justify-end mt-4 items-end">
          <div className="w-[260px] min-w-[40px]">
            <button
              className="bg-green-500 text-white px-3 py-2 rounded"
              onClick={timeTableHandler}
            >
              Create Timetable
            </button>
          </div>
        </div>
      </div>
      {/* Popup Modal for Adding Class/Subject */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-3">
              {modalType === "class" ? "Add New Class" : "Add New Subject"}
            </h2>
            <input
              type="text"
              className="border p-2 w-full"
              value={
                modalType === "class"
                  ? newClass
                  : modalType === "division"
                  ? newDivision
                  : newSubject
              }
              onChange={(e) =>
                modalType === "class"
                  ? setNewClass(e.target.value)
                  : modalType === "division"
                  ? setNewDivision(e.target.value)
                  : setNewSubject(e.target.value)
              }
              placeholder={
                modalType === "class"
                  ? "Enter Class Name"
                  : modalType === "division"
                  ? "Enter Section Name"
                  : modalType === "subject"
                  ? "Enter Subject Name"
                  : "Enter Period Name"
              }
            />
            <div className="flex justify-end gap-3 mt-3">
              <button
                className="bg-red-500 text-white px-3 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-2 rounded"
                onClick={() => {
                  console.log("Modal Type:", modalType);
                  if (modalType === "class") {
                    addClass();
                  } else if (modalType === "subject") {
                    addSubject();
                  } else if (modalType === "division") {
                    addDivision();
                  }
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {showPeriodModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-3">Add Time Period</h2>
            <input
              type="time"
              className="border p-2 w-full"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder={"Enter Start Time (HH:MM:SS)"}
            />
            <input
              type="time"
              className="border p-2 mt-4 w-full"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              placeholder={"Enter End Time (HH:MM:SS)"}
            />

            <div className="flex justify-end gap-3 mt-3">
              <button
                className="bg-red-500 text-white px-3 py-2 rounded"
                onClick={() => setShowPeriodModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-2 rounded"
                onClick={addPeriod}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
