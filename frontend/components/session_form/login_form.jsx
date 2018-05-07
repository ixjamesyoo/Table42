import React from "react";

export default class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateField(field){
    
  }

  render(){
    return (
      <form>
        <input></input>

      </form>

    );
  }


}
