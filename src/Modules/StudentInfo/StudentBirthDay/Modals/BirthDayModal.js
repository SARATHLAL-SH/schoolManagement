import React from "react";
import bgpixel from "../../../../assets/images/pexelsrmv.png"

const BirthdayModal = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ✕
        </button>
        {/* Header */}
        <h2 className="text-center text-xl font-bold text-gray-700 mb-4">
          DEMO SCHOOL
        </h2>
        {/* Banner Image */}
        <img
          src={bgpixel} // Replace with your banner image path
          alt="Birthday Banner"
          className="absolute w-44 h-44 mb-4"
        />
        {/* Student's Picture */}
        <div className="flex justify-center mb-4">
          <img
            src={student.imageUrl || "/path/to/default-avatar.png"} // Replace with profile picture URL
            alt={student.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
          />
        </div>
        {/* Birthday Message */}
        <h3 className="text-center text-lg font-semibold text-gray-800">
          HAPPY BIRTHDAY {student.name.toUpperCase()}
        </h3>
        <p className="text-center text-gray-600 mt-4">
          May your birthday be filled with happy moments and wonderful memories
          you'll remember forever. Happy birthday from the management of DEMO
          SCHOOL!
        </p>
        {/* Close Button */}
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BirthdayModal;
