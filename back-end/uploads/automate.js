import fs from "fs";
import pdf from 'pdf-parse';
import natural from 'natural';
import sw from 'remove-stopwords';



let dataBuffer = fs.readFileSync('./CV_1.pdf');

pdf(dataBuffer).then(function (data) {
    const content = data.text;
    processData(content);
}).catch(e => {
    console.log(e);
});


async function processData(content) {

    // console.log(content);
    const lowerCaseContent = content.toLowerCase();
    const normalizeContent = lowerCaseContent.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const tokens = normalizeContent.split(/[\s\r\n]/);
    // const tokenizer = new natural.SentenceTokenizer();
    // const sentenceTokens = tokenizer.tokenize(normalizeContent);
    // console.log(sentenceTokens);
    
    let consultorObj = {};
    const emailPattern = RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}/);
    let emailArray = emailPattern.exec(tokens);
    if (emailArray) {
        const consultorEmail = emailArray[0];
        consultorObj['consultorEmail'] = consultorEmail;
    } else {
        consultorObj['consultorEmail'] = 'No email found';
    }


    const phonePattern = RegExp(/[\+\(]?\d{2,3}\)?[\s-\.]*\d{3}[\s-\.]*\d{4}[\s-\.]*\d{3}/g);
    // const phonePattern = RegExp(/[\+\(]?\d{2,3}[\)]?[\s-]?\d*[-\s.]?\d*[-\s.]?\d*[-\s.]?\d*/g);
    let phoneArray = phonePattern.exec(tokens);

    if (phoneArray) {
        const consultorPhone = phoneArray[0];
        consultorObj['consultorPhone'] = consultorPhone;
    } else {
        consultorObj['consultorPhone'] = 'No phone found';
    }

    const namePattern = RegExp(/\b[A-Z][a-z]+\s[A-Z][a-z]+?\s[A-Z][a-z]+?\s[A-Z][a-z]+\b/);
    let nameArray = namePattern.exec(tokens);
    if (nameArray) {
        const consultorName = nameArray[0];
        consultorObj['consultorName'] = consultorName;
    } else {
        consultorObj['consultorName'] = 'No name found';
    }

    let eduSectionKeys = [
        "education",
        "academic"
    ];
    let eduComplementKeys = [
        'experience',
    ];

    let eduKeysStop = [
        "skills",
        "habilidades",
        "references",
        "work",
        "laboral",
        "fields",
        "job",
        "technical"
    ];
    // let values = {};
    
    for (let i = 0; i < tokens.length;) {
        if (eduSectionKeys.includes(tokens[i]) && (eduComplementKeys.includes(tokens[i + 1]) || tokens[i + 1] !== ' ')) {
            // let currentKey = tokens[i];
            let eduCurrentValue = "";
            i++;
            while (!eduKeysStop.includes(tokens[i])) {
                eduCurrentValue += tokens[i] + " ";
                i++;
                if (i === tokens.length || eduKeysStop.includes(tokens[i])) {
                    break;
                }
            }
            consultorObj['consultorAcademic'] = eduCurrentValue.trim();
        } else {
            i++;
        }
    }
    
    let workSectionKeys = [
        "work",
        "laboral",
        "fields",
        "job"
    ];
    let workComplementKeys = [
        'experience',
        'of'
    ];

    let workKeysStop = [
        "education",
        "skills",
        "academic",
        "habilidades",
        "references"
    ];
    // let values = {};
    
    for (let i = 0; i < tokens.length;) {
        if (workSectionKeys.includes(tokens[i]) && (workComplementKeys.includes(tokens[i + 1]) || tokens[i + 1] !== ' ')) {
            // let currentKey = tokens[i];
            let currentValue = "";
            i++;
            while (!workKeysStop.includes(tokens[i])) {
                currentValue += tokens[i] + " ";
                i++;
                if (i === tokens.length || workKeysStop.includes(tokens[i])) {
                    break;
                }
            }
            consultorObj['consultorWorkExperience'] = currentValue.trim();
        } else {
            i++;
        }
    }
    let consultorData = JSON.stringify(consultorObj);

    fs.writeFileSync('../../talanreader-web/src/app/demo.json', consultorData, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('file created');
        }
});
    console.log(consultorObj);
};


    // const tokenizer = new natural.WordTokenizer();
    // const sentenceTokens = tokenizer.tokenize(reducedContent);

    //console.log(consultorObj);


    // const tokenizer = new natural.WordTokenizer();
    // const token_2 = (tokenizer.tokenize(content));

    // console.log(token_2);
    // console.log(sentece.tokenize(content));
    // console.log(tokenizer_2.tokenize(content));


