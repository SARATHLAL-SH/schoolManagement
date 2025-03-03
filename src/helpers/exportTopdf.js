import jsPDF from "jspdf";
import "jspdf-autotable";

export const exportToPDF = (admissionRequests) => {
  const doc = new jsPDF();

  // Add title
  doc.text("Admission Requests", 14, 10);

  // Prepare data for the table
  const tableData = admissionRequests.map((row, index) => [
    index + 1,
    row.studentName,
    row.parentName,
    row.requestClass,
    row.dob,
    row.gender,
    row.email,
    row.phone,
    row.requestStatus,
  ]);

  // Define the table columns
  const tableColumns = [
    "#",
    "Student",
    "Parent",
    "Request Class",
    "Date Of Birth",
    "Gender",
    "Email",
    "Phone",
    "Request Status",
  ];

  // Add the table
  doc.autoTable({
    head: [tableColumns],
    body: tableData,
    startY: 20, // Start below the title
  });

  // Save the PDF
  doc.save("AdmissionRequests.pdf");
};

export const exportToPDFInquiries = (admissionRequests) => {
  const doc = new jsPDF();

  // Add title
  doc.text("Admission Requests", 14, 10);

  // Prepare data for the table
  const tableData = admissionRequests.map((row, index) => [
    index + 1,
    row.name,
    row.parent,
    row.birthday,
    row.gender,
    row.phone,
    row.address,
    row.dateAdded,
  ]);

  // Define the table columns
  const tableColumns = [
    "#",
    "Name",
    "Parent",
    "Birthday",
    "Gender",
    "Phone",
    "Address",
    "Date Added",
  ];

  // Add the table
  doc.autoTable({
    head: [tableColumns],
    body: tableData,
    startY: 20, // Start below the title
  });

  // Save the PDF
  doc.save("AdmissionInquires.pdf");
};
