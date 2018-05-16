import React from "react";
import { merge } from "lodash";

class ReservationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table_size: 2,
      time: this.props.restaurant.opening_time,
      date: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { loggedIn, openModal, currentUser, restaurant } = this.props;
    const { time, date, table_size } = this.state;

    if (!loggedIn) {
      openModal();
    } else {
      const reservation = {
        user_id: currentUser.id,
        restaurant_id: restaurant.id,
        table_size,
        start_datetime: date + " " + time
      };

      this.props.createReservation(reservation);
    }
  }

  updateField(field) {
    return e => {
      this.clearConfirmation();
      this.setState({[field]: e.currentTarget.value});
    };
  }

  displayErrors() {
    if (!this.props.errors.length) return null;
    return (
      <div className="reservation-message-container">
        <span className="reservation-message-text">{ this.props.errors[0] }</span>
      </div>
    );
  }

  displayConfirmation() {
    if (!this.props.confirmation) return null;
    return (
      <div className="reservation-message-container">
        <span className="reservation-message-text">Table has been booked!</span>
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
        timeString += i > 12 ? " PM" : " AM";
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

    for (let i = 1; i <= 12; i++) {
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
        { this.displayErrors }

        <form className="reservation-form" onSubmit={ this.handleSubmit }>
          <select className="reservation-table-input"
            value={ this.state.table_size }
            onChange={ this.updateField("table_size") }>
            { this.tableSizeOptions() }
          </select>

          <select className="reservation-time-input"
            value={ this.state.time }
            onChange={ this.updateField("time")}>
            { this.timeOptions() }
          </select>

          <input type="date" min={ minDate } value={ this.state.date }
            onChange={ this.updateField("date") }
            className="reservation-date-input"  />

          <input type="submit" value="Book a Table"
            className="reservation-submit"/>
        </form>
      </div>
    );
  }
}
