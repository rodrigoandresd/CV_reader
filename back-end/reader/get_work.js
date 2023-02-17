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

  let found_work = false;
  let workSection = '';
  for (let i = 0; i < tokens.length;) {
    if (workSectionKeys.includes(tokens[i]) && (workComplementKeys.includes(tokens[i + 1]) || tokens[i + 1] !== ' ')) {
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
        workSection = workCurrentValue.trim();
        found_work = true;
        workCurrentValue = processWorkSection(workSection);
        consultorObj['consultorWork'] = workCurrentValue;
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
    consultorObj['consultorWork'] = ["Work not found"];
  }
  return consultorObj;
}


function processWorkSection(totalWorkSection) {

  const regex = /\d{2}\/\d{4}(?:\s*.\s*\d{2}\/\d{4})?/g;// Expresión regular para buscar fechas en formato MM/YYYY
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


