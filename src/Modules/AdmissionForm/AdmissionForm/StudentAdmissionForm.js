import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
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
  FaBook,
} from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { MdDiscount } from "react-icons/md";
import { handleImageChange } from "../../../helpers/uploadToBucket";
import { addStudent } from "./services";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsAll } from "../../StudentInfo/StudentInformation/service";
import PreviewForm from "./helpers/PreviewForm";
import SignaturePad from "../../../components/SignaturePad/SignaturePad";

const StudentAdmissionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [studentPhoto, setStudentPhoto] = useState();
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState(null);
  const [message, setMessage] = useState("");
  const [birthCertificate, setBirthCertificate] = useState();
  const [birthCertificateUrl, setBirthCertificateUrl] = useState();
  const [castCertificate, setCastCertificate] = useState();
  const [castCertificateUrl, setCasteCertificateUrl] = useState();
  const [admitCard, setAdmitCard] = useState();
  const [admitCardUrl, setAdmitCardUrl] = useState();
  const [nextAppNumber, setNextAppNumber] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [studentPhotoUrl, setStudentPhotoUrl] = useState();
  const [parentSignature, setParentSignature] = useState(null);
  const [parentSignatureUrl, setParentSignatureUrl] = useState(null);
  const [studentSignature, setStudentSignature] = useState(null);
  const [studentSignatureUrl, setStudentSignatureUrl] = useState(null);
  const [isUploadStudentSig, setIsUploadStudentSig] = useState(false);
  const [isUploadParentSig, setIsUploadParentSig] = useState(false);
  const dispatch = useDispatch();
  const { data: students } = useSelector((state) => state.getAllStudents);
  console.log("brithCertificate", birthCertificateUrl);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  useEffect(() => {
    axios
      .get("http://localhost:8081/get_Subjects")
      .then((res) => setSubjects(res.data));
  }, [newSubject]);

  const addSubject = async () => {
    console.log("add button clicked");
    try {
      const response = await axios.post("http://localhost:8081/add_Subject", {
        name: newSubject,
      });
      setShowModal(false);
      if (response.data) {
        setSubjects([...subjects, { name: newSubject }]);
        setNewSubject("");
      }
    } catch (error) {
      console.log("error in addCource", error);
    }
  };
  const handlePreview = (data) => {
    const newData = {
      ...data,
      photo: studentPhoto,
      birthCertificate: birthCertificate,
      castCertificate: castCertificate,
      admitCard: admitCard,
      parentSignature: parentSignature,
      studentSignature: studentSignature,
    };
    setPreviewData(newData);
    setShowModal(true);
  };

  const requestOTP = async (data) => {
    if (!isChecked) {
      toast.error("Please agree to the declaration before submitting.");
      return;
    }
    if (!isUploadParentSig ) {
      toast.error(
        "Please upload  and Save Parent Signature before submitting."
      );
      return;
    }
    if ( !isUploadStudentSig) {
      toast.error(
        "Please upload  and Save Student signature before submitting."
      );
      return;
    }
    setEmail(data.fatherEmail);
    const newData = {
      ...data,
      photo: studentPhotoUrl,
      birthCertificate: birthCertificateUrl,
      castCertificate: castCertificateUrl,
      admitCard: admitCardUrl,
      parentSignature: parentSignatureUrl,
      studentSignature: studentSignatureUrl,
    };
    console.log("newData", newData);
    setFormData(newData);
    setIsSubmitting(true);

    try {
      await axios.post("http://localhost:8081/send-email-otp", {
        email: data.fatherEmail,
      });
      setShowOTPModal(true);
      setMessage("OTP sent to email.");
    } catch (error) {
      setMessage(error.response?.data?.error || "Error sending OTP");
      setIsSubmitting(false);
    }
  };

  const verifyOTP = async () => {
    try {
      await axios.post("http://localhost:8081/verify-email-otp", {
        email,
        otp,
      });
      dispatch(addStudent(formData));
      reset(); // Clear the form fields
      setFormData(null); // Clear form data state
      setEmail("");
      setOtp("");
      setIsChecked(false); // Uncheck the declaration checkbox
      setStudentPhotoUrl("");
      setBirthCertificateUrl("");
      setCasteCertificateUrl("");
      setAdmitCardUrl("");
      setMessage("Form submitted successfully!");
    } catch (error) {
      setMessage(error.response?.data?.error || "Incorrect OTP");
    }
    setShowOTPModal(false);
    setIsSubmitting(false);
  };

  useEffect(() => {
    dispatch(getStudentsAll());
  }, [dispatch, isChecked]);

  useEffect(() => {
    if (students?.length > 0) {
      const lastStudent = students[students?.length - 1];
      console.log("Last student's studentCode:", lastStudent.studentCode);
      const updatedStudentCode = lastStudent.studentCode * 1 + 1;
      setValue("studentCode", updatedStudentCode.toString());
      const lastAppNumber = lastStudent.applicationNumber;
      const lastNumber = parseInt(lastAppNumber.split("-")[1], 10);
      const nextNumber = lastNumber + 1;

      // ✅ Format the new application number
      const newAppNumber = `APP-${String(nextNumber).padStart(4, "0")}`;
      setNextAppNumber(newAppNumber);
    }
  }, [students, isChecked]);

  useEffect(() => {
    // setValue("photo", studentPhotoUrl);
    console.log("student photo", studentPhotoUrl);
  }, [studentPhotoUrl]);

  const handleSaveParentSignature = (file) => {
    // Upload the signature using handleImageChange
    handleImageChange(
      { target: { files: [file] } }, // Simulate file input event
      setParentSignatureUrl, // Set the URL after upload
      setParentSignature // Store the uploaded file
    );

    setIsUploadParentSig(true);
  };

  const handleSaveStudentSignature = (file) => {
    handleImageChange(
      { target: { files: [file] } }, // Simulate file input event
      setStudentSignatureUrl, // Set the URL after upload
      setStudentSignature // Store the uploaded file
    );
    setIsUploadStudentSig(true);
  };
  return (
    <div className="max-w-screen mx-auto p-6 bg-gray-100 rounded-lg shadow-md ">
      <Toaster position="top-center" />
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <p className="text-[120px] font-bold text-gray-300 opacity-20 select-none">
          SCHOOL NAME
        </p>
      </div>
      <form onSubmit={handleSubmit(requestOTP)}>
        {/* Student Information */}
        <div className="grid grid-cols-1  gap-6 md:grid-cols-2">
          <fieldset className="border border-blue-300 rounded-lg p-4 mb-6 bg-white shadow-lg shadow-gray-600">
            <legend className="px-4 py-2 text-lg font-semibold text-white bg-blue-600 rounded-md shadow-md shadow-blue-300">
              Student Information {nextAppNumber}
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label>
                  Name: <span className="text-red-500">*</span>{" "}
                </label>
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
                <label>
                  Gender: <span className="text-red-500">*</span>{" "}
                </label>
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
                <label>
                  Date of Birth: <span className="text-red-500">*</span>{" "}
                </label>
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
                {errors.dateofBirth && (
                  <p style={{ color: "red" }}>{errors.dateofBirth.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label>
                  Photo: <span className="text-red-500">*</span>{" "}
                </label>

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
              <div className="flex flex-col">
                <label>
                  Adhaar Card Number: <span className="text-red-500">*</span>{" "}
                </label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaGraduationCap />
                  </span>
                  <input
                    type="text"
                    {...register("adhaarCard", {
                      required: "Adhaar Card Number is required",
                    })}
                    placeholder="Adhaar card Number"
                    className="focus:outline-none overflow-hidden text-ellipsis w-full"
                  />
                </div>
                {errors.name && (
                  <p style={{ color: "red" }}>{errors.adhaarCard.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label>Birth Certificate:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaGraduationCap />
                  </span>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) =>
                      handleImageChange(
                        e,
                        setBirthCertificateUrl,
                        setBirthCertificate
                      )
                    }
                    // {...register("photo")}
                    className="overflow-hidden text-ellipsis w-full"
                  />
                </div>
                {/* {errors.name && (
                  <p style={{ color: "red" }}>{errors.birthCertificate.message}</p>
                )} */}
              </div>
              <div className="flex flex-col">
                <label>MP Admit Card:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaGraduationCap />
                  </span>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) =>
                      handleImageChange(e, setAdmitCardUrl, setAdmitCard)
                    }
                    // {...register("photo")}
                    className="overflow-hidden text-ellipsis w-full"
                  />
                </div>
                {/* {errors.name && (
                  <p style={{ color: "red" }}>{errors.name.message}</p>
                )} */}
              </div>
              <div className="flex flex-col">
                <label>Caste Certificate:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaGraduationCap />
                  </span>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) =>
                      handleImageChange(
                        e,
                        setCasteCertificateUrl,
                        setCastCertificate
                      )
                    }
                    // {...register("photo")}
                    className="overflow-hidden text-ellipsis w-full"
                  />
                </div>
                {/* {errors.name && (
                  <p style={{ color: "red" }}>{errors.name.message}</p>
                )} */}
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
                <label>
                  Father's Name: <span className="text-red-500">*</span>{" "}
                </label>
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
                <label>
                  Father's Email: <span className="text-red-500">*</span>{" "}
                </label>
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
                <label>
                  Mobile Number: <span className="text-red-500">*</span>{" "}
                </label>
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
                <label>
                  Mother's Name: <span className="text-red-500">*</span>{" "}
                </label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    {...register("motherName", {
                      required: "Mother's name is required",
                    })}
                    placeholder="Mother's name"
                    className="focus:outline-none overflow-hidden text-ellipsis w-full"
                  />
                </div>
                {errors.motherName && (
                  <p style={{ color: "red" }}>{errors.motherName.message}</p>
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
                    {...register("motherPhone")}
                    placeholder="without zero"
                    className="focus:outline-none overflow-hidden text-ellipsis w-full appearance-none"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label>
                  Religion: <span className="text-red-500">*</span>{" "}
                </label>
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
                <label>
                  Home Address: <span className="text-red-500">*</span>{" "}
                </label>
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
                {errors.homeAddress && (
                  <p style={{ color: "red" }}>{errors.homeAddress.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label>
                  Whatsapp Number: <span className="text-red-500">*</span>{" "}
                </label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaPhone />
                  </span>
                  <input
                    type="number"
                    {...register("whatsappNumber", {
                      required: "Mother's Phone is required",
                    })}
                    placeholder="whatsapp number"
                    className="focus:outline-none overflow-hidden text-ellipsis w-full appearance-none"
                  />
                </div>
                {errors.whatsappNumber && (
                  <p style={{ color: "red" }}>
                    {errors.whatsappNumber.message}
                  </p>
                )}
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
                <label>
                  Student Code: <span className="text-red-500">*</span>{" "}
                </label>
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
              {/* <div className="flex flex-col">
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
              </div> */}
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
                <label>Last Qualification:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaSchool />
                  </span>
                  <input
                    type="text"
                    {...register("lastQualification")}
                    placeholder="last Qualification"
                    className="focus:outline-none overflow-hidden text-ellipsis w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label>
                  Admission Date: <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaCalendar />
                  </span>
                  <input
                    type="date"
                    {...register("admissionDate", {
                      required: "Admission Date is required",
                    })}
                    defaultValue={new Date().toISOString().split("T")[0]}
                    className="overflow-hidden text-ellipsis w-full"
                  />
                </div>
                {errors.admissionDate && (
                  <p style={{ color: "red" }}>{errors.admissionDate.message}</p>
                )}
              </div>
              <div className="mb-8">
                <h3 className="text-md font-semibold">Student's Signature</h3>
                <SignaturePad
                  onSave={handleSaveStudentSignature}
                  setSignature={setStudentSignature}
                />
                {studentSignature && (
                  <div className="mt-4">
                    <h4>Saved Student Signature:</h4>
                    <img
                      src={studentSignature}
                      alt="Student Signature"
                      style={{ border: "1px solid black", width: "200px" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </fieldset>

          {/* Other Information */}
          <fieldset className="border border-blue-300 rounded-lg p-4 mb-6 bg-white shadow-lg shadow-gray-600">
            <legend className="px-2 text-lg font-semibold text-white bg-blue-700 rounded-md py-2 shadow-md shadow-blue-300">
              Course Information
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 mb-4 gap-4">
              <div className="flex flex-col">
                <label>
                  Monthly Fee: <span className="text-red-500">*</span>
                </label>
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
                <label>Select Course</label>
                <div className="flex items-center gap-2">
                  <select
                    {...register(
                      "discountedStudent"
                      // {
                      //   required: "Section is required",
                      // }
                    )}
                    className="border p-2 w-full"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    <option value="">Select Course</option>
                    {subjects.map((s, index) => (
                      <option key={index} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <button
                    className="bg-green-500 text-white px-3 py-2 rounded"
                    onClick={() => setShowModal(true)}
                  >
                    New
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                <label>Course Category:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaBook />
                  </span>
                  <select
                    {...register("transportRoute")}
                    className="w-full focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="route1">Package</option>
                    <option value="route2">Monthly</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col">
                <label>Course Duration:</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaEnvelope />
                  </span>
                  <select
                    {...register("createSmsAlert")}
                    className="w-full focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="no">1 Month</option>
                    <option value="yes">3 Months</option>
                    <option value="yes">6 Months</option>
                    <option value="yes">9 Months</option>
                    <option value="yes">1 Year</option>
                    <option value="yes">1.6 Year</option>
                    <option value="yes">2 Years</option>
                    <option value="yes">3 Years</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-md font-semibold">Parent's Signature</h3>
              <SignaturePad
                onSave={handleSaveParentSignature}
                setSignature={setParentSignature}
              />
              {parentSignature && (
                <div className="mt-4">
                  <h4>Saved Parent Signature:</h4>
                  <img
                    src={parentSignature}
                    alt="Parent Signature"
                    style={{ border: "1px solid black", width: "200px" }}
                  />
                </div>
              )}
            </div>
          </fieldset>
        </div>
        <div className="flex items-center border-b border-gray-300 bg-gray-200 mb-4 p-4 shadow-md">
          <input
            type="checkbox"
            id="declaration"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className={`mr-2 w-8 h-8 transition-all duration-300 ${
              isChecked ? "accent-green-500" : "accent-red-500"
            }`}
          />
          <label htmlFor="declaration" className="text-gray-700">
            I, <span className="font-bold">[Parent/Guardian Name]</span>, hereby
            declare that the information provided in this admission form is true
            and correct to the best of my knowledge. I understand that any false
            or misleading information may lead to the cancellation of my child's
            admission.
          </label>
        </div>
        {/* Submit Button */}
        <div className=" flex flex-right">
          <button
            type="button"
            onClick={handleSubmit(handlePreview)}
            className={`w-full md:w-auto bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded ml-auto `}
          >
            Preview{" "}
          </button>
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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-3">{"Add New Course"}</h2>
            <input
              type="text"
              className="border p-2 w-full"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder={"Add New Course"}
            />
            <div className="flex justify-end gap-3 mt-3">
              <button
                className="bg-red-500 text-white px-3 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-2 rounded"
                onClick={addSubject}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {showOTPModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-md">
            <h2 className="text-xl mb-2">Enter OTP</h2>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="p-2 border"
            />
            <div className="flex gap-2 mt-3">
              <button
                onClick={verifyOTP}
                className="bg-green-500 text-white p-2"
              >
                Verify
              </button>
              <button
                onClick={() => {
                  setShowOTPModal(false);
                  setIsSubmitting(false);
                }}
                className="bg-red-500 text-white p-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <PreviewForm
          previewData={previewData}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default StudentAdmissionForm;
