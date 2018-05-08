import React from "react";
import SessionFormContainer from "../session_form/session_form_container";

export default ({ modal, closeModal }) => {
  if (!modal) {
    return null;
  }
  const formType = modal === "login" ? "login" : "signup";
  return (
    <div className="modal-background" onClick={ closeModal }>
      <div className="modal-child" onClick={ e => e.stopPropagation() }>
        <SessionFormContainer formType={ formType }/>
      </div>
    </div>
  );
};
