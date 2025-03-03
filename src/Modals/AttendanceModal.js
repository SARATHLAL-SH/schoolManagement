 const AttendanceModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center flex-col bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg text-green-600 font-bold shadow-lg max-w-sm w-full">
         Attendance Updated Successfully
         </div>
          <button
            onClick={onClose}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        
      </div>
    );
  };
  export default AttendanceModal