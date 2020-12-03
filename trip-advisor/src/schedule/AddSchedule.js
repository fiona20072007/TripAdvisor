import React from "react";
import PropTypes from "prop-types";
import firebase from "../firebase";
// import styles from "../scss/location.module.scss";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
// import { nanoid } from "nanoid";

const db = firebase.firestore();

class AddSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      focusedInput: "",
      startDate: "",
      endDate: "",
      startDateStamp: null,
      endDateStamp: null,
      date: "",
      startDateSubmit: "",
      endDateSubmit: "",
      totalDay: "",
      size: null,
    };
  }
  componentDidMount() {
    db.collection("schedule")
      .doc("userId")
      .collection("data")
      .get()
      .then((snap) => {
        this.setState({
          size: snap.size,
        });
      });
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    db.collection("schedule")
      .doc("userId")
      .collection("data")
      .doc("travel" + this.state.size)
      .set({
        CoverImgUrl:
          "http://img01.jituwang.com/171115/256774-1G11521320727.jpg",
        EndDate: this.state.endDateSubmit,
        EndDateStamp: this.state.endDateStamp,
        ImMultiEditMember: false,
        ShareLink: "",
        StartDate: this.state.startDateSubmit,
        StartDateStamp: this.state.startDateStamp,
        TotalDay: this.state.totalDay,
        TravelScheduleDetailInfos: [],
        TravelScheduleName: this.state.value,
        comment: "",
        id: this.state.size,
      });
    alert(
      "Submitted: " +
        this.state.startDateSubmit +
        "~" +
        this.state.endDateSubmit
    );
    this.setState({ value: "" });
    // this.props.history.push(`/editSchedule`);
  };

  onDatesChange = ({ startDate, endDate }) => {
    let startDateTemp = moment(startDate).format("MM/DD/YYYY");
    let endDateTemp = moment(endDate).format("MM/DD/YYYY");
    let throughTime = moment(endDateTemp) - moment(startDateTemp);
    let days = Math.floor(throughTime / (24 * 3600 * 1000)) + 1;
    let startDateStamp = moment(startDate).valueOf();
    let endDateStamp = moment(endDate).valueOf();

    this.setState({
      startDate,
      startDateStamp,
      endDate,
      endDateStamp,
      startDateSubmit: startDateTemp,
      endDateSubmit: endDateTemp,
      totalDay: days,
    });
  };

  onFocusChange = (focusedInput) => {
    this.setState({ focusedInput });
  };
  handleDate = (e) => {
    this.setState({ date: e });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <div>
            enter trip name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <DateRangePicker
              onDatesChange={this.onDatesChange}
              onFocusChange={this.onFocusChange}
              focusedInput={this.state.focusedInput}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleDate}
              value={this.state.date}
            />
          </div>
          <div>{this.state.date}</div>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

AddSchedule.propTypes = {
  history: PropTypes.object.isRequired,
};

export default AddSchedule;
