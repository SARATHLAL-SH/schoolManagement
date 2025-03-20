import AddBulkStudent from "./Modules/AdmissionForm/BulkStudents/AddBulkStudent";
import AdmissionInquiries from "./Modules/AdmissionForm/admissionInquery/AdmissionInquiries";
import AdmissionRequest from "./Modules/AdmissionForm/AdmissionRequests/AdmissionRequest";
import AdmissionForm from "./Modules/AdmissionForm/PrintAdmissionForm/AdmissionForm";
import StudentAdmissionForm from "./Modules/AdmissionForm/AdmissionForm/StudentAdmissionForm";
import Home from "./Modules/Home";
import StudentBirthDay from "./Modules/StudentInfo/StudentBirthDay/StudentBirthDay";
import StudentInformation from "./Modules/StudentInfo/StudentInformation/StudentInformation";
import StudentTransfer from "./Modules/StudentInfo/StudentTransfer/StudentTransfer";
import { FaHome, FaArrowDown } from "react-icons/fa";
import StudentPromotion from "./Modules/StudentInfo/StudentPromotion/Components/StudentPromotion";
import ManageAccounts from "./Modules/ParentAccounts/ManageAccounts/components/ManageAccounts";
import StaffManagement from "./Modules/StaffManagement/components/staffManagement";
import IdCardPrinting from "./Modules/IDCardPrinting/StudentCard/Components/IdCardPrinting";
import EmployeeCardPrinting from "./Modules/IDCardPrinting/EmployeeCard/Components/IdCardPrinting";
import CardSettings from "./Modules/IDCardPrinting/Settings/Components/CardSettings";
import ChartData from "./components/ChartData";
import ChatBox from "./Modules/ChatRoom/chatbox";
import StudentChatBox from "./Modules/ChatRoom/StudentChatBox";
import StudentsAttendance from "./Modules/ManageAttendance/StudentsAttendance/Components/StudentsAttendance";
import NotificationComponent from "./components/Notifications/NotificationComponent";
import WhatsappChat from "./Modules/ChatRoom/WhatsappChat";
import StaffAttendance from "./Modules/ManageAttendance/EmployeeAttendance/Components/StaffAttendance";
import Timetable from "./Modules/TimeTable/Components/TimeTable";
import ManageTimeTable from "./Modules/TimeTable/Components/manageTimeTable";
import FeePayment from "./Modules/FeeManagement/FeePayment/Components/FeePayment";
import FeeReport from "./Modules/FeeManagement/FeePayment/Components/FeeReport";
import StudentAttendance from "./Modules/ManageAttendance/StudentsAttendance/Components/StudentsAttendance";
import AttendanceReport from "./Modules/Reports/AttendanceReport/Components/StudentAttendaceReport";
import EmployeeAttendanceReport from "./Modules/Reports/AttendanceReport/Components/EmployeeAttendanceReport";
import EmployeeSalaryRecord from "./Modules/Reports/AttendanceReport/Components/EmployeeSalaryRecord";
import CourseList from "./Modules/CourseManagement/helpers/CourseList";

