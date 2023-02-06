import fs from "fs";
import pdf from 'pdf-parse';
import natural from 'natural';
import sw from 'remove-stopwords';



let dataBuffer = fs.readFileSync('./CV_2.pdf');

pdf(dataBuffer).then(function (data) {
    const content = data.text;
    processData(content);
}).catch(e => {
    console.log(e);
});

async function processData (content) {

    // console.log(content);
    const lowerCaseContent = content.toLowerCase();
    const tokens = lowerCaseContent.split(/[\s\r\n]/);
    const arrayRemoved = sw.removeStopwords(tokens);
    const reducedContent = arrayRemoved.join(' ');


    // const tokenizer = new natural.WordTokenizer();
    // const sentenceTokens = tokenizer.tokenize(reducedContent);

    let consultorObj = {};
    const emailPattern = RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}/);
    let emailArray = emailPattern.exec(reducedContent);
    if (emailArray) {
        const consultorEmail = emailArray[0];
        consultorObj['email'] = consultorEmail;
    } else {
        consultorObj['email'] = 'No email found';
    }


    const phonePattern = RegExp(/[\+\(]?\d{2,3}\)?[\s-\.]*\d{3}[\s-\.]*\d{4}[\s-\.]*\d{3}/g);
    // const phonePattern = RegExp(/[\+\(]?\d{2,3}[\)]?[\s-]?\d*[-\s.]?\d*[-\s.]?\d*[-\s.]?\d*/g);
    let phoneArray = phonePattern.exec(lowerCaseContent);

    // console.log(lowerCaseContent);
    if (phoneArray) {
        const consultorPhone = phoneArray[0];
        consultorObj['phone'] = consultorPhone;
    } else {
        consultorObj['phone'] = 'No phone found';
    }

    const namePattern = RegExp(/\b[A-Z][a-z]+\s[A-Z][a-z]+?\s[A-Z][a-z]+?\s[A-Z][a-z]+\b/);
    let nameArray = namePattern.exec(content);
    if (nameArray) {
        const consultorName = nameArray[0];
        consultorObj['ConsultorName'] = consultorName;
    } else {
        consultorObj['ConsultorName'] = 'No name found';
    }

    //console.log(consultorObj);


    // const tokenizer = new natural.WordTokenizer();
    // const token_2 = (tokenizer.tokenize(content));

    // console.log(token_2);
    // console.log(sentece.tokenize(content));
    // console.log(tokenizer_2.tokenize(content));

    let keys = ["experience", "education", "skills", "educacion", "experiencia", "habilidades"];
    // let values = {};

    for (let i = 0; i < tokens.length;) {
        if (keys.includes(tokens[i])) {
            let currentKey = tokens[i];
            let currentValue = "";
            i++;
            while (!keys.includes(tokens[i])) {
                currentValue += tokens[i] + " ";
                i++;
                if (i === tokens.length) {
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
};


