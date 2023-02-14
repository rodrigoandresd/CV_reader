function getSkills (consultorObj, tokens) {

    let skillsSectionKeys = [
        "skills",
        "habilidades",
        "abilities",
        "conocimientos",
        "competencias",
        "lenguajes"
    ];

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
    };

    return consultorObj;
};

export { getSkills };