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
  let sections = [];
  let currentSection = { dates: [], info: '' };

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const date = dateFormats.find(format => format.test(token));
    if (date) {
      // Found a date, get the 4 following tokens as the date range
      const dateRange = tokens.slice(i+1, i+5).slice(0, 4);
      currentSection.dates = dateRange;
      i += 4;
      // Add the section to the array and create a new one
      currentSection.info = currentSection.info.trim();
      sections.push(currentSection);
      currentSection = { dates: [], info: '' };
    } else if (workSectionKeys.includes(token) && workComplementKeys.includes(tokens[i + 1])) {
      if (!found_work) {
        found_work = true;
        i += 2;
      } else {
        // Add the previous section to the array and create a new one
        currentSection.info = currentSection.info.trim();
        sections.push(currentSection);
        currentSection = { dates: [], info: '' };
        i += 2;
      }
    } else if (workKeysStop.includes(token)) {
      // Add the last section to the array
      currentSection.info = currentSection.info.trim();
      sections.push(currentSection);
      break;
    } else {
      // Not a date or work key, add the token to the current section's info
      currentSection.info += token + ' ';
    }
  }

  // If no work experience was found, add a default message to the consultant object.
  if (sections.length === 0) {
    consultorObj['consultorWork'] = "Work experience not found";
  } else {
    consultorObj['consultorWork'] = sections;
  }

  return consultorObj;
}


export { getWork };
