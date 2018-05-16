import React from "react";

class ReservationForm extends React.Component {
  constructor(props) {
    super(props);
    // restaurant_id: this.props.restaurant.id,
    this.state = {
      table_size: 2,
      time: this.props.restaurant.opening_time,
      date: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({[field]: e.currentTarget.value});
  }

  displayErrors() {
    if (!this.props.errors.length) return null;
    return (
      <div className="reservation-error-container">
        <span className="reservation-error-text">{ this.props.errors[0] }</span>
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


}
