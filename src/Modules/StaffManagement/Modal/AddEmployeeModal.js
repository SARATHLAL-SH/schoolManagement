import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FaUser,
  FaTransgender,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaUniversity,
  FaBriefcase,
  FaBuilding,
  FaDollarSign,
  FaImage,
  FaIdCard,
  FaFingerprint,
  FaRoad,
  FaBell,
  FaClock,
  FaAddressCard,
  FaBus,
  FaArchway,
  FaBarcode,
} from "react-icons/fa";
import { handleImageChange } from "../../../helpers/uploadToBucket";
import { FcLeave } from "react-icons/fc";
import { CiCreditCard1 } from "react-icons/ci";
import { MdPhoto, MdWorkHistory, MdAccessTime } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee, getAllEmployee } from "../service";
import bgImage from "../../../assets/images/pexels.jpg";
import toast from "react-hot-toast";

const AddEmployeeModal = ({ isOpen, onClose, onSubmit }) => {
  const [employeePhoto, setEmployeePhoto] = useState();
  const [employeePhotoUrl, setEmployeePhotoUrl] = useState();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    setValue("photo", employeePhotoUrl);
    console.log("student photo", employeePhotoUrl);
  }, [employeePhotoUrl]);

  if (!isOpen) return null;

  const handleFormSubmit = async (data) => {
    try {
      await dispatch(addEmployee(data));
      dispatch(getAllEmployee());
      reset();
      onClose();
      toast.success("Employee Added Successfully");
      onSubmit(data);
    } catch (error) {
      console.error("Error adding employee:", error);
      toast.error("Error Adding Employee");

      // API call or submission logic here
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <fieldset
        className="bg-gradient-to-r from-blue-900 via-blue-800 border-2 border-silver-800 to-blue-900 rounded-lg w-11/12 max-w-4xl p-6 shadow-lg overflow-y-auto mt-8 max-h-[90vh] hide-scrollbar"
        // style={{
        //   backgroundImage: `url(${bgImage})`,
        //   backgroundRepeat: "no-repeat",
        //   backgroundPosition: "top center",
        //   backgroundSize: "20% 25%", // Adjust the size of the image
        // }}
      >
        <legend className="px-4 py-2 text-lg font-semibold text-white  rounded-md shadow-md shadow-blue-300">
          ADD NEW EMPLOYEE
        </legend>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div>
            <label className="block text-white flex items-center">
              <FaUser className="mr-2" />
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Employee Name"
              className="border rounded-lg w-full p-2"
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-white flex items-center">
              <FaTransgender className="mr-2" />
              Gender
            </label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className="border rounded-lg w-full p-2"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-600 text-sm">{errors.gender.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-white flex items-center">
              <FaCalendarAlt className="mr-2" />
              Date of Birth
            </label>
            <input
              {...register("dateofBirth", {
                required: "Date of Birth is required",
              })}
              type="date"
              className="border rounded-lg w-full p-2"
            />
            {errors.dateofBirth && (
              <p className="text-red-600 text-sm">
                {errors.dateofBirth.message}
              </p>
            )}
          </div>

          {/* Photo */}
          <div className="">
          <label className="block text-white flex items-center">
            <span className="text-gray-500 mr-2">
              <FaImage />
            </span>
            Upload Photo
            </label>
            <div className="w-full bg-white rounded p-2">
            <input
              type="file"
              onChange={(e) =>
                handleImageChange(e, setEmployeePhotoUrl, setEmployeePhoto)
              }
              // {...register("photo")}
              className="overflow-hidden text-ellipsis w-full"
            />
            </div>
          </div>

          {/* Father Name */}
          <div>
            <label className="block text-white flex items-center">
              <FaUser className="mr-2" />
              Father's Name
            </label>
            <input
              {...register("fatherName", {
                required: "Father's Name is required",
              })}
              type="text"
              placeholder="Father's Name"
              className="border rounded-lg w-full p-2"
            />
            {errors.fatherName && (
              <p className="text-red-600 text-sm">
                {errors.fatherName.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-white flex items-center">
              <FaPhone className="mr-2" />
              Phone
            </label>
            <input
              {...register("Phone", { required: "Phone is required" })}
              type="tel"
              placeholder="Phone Number"
              className="border rounded-lg w-full p-2"
            />
            {errors.Phone && (
              <p className="text-red-600 text-sm">{errors.Phone.message}</p>
            )}
          </div>
          {/* AltPhone */}
          <div>
            <label className="block text-white flex items-center">
              <FaPhone className="mr-2" />
              Alternate Phone
            </label>
            <input
              {...register("AltPhone", { required: "Phone is required" })}
              type="tel"
              placeholder="Phone Number"
              className="border rounded-lg w-full p-2"
            />
            {errors.AltPhone && (
              <p className="text-red-600 text-sm">{errors.AltPhone.message}</p>
            )}
          </div>
          {/* Email */}
          <div>
            <label className="block text-white flex items-center">
              <FaEnvelope className="mr-2" />
              Email
            </label>
            <input
              {...register("Email", { required: "Email is required" })}
              type="email"
              placeholder="Email Address"
              className="border rounded-lg w-full p-2"
            />
            {errors.Email && (
              <p className="text-red-600 text-sm">{errors.Email.message}</p>
            )}
          </div>

          {/* Religion */}
          <div>
            <label className="block text-white flex items-center">
              <FaHome className="mr-2" />
              Religion
            </label>
            <input
              {...register("religion", { required: "Religion is required" })}
              type="text"
              placeholder="Religion"
              className="border rounded-lg w-full p-2"
            />
            {errors.religion && (
              <p className="text-red-600 text-sm">{errors.religion.message}</p>
            )}
          </div>
          {/* Home Address */}
          <div>
            <label className="block text-white flex items-center">
              <FaHome className="mr-2" />
              Home Address
            </label>
            <input
              {...register("homeAddress", {
                required: "Home Address is required",
              })}
              type="text"
              placeholder="Home Address"
              className="border rounded-lg w-full p-2"
            />
            {errors.homeAddress && (
              <p className="text-red-600 text-sm">
                {errors.homeAddress.message}
              </p>
            )}
          </div>

          {/* Qualification */}
          <div>
            <label className="block text-white flex items-center">
              <FaUniversity className="mr-2" />
              Qualification
            </label>
            <input
              {...register("qualification", {
                required: "Qualification is required",
              })}
              type="text"
              placeholder="Qualification"
              className="border rounded-lg w-full p-2"
            />
            {errors.qualification && (
              <p className="text-red-600 text-sm">
                {errors.qualification.message}
              </p>
            )}
          </div>

          {/* Designation */}
          <div>
            <label className="block text-white flex items-center">
              <FaBriefcase className="mr-2" />
              Designation
            </label>
            <input
              {...register("designation", {
                required: "Designation is required",
              })}
              type="text"
              placeholder="Designation"
              className="border rounded-lg w-full p-2"
            />
            {errors.designation && (
              <p className="text-red-600 text-sm">
                {errors.designation.message}
              </p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block text-white flex items-center">
              <FaBuilding className="mr-2" />
              Department
            </label>
            <input
              {...register("department", {
                required: "Department is required",
              })}
              type="text"
              placeholder="Department"
              className="border rounded-lg w-full p-2"
            />
            {errors.department && (
              <p className="text-red-600 text-sm">
                {errors.department.message}
              </p>
            )}
          </div>
          {/* Joining Date */}
          <div>
            <label className="block text-white flex items-center">
              <FaCalendarAlt className="mr-2" />
              Joining Date
            </label>
            <input
              {...register("joiningDate", {
                required: "Date of Birth is required",
              })}
              type="date"
              className="border rounded-lg w-full p-2"
            />
            {errors.joiningDate && (
              <p className="text-red-600 text-sm">
                {errors.joiningDate.message}
              </p>
            )}
          </div>

          {/* Salary */}
          <div>
            <label className="block text-white flex items-center">
              <FaDollarSign className="mr-2" />
              Salary
            </label>
            <input
              {...register("salary", { required: "Salary is required" })}
              type="number"
              placeholder="Salary"
              className="border rounded-lg w-full p-2"
            />
            {errors.salary && (
              <p className="text-red-600 text-sm">{errors.salary.message}</p>
            )}
          </div>

          {/* Bank name */}
          <div>
            <label className="block text-white flex items-center">
              <FaBuilding className="mr-2" />
              Bank Name
            </label>
            <input
              {...register("bankName", { required: "Bank Name is required" })}
              type="text"
              placeholder="bankName"
              className="border rounded-lg w-full p-2"
            />
            {errors.bankName && (
              <p className="text-red-600 text-sm">{errors.bankName.message}</p>
            )}
          </div>

          {/* Account */}
          <div>
            <label className="block text-white flex items-center">
              <FaAddressCard className="mr-2" />
              Account Number
            </label>
            <input
              {...register("accountNo", {
                required: "Account Number is required",
              })}
              type="number"
              placeholder="accountNo"
              className="border rounded-lg w-full p-2"
            />
            {errors.accountNo && (
              <p className="text-red-600 text-sm">{errors.accountNo.message}</p>
            )}
          </div>

          <div>
            <label className="block text-white flex items-center">
              <FaBarcode className="mr-2" />
              IFSC Code
            </label>
            <input
              {...register("ifscCode", {
                required: "IFSC Code is required",
              })}
              type="text"
              placeholder="ifscCode"
              className="border rounded-lg w-full p-2"
            />
            {errors.ifscCode && (
              <p className="text-red-600 text-sm">{errors.ifscCode.message}</p>
            )}
          </div>

          <div>
            <label className="block text-white flex items-center">
              <CiCreditCard1 className="mr-2" />
              PAN Card Number
            </label>
            <input
              {...register("panCard", {
                required: "PAN Card Number is required",
              })}
              type="text"
              placeholder="panCard"
              className="border rounded-lg w-full p-2"
            />
            {errors.panCard && (
              <p className="text-red-600 text-sm">{errors.panCard.message}</p>
            )}
          </div>
          <div>
            <label className="block text-white flex items-center">
              <FaAddressCard className="mr-2" />
              AADHAAR Card Number
            </label>
            <input
              {...register("aadharCard", {
                required: "AADHAAR Card Number is required",
              })}
              type="number"
              placeholder="aadharCard"
              className="border rounded-lg w-full p-2"
            />
            {errors.aadharCard && (
              <p className="text-red-600 text-sm">
                {errors.aadharCard.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-white flex items-center">
              <MdWorkHistory className="mr-2" />
              Working Days
            </label>
            <input
              {...register("workingDays", {
                required: "Working Days is required",
              })}
              type="number"
              placeholder="workingDays"
              className="border rounded-lg w-full p-2"
            />
            {errors.workingDays && (
              <p className="text-red-600 text-sm">
                {errors.workingDays.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-white flex items-center">
              <FcLeave className="mr-2" />
              Leaves
            </label>
            <input
              {...register("leaveDays", {
                required: "Leave Number is required",
              })}
              type="number"
              placeholder="leaveDays"
              className="border rounded-lg w-full p-2"
            />
            {errors.leaveDays && (
              <p className="text-red-600 text-sm">{errors.leaveDays.message}</p>
            )}
          </div>
          <div>
            <label className="block text-white flex items-center">
              <FaArchway className="mr-2" />
              Campus
            </label>
            <select
              {...register("campus", {
                required: "Account Number is required",
              })}
              type="number"
              placeholder="campus"
              className="border rounded-lg w-full p-2"
            >
              <option value="">Select Campus</option>
              <option value="Main">Main</option>
              <option value="City">City</option>
            </select>
            {errors.campus && (
              <p className="text-red-600 text-sm">{errors.campus.message}</p>
            )}
          </div>
          <div>
            <label className="block text-white flex items-center">
              <FaBus className="mr-2" />
              Transport Route
            </label>
            <select
              {...register("transportRoute", {
                required: "transportRoute is required",
              })}
              className="border rounded-lg w-full p-2"
            >
              <option value="">Select transportRoute</option>
              <option value="Route 1">Route 1</option>
              <option value="Route 2">Route 2</option>
            </select>
            {errors.transportRoute && (
              <p className="text-red-600 text-sm">
                {errors.gender.transportRoute}
              </p>
            )}
          </div>

          <div>
            <label className="block text-white flex items-center">
              <FaTransgender className="mr-2" />
              Create SMS Alert
            </label>
            <select
              {...register("createSmsAlert", {
                required: "createSmsAlert is required",
              })}
              className="border rounded-lg w-full p-2"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
            {errors.createSmsAlert && (
              <p className="text-red-600 text-sm">
                {errors.createSmsAlert.message}
              </p>
            )}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 font-bold rounded-lg hover:bg-blue-900 hover:text-white border-2 border-black w-full"
            >
              Submit
            </button>
          </div>
          {/* Submit */}
        </form>
      </fieldset>
      <button
        onClick={onClose}
        className=" top-3 right-3 bg-red-600 ml-1 text-white font-bold rounded-full px-2 text-lg z-10  hover:animate-spinOnce"
      >
        X
      </button>
    </div>
  );
};

export default AddEmployeeModal;
