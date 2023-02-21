import fs from 'fs';
import { getName, getEmail, getPhone } from "./get_personal_data.js";
import { getAcademic } from './get_academic.js';
import { getWork } from './get_work.js';
import { getSkills } from './get_skills.js';

// Process the content extracted from the PDF file and writes a JSON file with the extracted information.
// @param {string} content - The content extracted from the PDF file.
// @returns {void}


async function processData(content) {

    // Transform the content to lowercase, normalize and replace all colons with spaces
    const lowerCaseContent = content.toLowerCase();
    const normalizeContent = lowerCaseContent.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const finalContent = normalizeContent.replace(/:/g, ' ');

    // Split the content into an array of tokens
    const tokens = finalContent.split(/[\s\r\n]/).filter(token => token.trim() !== '');

    let consultorObj = {};

    // Extract the name, email, phone, academic, work, and skills data from the tokens
    consultorObj['id'] = 1; //Jsonserver requirement, must be changed at the time of implementation
    consultorObj = getName(consultorObj, tokens);
    consultorObj = getEmail(consultorObj, tokens);
    consultorObj = getPhone(consultorObj, tokens);
    consultorObj = getAcademic(consultorObj, tokens);
    consultorObj = getWork(consultorObj, tokens);
    consultorObj = getSkills(consultorObj, tokens);

    // Create a JSON file with the extracted information
    let consultorData = JSON.stringify({"consultor": [consultorObj]});

    fs.writeFile('../talanreader-web/server/demo.json', consultorData, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Json created at process data');
        }
    });
    console.log(consultorObj);
};

export { processData };
