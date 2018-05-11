import React from "react";
import { withRouter } from "react-router-dom";


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    const { history, loggedIn, currentUser } = this.props;
    const parsedQuery = this.parseText(this.state.query);

    if (parsedQuery === ""){
      const parsedCity = loggedIn ?
        this.parseText(currentUser.city) : this.parseText("New York City");

      history.push(`/restaurants/search?city=${parsedCity}`);
    } else {
      history.push(`/restaurants/search?query=${parsedQuery}`);
    }
  }

  parseText(text) {
    return text.replace(/\s?[, ]\s?/g, "+");
  }

  updateField(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  render() {
    const { query } = this.state;

    return (
      <div className="restaurant-search-container">
        <div className="search-banner-container">
          <h2 className="search-banner">Make restaurant reservations the easy way</h2>
        </div>
        <form className="restaurant-search-bar" onSubmit={ this.handleSubmit }>
          <input className="restaurant-search-input"
            value={ query }
            onChange={ this.updateField("query") }
            placeholder="Location, Restaurant, and/or Cuisine"></input>
          <button
            className="restaurant-search-submit"
            ><img src={ window.images.searchGlass }/></button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
