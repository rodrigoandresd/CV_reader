import fs from "fs";
import pdf from 'pdf-parse';
import { processData } from "./process_data.js";


function reader (filePath) {

    let dataBuffer = fs.readFileSync(filePath);

    pdf(dataBuffer).then(function (data) {
        const content = data.text;
        processData(content);
    }).catch(e => {
        console.log(e);
    });
};

export { reader };
