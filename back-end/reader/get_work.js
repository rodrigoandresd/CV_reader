// Searches for work experience in a given array of tokens and adds it to a consultant object.
// @param {object} consultorObj - The consultant object to add work experience to.
// @param {array} tokens - An array of strings to search for work experience.
// @returns {object} - The consultant object with added work experience, or with a default message if none was found.

function getWork (consultorObj, tokens) {

    // Define arrays of keys to look for in the tokens array.
    const workSectionKeys = [
        "work",
        "laboral",
        "fields",
        "job",
        "experiencia"
    ];

    const workComplementKeys = [
        "experience",
        "experiencia",
        "of",
        "profesional",
        "laboral"
    ];

    const workKeysStop = [
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

    // Use a for loop to search for the work experience keywords in the tokens array.
    let found_work = false;
    for (let i = 0; i < tokens.length;) {
        if (workSectionKeys.includes(tokens[i]) && (workComplementKeys.includes(tokens[i + 1]))) {
            if (!found_work) {
                // If the keywords are found and work experience has not been added yet, extract the work experience value and add it to the consultant object.
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
    // If no work experience was found, add a default message to the consultant object.
    if (!consultorObj.hasOwnProperty('consultorWork')) {
        consultorObj['consultorWork'] = "Work experience not found";
    }

    return consultorObj;
};

export { getWork };