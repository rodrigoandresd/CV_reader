// Extracts the name of the consultant from the given tokens using a regular expression.
// * @param {object} consultorObj - Object containing the consultant's data.
// * @param {string[]} tokens - Array of tokens extracted from the resume.
// * @returns {object} - Object containing the consultant's data, with the name property added.


function getName(consultorObj, tokens) {

    const nameSectionKeys = [
        "nombre",
        "name",
        "candidato",
    ];

    // Define name section complement keys
    const nameComplementKeys = [
        " "
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
    for (let i = 0; i < tokens.length && i < 4;) {
        if (nameSectionKeys.includes(tokens[i]) && (nameComplementKeys.includes(tokens[i + 1]) || tokens[i + 1] !== ' ')) {
            if (!found_name) {
                let nameCurrentValue = "";
                i++;
                let count = 0;
                while (!nameKeysStop.includes(tokens[i])) {
                    nameCurrentValue += tokens[i] + " ";
                    i++;
                    count++;
                    if (i === tokens.length || nameKeysStop.includes(tokens[i])) {
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
    if (!consultorObj.hasOwnProperty('consultorName')) {
        const namePattern = RegExp(/\b[a-z]+\s[a-z]+?\s[a-z]+?\s[a-z]+\b/);
        let nameArray = namePattern.exec(tokens);
        if (nameArray) {
            const consultorName = nameArray[0];
            consultorObj['consultorName'] = consultorName;
        } else {
            consultorObj['consultorName'] = 'No name found';
        }
    }
    return consultorObj;
}

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

    const phonePattern = RegExp(/[\+\(]?\d{2,3}\)?[\s-\.]*\d{3}[\s-\.]*\d{4}[\s-\.]*\d{3}/g);
    let phoneArray = phonePattern.exec(tokens);
    if (phoneArray) {
        const consultorPhone = phoneArray[0];
        consultorObj['consultorPhone'] = consultorPhone;
    } else {
        consultorObj['consultorPhone'] = 'No phone found';
    };

    return consultorObj;
};

export { getName, getEmail, getPhone };