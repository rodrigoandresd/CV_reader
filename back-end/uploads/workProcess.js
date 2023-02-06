import { tokens } from "./automate";

let keys = [
    "work", "laboral"
];
let keys_stop = [
    "education",
    "skills",
    "academic",
    "experiencia",
    "habilidades"
];
// let values = {};

for (let i = 0; i < tokens.length;) {
    if (keys.includes(tokens[i]) && tokens[i + 1] === "experience") {
        let currentKey = tokens[i];
        let currentValue = "";
        i++;
        while (!keys.includes(tokens[i])) {
            currentValue += tokens[i] + " ";
            i++;
            if (i === tokens.length || keys_stop.includes(tokens[i])) {
                break;
            }
        }
        consultorObj[currentKey] = currentValue.trim();
    } else {
        i++;
    }
}
const jsonString = JSON.stringify(consultorObj);
fs.writeFile('./demo.json', jsonString, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('created');

    }
})
console.log(consultorObj);

