import React, { useState } from "react";

const PreviewForm = ({ previewData, onClose }) => {
  if (!previewData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full mx-4 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-2xl font-bold">Student Preview</h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 font-bold text-xl"
          >
            &times;
          </button>
        </div>

        {/* Preview Data */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Student Details */}
            <div className="flex flex-col">
              <label className="font-bold">Name:</label>
              <div className="border px-4 py-2 bg-gray-50 rounded-md">
                {previewData.name || "N/A"}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-bold">Gender:</label>
              <div className="border px-4 py-2 bg-gray-50 rounded-md">
                {previewData.gender || "N/A"}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-bold">Date of Birth:</label>
              <div className="border px-4 py-2 bg-gray-50 rounded-md">
                {previewData.dateofBirth || "N/A"}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-bold">Father Name:</label>
              <div className="border px-4 py-2 bg-gray-50 rounded-md">
                {previewData.fatherName || "N/A"}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-bold">Father Email:</label>
              <div className="border px-4 py-2 bg-gray-50 rounded-md">
                {previewData.fatherEmail || "N/A"}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-bold">Father Phone:</label>
              <div className="border px-4 py-2 bg-gray-50 rounded-md">
                {previewData.fatherPhone || "N/A"}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-bold">Mother Phone:</label>
              <div className="border px-4 py-2 bg-gray-50 rounded-md">
                {previewData.motherPhone || "N/A"}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-bold">Religion:</label>
              <div className="border px-4 py-2 bg-gray-50 rounded-md">
                {previewData.religion || "N/A"}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-bold">Home Address:</label>
              <div className="border px-4 py-2 bg-gray-50 rounded-md">
                {previewData.homeAddress || "N/A"}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-bold">Campus:</label>
              <div className="border px-4 py-2 bg-gray-50 rounded-md">
                {previewData.campus || "N/A"}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-bold">Class:</label>
              <div className="border px-4 py-2 bg-gray-50 rounded-md">
                {previewData.class || "N/A"}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-bold">Section:</label>
              <div className="border px-4 py-2 bg-gray-50 rounded-md">
                {previewData.section || "N/A"}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-bold">Monthly Fee:</label>
              <div className="border px-4 py-2 bg-gray-50 rounded-md">
                ₹{previewData.monthlyFee || "N/A"}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-bold">Adhaar Card:</label>
              <div className="border px-4 py-2 bg-gray-50 rounded-md">
                {previewData.adhaarCard || "N/A"}
              </div>
            </div>

            {/* Image and File Preview */}
            {previewData.photo && (
              <div className="flex flex-col">
                <label className="font-bold">Photo:</label>
                <img
                  src={previewData.photo}
                  alt="Student"
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>
            )}

            {previewData.birthCertificate && (
              <div className="flex flex-col">
                <label className="font-bold">Birth Certificate:</label>
                <a
                  href={previewData.birthCertificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Certificate
                </a>
              </div>
            )}

            {previewData.admitCard && (
              <div className="flex flex-col">
                <label className="font-bold">MP Admit Card:</label>
                <a
                  href={previewData.admitCard}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Admit Card
                </a>
              </div>
            )}

            {previewData.castCertificate && (
              <div className="flex flex-col">
                <label className="font-bold">Caste Certificate:</label>
                <a
                  href={previewData.castCertificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Caste Certificate
                </a>
              </div>
            )}

            {previewData.parentSignature && (
              <div className="flex flex-col">
                <label className="font-bold">Parent Signature:</label>
                <a
                  href={previewData.parentSignature}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View parentSignature
                </a>
              </div>
            )}

            {previewData.studentSignature && (
              <div className="flex flex-col">
                <label className="font-bold">Student Signature:</label>
                <a
                  href={previewData.studentSignature}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Student Signature
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewForm;
