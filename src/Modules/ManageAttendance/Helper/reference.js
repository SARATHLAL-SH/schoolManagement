import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import DataTable from "react-data-table-component";
import { getStudentsAll } from "../../../StudentInfo/StudentInformation/service";
import { useDispatch, useSelector } from "react-redux";
import BarcodeScanner from "../../../../components/BarcodeScanner/Components/BarCodeScanner";
import { columns } from "../../Helper/helper";

const StudentsAttendance = () => {
  const today = new Date().toISOString().split("T")[0];
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getAllStudents);
  const [classOptions, setClassOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [digitalAttendance, setDigitalAttendance] = useState(false);
  const [manualAttendance, setManualAttendance] = useState(false);
  const tableRef = useRef([]);

  const { handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {
      campus: "",
      class: "",
      section: "",
      range: "all",
      search: "",
      date: today,
    },
  });

  const watchFilters = watch();

  // Fetch students data on component mount
  useEffect(() => {
    dispatch(getStudentsAll());
  }, [dispatch]);

  // Update students, classOptions, and sectionOptions when data changes
  useEffect(() => {
    if (data?.length > 0) {
      setStudents(data); // Update students state with fetched data

      // Extract unique classes and sections from data
      const uniqueClasses = [...new Set(data.map((student) => student.class))];
      const uniqueSections = [
        ...new Set(data.map((student) => student.section)),
      ];

      setClassOptions(uniqueClasses); // Update class options
      setSectionOptions(uniqueSections); // Update section options
    }
  }, [dispatch, watchFilters.campus]); // Run this effect only when data or students change
console.log("filter", filteredStudents)
  // Filter students based on selected filters
  useEffect(() => {
    let filtered = students;

    if (watchFilters.campus) {
      if (watchFilters.campus === "Digital Attendance") {
        setDigitalAttendance(true);
        setManualAttendance(false);
      } else if (watchFilters.campus === "Manual Attendance") {
        setManualAttendance(true);
        setDigitalAttendance(false);
      }
    }

    if (watchFilters.class) {
      filtered = filtered.filter(
        (student) => student.class === watchFilters.class
      );
    }

    if (watchFilters.section) {
      filtered = filtered.filter(
        (student) => student.section === watchFilters.section
      );
    }

    if (watchFilters.range === "specific" && watchFilters.search) {
      filtered = filtered.filter((student) =>
        student.name.toLowerCase().startsWith(watchFilters.search.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
  }, [watchFilters.campus]);

  const onSubmit = () => {
    if (watchFilters.campus === "Manual Attendance") {
      setManualAttendance(true);
      setDigitalAttendance(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 bg-gradient-to-r from-gray-100 to-gray-300 shadow-md rounded-lg">
      {/* Filter Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-blue-900 p-6 rounded-lg shadow-md mb-4"
      >
        <h2 className="text-xl font-bold text-white mb-2">
          Student Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 shadow-md mb-4 p-2">
          {/* Campus Filter */}
          <Controller
            name="campus"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Type
                </label>
                <select
                  {...field}
                  className="w-full border-gray-300 py-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Manual Attendance">Manual Attendance</option>
                  <option value="Digital Attendance">Digital Attendance</option>
                </select>
              </div>
            )}
          />

          {/* Class Filter */}
          <Controller
            name="class"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Class
                </label>
                <select
                  {...field}
                  className="w-full border-gray-300 py-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">All Classes</option>
                  {classOptions.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />

          {/* Section Filter */}
          <Controller
            name="section"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Section
                </label>
                <select
                  {...field}
                  className="w-full border-gray-300 py-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">All Sections</option>
                  {sectionOptions.map((section) => (
                    <option key={section} value={section}>
                      {section}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />

          {/* Range Filter */}
          <Controller
            name="range"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Range
                </label>
                <select
                  {...field}
                  className="w-full border-gray-300 py-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">All Students</option>
                  <option value="specific">Specific Student</option>
                </select>
              </div>
            )}
          />
        </div>

        <div className="flex justify-end mt-2 bg-blue-900 shadow-lg rounded-md p-2">
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <input
                type="date"
                {...field}
                className="border border-gray-300 rounded-md px-2 py-1 mr-2"
              />
            )}
          />

          <button
            type="submit"
            className="bg-green-600 flex p-2 rounded-md text-white font-bold items-center justify-center hover:bg-green-800"
          >
            Manage Attendance
            <span className="ml-2">
              <FaSearch />
            </span>
          </button>
        </div>

        {watchFilters.range === "specific" && (
          <Controller
            name="search"
            control={control}
            render={({ field }) => (
              <div className="mt-6">
                <label className="block text-sm font-medium text-white mb-2">
                  Search by Student Name
                </label>
                <input
                  type="text"
                  {...field}
                  placeholder="Enter student name"
                  className="w-full border-gray-300 py-2 pl-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            )}
          />
        )}
      </form>

      <div className="flex justify-center">
        {digitalAttendance && <BarcodeScanner />}
      </div>

      {manualAttendance &&
        (filteredStudents.length > 0 ? (
          <div id="studentTableWrapper" ref={tableRef}>
            <DataTable
              title="Student Admission Details"
              id="studentTable"
              columns={columns}
              data={filteredStudents}
              pagination
              highlightOnHover
              responsive
              noDataComponent="No students found"
            />
          </div>
        ) : (
          <p className="text-center text-gray-500">No students found.</p>
        ))}
    </div>
  );
};

export default StudentsAttendance;
