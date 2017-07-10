import React, { Component } from 'react';
import WeatherListItem from './WeatherListItem';

export default class WeatherList extends Component {
  render() {
    /* passed down from App */
    const { days, onDayClicked } = this.props;

    return (
      <div className="weather-list flex-parent">
        {days.map((day, index) =>
          <WeatherListItem
            key={day.dt}
            day={day}
            onDayClicked={onDayClicked}
            index={index}
          />
        )}
      </div>
    );
  }
}
