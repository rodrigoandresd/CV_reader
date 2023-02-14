
// * This function extracts the skills section from the resume by looking for 
// * relevant keywords in the tokenized resume text.
// *
// * @param {Object} consultorObj - The consultant object to which the extracted 
// * skills will be added.
// * @param {Array} tokens - The tokenized text of the consultant's resume.
// * @returns {Object} - The updated consultant object.


function getSkills (consultorObj, tokens) {

    // Define an array of keywords that indicate the skills section of the resume.
    const skillsSectionKeys = [
        "skills",
        "habilidades",
        "abilities",
        "conocimientos",
        "competencias",
        "lenguajes"
    ];

    // Define an array of keywords that indicate the end of the skills section.
    const skillsKeysStop = [
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

    // Define an array of keywords that should be ignored.
    const ignoreSkills = [
        "soft",
        "for",
    ]

    // Loop through each token in the tokenized text and check if it matches any of 
    // the skills section keywords. If a match is found, the function extracts the 
    // skills section by appending tokens until it reaches the end of the skills section.
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