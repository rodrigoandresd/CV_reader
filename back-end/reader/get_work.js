// Searches for work experience in a given array of tokens and adds it to a consultant object.
// @param {object} consultorObj - The consultant object to add work experience to.
// @param {array} tokens - An array of strings to search for work experience.
// @returns {object} - The consultant object with added work experience, or with a default message if none was found.

function getWork(consultorObj, tokens) {
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

    const dateFormats = [
      /\d{1,2}\/\d{4}/ // MM/YYYY
    ];

    let found_work = false;
    for (let i = 0; i < tokens.length;) {
      if (workSectionKeys.includes(tokens[i]) && workComplementKeys.includes(tokens[i + 1])) {
        if (!found_work) {
          let sections = [];
          let currentSection = { dates: [], info: '' };
          i += 2;
          while (!workKeysStop.includes(tokens[i]) && i < tokens.length) {
            const token = tokens[i];
            const date = dateFormats.find(format => format.test(token));
            if (date) {
              // Se encontró una fecha, agregar la sección actual al array y crear una nueva sección
              currentSection.info = currentSection.info.trim();
              sections.push(currentSection);
              currentSection = { dates: [date.exec(token)[0]], info: '' };
            } else {
              // No es una fecha, agregar el token a la información de la sección actual
              currentSection.info += token + ' ';
            }
            i++;
          }
          // Agregar la última sección al array
          currentSection.info = currentSection.info.trim();
          sections.push(currentSection);
          // Guardar el array de secciones en el objeto de consultor
          consultorObj['consultorWork'] = sections;
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
  }

export { getWork };
