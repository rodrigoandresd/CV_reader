// Extracts the name of the consultant from the given tokens using a regular expression.
// * @param {object} consultorObj - Object containing the consultant's data.
// * @param {string[]} tokens - Array of tokens extracted from the resume.
// * @returns {object} - Object containing the consultant's data, with the name property added.


function getName (consultorObj, tokens) {

    const namePattern = RegExp(/\b[A-Z][a-z]+\s[A-Z][a-z]+?\s[A-Z][a-z]+?\s[A-Z][a-z]+\b/);
    let nameArray = namePattern.exec(tokens);
    if (nameArray) {
        const consultorName = nameArray[0];
        consultorObj['consultorName'] = consultorName;
    } else {
        consultorObj['consultorName'] = 'No name found';
    }

    return consultorObj;
}

// Extracts the email of the consultant from the given tokens using a regular expression.
//  * @param {object} consultorObj - Object containing the consultant's data.
//  * @param {string[]} tokens - Array of tokens extracted from the resume.
//  * @returns {object} - Object containing the consultant's data, with the email property added.

function getEmail (consultorObj, tokens) {

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

function getPhone (consultorObj, tokens) {

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