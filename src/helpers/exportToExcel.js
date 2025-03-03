import * as XLSX from "xlsx";
export  const exportToExcel = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data); // Convert JSON data to a worksheet
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1"); // Append the worksheet
    XLSX.writeFile(workbook, `${fileName}.xlsx`); // Export the file
  };