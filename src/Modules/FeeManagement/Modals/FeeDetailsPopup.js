import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const FeeDetailsPopup = ({ isOpen, onClose, student }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [feeRecords, setFeeRecords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState();
  const [isReadOnly, setIsReadOnly] = useState(true);
  const { watch } = useForm();
  useEffect(() => {
    if (student?.length > 0) {
      const sortedRecords = [...student].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setFeeRecords(student);
      setCurrentIndex(0);
      setFormValues(student[0]);
    }
  }, [student]);
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();
  const setFormValues = (record) => {
    if (!record) return;
    setValue("StudentId", record.StudentId);
    setValue("date", record.date.split("T")[0]);
    setValue("month", Number(record.month)); // Ensure it's a number
    setValue("title", record.title);
    setValue("amountPaid", Number(record.amountPaid) || 0);
    setValue("lateFee", Number(record.lateFee) || 0);
    setValue("total", Number(record.total) || 0);
    setValue("discount", Number(record.discount) || 0);
    setValue("due", Number(record.due) || 0);
    setValue("credit", Number(record.credit) || 0);
    setValue("status", record.status || "Pending");
    setValue("type", record.type || "N/A");
    setValue("recieved", record.recieved || "NA");
    setStatus(record.status);
    const createdDay = new Date(record.createdAt).getDate();
    const isCurrentMonth =
      currentMonth !== record.month &&
      record.status === "Paid" &&
      createdDay !== currentDay;
    setIsReadOnly(isCurrentMonth);
    console.log(record.month, currentMonth, createdDay, currentDay);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setFormValues(feeRecords[newIndex]);
    }
  };

  const handleNext = () => {
    if (currentIndex < feeRecords?.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setFormValues(feeRecords[newIndex]);
    }
  };
  console.log("fee rocords index", feeRecords[currentIndex - 1]?.status);
  const handleFormSubmit = async (data) => {
    const closestLower = student
      .filter((studentItem) => studentItem.month < data.month) // Get all months less than data.month
      .reduce(
        (prev, curr) => (prev && prev.month > curr.month ? prev : curr),
        null
      );

    if (data.amountPaid <= 0) {
      alert("Enter an Amount");
      return;
    }

    if (closestLower && closestLower.status !== "Paid") {
      alert("Your Last Month Payment is Pending.");
      return; // Stop execution
    }

    if (!window.confirm("Are you sure you want to submit the fee details?")) {
      return;
    }

    const user = localStorage.getItem("name");
    const updatedData = {
      amountPaid: Number(data.amountPaid),
      status: "Paid",
      recieved: user || "NA",
      date: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await axios.put(
        `http://localhost:8081/fee/${feeRecords[currentIndex].id}`,
        updatedData
      );
      if (response.status === 200) {
        console.log("Updated Successfully:", response.data);
      }
    } catch (err) {
      console.error("Update Error:", err);
    }

    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-3/4 h-5/6 max-w-3xl overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Fee Details </h2>
          <h2
            className={`font-bold ${
              status === "Paid" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✖
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between my-4">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`px-4 py-2 rounded ${
              currentIndex === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
          >
            ⬅️ Previous
          </button>
          <span className="text-sm text-gray-600">
            Record {currentIndex + 1} of {feeRecords?.length}
          </span>
          <button
            onClick={handleNext}
            disabled={currentIndex === feeRecords?.length - 1}
            className={`px-4 py-2 rounded ${
              currentIndex === feeRecords?.length - 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
          >
            Next ➡️
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Student ID</label>
              <input
                {...register("StudentId")}
                type="number"
                className="w-full p-2 border rounded"
                readOnly
              />
            </div>

            <div>
              <label className="block font-medium">Date</label>
              <input
                {...register("date")}
                type="date"
                className="w-full p-2 border rounded"
                readOnly
              />
            </div>

            {/* <div>
              <label className="block font-medium">Month</label>
              <input
                {...register("month")}
                type="number"
                className="w-full p-2 border rounded"
                readOnly
              />
            </div> */}

            <div>
              <label className="block font-medium">Title</label>
              <input
                {...register("title")}
                className="w-full p-2 border rounded text-yellow-800 font-bold"
                readOnly
              />
            </div>

            <div>
              <label className="block font-medium">Amount to be Paid</label>
              <input
                {...register("amountPaid")}
                type="number"
                className={`w-full p-2 border rounded  font-bold
                    
                `}
                readOnly={isReadOnly}
              />
            </div>

            <div>
              <label className="block font-medium">Late Fee</label>
              <input
                {...register("lateFee")}
                type="number"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Received By</label>
              <input
                {...register("recieved")}
                className="w-full p-2 border rounded"
                readOnly
              />
            </div>

            <div>
              <label className="block font-medium">Monthly Fee</label>
              <input
                {...register("total")}
                type="number"
                className="w-full p-2 border rounded bg-yellow-200 font-bold"
                readOnly
              />
            </div>

            <div>
              <label className="block font-medium">Discount</label>
              <input
                {...register("discount")}
                type="number"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Due Amount</label>
              <input
                {...register("due")}
                type="number"
                className="w-full p-2 border rounded text-red-600 font-bold"
                readOnly
              />
            </div>

            <div>
              <label className="block font-medium">Credit Amount</label>
              <input
                {...register("credit")}
                type="number"
                className="w-full p-2 border rounded text-green-600 font-bold"
                readOnly
              />
            </div>

            <div>
              <label className="block font-medium">Status</label>
              <input
                {...register("status")}
                className={`w-full p-2 border rounded ${
                  status === "Paid"
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
                readOnly
              />
            </div>

            <div>
              <label className="block font-medium">Fee Type</label>
              <input
                {...register("type")}
                className="w-full p-2 border rounded"
                readOnly
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Make Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeeDetailsPopup;