const route = [
  {
    name: "Home",
    path: "/home",
    component: <ChartData />,
    role: ["admin", "teacher", "student"],
  },
 
  {
    name: "Admission Management",
    path: "/admissionManagement",
    role: ["admin"],
    subRoutes: [
      {
        name: "Admit Student",
        path: "/StudentAdmissionForm",
        component: <StudentAdmissionForm />,
        role: ["admin"],
      },
      {
        name: "Admit Bulk Student",
        path: "/addBulkStudent",
        component: <AddBulkStudent />,
        role: ["admin"],
      },
      {
        name: "Admission Request",
        path: "/admissionRequest",
        component: <AdmissionRequest />,
        role: ["admin"],
      },
    ],
  },
  {
    name: "Course Management",
    path: "/courseManagement",
    role: ["admin"],
    subRoutes: [
      {
        name: "Manage Course",
        path: "/ManageCourse",
        component: <CourseList />,
        role: ["admin", "teacher"],
      },
    ],
  },
  {
    name: "Chat Room",
    path: "/chatRoom",
    role: ["teacher", "admin", "student"],
    subRoutes: [
      {
        name: "Teacher ChatRoom",
        path: "/teacherChatRoom",
        component: <ChatBox />,
        role: ["teacher", "admin"],
      },
      {
        name: "Student ChatRoom",
        path: "/studentChatRoom",
        component: <StudentChatBox />,
        role: ["student", "admin"],
      },
      // {
      //   name: "Whatsapp Chat",
      //   path: "/whatsappChat",
      //   component: <WhatsappChat />,
      //   role: ["student", "admin"],
      // },
    ],
  },
  {
    name: "Attendance Manager",
    path: "/attendanceManager",
    role: ["admin", "teacher"],
    subRoutes: [
      {
        name: "Students Attendance",
        path: "/studentsAttendance",
        component: <StudentsAttendance />,
        role: ["admin", "teacher"],
      },
      {
        name: "Employee Attendance",
        path: "/employeeAttendance",
        component: <StaffAttendance />,
        role: ["admin"],
      },
    ],
  },
  {
    name: "Print Admission Form",
    path: "/printAdmissionForm",
    component: <AdmissionForm />,
    role: ["admin"],
  },
  {
    name: "Student Management",
    path: "/studentManagement",
    role: ["admin"],
    subRoutes: [
      {
        name: "Student Information",
        path: "/studentInformation",
        component: <StudentInformation />,
        role: ["admin"],
      },
      {
        name: "Student Promotion",
        path: "/studentPromotion",
        component: <StudentPromotion />,
        role: ["admin"],
      },
      {
        name: "Student BirthDay",
        path: "/studentBirthDay",
        component: <StudentBirthDay />,
        role: ["admin"],
      },
      {
        name: "Student Transfer",
        path: "/studentTransfer",
        component: <StudentTransfer />,
        role: ["admin"],
      },
    ],
  },
  {
    name: "Parent Accounts",
    path: "/ParentAccounts",
    role: ["admin"],
    subRoutes: [
      {
        name: "Manage Account",
        path: "/ManageAccount",
        component: <ManageAccounts />,
        role: ["admin"],
      },
    ],
  },
  {
    name: "Employee Management",
    path: "/staff",

    role: ["admin"],
    subRoutes: [
      {
        name: "Staff Management",
        path: "/StaffManagement",
        component: <StaffManagement />,
        role: ["admin"],
      },
    ],
  },
  {
    name: "Card Printing",
    path: "/cardPrinting",

    role: ["admin"],
    subRoutes: [
      {
        name: "Student Card Printing",
        path: "/studentCardPrinting",
        component: <IdCardPrinting />,
        role: ["admin"],
      },
      {
        name: "Employee Card Printing",
        path: "/employeeCardPrinting",
        component: <EmployeeCardPrinting />,
        role: ["admin"],
      },
      {
        name: "Settings",
        path: "/cardSettings",
        component: <CardSettings />,
        role: ["admin"],
      },
    ],
  },
  {
    name: "Timetable Management",
    path: "/timetableManagement",

    role: ["admin", "student", "teacher"],
    subRoutes: [
      {
        name: "Timetable",
        path: "/timeTable",
        component: <Timetable />,
        role: ["admin", "student", "teacher"],
      },
      {
        name: "Manage Timetable",
        path: "/manageTimetable",
        component: <ManageTimeTable />,
        role: ["admin"],
      },
    ],
  },
  {
    name: "Fee Management",
    path: "/feeManagement",

    role: ["admin"],
    subRoutes: [
      {
        name: "Fee Payment",
        path: "/feePayment",
        component: <FeePayment />,
        role: ["admin"],
      },
      {
        name: "Fee Payment Report",
        path: "/feePaymentReport",
        component: <FeeReport />,
        role: ["admin"],
      },
    ],
  },
  {
    name: "Reports",
    path: "/reports",

    role: ["admin"],
    subRoutes: [
      {
        name: "Student Attendance Report",
        path: "/studentAttendanceReport",
        component: <AttendanceReport />,
        role: ["admin"],
      },
      {
        name: "Employee Attendance Report",
        path: "/employeeAttendanceReport",
        component: <EmployeeAttendanceReport />,
        role: ["admin"],
      },
      {
        name: "Employee Salary Report",
        path: "/employeeSalaryReport",
        component: <EmployeeSalaryRecord />,
        role: ["admin"],
      },
    ],
  },
  {
    name: "Notifications",
    path: "/notifications",
    component: <NotificationComponent />,
    role: ["admin"],
  },
  {
    name: "Accountants",
    path: "/accountants",
    role: ["user"],
  },
 
];

export default route;
