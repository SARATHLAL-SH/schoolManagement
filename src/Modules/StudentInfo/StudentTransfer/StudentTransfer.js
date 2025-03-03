import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getStudentByCode,updateCampus } from "./service"; 
import { toast } from "react-toastify";

const StudentTransfer = () => {
  const dispatch = useDispatch();
  const {
    data: studentsData, // Aliased to avoid conflict
    loading: studentsLoading,
    error: studentsError,
  } = useSelector((state) => state.getStudentsByCode);

  const {
    data: updateCampusData, // Aliased to avoid conflict
    loading: updateCampusLoading,
    error: updateCampusError,
  } = useSelector((state) => state.updateCampus);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const studentCode = watch("studentCode");
  const toCampus = watch("toCampus");
  const grade = watch("class");
 

  useEffect(() => {
    dispatch(getStudentByCode(studentCode));

    if (studentsData?.length > 0) {
      reset({
        fromCampus: studentsData[0]?.campus,
        class: studentsData[0]?.class,
      });
    }
  }, [studentCode, dispatch]);

  console.log("data transfer====>>>", studentsData);
  const onSubmit = (data) => {
    console.log("Form Data Submitted: ", data);
    dispatch(updateCampus({ studentCode, toCampus, grade }));
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        Transfer A Student To Another Campus
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* From Campus */}
        <div className="flex flex-col">
          
          <label className="text-gray-700 font-medium">From Campus</label>
          <select
            {...register("fromCampus", { required: "From Campus is required" })}
            className="border border-gray-300 rounded px-4 py-2"
          >
            <option value="">Select a Campus</option>
            <option value="Main Campus">Main Campus</option>
            <option value="City Campus">City Campus</option>
          </select>
          {errors.fromCampus && (
            <span className="text-red-500 text-sm">
              {errors.fromCampus.message}
            </span>
          )}
        </div>

        {/* To Campus */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">To Campus</label>
          <select
            {...register("toCampus", { required: "To Campus is required" })}
            className="border border-gray-300 rounded px-4 py-2"
          >
            <option value="">Select a Campus</option>
            <option value="City Campus">City Campus</option>
            <option value="Main Campus">Main Campus</option>
          </select>
          {errors.toCampus && (
            <span className="text-red-500 text-sm">
              {errors.toCampus.message}
            </span>
          )}
        </div>

        {/* Class */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Class</label>
          <select
            {...register("class", { required: "Class is required" })}
            className="border border-gray-300 rounded px-4 py-2"
          >
            <option value="">Select a Class</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
          </select>
          {errors.class && (
            <span className="text-red-500 text-sm">{errors.class.message}</span>
          )}
        </div>

        {/* Student Code */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Student Code</label>
          <input
            {...register("studentCode", {
              required: "Student Code is required",
            })}
            type="text"
            placeholder="Type Student Code/Roll Here"
            className="border border-gray-300 rounded px-4 py-2"
          />
          {errors.studentCode && (
            <span className="text-red-500 text-sm">
              {errors.studentCode.message}
            </span>
          )}
        </div>

        {/* Also Move Dues */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Also Move Dues</label>
          <select
            {...register("moveDues")}
            className="border border-gray-300 rounded px-4 py-2"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Also Move Payments */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">
            Also Move Payments
          </label>
          <select
            {...register("movePayments")}
            className="border border-gray-300 rounded px-4 py-2"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Notify Parent */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Notify Parent</label>
          <select
            {...register("notifyParent")}
            className="border border-gray-300 rounded px-4 py-2"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Transfer Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentTransfer;
