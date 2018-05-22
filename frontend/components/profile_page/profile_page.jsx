import React from "react";

export default class ProfilePage extends React.Component {
  componentDidMount() {
    const { fetchUserProfile, userId } = this.props;
    fetchUserProfile(userId);
  }
  
  render(){
    return null;
  }
}
