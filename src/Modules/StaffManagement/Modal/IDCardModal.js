import React, { useState } from "react";
import Barcode from "react-barcode";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const IDCardModal = ({ student, onClose }) => {
  const [isFront, setIsFront] = useState(true);

  if (!student) return null;

  const toggleSide = () => setIsFront(!isFront);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative w-[400px] h-[500px] perspective">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-500 text-white rounded-full px-2 text-lg z-10"
        >
          &times;
        </button>
        <div
          className={`w-full h-full rounded-lg shadow-xl transform transition-transform duration-700 ${
            isFront ? "rotate-y-0" : "rotate-y-180"
          }`}
        >
          {/* Front Side */}
          <div
            className={`absolute inset-0  items-center border-8 bg-gradient-to-b from-gray-300 to-gray-700  h-full p-4 bg-gray-400  text-white backface-hidden ${
              isFront ? "z-10" : "z-0"
            }`}
          >
            <div className="bg-gradient-to-r from-blue-800 to-indigo-900 p-4 h-full rounded-lg shadow-lg">
              <div className="flex flex-col items-center justify-center">
                <img
                  src={student.imageUrl || "https://via.placeholder.com/150"}
                  alt="Student Photo"
                  className="w-48 h-56 rounded-md object-cover"
                />
                <h2 className="text-2xl font-bold">{student.name.toUpperCase()}</h2>
                <h2 className="text-xl font-bold">{student.EmployeeId}</h2>
                <h2 className="text-md font-bold">{student.designation.toUpperCase()}</h2>
                <Barcode
                  value={student.EmployeeId || "1234567890"}
                  width={1.5}
                  height={50}
                  displayValue={false}
                  background="transparent"
                  lineColor="#fff"
                />
                <h2 className="text-lg font-semibold">{student.studentCode}</h2>
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
           <div className="bg-gradient-to-r from-blue-800 to-indigo-900 p-4 h-full rounded-lg shadow-lg">
            <div className="space-y-4 text-sm">
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Details</h3>
                <p>
                  <strong>Campus:</strong> {student.campus || "Main Campus"}
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
                  <strong>Name:</strong> {student.schoolName || "ABC School"}
                </p>
                <p>
                  <strong>Phone:</strong> {student.schoolPhone || "+9876543210"}
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
    </div>
  );
};

export default IDCardModal;
