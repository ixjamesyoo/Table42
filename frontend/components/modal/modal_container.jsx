import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { closeModal } from "../../actions/modal_actions";
import Modal from "./modal.jsx";

const mapStateToProps = ({ ui }) => {
  return {
    modal: ui.modal.type,
    reviewId: ui.modal.reviewId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
