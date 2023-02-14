
// Extracts the academic section from the resume content and adds it to the consultorObj object.
// @param {Object} consultorObj - The object containing the resume data for the consultant.
//  * @param {Array} tokens - An array of strings obtained from parsing the resume content.
//  * @returns {Object} - The updated object containing the academic data.


function getAcademic (consultorObj, tokens) {

    // Define academic section keys to look for in the token array
    const eduSectionKeys = [
        "formacion",
        "education",
        "academic",
        "academica",
        "estudios",
        "instruccion",
        "capacitacion",
    ];

    // Define academic section complement keys
    const eduComplementKeys = [
        'experiencia',
        "educativa",
        "academica",
        "formal",
        " "
    ];

    // Define stop keys to stop searching for academic information
    const eduKeysStop = [
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

    // Iterate over the token array and look for the academic section
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

    // If academic information is not found, set a default value
    if (!consultorObj.hasOwnProperty('consultorAcademic')) {
        consultorObj['consultorAcademic'] = "Education not found";
    }

    return consultorObj;

};

export { getAcademic };