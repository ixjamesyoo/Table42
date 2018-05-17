import { connect } from "react-redux";
import { createFavorite, deleteFavorite } from "../../actions/favorite_actions";
import { openModal } from "../../actions/modal_actions";
import FavoriteButton from "./favorite_button";

const mapStateToProps = ({ entities, session }) => {
  return ({
    favorites: entities.favorites,
    loggedIn: Boolean(session.currentUser),
  });
};

const mapDispatchToProps = (dispatch, { restaurant }) => {
  return ({
    openLogin: () => dispatch(openModal("login")),
    createFavorite: () => dispatch(createFavorite(restaurant.id)),
    deleteFavorite: () => dispatch(deleteFavorite(restaurant.id)),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);
