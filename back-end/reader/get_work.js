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
              processWorkSection(workSection);
          } else {
              i++;
          }
      } else {
          i++;
      }
  }



  // If no work experience was found, add a default message to the consultant object.
  // if (!consultorObj.hasOwnProperty('consultorWork')) {
  //   consultorObj['consultorWork'] = "Work not found";
  // }

  return consultorObj;
}

function processWorkSection (totalWorkSection) {
  
  const dateFormats = RegExp(/\d{4}/);
  let currentDate = '';

  const workTokens = totalWorkSection.split(/\s/);
  for (let i = 0; i < workTokens.length; i++) {
    let currentDateArray = dateFormats.exec(workTokens);
    if (currentDateArray[0]) {
      // console.log(currentDateArray[0]);
      // console.log('inside the if');
      currentDate = currentDateArray[0] + " " + currentDateArray[1] + " " + currentDateArray[2];
      console.log('THE CURRENT DATE IS' + currentDate);
      break;
    }
  }
}


export { getWork };
