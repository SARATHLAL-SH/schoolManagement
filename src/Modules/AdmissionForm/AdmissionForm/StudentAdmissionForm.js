import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  FaUser,
  FaGraduationCap,
  FaFemale,
  FaCalendar,
  FaImage,
  FaIdBadge,
  FaEnvelopeOpen,
  FaPhone,
  FaTshirt,
  FaHome,
  FaRegMoon,
  FaHouseUser,
  FaArchway,
  FaSchool,
  FaFileInvoiceDollar,
  FaBusAlt,
  FaEnvelope,
} from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { MdDiscount } from "react-icons/md";
import { handleImageChange } from "../../../helpers/uploadToBucket";
import { addStudent } from "./services";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsAll } from "../../StudentInfo/StudentInformation/service";

const StudentAdmissionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [studentPhoto, setStudentPhoto] = useState();
  const [studentPhotoUrl, setStudentPhotoUrl] = useState();
  const dispatch = useDispatch();
  const { data: students } = useSelector((state) => state.getAllStudents);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    setIsSubmitting(true);
    dispatch(addStudent(data));
    reset();
    setIsSubmitting(false);
  };
  useEffect(() => {
    dispatch(getStudentsAll());
  }, [dispatch]);

  useEffect(() => {
    if (students?.length > 0) {
      const lastStudent = students[students?.length - 1];
      console.log("Last student's studentCode:", lastStudent.studentCode);
      const updatedStudentCode = lastStudent.studentCode * 1 + 1;
      setValue("studentCode", updatedStudentCode.toString());
    }
  }, [students]);

  useEffect(() => {
    setValue("photo", studentPhotoUrl);
    console.log("student photo", studentPhotoUrl);
  }, [studentPhotoUrl]);
  return (
    <div className="max-w-screen mx-auto p-6 bg-gray-100 rounded-lg shadow-md ">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Student Information */}
        <div className="grid grid-cols-1  gap-6 md:grid-cols-2">
          <fieldset className="border border-blue-300 rounded-lg p-4 mb-6 bg-white shadow-lg shadow-gray-600">
            <legend className="px-4 py-2 text-lg font-semibold text-white bg-blue-600 rounded-md shadow-md shadow-blue-300">
              Student Information
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label>Name:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaGraduationCap />
                  </span>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    placeholder="student name"
                    className="focus:outline-none overflow-hidden text-ellipsis w-full"
                  />
                </div>
                {errors.name && (
                  <p style={{ color: "red" }}>{errors.name.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label>Gender:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaFemale />
                  </span>
                  <select
                    {...register("gender", { required: "Gender is required" })}
                    className="w-full focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                {errors.gender && (
                  <p style={{ color: "red" }}>{errors.gender.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label>Date of Birth:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2 ">
                  <span className="text-gray-500 mr-2">
                    <FaCalendar />
                  </span>
                  <input
                    type="date"
                    {...register("dateofBirth", {
                      required: "Date of Birth is required",
                    })}
                    className="overflow-hidden text-ellipsis w-full"
                  />
                </div>
                {errors.dob && (
                  <p style={{ color: "red" }}>{errors.dob.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label>Photo:</label>

                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaImage />
                  </span>
                  <input
                    type="file"
                    onChange={(e) =>
                      handleImageChange(e, setStudentPhotoUrl, setStudentPhoto)
                    }
                    // {...register("photo")}
                    className="overflow-hidden text-ellipsis w-full"
                  />
                </div>
              </div>
            </div>
          </fieldset>

          {/* Parent Information */}
          <fieldset className="border border-blue-300 rounded-lg p-4 mb-6 bg-white shadow-lg shadow-gray-600 ">
            <legend className="px-2 text-lg font-semibold text-white bg-blue-700 rounded-md py-2 shadow-md shadow-blue-300">
              Parent Information
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label>Father's Name:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    {...register("fatherName", {
                      required: "Father's name is required",
                    })}
                    placeholder="father's name"
                    className="focus:outline-none overflow-hidden text-ellipsis w-full"
                  />
                </div>
                {errors.fatherName && (
                  <p style={{ color: "red" }}>{errors.fatherName.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label>Father's Email:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaEnvelopeOpen />
                  </span>
                  <input
                    type="email"
                    {...register("fatherEmail", {
                      required: "Father's email is required",
                    })}
                    placeholder="father's email"
                    className="focus:outline-none overflow-hidden text-ellipsis w-full"
                  />
                </div>
                {errors.fatherEmail && (
                  <p style={{ color: "red" }}>{errors.fatherEmail.message}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label>Father's Phone:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaPhone />
                  </span>
                  <input
                    type="number"
                    {...register("fatherPhone", {
                      required: "Father's phone is required",
                    })}
                    placeholder="without zero"
                    className="focus:outline-none overflow-hidden text-ellipsis w-full"
                  />
                </div>
                {errors.fatherPhone && (
                  <p style={{ color: "red" }}>{errors.fatherPhone.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label>Mother's Phone:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaPhone />
                  </span>
                  <input
                    type="number"
                    {...register("motherPhone", {
                      required: "Mother's Phone is required",
                    })}
                    placeholder="without zero"
                    className="focus:outline-none overflow-hidden text-ellipsis w-full appearance-none"
                  />
                </div>
                {errors.motherPhone && (
                  <p style={{ color: "red" }}>{errors.motherPhone.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label>Religion:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaRegMoon />
                  </span>
                  <input
                    type="text"
                    {...register("religion", {
                      required: "Religion / Faith of Student",
                    })}
                    placeholder="religion"
                    className="focus:outline-none overflow-hidden text-ellipsis w-full"
                  />
                </div>
                {errors.religion && (
                  <p style={{ color: "red" }}>{errors.religion.message}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label>Home Address:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaHouseUser />
                  </span>
                  <input
                    type="text"
                    {...register("homeAddress", {
                      required: "Home address Required",
                    })}
                    placeholder="home address"
                    className="focus:outline-none overflow-hidden text-ellipsis w-full"
                  ></input>
                </div>
              </div>
            </div>
          </fieldset>

          {/* Academic Information */}
          <fieldset className="border border-blue-300 rounded-lg p-4 mb-6 bg-white shadow-lg shadow-gray-600">
            <legend className="px-2 text-lg font-semibold text-white bg-blue-700 rounded-md py-2 shadow-md shadow-blue-300">
              Academic Information
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label>Student Code:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaIdBadge />
                  </span>
                  <input
                    type="text"
                    {...register("studentCode", {
                      required: "Student code is required",
                    })}
                    placeholder="student code"
                    className="focus:outline-none overflow-hidden text-ellipsis w-full"
                    disabled
                  />
                </div>
                {errors.studentCode && (
                  <p style={{ color: "red" }}>{errors.studentCode.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label>Campus:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaArchway />
                  </span>
                  <select
                    {...register("campus", { required: "Campus is required" })}
                    className="w-full focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="main">Main Campus</option>
                    <option value="city">City Campus</option>
                  </select>
                </div>
                {errors.campus && (
                  <p style={{ color: "red" }}>{errors.campus.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label>Class:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <SiGoogleclassroom />
                  </span>
                  <select
                    {...register("class", { required: "Class is required" })}
                    className="w-full focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="class1">Class 1</option>
                    <option value="class2">Class 2</option>
                  </select>
                </div>
                {errors.class && (
                  <p style={{ color: "red" }}>{errors.class.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label>Section:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <VscTypeHierarchySub />
                  </span>
                  <select
                    {...register("section", {
                      required: "Section is required",
                    })}
                    className="w-full focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
                {errors.section && (
                  <p style={{ color: "red" }}>{errors.section.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label>Previous School:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaSchool />
                  </span>
                  <input
                    type="text"
                    {...register("previousSchool")}
                    placeholder="previous school name"
                    className="focus:outline-none overflow-hidden text-ellipsis w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label>Admission Date:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaCalendar />
                  </span>
                  <input
                    type="date"
                    {...register("admissionDate", {
                      required: "Admission Date is required",
                    })}
                    className="overflow-hidden text-ellipsis w-full"
                  />
                </div>
                {errors.admissionDate && (
                  <p style={{ color: "red" }}>{errors.admissionDate.message}</p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Other Information */}
          <fieldset className="border border-blue-300 rounded-lg p-4 mb-6 bg-white shadow-lg shadow-gray-600">
            <legend className="px-2 text-lg font-semibold text-white bg-blue-700 rounded-md py-2 shadow-md shadow-blue-300">
              Other Information
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label>Monthly Fee:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaFileInvoiceDollar />
                  </span>
                  <input
                    type="number"
                    {...register("monthlyFee", {
                      required: "Monthly Fee is required",
                    })}
                    placeholder="monthly fee"
                    className="focus:outline-none overflow-hidden text-ellipsis w-full"
                  />
                </div>
                {errors.monthlyFee && (
                  <p style={{ color: "red" }}>{errors.monthlyFee.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label>Discounted Student:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <MdDiscount />
                  </span>
                  <select
                    {...register("discountedStudent")}
                    className="w-full focus:outline-none"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col">
                <label>Transport Route:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaBusAlt />
                  </span>
                  <select
                    {...register("transportRoute")}
                    className="w-full focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="route1">Route 1</option>
                    <option value="route2">Route 2</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col">
                <label>Welcome SMS Alert:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaEnvelope />
                  </span>
                  <select
                    {...register("createSmsAlert")}
                    className="w-full focus:outline-none"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col">
                <label>Create Parent Account:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaUser />
                  </span>
                  <select
                    {...register("parentAccount")}
                    className="w-full focus:outline-none"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col">
                <label>Generate Admission Fee:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaFileInvoiceDollar />
                  </span>
                  <select
                    {...register("generateAdmissionFee")}
                    className="w-full focus:outline-none"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        {/* Submit Button */}
        <div className=" flex flex-right">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full md:w-auto bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded ml-auto ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
      {/* <SignaturePad/> */}
    </div>
  );
};

export default StudentAdmissionForm;
