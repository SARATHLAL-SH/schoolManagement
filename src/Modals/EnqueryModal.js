import React, { useState } from "react";

const EnqueryModal = ({
  isOpen,
  onClose,
  children,
  title,
  student,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    name: student?.name || "",
    parent: student?.parent || "",
    phone: student?.phone || "",
    address: student?.address || "",
    gender: student?.gender || "male", // Default value
    birthday: student?.birthday || "",
    dateAdded: student?.dateAdded || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    onUpdate(formData); // Call the onUpdate function with the updated data
    onClose();
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  if (!isOpen) return null;
 
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded shadow-md p-6 w-1/3 h-2/3 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button className="text-red-500 font-bold text-lg" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Parent */}
          <div>
            <label className="block font-medium mb-1">Parent</label>
            <input
              type="text"
              name="parent"
              value={student.parent}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={student.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={student.address}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={student.gender}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Birthday */}
          <div>
            <label className="block font-medium mb-1">Birthday</label>
            <input
              type="date"
              name="birthday"
               defaultValue={student.dateAdded ? formatDate(student.birthday) :  new Date().toISOString().split("T")[0]}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Date Added */}
          <div>
            <label className="block font-medium mb-1">Date Added</label>
            <input
              type="date"
              name="dateAdded"
              defaultValue={student.dateAdded ? formatDate(student.dateAdded) :  new Date().toISOString().split("T")[0]}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnqueryModal;
