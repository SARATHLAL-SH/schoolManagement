import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { editEmployee, getAllEmployee, updatePhoto } from "../service";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { handleImageChange } from "../../../helpers/uploadToBucket";

const Modal = ({ student, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const [newImage, setNewImage] = useState(student.imageUrl || "/logo192.png");
  const [isImageelected, setIsImageSelected] = useState(false);
  const [employeePhoto, setEmployeePhoto] = useState();
  const [employeePhotoUrl, setEmployeePhotoUrl] = useState();

  const { data: employees, loading: status } = useSelector(
    (state) => state.editEmployee
  );
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: student,
  });

  if (!student) return null;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (data) => {
    try {
      await dispatch(editEmployee(data));
      dispatch(getAllEmployee());
      console.log("Updated Student Data:", data);
      setIsEditing(false);
      onClose();
      toast.success("Employee Updated Successfully");
    } catch (error) {
      console.log("Error updating student:", error);
    }
  };
  const photoUpdate = async (data) => {
    console.log("phot url details", data.photo, employeePhotoUrl);

    await dispatch(
      updatePhoto({ EmployeeId: data.EmployeeId, photo: employeePhotoUrl })
    );
    dispatch(getAllEmployee());
    toast.success("Employee Photo Updated Successfully");
    setIsImageSelected(false);
  };
  const handleCancel = () => {
    setIsEditing(false);
    reset(student); // Reset fields back to original values
  };
  const handleImageChanges = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected File:", file);
      setNewImage(URL.createObjectURL(file));

      handleImageChange(e, setEmployeePhotoUrl, setEmployeePhoto);
      setIsImageSelected(true);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black shadow-lg  bg-opacity-50 z-50">
      <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 p-8 border-8 border-gray-300 rounded-lg shadow-2xl max-w-3xl w-full overflow-hidden h-auto max-h-[80vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold text-white uppercase">
            {student.name || "Student Profile"}
          </h2>
          <div className="relative">
            <img
              src={newImage || "/default-avatar.png"} // Default image if no photo is available
              alt="Student Photo"
              className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-xl transform transition-all hover:scale-110 cursor-pointer"
              onClick={() => document.getElementById("fileInput").click()}
            />
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              {...register("photo", { required: false })}
              className="text-lg text-white bg-gray-600 rounded-md px-2 py-1 w-48 hidden"
              onChange={handleImageChanges}
            />
            {isImageelected && (
              <button
                className="absolute bottom-0 right-0 bg-green-500 text-white px-2 py-1 rounded-full"
                onClick={() => photoUpdate(student)}
              >
                update
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-red-700 text-3xl bg-white px-2 rounded-full hover:bg-white transition-all transform hover:scale-110"
          >
            X
          </button>
        </div>

        <form
          onSubmit={handleSubmit(handleSave)}
          className="space-y-4 text-white overflow-y-auto max-h-[60vh] px-4 hide-scrollbar"
        >
          {[
            { label: "Father's Name", field: "fatherName" },
            { label: "Employee ID", field: "EmployeeId" },
            { label: "Email", field: "Email" },
            { label: "Father's Phone", field: "Phone" },
            { label: "Alternate Phone", field: "AltPhone" },
            { label: "Date of Birth", field: "dateofBirth", type: "date" },
            { label: "Gender", field: "gender" },
            { label: "Salary", field: "salary" },
            { label: "Religion", field: "religion" },
            { label: "Transport Route", field: "transportRoute" },
            { label: "Home Address", field: "homeAddress" },
            { label: "Campus", field: "campus" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-lg border-b border-gray-200 py-2"
            >
              <label className="text-gray-200 font-semibold">
                {item.label}:
              </label>
              {isEditing ? (
                <input
                  type={item.type || "text"}
                  {...register(item.field)}
                  className="text-lg text-white bg-gray-600 rounded-md px-2 py-1 w-48"
                />
              ) : (
                <div className="text-lg text-gray-100">
                  {student[item.field]}
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-end space-x-4 mt-4">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mb-8"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mb-8"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mb-8"
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
