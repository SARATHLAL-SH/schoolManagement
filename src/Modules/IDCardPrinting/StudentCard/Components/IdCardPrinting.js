import React, { useEffect, useState,useContext,useRef } from "react";
import Barcode from "react-barcode";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsAll } from "../../../StudentInfo/StudentInformation/service";
import { BackgroundContext } from "../../../../Contexts/BackgroundContext";
import bgImage from "../../../../assets/images/bgdesign.png";

const IdCardPrinting = () => {
  const [isFront, setIsFront] = useState(true);
  const [campusOptions, setCampusOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [sectionOptions, setSectionOptions] = useState([]);
  const [dataStudent, setDataStudent] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filters, setFilters] = useState({
    campus: "",
    class: "",
    section: "",
    range: "all",
  });
    const selectedRef = useRef(null);
    const { selectedBackground } = useContext(BackgroundContext);
  const dispatch = useDispatch();
  const {
    data: students,
    loading,
    error,
  } = useSelector((state) => state.getAllStudents);

  const toggleSide = () => setIsFront(!isFront);
  useEffect(() => {
    dispatch(getStudentsAll());
  }, []);

  useEffect(() => {
    if (students?.length > 0) {
      // setFilteredStudents(data);
      setDataStudent(students);
      setCampusOptions([...new Set(students.map((student) => student.campus))]);
      setClassOptions([...new Set(students.map((student) => student.class))]);
      setSectionOptions([
        ...new Set(students.map((student) => student.section)),
      ]);
    }
  }, [students]);

  useEffect(() => {
    let filtered = dataStudent;

    if (filters.campus) {
      filtered = filtered.filter(
        (student) => student.campus === filters.campus
      );
    }
    if (filters.class) {
      filtered = filtered.filter((student) => student.class === filters.class);
    }
    if (filters.section) {
      filtered = filtered.filter(
        (student) => student.section === filters.section
      );
    }
    if (filters.range === "specific" && search) {
      filtered = filtered.filter((student) =>
        student.name.toLowerCase().startsWith(search.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
  }, [filters, search, dataStudent]);

  if (!students) return null;
  console.log("student", students);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 bg-gradient-to-r from-gray-100 to-gray-300 shadow-md rounded-lg">
      {/* Filter Section */}
      <div className="bg-blue-900 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold text-white mb-4">
          Students ID Card Printing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Campus Filter */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Campus
            </label>
            <select
              name="campus"
              onChange={handleFilterChange}
              value={filters.campus}
              className="w-full border-gray-300 py-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Campuses</option>
              {campusOptions.map((campus) => (
                <option key={campus} value={campus}>
                  {campus}
                </option>
              ))}
            </select>
          </div>

          {/* Class Filter */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Class
            </label>
            <select
              name="class"
              onChange={handleFilterChange}
              value={filters.class}
              className="w-full border-gray-300 py-2 rounded-md  shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Classes</option>
              {classOptions.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Section Filter */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Section
            </label>
            <select
              name="section"
              onChange={handleFilterChange}
              value={filters.section}
              className="w-full border-gray-300  py-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Sections</option>
              {sectionOptions.map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>

          {/* Range Filter */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Range
            </label>
            <select
              name="range"
              onChange={handleFilterChange}
              value={filters.range}
              className="w-full border-gray-300 py-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All Students</option>
              <option value="specific">Specific Student</option>
            </select>
          </div>
        </div>

        {/* Search Input */}
        {filters.range === "specific" && (
          <div className="mt-6">
            <label className="block text-sm font-medium  text-white mb-2">
              Search by Student Name
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter student name"
              className="w-full border-gray-300 py-2  pl-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-6 items-center justify-center ">
        {filteredStudents.map((student) => (
          <div key={student.id} className="flext w-[250px] h-[400px]">
            <div
              className={`w-full h-full rounded-lg shadow-xl transform transition-transform duration-700 ${
                isFront ? "rotate-y-0" : "rotate-y-180"
              }`}
            >
              {/* Front Side */}
              <div
                className={`absolute inset-0  items-center  bg-gradient-to-b from-gray-300 to-gray-700  h-full p-4 bg-gray-400  text-white backface-hidden ${
                  isFront ? "z-10" : "z-0"
                }`}
              >
                <div
                  className="bg-gradient-to-r from-blue-800 to-indigo-900 p-4 h-full rounded-lg shadow-lg"
                  style={{
                    backgroundImage: `url(${selectedBackground || bgImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top center",
                    backgroundSize: "cover", // Adjust the size of the image
                  }}
                >
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={
                        student?.imageUrl || "https://via.placeholder.com/150"
                      }
                      alt="Student Photo"
                      className="w-48 h-48 rounded-md object-cover shadow-lg"
                    />
                    <h2 className="text-xl font-bold mt-1">
                      {student?.name?.toUpperCase()}
                    </h2>
                    <h2 className="text-xl font-bold ">{student.EmployeeId}</h2>
                    <h2 className="text-md font-bold">
                      {student.class?.toUpperCase()}
                    </h2>
                    <Barcode
                      value={student.studentCode || "1234567890"}
                      format="CODE128"
                      width={2}
                      height={40}
                      displayValue={false}
                      background="transparent"
                      lineColor="#000"
                    />
                    <h2 className="text-lg  font-bold">
                      {student?.studentCode}
                    </h2>
                  </div>
                  <button
                    onClick={toggleSide}
                    className="bg-yellow-400 text-black  px-4 py-2 rounded-md hover:bg-yellow-500"
                  >
                    <FaArrowLeft />
                  </button>
                </div>
              </div>

              {/* Back Side */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-between h-full p-4 bg-gradient-to-b from-gray-300 to-gray-700 text-white backface-hidden transform rotate-y-180 ${
                  isFront ? "z-0" : "z-10"
                }`}
              >
                <div
                  className="bg-gradient-to-r from-blue-800 to-indigo-900 p-4 h-full rounded-lg shadow-lg"
                  style={{
                    backgroundImage: `url(${selectedBackground || bgImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="space-y-4 ml-0 text-xs">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold">Details</h3>
                      <p>
                        <strong>Campus:</strong>{" "}
                        {student.campus || "Main Campus"}
                      </p>

                      <p>
                        <strong>Father's Name:</strong>{" "}
                        {student.fatherName || "John Doe"}
                      </p>
                      <p>
                        <strong>Emergency Contact:</strong>{" "}
                        {student.altPhone || "+1234567890"}
                      </p>
                      <p>
                        <strong>Address:</strong>{" "}
                        {student.homeAddress || "Not Available"}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold">School Details</h3>
                      <p>
                        <strong>Name:</strong>{" "}
                        {student.schoolName || "ABC School"}
                      </p>
                      <p>
                        <strong>Phone:</strong>{" "}
                        {student.schoolPhone || "+9876543210"}
                      </p>
                      <p>
                        <strong>Email:</strong>{" "}
                        {student.schoolEmail || "info@abcschool.com"}
                      </p>
                      <p>
                        <strong>Details:</strong>{" "}
                        {student.schoolDetails ||
                          "Our school is committed to excellence in education and nurturing talent."}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={toggleSide}
                    className="bg-yellow-400 text-black px-4 py-2 mt-8 rounded-md hover:bg-yellow-500"
                  >
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdCardPrinting;
