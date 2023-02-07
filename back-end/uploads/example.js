import fs from "fs";
import pdf from 'pdf-parse';
import natural from 'natural';
import sw from 'remove-stopwords';

let dataBuffer = fs.readFileSync('./CV_1.pdf');

pdf(dataBuffer).then(function (data) {
    const content = data.text;
    processData(content).then((tokens) => {
        exports.tokens = tokens;
    });
}).catch(e => {
    console.log(e);
});

async function processData(content) {

    // console.log(content);
    const lowerCaseContent = content.toLowerCase();
    const normalizeContent = lowerCaseContent.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const tokens = normalizeContent.split(/[\s\r\n]/);
    return Promise.resolve(tokens);
};

export { tokens };

    // const tokenizer = new natural.WordTokenizer();
    // const sentenceTokens = tokenizer.tokenize(reducedContent);

    //console.log(consultorObj);


    // const tokenizer = new natural.WordTokenizer();
    // const token_2 = (tokenizer.tokenize(content));

    // console.log(token_2);
    // console.log(sentece.tokenize(content));
    // console.log(tokenizer_2.tokenize(content));
