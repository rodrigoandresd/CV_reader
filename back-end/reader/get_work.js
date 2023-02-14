function getWork (consultorObj, tokens) {

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

    return consultorObj;
};

export { getWork };