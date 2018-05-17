import React from "react";
import { merge } from "lodash";

export default class ReservationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table_size: 2,
      time: this.props.restaurant.opening_time,
      date: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearReservationErrors();
    this.props.clearReservationConfirmation();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { loggedIn, openLogin, restaurant } = this.props;
    const { time, date, table_size } = this.state;

    if (!loggedIn) {
      openLogin();
    } else {
      const reservation = {
        restaurant_id: restaurant.id,
        table_size,
        start_datetime: date + " " + time
      };

      this.props.createReservation(reservation);
    }
  }

  updateField(field) {
    return e => {
      this.props.clearReservationConfirmation();
      this.setState({[field]: e.currentTarget.value});
    };
  }

  errorMessages() {
    const errors = this.props.errors;
    if (errors.length === 0) {
      return null;
    } else {
      const errorLis =  errors.map( (error,idx) => (
        <li className="reservation-message-text" key={ idx }>{ error }</li>
      ));

      return (
        <ul className="reservation-message-container">
          {errorLis}
        </ul>
      );
    }
  }

  displayConfirmation() {
    if (!this.props.confirmation) return null;
    return (
      <div className="reservation-message-container">
        <p className="reservation-message-text">Table has been reserved!</p>
      </div>
    );
  }

  timeOptions() {
    const { opening_time, closing_time } = this.props.restaurant;

    const jsOpeningHour = new Date("01/01/2000 " + opening_time).getHours();
    const jsClosingHour = new Date("01/01/2000 " + closing_time).getHours();

    let timesArray = [];
    for (let i = jsOpeningHour; i < jsClosingHour; i++) {
      let hourString = i > 12 ? (i - 12).toString() : i.toString();

      for (let j = 0; j<= 45; j += 15) {
        let timeString = hourString + ":";
        timeString += j === 0 ? "00" : j.toString();
        timeString += i >= 12 ? " PM" : " AM";
        timesArray.push(timeString);

        if (i === jsClosingHour - 1) break;
      }
    }

    return timesArray.map(time => (
      <option key={time} value={time}>{ time }</option>
    ));
  }

  tableSizeOptions() {
    let tableArray = [];

    for (let i = 1; i <= 10; i++) {
      tableArray.push(
        <option key={i} value={i}>
          {i === 1 ? i + " person" : i + " people"}
        </option>
      );
    }
    return tableArray;
  }

  render() {
    let today = new Date();
    let minDate = today.toISOString().slice(0, 10);

    return (
      <div className="reservation-container">
        <h3 className="reservation-header">Make a reservation</h3>
        { this.errorMessages() }
        { this.displayConfirmation() }

        <form className="reservation-form" onSubmit={ this.handleSubmit }>
          <label>
            Party Size
            <select className="reservation-input whole party"
              value={ this.state.table_size }
              onChange={ this.updateField("table_size") }>
              { this.tableSizeOptions() }
            </select>
          </label>


          <div className="label-container">
            <label>Time</label>
            <label>Date</label>
          </div>

          <div className="half-container">
              <select className="reservation-input half time"
                value={ this.state.time }
                onChange={ this.updateField("time")}>
                { this.timeOptions() }
              </select>

              <input type="date" min={ minDate } value={ this.state.date }
                onChange={ this.updateField("date") }
                className="reservation-input half date"  />
          </div>

          <input type="submit" value="Book a Table"
            className="reservation-submit whole"/>
        </form>
      </div>
    );
  }
}
