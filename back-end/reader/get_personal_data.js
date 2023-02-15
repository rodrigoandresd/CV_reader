// Extracts the name of the consultant from the given tokens using a regular expression.
// * @param {object} consultorObj - Object containing the consultant's data.
// * @param {string[]} tokens - Array of tokens extracted from the resume.
// * @returns {object} - Object containing the consultant's data, with the name property added.


function getName(consultorObj, tokens) {

    const nameSectionKeys = [
        "nombre",
        "nombres",
        "name",
        "names",
        "candidato",
    ];

    // Define stop keys to stop searching for other information
    const nameKeysStop = [
        "perfil",
        "profile",
        "skills",
        "habilidades",
        "references",
        "referencias",
        "work",
        "fields",
        "conocimientos",
        "job",
        "abilities",
        "idiomas",
        "languajes"
    ];

    let found_name = false;
    for (let i = 0; i < tokens.length;) {
        if (nameSectionKeys.includes(tokens[i])) {
            if (!found_name) {
                // If the keywords are found and work experience has not been added yet, extract the work experience value and add it to the consultant object.
                let nameCurrentValue = "";
                i++;
                let count = 0;  // Add a count variable to keep track of the number of tokens
                while (!nameKeysStop.includes(tokens[i])) {
                    nameCurrentValue += tokens[i] + " ";
                    i++;
                    count++;  // Increment the count variable
                    if (count >= 4 || i === tokens.length || nameKeysStop.includes(tokens[i])) {  // Stop the loop when count >= 4
                        break;
                    }
                }
                consultorObj['consultorName'] = nameCurrentValue.trim();
                found_name = true;
            } else {
                i++;
            }
        } else {
            i++;
        }
    }
    // If no name section was found, add the first four tokens to the consultant object.
    if (!found_name) {
        let nameCurrentValue = "";
        for (let i = 0; i < 4 && i < tokens.length; i++) {
            nameCurrentValue += tokens[i] + " ";
        }
        consultorObj['consultorName'] = nameCurrentValue.trim();
    }
    // If no work experience was found, add a default message to the consultant object.
    if (!consultorObj.hasOwnProperty('consultorName')) {
        consultorObj['consultorName'] = "Name not found";
    }

    return consultorObj;
};

// Extracts the email of the consultant from the given tokens using a regular expression.
//  * @param {object} consultorObj - Object containing the consultant's data.
//  * @param {string[]} tokens - Array of tokens extracted from the resume.
//  * @returns {object} - Object containing the consultant's data, with the email property added.

function getEmail(consultorObj, tokens) {

    const emailPattern = RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}/);
    let emailArray = emailPattern.exec(tokens);
    if (emailArray) {
        const consultorEmail = emailArray[0];
        consultorObj['consultorEmail'] = consultorEmail;
    } else {
        consultorObj['consultorEmail'] = 'No email found';
    };

    return consultorObj;
};

// * Extracts the phone number of the consultant from the given tokens using a regular expression.
// * @param {object} consultorObj - Object containing the consultant's data.
// * @param {string[]} tokens - Array of tokens extracted from the resume.
// * @returns {object} - Object containing the consultant's data, with the phone property added.

function getPhone(consultorObj, tokens) {

    const phonePattern = /[\+\(]?\d{2,3}\)?[\s-\.]*\d{3}[\s-\.]*\d{4}[\s-\.]*\d{3}/g;
    let phoneArray = phonePattern.exec(tokens);
    if (phoneArray) {
        const consultorPhone = phoneArray[0];
        consultorObj['consultorPhone'] = consultorPhone;
    } else {
        const eightDigitsPattern = /\d{8}/g;
        let eightDigitsArray = eightDigitsPattern.exec(tokens);
        if (eightDigitsArray) {
            const consultorPhone = eightDigitsArray[0];
            consultorObj['consultorPhone'] = consultorPhone;
        } else {
            consultorObj['consultorPhone'] = 'No phone found';
        }
    }

    return consultorObj;
};

export { getName, getEmail, getPhone };
