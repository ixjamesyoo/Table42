export const relevantHashSubstring = (hashString, filterType) => {
  return hashString.includes(filterType) ?
    hashString.slice(1).split("&").filter(substring => {
      return substring.startsWith(filterType);
    })[0] : "";
    // e.g "some_key=1+2+3" or ""
};

export const parseSelections = hashSubstring => {
  return hashSubstring ?
    hashSubstring.split("=")[1].split("+") : [];
    // these are strings i.e "1", "2"
};

export const optionCheckedStatus = (choicesArray, checkedInputs) => {
  let soln = {};
  choicesArray.forEach((choice) => {
      soln[choice] = checkedInputs.includes(
        (choicesArray.indexOf(choice) + 1).toString()
      ) ? true : false;
  });
  return soln;
};

export const modifyCheckedInputsArray = (checkedInputs, target, choicesArray) => {
  if (target.checked) {
    checkedInputs.push(
      (choicesArray.indexOf(target.value) + 1).toString()
      );
    return checkedInputs;
  } else {
    const idx = checkedInputs.indexOf(
      (choicesArray.indexOf(target.value) + 1).toString()
    );
    // debugger
    return checkedInputs.slice(0, idx).concat(checkedInputs.slice(idx+1));
  }
};

export const createNewHashString = (oldHashString, filterType, newCheckedInputs) => {

  if (oldHashString.includes(filterType)){
    const oldHashSubstring = relevantHashSubstring(oldHashString, filterType);
    const newHashSubstring = newCheckedInputs.length ?
      `${filterType}=${newCheckedInputs.join("+")}` : "";

    const newHashString = oldHashString.includes(`&${oldHashSubstring}`) &&
      (newHashSubstring === "") ?
      oldHashString.replace(`&${oldHashSubstring}`, newHashSubstring) :
      oldHashString.replace(oldHashSubstring, newHashSubstring);

    return newHashString.startsWith("#&") ?
      newHashString.replace("#&", "#") :
      newHashString;
  } else {
      if (oldHashString === ""){
        return `#${filterType}=${newCheckedInputs.join("+")}`;
      } else {
        return `${oldHashString}&${filterType}=${newCheckedInputs.join("+")}`;
      }
  }
};
