import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";
import {
  createReservation,
  receiveReservationErrors,
  clearReservationConfirmation
} from '../../actions/reservation_actions';
import { openModal } from "../../actions/modal_actions";
import ReservationForm from "./reservation_form";


const mapStateToProps = ({ entities, session, errors, ui }, { match }) => {
  return ({
    loggedIn: Boolean(session.currentUser),
    restaurant: entities.restaurants[match.params.id],
    errors: errors.reservation,
    confirmation:  ui.reservation.confirmation
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    createReservation: reservation => dispatch(createReservation(reservation)),
    clearReservationErrors: () => dispatch(receiveReservationErrors([])),
    clearReservationConfirmation: () => dispatch(clearReservationConfirmation()),
    openModal: () => dispatch(openModal("login")),
  });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReservationForm));