import React, { useState } from "react";
import Barcode from "react-barcode";
import bgDesign from "../../../assets/images/6515.jpg";
import bgalphabhet from "../../../assets/images/alphabets.png";

const IDCardModal = ({ student, onClose }) => {
  const [isFront, setIsFront] = useState(true);

  if (!student) return null;

  const toggleSide = () => setIsFront(!isFront);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-[400px] h-[600px] perspective">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 text-lg z-10"
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
            className={`absolute inset-0 flex flex-col items-center justify-between h-full p-0 bg-blue-900 text-white backface-hidden ${
              isFront ? "z-10" : "z-0"
            }`}
          >
            <div className="flex flex-col items-center space-y-4">
              <img src={bgDesign} alt="Background" className="w-full h-24" />
              <div className="w-32 h-36 bg-gray-300 rounded-md overflow-hidden">
                <img
                  src={student.imageUrl || "https://via.placeholder.com/150"}
                  alt="Student Photo"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold">{student.name}</h2>
              <Barcode
                value={student.studentCode || "1234567890"}
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
              className="mt-4 bg-yellow-500 text-black py-2 px-6 rounded-full hover:bg-yellow-600"
            >
              View Back Side
            </button>
            <img src={bgalphabhet} alt="Background" className="w-full h-24" />
          </div>

          {/* Back Side */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-between h-full p-6 bg-gray-800 text-white backface-hidden transform rotate-y-180 ${
              isFront ? "z-0" : "z-10"
            }`}
          >
            <div className="space-y-4 text-sm">
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Student Details</h3>
                <p>
                  <strong>Campus:</strong> {student.campus || "Main Campus"}
                </p>
                <p>
                  <strong>Class:</strong> {student.class || "10th Grade"}
                </p>
                <p>
                  <strong>Student ID:</strong> {student.studentCode || "12345"}
                </p>
                <p>
                  <strong>Father's Name:</strong>{" "}
                  {student.fatherName || "John Doe"}
                </p>
                <p>
                  <strong>Emergency Contact:</strong>{" "}
                  {student.fatherPhone || "+1234567890"}
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
              className="mt-4 bg-yellow-500 text-black py-2 px-6 rounded-full hover:bg-yellow-600"
            >
              View Front Side
            </button>
            <img src={bgalphabhet} alt="Background" className="w-full h-24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDCardModal;
