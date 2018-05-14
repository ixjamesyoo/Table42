import React from "react";
import LoadingSpinner from "../loading_spinner/loading_spinner";

class RestaurantShow extends React.Component {
  componentDidMount(){
    this.props.fetchRestaurant();
  }

  mainContent(){
    const { restaurant } = this.props;

    return (
      <div className="show-page-main">
        <div className="show-description">
          <h1 className="show-title">{ restaurant.name }</h1>
        </div>
      </div>
    );
  }

  render() {
    const { restaurant, errors, loading } = this.props;
    if (loading) return <LoadingSpinner/>;
    if (!restaurant.fetched) return null;

    return (
      <div className="show-page-master">
        { this.mainContent() }


        <form className="showpage-reservation">
        </form>
      </div>
    );

  }
}


export default RestaurantShow;
