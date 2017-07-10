import React, { Component } from 'react';
import { get } from 'axios';
import ZipForm from './ZipForm';
import WeatherList from './WeatherList';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zipcode: '',
      city: {},
      dates: [],
      selectedDate: null
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onDayClicked = this.onDayClicked.bind(this);
  }

  onFormSubmit(zipcode) {
    get(`http://localhost:3000/weather/${zipcode}`)
    .then(({ data}) => {
      const { city, list: dates } = data;

      this.setState({ zipcode, city, dates, selectedDate: null });
    });
  }

  onDayClicked(dayIndex) {
    this.setState({ selectedDate: dayIndex });
  }

  render() {
    return(
      <div className="app">
        <ZipForm onSubmit={this.onFormSubmit} />
        <WeatherList days={this.state.dates} onDayClicked={this.onDayClicked} />
      </div>
    );
  }
}
