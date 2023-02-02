import fs from "fs";
import pdf from 'pdf-parse';
import natural from 'natural';

let dataBuffer = fs.readFileSync('./CV_2.pdf');

pdf(dataBuffer).then(function (data) {
    const content = data.text;
    processData(content);
}).catch(e => {
    console.log(e);
});

async function processData (content) {
    console.log(content);
};
