import React from "react";

export default class ProtectedModal extends React.Component {
  componentDidMount() {
    this.props.openModal();
  }

  render() {
    return null;
  }
}
