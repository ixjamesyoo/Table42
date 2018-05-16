import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  createReview,
  receiveReviewErrors
} from '../../actions/review_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import ReviewForm from "./review_form";

const mapStateToProps = ({ entities, session, errors }, { match }) => {
  return ({
    formType: "create",
    errors: errors.review,
    restaurant: entities.restaurants[match.params.id],
    currentUser: entities.users[session.currentUser]
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    processForm: review => dispatch(createReview(review)),
    clearReviewErrors: () => dispatch(receiveReviewErrors([])),
    closeModal: () => dispatch(closeModal())
  });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReviewForm));
