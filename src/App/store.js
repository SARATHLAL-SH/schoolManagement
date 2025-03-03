import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../Modules/Auth/reducers/authSlice";
import signupReducer from "../Modules/Auth/reducers/signupSlice";
import addStudentReducer from "../Modules/AdmissionForm/AdmissionForm/Reducer/addStudentSlice";
import getStudentsAllReducer from "../Modules/StudentInfo/StudentInformation/reducers/getStudentSlice";
import getStudentByCodeReducer from "../Modules/StudentInfo/StudentTransfer/reducers/studentbyCodeSlice";
import updateCampusReducer from "../Modules/StudentInfo/StudentTransfer/reducers/updateCampusSlice";
import studentPromotionReducer from "../Modules/StudentInfo/StudentPromotion/reducers/studentPromoteSlice";
import bulkStudentReducer from "../Modules/AdmissionForm/BulkStudents/reducers/bulkStudentSlice";
import getAllEmployeeReducer from "../Modules/StaffManagement/reducers/getEmployeeSlice";
import editEmployeeReducer from "../Modules/StaffManagement/reducers/editEmployeeSlice";
import addEmployeeReducer from "../Modules/StaffManagement/reducers/addEmployeeSlice";
import updatePhotoReducer from "../Modules/StaffManagement/reducers/updatePhotoSlice.js";
import chatBoxReducer from "../Modules/ChatRoom/reducers/chatHistorySlice.js";
import getAllStudentsAttendanceReducer from "../Modules/ManageAttendance/StudentsAttendance/reducers/getAllAttendance.js";
import attendaceUpdateReducer from "../Modules/ManageAttendance/StudentsAttendance/reducers/attendanceUpdateReducer.js";
import getChildrenReducer from "../Modules/ChatRoom/reducers/getChildrenSlice.js";
import chatHistorySlice from "../Modules/ChatRoom/reducers/chatHistorySlice.js";
import changePasswordReducer from "../Modules/ParentAccounts/ManageAccounts/reducers/changePasswordSlice.js";
import deleteUserReducer from "../Modules/ParentAccounts/ManageAccounts/reducers/deleteUserSlice.js";
import getUserReducer from "../Modules/ParentAccounts/ManageAccounts/reducers/getUsersSlice.js";
import groupAttendanceReducer from "../Modules/ManageAttendance/StudentsAttendance/reducers/bulkattnedanceSlice.js";
import empAttendaceUpdateReducer from "../Modules/ManageAttendance/EmployeeAttendance/Reducers/attendanceUpdateReducer.js";
import getAllEmpAttendaceReducer from "../Modules/ManageAttendance/EmployeeAttendance/Reducers/getAllEmpAttendance.js";
import getFeebyIdReducer from "../Modules/FeeManagement/reducers/getFeebyIdSlice.js";
import createFeeReducer from "../Modules/FeeManagement/reducers/feeCreationSlice.js";
import updateFeebyIdReducer from "../Modules/FeeManagement/reducers/updateFeebyIdSlice.js";
import getAllFeeReducer from "../Modules/FeeManagement/reducers/getAllFeeSlice.js";
import getAllEmployeeAttendanceReducer from "../Modules/Reports/AttendanceReport/reducers/allEmployeeAttendanceSlice.js";
import getAllEmployeeAttendancebyDateReudcer from "../Modules/Reports/AttendanceReport/reducers/allEmployeebyDateSlice"
import { setupAxiosInterceptors } from "../services/axiosInstance";

const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
    getAllStudents: getStudentsAllReducer,
    getStudentsByCode: getStudentByCodeReducer,
    updateCampus: updateCampusReducer,
    studentPromotion: studentPromotionReducer,
    bulkStudent: bulkStudentReducer,
    addStudent: addStudentReducer,
    getAllEmployee: getAllEmployeeReducer,
    editEmployee: editEmployeeReducer,
    addEmployee: addEmployeeReducer,
    updatePhoto: updatePhotoReducer,
    chatBox: chatBoxReducer,
    getAllStudnetsAttendance: getAllStudentsAttendanceReducer,
    attendacneUpdate: attendaceUpdateReducer,
    getChildren: getChildrenReducer,
    chatHistory: chatHistorySlice,
    changeParentPassword: changePasswordReducer,
    deleteUser: deleteUserReducer,
    getUser: getUserReducer,
    groupAttendance: groupAttendanceReducer,
    empAttendaceUpdate: empAttendaceUpdateReducer,
    getAllEmpAttendance: getAllEmpAttendaceReducer,
    getFeebyId: getFeebyIdReducer,
    feeCreation: createFeeReducer,
    updateFeebyId: updateFeebyIdReducer,
    getAllFee: getAllFeeReducer,
    getAllEmployeeAttendance: getAllEmployeeAttendanceReducer,
    getAllAttendancebyDate:getAllEmployeeAttendancebyDateReudcer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

setupAxiosInterceptors(store);

export default store;
