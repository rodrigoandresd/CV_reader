import fs from "fs";
import pdf from 'pdf-parse'; // uses promises
import { processData } from "./process_data.js";


// Reads the contents of a PDF file at the specified file path, and
// passes the file content to the processData function for further processing.
// @param {string} filePath - The file path of the PDF file to read.

function reader (filePath) {
    // Read the contents of the specified file into a buffer
    let dataBuffer = fs.readFileSync(filePath);

    // Parse the PDF buffer using pdf-parse module
    pdf(dataBuffer).then(function (data) {
        const content = data.text;
        // Pass the file content to the processData function
        processData(content);
    }).catch(e => {
        console.log(e);
    });
};

// Export the reader function for use in other modules
export { reader };
