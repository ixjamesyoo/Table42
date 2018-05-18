import React from "react";


export default ({
  favorites, loggedIn, openLogin, createFavorite, deleteFavorite, restaurant
}) => {

  let handleClick;
  if (!loggedIn) {
    handleClick = (e) => {
      e.preventDefault();
      openLogin();
    };
  } else {
    handleClick = favorites.includes(restaurant.id) ? (e) => {
      e.preventDefault();
      deleteFavorite();
    } : (e) => {
      e.preventDefault();
      createFavorite();
    };
  }

  let name;
  if (favorites.includes(restaurant.id)) {
    name = "favorite";
  } else {
    name = "grey-favorite";
  }


  return (
    <button className={ name } onClick={ handleClick }>
      <i class="fas fa-star"/>
    </button>
  );
};
