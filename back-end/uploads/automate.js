import fs from "fs";
import pdf from 'pdf-parse';
import natural from 'natural';

let dataBuffer = fs.readFileSync('./CV_1.pdf');

pdf(dataBuffer).then(function (data) {
    const content = data.text;
    processData(content);
}).catch(e => {
    console.log(e);
});

async function processData (content) {
    const tokenizer = new natural.WordTokenizer();
    // const sentece = new natural.SentenceTokenizer();
    // const tokenizer_2 = new natural.WordPunctTokenizer();
    const token_2 = (tokenizer.tokenize(content));

    console.log(token_2);
    // console.log(sentece.tokenize(content));
    // console.log(tokenizer_2.tokenize(content));

    let keys = ["NOMBRES", "APELLIDOS", "ESTADO", "TELEFONOS", "TITULO", "FECHA", "Email", "EXPERIENCE" ];
    let values = {};

    for (let i = 0; i < token_2.length; i++) {
        if (keys.includes(token_2[i])) {
            let currentKey = token_2[i];
            let currentValue = "";
            i++;
            while (!keys.includes(token_2[i])) {
                currentValue += token_2[i] + " ";
                i++;
                if (i === token_2.length) {
                    break;
                }
            }
            values[currentKey] = currentValue.trim();
        }
    }
    // const jsonString = JSON.stringify(values);
    // fs.writeFile('./demo.json', jsonString, (err) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log('created');
        
    //     }
    // })
    console.log(values);
};


