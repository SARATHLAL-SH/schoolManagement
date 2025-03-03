import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { getStudentsAll } from "../../StudentInformation/service";
import { studentPromotion } from "../service";
import { FaArchway, FaCampground, FaDivide, FaSchool, FaUser } from "react-icons/fa";
import { MdSafetyDivider } from "react-icons/md";

const StudentPromotion = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, reset } = useForm();
  //    const students =[];
  const {
    data: students,
    loading,
    error,
  } = useSelector((state) => state.getAllStudents);
  const { data: studentPromotions } = useSelector(
    (state) => state.studentPromotion
  );

  // Fetch student data on component load
  useEffect(() => {
    dispatch(getStudentsAll());
  }, [dispatch]);

  const onSubmit = (formData) => {
    console.log("Promotion Data:", formData);
    // Add logic to handle the form submission (e.g., API call for promotion)
    dispatch(studentPromotion(formData));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Generate options dynamically from API data
  const campuses = [...new Set(students?.map((student) => student.campus))];
  const classes = [...new Set(students?.map((student) => student.class))];
  const sections = [...new Set(students?.map((student) => student.section))];

  return (
    <div className="p-4 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Promote Students</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-6 gap-4"
      >
        {/* Campus Dropdown */}
        <div className="col-span-1">
          <label className="block text-sm font-medium mb-1">Campus</label>

          <div className="flex items-center space-x-2 bg-gray-200 p-1">
            <FaArchway className="text-lg"/>
            <select
              {...register("campus")}
              className="w-full border rounded p-2"
            >
              <option value="">Select Campus</option>
              {campuses?.map((campus) => (
                <option key={campus} value={campus}>
                  {campus}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Promotion From Class Dropdown */}
        <div className="col-span-1">
          <label className="block text-sm font-medium mb-1">
         
            Promotion From Class
          </label>
          <div className="flex items-center space-x-2 bg-gray-200 p-1">
          <FaSchool className="text-lg"/>
          <select
            {...register("fromClass")}
            className="w-full border rounded p-2"
          >
            <option value="">Select Class</option>
            {classes?.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
          </div>
        </div>

        {/* Section Dropdown */}
        <div className="col-span-1">
          <label className="block text-sm font-medium mb-1">Section</label>
          <div className="flex items-center space-x-2 bg-gray-200 p-1">
          <MdSafetyDivider className="text-xl"/>
          <select
            {...register("fromSection")}
            className="w-full border rounded p-2"
          >
            <option value="">Select Section</option>
            {sections.map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>
         </div>
        </div>

        {/* Promotion To Class Dropdown */}
        <div className="col-span-1">
          <label className="block text-sm font-medium mb-1">
            Promotion To Class
          </label>
          {/* <select
            {...register("toClass")}
            className="w-full border rounded p-2"
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select> */}
          <div className="flex items-center space-x-2 bg-gray-200 p-1">
          <FaSchool className="text-lg"/>
          <select
            {...register("toClass")}
            className="w-full border rounded p-2"
          >
            <option value="">Select Class</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
            <option value="Class 3">Class 3</option>
            <option value="Class 4">Class 4</option>
            <option value="Class 5">Class 5</option>
            <option value="Class 6">Class 6</option>
            <option value="Class 7">Class 7</option>
            <option value="Class 8">Class 8</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 10">Class 10</option>
          </select>
          </div>
        </div>

        {/* To Section Dropdown */}
        <div className="col-span-1">
          <label className="block text-sm font-medium mb-1">Section</label>
          <div className="flex items-center space-x-2 bg-gray-200 p-1">
          <MdSafetyDivider className="text-xl"/>
          <select
            {...register("toSection")}
            className="w-full border rounded p-2"
          >
            <option value="">Select Section</option>
            {/* {sections.map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))} */}
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-1 flex items-end">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Manage Promotion
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentPromotion;
