const handlePrint = () => {
    // Create a new window
    const printWindow = window.open('', '_blank');
    
    // Get the table content wrapper
    const tableContent = document.getElementById("studentTableWrapper").outerHTML;
  
    // Get styles from the current document
    const styles = Array.from(document.styleSheets)
      .map(sheet => {
        try {
          // Check if the stylesheet is accessible
          return Array.from(sheet.cssRules)
            .map(rule => rule.cssText)
            .join('\n');
        } catch (e) {
          return '';
        }
      })
      .join('\n');
  
    // Write the content into the new window
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Students Admission Details</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              background-color: #f4f4f4;
            }
            ${styles} /* Include the page styles */
          </style>
        </head>
        <body>
          <h2>Student Admission Details</h2>
          ${tableContent}
        </body>
      </html>
    `);
  
    // Call the print dialog
    printWindow.document.close();
    printWindow.print();
  };