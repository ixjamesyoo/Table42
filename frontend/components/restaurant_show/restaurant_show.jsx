import React from "react";

class RestaurantShow extends React.Component {
  componentDidMount(){
    this.props.fetchRestaurant();
  }

  render() {
    const { restaurant } = this.props;
    if (!restaurant.fetched) return null;

    return (
      <div>
      </div>
    );

  }
}


export default RestaurantShow;
