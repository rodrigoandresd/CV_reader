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
    const finalContent = normalizeContent.replace(/:/g, ' ');
    const tokens = finalContent.split(/[\s\r\n]/).filter(token => token.trim() !== '');
    // const tokenizer = new natural.SentenceTokenizer();
    // const sentenceTokens = tokenizer.tokenize(normalizeContent);
    // console.log(finalContent);

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
        "formacion",
        "education",
        "academic",
        "academica",
        "estudios",
        "instruccion",
        "capacitacion",
    ];
    let eduComplementKeys = [
        'experiencia',
        "educativa",
        "academica",
        "formal",
        " "
    ];

    let eduKeysStop = [
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

    let found_edu = false;
    for (let i = 0; i < tokens.length;) {
        if (eduSectionKeys.includes(tokens[i]) && (eduComplementKeys.includes(tokens[i + 1]) || tokens[i + 1] !== ' ')) {
            if (!found_edu) {
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
                found_edu = true;
            } else {
                i++;
            }
        } else {
            i++;
        }
    }
    if (!consultorObj.hasOwnProperty('consultorAcademic')) {
        consultorObj['consultorAcademic'] = "Education not found";
    }

    let workSectionKeys = [
        "work",
        "laboral",
        "fields",
        "job",
        "experiencia"
    ];
    let workComplementKeys = [
        "experience",
        "experiencia",
        "of",
        "profesional",
        "laboral"
    ];

    let workKeysStop = [
        "education",
        "educacion",
        "academic",
        "academica",
        "habilidades",
        "references",
        "referencias",
        "skills",
        "habilidades",
        "conocimientos",
        "idiomas",
        "languajes",
        "cursos",
    ];


    let found_work = false;
    for (let i = 0; i < tokens.length;) {
        if (workSectionKeys.includes(tokens[i]) && (workComplementKeys.includes(tokens[i + 1]))) {
            if (!found_work) {
                let workCurrentValue = "";
                i++;
                while (!workKeysStop.includes(tokens[i])) {
                    workCurrentValue += tokens[i] + " ";
                    i++;
                    if (i === tokens.length || workKeysStop.includes(tokens[i])) {
                        break;
                    }
                }
                consultorObj['consultorWork'] = workCurrentValue.trim();
                found_work = true;
            } else {
                i++;
            }
        } else {
            i++;
        }
    }
    if (!consultorObj.hasOwnProperty('consultorWork')) {
        consultorObj['consultorWork'] = "Work experience not found";
    }

    let skillsSectionKeys = [
        "skills",
        "habilidades",
        "abilities",
        "conocimientos",
        "competencias",
        "lenguajes"
    ];
    // let skillsComplementKeys = [
    //     "experience",
    //     "experiencia",
    //     "of",
    //     "profesional",
    //     "laboral"
    // ];

    let skillsKeysStop = [
        "education",
        "educacion",
        "academic",
        "academica",
        "references",
        "referencias",
        "conocimientos",
        "idiomas",
        "languajes",
        "cursos",
        "work",
        "achievements",
        "personales",
        "laboral"
    ];

    let ignoreSkills = [
        "soft",
        "for",
    ]

    let found_skills = false;
    for (let i = 0; i < tokens.length;) {
        if (skillsSectionKeys.includes(tokens[i]) && (!ignoreSkills.includes(tokens[i + 1]))) {
            if (!found_skills) {
                let skillsCurrentValue = "";
                i++;
                while (!skillsKeysStop.includes(tokens[i])) {
                    skillsCurrentValue += tokens[i] + " ";
                    i++;
                    if (i === tokens.length || skillsKeysStop.includes(tokens[i])) {
                        break;
                    }
                }
                consultorObj['consultorSkills'] = skillsCurrentValue.trim();
                found_skills = true;
            } else {
                i++;
            }
        } else {
            i++;
        }
    }
    if (!consultorObj.hasOwnProperty('consultorSkills')) {
        consultorObj['consultorSkills'] = "Skills not found";
    }

    let consultorData = JSON.stringify({"consultor": consultorObj});

    fs.writeFileSync('../../talanreader-web/server/demo.json', consultorData, (err) => {
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



