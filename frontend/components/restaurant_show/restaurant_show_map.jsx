import React from "react";

export default class RestaurantMap extends React.Component {
  componentDidMount(){
    const { restaurant } = this.props;
    if (!restaurant || !restaurant.latitude || !restaurant.longitude) return;
    this.configureMap(restaurant);
  }

  componentWillReceiveProps(nextProps) {
    const { restaurant } = nextProps;
    if (!restaurant || !restaurant.latitude || !restaurant.longitude) return;
    this.configureMap(restaurant);
  }

  configureMap(restaurant) {
    this.map = new google.maps.Map(document.getElementById("show-map-container"),
    {
      center: { lat: restaurant.latitude, lng: restaurant.longitude },
      zoom: 16
    });

    this.position = new google.maps.LatLng(restaurant.latitude, restaurant.longitude);
    this.marker = new google.maps.Marker({
      position: this.position,
      map: this.map,
    });
  }

  render(){
    const { restaurant } = this.props;
    if (!restaurant || !restaurant.latitude || !restaurant.longitude) return null;

    return (
      <div className="map-presentation">
        <div id="show-map-container">
        </div>
      </div>
    );
  }
}
