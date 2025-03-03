const Modal = ({ student, onClose }) => {
    if (!student) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-gradient-to-r from-blue-600 via-purple-700 to-pink-600 p-8 rounded-lg shadow-2xl max-w-3xl w-full overflow-hidden h-auto max-h-[80vh]">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-3xl font-semibold text-white uppercase">{student.name || "Student Profile"}</h2>
            <div className="flex justify-center m2-6">
            <img
              src={student.imageUrl || "/default-avatar.png"} // Default image if no photo is available
              alt="Student Photo"
              className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-xl transform transition-all hover:scale-110"
            />
          </div>
            <button
              onClick={onClose}
              className="text-red-700 text-3xl bg-white px-2 rounded-full hover:bg-white transition-all transform hover:scale-110"
            >
              X
            </button>
          </div>
  
          
  
          <div className="space-y-2 text-white overflow-y-auto max-h-[60vh] px-4 hide-scrollbar">
            {[
              { label: "Father's Name", value: student.fatherName },
              { label: "Father's Email", value: student.fatherEmail },
              { label: "Father's Phone", value: student.fatherPhone },
              { label: "Mother's Phone", value: student.motherPhone },
              { label: "Date of Birth", value: new Date(student.dateofBirth).toLocaleDateString() },
              { label: "Gender", value: student.gender },
              { label: "Class", value: student.class },
              { label: "Section", value: student.section },
              { label: "Previous School", value: student.previousSchool },
              { label: "Religion", value: student.religion },
              { label: "Transport Route", value: student.transportRoute },
              { label: "Monthly Fee", value: `₹${student.monthlyFee}` },
              { label: "Home Address", value: student.homeAddress },
              { label: "Campus", value: student.campus },
              { label: "Student Code", value: student.studentCode },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center text-lg border-b border-gray-200 py-2">
                <div className="text-gray-200 font-semibold">{item.label}:</div>
                <div className="text-lg text-gray-100">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;
  