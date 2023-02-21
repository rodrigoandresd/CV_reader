// Searches for work experience in a given array of tokens and adds it to a consultant object.
// @param {object} consultorObj - The consultant object to add work experience to.
// @param {array} tokens - An array of strings to search for work experience.
// @returns {object} - The consultant object with added work experience, or with a default message if none was found.

// This function takes in an object containing information about a consultant and an array of tokens,
// and extracts the consultant's work experience from the tokens array.
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
    "workcation",
    "workcacion",
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
// Set a boolean flag to keep track of whether work experience has been found.
  let found_work = false;
  // Initialize an empty string to store the work section.
  let workSection = '';
  // Loop through the tokens array.
  for (let i = 0; i < tokens.length;) {
    // If the current token is a work section key and the next token is a work complement key or not a space:
    if (workSectionKeys.includes(tokens[i]) && (workComplementKeys.includes(tokens[i + 1]) || tokens[i + 1] !== ' ')) {
      // If work experience has not yet been found:
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
         // Trim the current value of the work section to remove any leading or trailing spaces.
        workSection = workCurrentValue.trim();
        workCurrentValue = processWorkSection(workSection);
        consultorObj['consultorWork'] = workCurrentValue;
        found_work = true;
      } else {
        // If work experience has already been found, move to the next token.
        i++;
      }
    } else {
      i++;
    }
  }
  // If no work experience was found, add a default message to the consultant object.
  if (!consultorObj.hasOwnProperty('consultorWork')) {
    consultorObj['consultorWork'] = ["Work not found"];
  }
  return consultorObj;
}

// This function takes in a string representing a section of work experience and processes it
// to extract the dates and information about each job or position.
function processWorkSection(totalWorkSection) {
  // Define a regular expression to search for dates
  const regex = /(\d{2}\/\d{4}|[A-Za-z]+\s*\d{4}|\w+\s*\/\s*\d{4})(\s*.\s*(\d{2}\/\d{4}|[A-Za-z]+\s*\d{4}|\w+\s*\/\s*\d{4}|Actualmente|([a-z]+)))?/g;// Expresión regular para buscar fechas en formato MM/YYYY
  let matchText = totalWorkSection.matchAll(regex);

  let result = [];
  let lastIndex = 0;
  let dateList = [];
  let infoList = [];

  for (let match of matchText) {
    let date = match[0];
    dateList.push(date);

    let info = totalWorkSection.slice(lastIndex, match.index).trim();
    infoList.push(info)
    lastIndex = match.index + date.length;
  }
  let lastInfo = totalWorkSection.substring(lastIndex).trim();
  infoList.push(lastInfo);
  infoList.shift(lastInfo);

  for (let i = 0; i < dateList.length; i++) {
    let date = dateList[i];
    let info = infoList[i];

    result.push({ dates: date, info: info });
  }
  if (result.length === 0) {
    result.push({dates: '', info: totalWorkSection});
  };
  return result;
}

export { getWork };


