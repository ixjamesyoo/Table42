export const relevantHashSubstring = (hashString, filterType) => {
  return hashString.includes(filterType) ?
    hashString.slice(1).split("&").filter(substring => {
      return substring.startsWith(filterType);
    })[0] : "";
};

export const parseSelections = hashSubstring => {
  return hashSubstring ?
    hashSubstring.split("=")[1].split("+") : [];
};

export const optionCheckedStatus = (choicesArray, checkedInputs) => {
  let soln = {};
  choicesArray.forEach((choice) => {
      soln[choice] = checkedInputs.includes(choice) ? true : false;
  });
  return soln;
};

export const modifyCheckedInputsArray = (checkedInputs, target) => {
  if (target.checked) {
    checkedInputs.push(target.value);
    return checkedInputs;
  } else {
    const idx = checkedInputs.indexOf(target.value);
    // debugger
    return checkedInputs.slice(0, idx).concat(checkedInputs.slice(idx+1));
  }
};

export const createNewHashString = (oldHashString, filterType, newCheckedInputs) => {
  if (oldHashString.includes(filterType)){
    const oldHashSubstring = relevantHashSubstring(oldHashString, filterType);
    const newHashSubstring = newCheckedInputs.length ?
      `${filterType}=${newCheckedInputs.join("+")}` : "";
    debugger
    return oldHashString.replace(oldHashSubstring, newHashSubstring);
  } else {
      if (oldHashString === ""){
        return `#${filterType}=${newCheckedInputs.join("+")}`;
      } else {
        return `${oldHashString}&${filterType}=${newCheckedInputs.join("+")}`;
      }
  }
};
