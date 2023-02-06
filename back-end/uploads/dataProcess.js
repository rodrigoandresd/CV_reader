import { tokens } from "./automate.js";
let consultorObj = {};
const emailPattern = RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}/);
let emailArray = emailPattern.exec(tokens);
if (emailArray) {
    const consultorEmail = emailArray[0];
    consultorObj['email'] = consultorEmail;
} else {
    consultorObj['email'] = 'No email found';
}


const phonePattern = RegExp(/[\+\(]?\d{2,3}\)?[\s-\.]*\d{3}[\s-\.]*\d{4}[\s-\.]*\d{3}/g);
// const phonePattern = RegExp(/[\+\(]?\d{2,3}[\)]?[\s-]?\d*[-\s.]?\d*[-\s.]?\d*[-\s.]?\d*/g);
let phoneArray = phonePattern.exec(tokens);

// console.log(lowerCaseContent);
if (phoneArray) {
    const consultorPhone = phoneArray[0];
    consultorObj['phone'] = consultorPhone;
} else {
    consultorObj['phone'] = 'No phone found';
}

const namePattern = RegExp(/\b[A-Z][a-z]+\s[A-Z][a-z]+?\s[A-Z][a-z]+?\s[A-Z][a-z]+\b/);
let nameArray = namePattern.exec(tokens);
if (nameArray) {
    const consultorName = nameArray[0];
    consultorObj['ConsultorName'] = consultorName;
} else {
    consultorObj['ConsultorName'] = 'No name found';
}
console.log(consultorObj)
