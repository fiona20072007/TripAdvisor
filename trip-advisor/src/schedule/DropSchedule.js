import React from "react";
import styles from "../scss/schedule.module.scss";
import FindLocation from "./FindLocation";
import LikeLocation from "./LikeLocation";
import DragListSchedule from "./DragListSchedule";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Droppable } from "react-beautiful-dnd";

class DropSchedule extends React.Component {
  handleDateScroll = (id) => {
    document.getElementById(`day${id + 1}`).scrollIntoView({
      behavior: "smooth",
    });
  };

  handleStar = (num) => {
    return (Number(num) / 5.4) * 100;
  };

  render() {
    // console.log(this.state.travelDetailCountry);
    //把這個state往上拉到editSchedule.js再set
    // console.log(this.state.travelDateDetail);
    return (
      <div className={styles.scheduleDateAll}>
        <div className={styles.scheduleDateSelect}>
          <FontAwesomeIcon icon={faCalendarAlt} />
          <div className={styles.scheduleDateTitle}>Day </div>
          {this.props.travelDateDetail.map((item, i) => {
            return (
              <div
                key={i}
                className={styles.scheduleDateDetail}
                onClick={() => {
                  this.handleDateScroll(i);
                }}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
        {this.props.travelDateDetail.map((item, i) => (
          <Droppable droppableId={`drop-${item.name}`} key={i}>
            {(provided) => (
              <div className={styles.scheduleDetailForDrop}>
                <div className={styles.scheduleDateOnly} id={`day${i + 1}`}>
                  {`\xa0\xa0\xa0\xa0`}Day-{i + 1} {`\xa0\xa0\xa0\xa0`}{" "}
                  {item.name}
                </div>
                <div
                  className={styles.scheduleDetail}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <DragListSchedule
                    item={item.name}
                    date={item.name}
                    travelDetailCountry={this.props.travelDetailCountry}
                    setInfoOpen={this.props.setInfoOpen}
                    selectedPlace={this.props.selectedPlace}
                    setSelectedPlace={this.props.setSelectedPlace}
                    traffic={this.props.traffic}
                    handleTraffic={this.props.handleTraffic}
                    trafficDetail={this.props.trafficDetail}
                    userUid={this.props.userUid}
                    handleStar={this.handleStar}
                    handleDeleteLocation={this.props.handleDeleteLocation}
                    dragging={this.props.dragging}
                  />

                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
        <Droppable droppableId={"locationList"}>
          {(provided) => (
            <div
              className={styles.locationSection}
              id={`locationSection0`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className={styles.findLocationShow} id="findLocationShow">
                <FindLocation
                  getCountry={this.props.getCountry}
                  userUid={this.props.userUid}
                  handleStar={this.handleStar}
                />
              </div>

              <div className={styles.likeLocationShow} id="likeLocationShow">
                <LikeLocation
                  userUid={this.props.userUid}
                  handleStar={this.handleStar}
                />
              </div>
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}

DropSchedule.propTypes = {
  getCountry: PropTypes.func,
  setInfoOpen: PropTypes.func,
  selectedPlace: PropTypes.object,
  setSelectedPlace: PropTypes.func,
  traffic: PropTypes.object,
  handleTraffic: PropTypes.func,
  trafficDetail: PropTypes.object,
  userUid: PropTypes.string,
  travelDateDetail: PropTypes.array,
  travelDetailCountry: PropTypes.object,
  handleDeleteLocation: PropTypes.func,
  dragging: PropTypes.bool,
};

export default DropSchedule;
