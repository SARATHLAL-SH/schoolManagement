import React, { useEffect, useState, useContext, useRef } from "react";
import Barcode from "react-barcode";
import { FaArrowLeft, FaArrowRight, FaPrint } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployee } from "../../../StaffManagement/service";
import bgImage from "../../../../assets/images/bgdesign.png";
import { BackgroundContext } from "../../../../Contexts/BackgroundContext";
import { useReactToPrint } from "react-to-print";

const EmployeeCardPrinting = () => {
  const [isFront, setIsFront] = useState(true);
  const [campusOptions, setCampusOptions] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [search, setSearch] = useState("");
  const [sectionGender, setSectionGender] = useState([]);
  const [dataStudent, setDataStudent] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filters, setFilters] = useState({
    campus: "",
    designation: "",
    gender: "",
    range: "all",
  });
  const dispatch = useDispatch();
  const selectedRef = useRef(null);
  const containerRef = useRef(null);
  const { selectedBackground } = useContext(BackgroundContext);
  const {
    data: employees,
    loading,
    error,
  } = useSelector((state) => state.getAllEmployee);

  const toggleSide = () => setIsFront(!isFront);
  useEffect(() => {
    dispatch(getAllEmployee());
  }, []);

  useEffect(() => {
    if (employees?.length > 0) {
      // setFilteredEmployees(data);
      setDataStudent(employees);
      setCampusOptions([
        ...new Set(employees?.map((employee) => employee.campus)),
      ]);
      setDesignation([
        ...new Set(employees?.map((employee) => employee.designation)),
      ]);
      setSectionGender([
        ...new Set(employees?.map((employee) => employee.gender)),
      ]);
    }
  }, [employees]);

  useEffect(() => {
    let filtered = dataStudent;

    if (filters.campus) {
      filtered = filtered.filter(
        (employee) => employee.campus === filters.campus
      );
    }
    if (filters.designation) {
      filtered = filtered.filter(
        (employee) => employee.designation === filters.designation
      );
    }
    if (filters.gender) {
      filtered = filtered.filter(
        (employee) => employee.gender === filters.gender
      );
    }
    if (filters.range === "specific" && search) {
      filtered = filtered.filter((employee) =>
        employee.name.toLowerCase().startsWith(search.toLowerCase())
      );
    }

    setFilteredEmployees(filtered);
  }, [filters, search, dataStudent]);

  const handlePrint = useReactToPrint({
    content: selectedRef.current, // This should point to the content you want to print
    documentTitle: "Employee_Cards", // Optional: you can set a custom title for the document
  });

  if (!employees) return null;
  console.log("employee", employees);

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
        <div className="flex justify-between">
          <h2 className="text-xl font-bold text-white mb-4">
            employees ID Card Printing
          </h2>
          <button
            className="bg-green-600 text-white items-center align-center flex  px-4 py-2 rounded-md hover:bg-green-500 "
            onClick={handlePrint}
          >
            <span className="mr-2 flex items-center">
              <FaPrint />
            </span>
            Print
          </button>
        </div>
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
              {campusOptions?.map((campus) => (
                <option key={campus} value={campus}>
                  {campus}
                </option>
              ))}
            </select>
          </div>

          {/* Class Filter */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Designation
            </label>
            <select
              name="designation"
              onChange={handleFilterChange}
              value={filters.designation}
              className="w-full border-gray-300 py-2 rounded-md  shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Employees</option>
              {designation?.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Section Filter */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Gender
            </label>
            <select
              name="gender"
              onChange={handleFilterChange}
              value={filters.gender}
              className="w-full border-gray-300  py-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Employees</option>
              {sectionGender?.map((section) => (
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
              <option value="all">All employees</option>
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
              placeholder="Enter employee name"
              className="w-full border-gray-300 py-2  pl-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}
      </div>
      <div
        className="flex flex-wrap gap-6 items-center justify-center"
        ref={selectedRef}
      >
        {filteredEmployees?.map((employee, index) => (
          <div key={employee.id} className="flext w-[250px] h-[400px]">
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
                        employee?.imageUrl || "https://via.placeholder.com/150"
                      }
                      alt="Student Photo"
                      className="w-48 h-48 rounded-md object-cover shadow-lg"
                    />
                    <h2 className="text-xl font-bold mt-1">
                      {employee?.name?.toUpperCase()}
                    </h2>

                    <h2 className="text-md font-bold">
                      {employee.designation?.toUpperCase()}
                    </h2>
                    <Barcode
                      value={employee.EmployeeId || "1234567890"}
                      format="CODE128"
                      width={2}
                      height={40}
                      // displayValue={true}
                      background="transparent"
                      lineColor="#000"
                    />
                    <h2 className="text-lg  font-bold">
                      {employee?.EmployeeId}
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
                        {employee.campus || "Main Campus"}
                      </p>

                      <p>
                        <strong>Designation:</strong>{" "}
                        {employee.designation || "John Doe"}
                      </p>
                      <p>
                        <strong>Emergency Contact:</strong>{" "}
                        {employee.Phone || "+1234567890"}
                      </p>
                      <p>
                        <strong>Address:</strong>{" "}
                        {employee.homeAddress || "Not Available"}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold">School Details</h3>
                      <p>
                        <strong>Name:</strong>{" "}
                        {employee.schoolName || "ABC School"}
                      </p>
                      <p>
                        <strong>Phone:</strong>{" "}
                        {employee.schoolPhone || "+9876543210"}
                      </p>
                      <p>
                        <strong>Email:</strong>{" "}
                        {employee.schoolEmail || "info@abcschool.com"}
                      </p>
                      <p>
                        <strong>Details:</strong>{" "}
                        {employee.schoolDetails ||
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

export default EmployeeCardPrinting;
