import fs from "fs";
import PDFParser from "pdf2json";

function pdfReader (filePath) {

    const pdfParser = new PDFParser(this,1);
    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
    pdfParser.on("pdfParser_dataReady", pdfData => {
        fs.writeFile("./uploads/demo.content.txt", pdfParser.getRawTextContent(), ()=>{console.log("Done.");});
    });

    pdfParser.loadPDF(filePath);
};

fs.readFile('./uploads/demo.content.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        const dataArray = data.split('\r\n');
        readTokens(dataArray);
    }
});

const skills = ['Python', 'SQL', 'Mongo', 'Angular'];
let skillsList = [];

function readTokens (dataArray) {
    for (const line of dataArray) {
        for (const skill of skills) {
            if (line.includes(skill) === true && skillsList.includes(skill) === false) {
                skillsList.push(skill);
            }
        }
    }

    console.log(skillsList);
};

export { pdfReader }
