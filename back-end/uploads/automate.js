import fs from "fs";
import PDFParser from "pdf2json";

// function pdfReader recieves the filePath of the pdf file and
// parse the file to a txt
function pdfReader (filePath) {

    const pdfParser = new PDFParser(this,1);
    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
    pdfParser.on("pdfParser_dataReady", pdfData => {
        fs.writeFile("./uploads/demo.content.txt", pdfParser.getRawTextContent(), ()=>{console.log("Done.");});
    });

    pdfParser.loadPDF(filePath);
};

// read the txt file, containing the data from the pdf
fs.readFile('./demo.content.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        // token the data in an Array of strings(lines)
        const dataArray = data.split('\r\n');
        readTokens(dataArray);
    }
});

// array of skills to match with the lines
const skills = ['Python', 'SQL', 'Mongo', 'Angular'];
let skillsList = [];

// function that process the array with the tokens and search for keywords
function readTokens (dataArray) {

    let relevantInformation = {};

    for (const line of dataArray) {
        if (line.includes("Celular")) {
            relevantInformation.celphone = line.split(" ")[1].trim();
        }
        if (line.includes("Email:")) {
            const begin = line.indexOf('Email:');
            const last = line.lastIndexOf('Email:');
            console.log(begin);
            console.log(last);
            relevantInformation.email = line.split(" ")[begin + 6].trim();
        }
    }

    console.log(relevantInformation);
    return relevantInformation;
};

export { pdfReader }
