export const parseQuery = (string) => {
  const queryPairs = string.split("&");

  let result = {};
  queryPairs.forEach( (pair) => {
    pair = pair.split("=");
    result[pair[0]] = pair[1];
  });
  return result;
};
