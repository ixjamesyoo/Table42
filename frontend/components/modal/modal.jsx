import React from "react";
import { Route } from "react-router-dom";
import SessionFormContainer from "../session_form/session_form_container";
import ReviewForm from "../review_form/create_review_container";

export default ({ modal, closeModal }) => {
  if (!modal) {
    return null;
  }

  switch(modal) {
    case "create review":
      return (
        <div className="modal-background" onClick={ closeModal }>
          <div className="modal-child" onClick={ e => e.stopPropagation() }>
            <Route component={ ReviewForm } path="/restaurants/:id"/>
          </div>
        </div>
      );
    case "login":
    case "signup":
      return (
        <div className="modal-background" onClick={ closeModal }>
          <div className="modal-child" onClick={ e => e.stopPropagation() }>
            <SessionFormContainer formType={ modal }/>
          </div>
        </div>
      );
  }
};

// can refactor this to a case statement and return a review modal as well
