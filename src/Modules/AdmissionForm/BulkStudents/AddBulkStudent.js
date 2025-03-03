import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addBulkStudnet } from "./service";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const AddBulkStudent = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError,message } = useSelector((state) => state.bulkStudent);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const classSelect = watch("classSelect");
  const sectionSelect = watch("Selection");
  const createParentAccounts = watch("createParentAccounts");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload")
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("class", classSelect);
    formData.append("section", sectionSelect);
    formData.append("parentAccount", createParentAccounts);

    try {
      const resultAction = await dispatch(addBulkStudnet(formData));
      if (addBulkStudnet.fulfilled.match(resultAction)) {
        toast.success("Bulk students added successfully");
      }
      isError && toast.error(message) ;
    } catch (error) {
  
      alert("An error occurred during file upload.");
    }
  };
  return (
    <div className="bg-gray-100 p-4 rounded-lg ">
      <form onSubmit={handleSubmit(handleFileUpload)}>
        <fieldset className="border border-blue-300 rounded-lg p-4 mb-6 bg-white shadow-lg shadow-gray-600">
          <legend className="px-4 py-2 text-lg font-semibold text-white bg-blue-600 rounded-md shadow-md shadow-blue-300">
            Add Bulk Student
          </legend>

          <div className="flex space-x-4  justify-between px-40">
            <div className="flex flex-col w-full">
              <label htmlFor="classSelect" className="text-black">
                Class
              </label>
              <div className="flex items-center  border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                <select
                  {...register("classSelect", {
                    required: "Class is required",
                  })}
                  className="w-full focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Calss 1">Calss 1</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 3">Class 3</option>
                  <option value="Class 4">Class 4</option>
                </select>
              </div>
              {errors.classSelect && (
                <p style={{ color: "red" }}>{errors.classSelect.message}</p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="sectionSelect" className="text-black">
                Section
              </label>
              <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                <select
                  {...register("Selection", { required: "Class is required" })}
                  className="w-full focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-4  flex justify-center align-center ">
            {/* <label htmlFor="fileInput" className="text-red-300">
              Select File
            </label> */}
            <div className="flex items-center border border-gray-300 rounded-md bg-blue-500 text-white px-3 py-2">
              <input
                type="file"
                accept=".txt, .xlsx"
                id="fileInput"
                {...register("fileInput", { required: "File is required" })}
                onChange={handleFileChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex justify-center items-center ">
            <div className="mt-4 flex flex-col">
              <label className="text-black">Create Parent Accounts</label>

              <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2">
                <select
                  {...register("createParentAccounts")}
                  className="w-full focus:outline-none"
                >
                  <option value="no">NO</option>
                  <option value="yes">YES</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center flex-col ">
            <button
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleFileUpload}
            >
              {`${isLoading ? "Importing" : "Import Students Data"}`}
              {isLoading ? <ClipLoader color="#36d7b7" /> : null}
            </button>

            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => {
                // Create a link element programmatically
                const link = document.createElement("a");
                link.href = "sample.txt"; // Path to the file in the public folder
                link.download = "sample.txt"; // Filename for the downloaded file
                link.click(); // Simulate a click
              }}
            >
              Download Sample File
            </button>
          </div>
          <div className="mt-4 bg-blue-900 text-white p-4 rounded-md shadow-md shadow-gray-500">
            <p className="text-white">
              Please Follow The Instructions For Adding Bulk Student
            </p>
            <ol className="list-disc list-inside text-white">
              <li>At First Download Sample File.</li>
              <li>
                Open The Downloaded sample.txt File. Enter Student Details As
                Written In There.
              </li>
              <li>
                Save The Edited Bulk Student File (Separate File For Each Class
                & Section).
              </li>
              <li>
                Now Here Select The Class & Click The Choose File And Choose The
                File You Just Edited.
              </li>
            </ol>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default AddBulkStudent;
