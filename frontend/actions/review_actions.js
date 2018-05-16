import * as ReviewApiUtil from '../util/review_api_util';

export const RECEIVE_REVIEW = "RECEIVE_REVIEW";
export const REMOVE_REVIEW = "REMOVE_REVIEW";
export const RECEIVE_REVIEW_ERRORS = "RECEIVE_REVIEW_ERRORS";

export const createReservation = reservation => dispatch => {
  return ReservationApiUtil.createReservation(reservation).then(newRes => {
      dispatch(receiveReservationConfirmation());
      dispatch(receiveReservation(newRes));
  }, err => {
    dispatch(receiveReservationErrors(err.responseJSON));
  });
};

export const deleteReservation = id => dispatch => {
  return ReservationApiUtil.deleteReservation(id).then(res => {
    dispatch(removeReservation(res));
  });
};

export const receiveReservation = reservation => ({
  type: RECEIVE_RESERVATION,
  reservation
});

export const removeReservation = reservation => ({
  type: REMOVE_RESERVATION,
  reservation
});

export const receiveReservationErrors = errors => {
  return  ({
    type: RECEIVE_RESERVATION_ERRORS,
    errors
  });
};
