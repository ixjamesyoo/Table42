import * as ReservationApiUtil from '../util/reservation_api_util';

export const RECEIVE_RESERVATION = "RECEIVE_RESERVATION";
export const REMOVE_RESERVATION = "REMOVE_RESERVATION";
export const RECEIVE_RESERVATION_ERRORS = "RECEIVE_RESERVATION_ERRORS";

export const createReservation = reservation => dispatch => {
  return ReservationApiUtil.createReservation(reservation).then(newRes => {
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
