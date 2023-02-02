import fs from "fs";
import pdfParser from 'pdf-parse';
import natural from 'natural';

const getPDF = async (fileName) => {
    let readFileSync = fs.readFileSync(fileName);

    try {
        let pdfExtract = pdfParse(readFileSync);
        console.log('before the promise');
        let content = (await pdfExtract).text;
        console.log('after the promise');
        return content;
        console.log('File content: ', pdfExtract.text);
        console.log('Total pages: ', pdfExtract.numpages);
        console.log('All content: ', pdfExtract.info);
        console.log('Type of: ', typeof(pdfExtract.text));
    } catch (error) {
        throw new Error(error)
    }
}

const file = './CV1.pdf';
getPDF(file);

//Parse a PDF file then write to a JSON file



// function pdfReader (filePath) {
//     const pdfParser = new PDFParser();

//         pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
//         pdfParser.on("pdfParser_dataReady", pdfData => {
//             // console.log(pdfData.Pages[0].Texts);
//             // console.log(typeof(pdfData));
//             const dataString = JSON.stringify(pdfData);
//             // console.log(dataString);
//             const parsed = JSON.parse(dataString);
//             console.log(parsed);
//             fs.writeFile("./demo.content.json", JSON.stringify(pdfData), ()=>{console.log('Done');});
//         });

//         pdfParser.loadPDF(filePath);
// }

// pdfReader(filePath);

// const dataString = JSON.stringify(data[0]);

// console.log(parsed._id);

// function pdfReader recieves the filePath of the pdf file and
// parse the file to a txt
// function pdfReader (filePath) {

//     const pdfParser = new PDFParser(this,1);
//     pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
//     pdfParser.on("pdfParser_dataReady", pdfData => {
//         fs.writeFile("./uploads/demo.content.txt", pdfParser.getRawTextContent(), ()=>{console.log("Done.");});
//     });

//     pdfParser.loadPDF(filePath);
// };

// read the txt file, containing the data from the pdf
// fs.readFile('./demo.content.json', 'utf-8', function (err, data) {
//     if (err) {
//         console.log(err);
//     } else {
//         // token the data in an Array of strings(lines)
//         const dataArray = data.split('\r\n');
//         readTokens(dataArray);
//     }
// });

// array of skills to match with the lines
// const skills = ['Python', 'SQL', 'Mongo', 'Angular'];
// let skillsList = [];

// function that process the array with the tokens and search for keywords
// function readTokens (dataArray) {

//     let relevantInformation = {};

//     for (const line of dataArray) {
//         if (line.includes("Celular")) {
//             relevantInformation.celphone = line.split(" ")[1].trim();
//         }
//         if (line.includes("Email:")) {
//             const begin = line.indexOf('Email:');
//             const last = line.lastIndexOf('Email:');
//             console.log(begin);
//             console.log(last);
//             relevantInformation.email = line.split(" ")[begin + 6].trim();
//         }
//     }

//     console.log(relevantInformation);
//     return relevantInformation;
// };

// export { pdfReader }
