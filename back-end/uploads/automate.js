import fs from "fs";
import pdf from 'pdf-parse';
import natural from 'natural';
import sw from 'remove-stopwords';

let dataBuffer = fs.readFileSync('./CV_10.pdf');

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

    // const tokenizer = new natural.SentenceTokenizer();
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

    const phonePattern = RegExp(/\d{2}-\d{3}-\d{3}-\d{2}-\d{2}|\d{12}|\d{3}\s\d{3}\s\d{4}/);
    let phoneArray = phonePattern.exec(reducedContent);
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

    console.log(consultorObj);

    
    // const tokenizer = new natural.WordTokenizer();
    // const sentece = new natural.SentenceTokenizer();
    // const tokenizer_2 = new natural.WordPunctTokenizer();
    // const token_2 = (tokenizer.tokenize(content));

    // console.log(token_2);
    // console.log(sentece.tokenize(content));
    // console.log(tokenizer_2.tokenize(content));

    // let keys = ["NOMBRES", "APELLIDOS", "ESTADO", "TELEFONOS", "TITULO", "FECHA", "Email", "EXPERIENCE" ];
    // let values = {};

    // for (let i = 0; i < token_2.length;) {
    //     if (keys.includes(token_2[i])) {
    //         let currentKey = token_2[i];
    //         let currentValue = "";
    //         i++;
    //         while (!keys.includes(token_2[i])) {
    //             currentValue += token_2[i] + " ";
    //             i++;
    //             if (i === token_2.length) {
    //                 break;
    //             }
    //         }
    //         values[currentKey] = currentValue.trim();
    //     } else {
    //         i++;
    //     }
    // }
    // const jsonString = JSON.stringify(values);
    // fs.writeFile('./demo.json', jsonString, (err) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log('created');
        
    //     }
    // })
    // console.log(values);
};


