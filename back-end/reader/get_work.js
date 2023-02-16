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

    // const dateFormats = [/\d{2}\/\d{4}\s-\s\d{2}\/\d{4}/]

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
            // Found a date, get the 4 following tokens as the date range
            const dateRange = tokens.slice(i+1, i+5).join(' ');
            currentSection.dates = [dateRange];
            i += 4;
            // Add the section to the array and create a new one
            currentSection.info = currentSection.info.trim();
            sections.push(currentSection);
            currentSection = { dates: [], info: '' };
          } else {
            // Not a date, add the token to the current section's info
            currentSection.info += token + ' ';
          }
          i++;
        }
        // Add the last section to the array
        currentSection.info = currentSection.info.trim();
        sections.push(currentSection);
        // Save the array of sections to the consultant object
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
