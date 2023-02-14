function getAcademic (consultorObj, tokens) {

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

    return consultorObj;

};

export { getAcademic };