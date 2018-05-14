import React from "react";

export const PRICE_OPTIONS = ["$", "$$", "$$$", "$$$$"];
export const CUISINE_OPTIONS = [
  "American",
  "Asian",
  "Chinese",
];
// "French",
// "Indian",
// "Italian",
// "Mediterranean",
// "Seafood",
// "Sushi",
// "Steakhouse",
// "Spanish"

export const parseQuery = (string) => {
  const queryPairs = string.split("&");

  let result = {};
  queryPairs.forEach( (pair) => {
    pair = pair.split("=");
    result[pair[0]] = pair[1];
  });
  return result;
};

export const dollarSigns = (priceRange) => {
  let soln = [];

  for (let i = 1; i <= 4; i++) {
    if (i > priceRange) {
      soln.push(<span key={i} className="light-dollar">$</span>);
    } else {
      soln.push(<span key={i} className="dollar">$</span>);
    }
  }
  return soln;
};
