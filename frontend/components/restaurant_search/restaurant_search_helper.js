export const parseText = (text) => {
  return text.replace(/\s?[, ]\s?/g, "+");
};
