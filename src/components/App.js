import React, { Component } from 'react';
import { get } from 'axios';
import ZipForm from './ZipForm';
import WeatherList from './WeatherList';
import CurrentDay from './CurrentDay';

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
    /*
       pulling vars from state to get rid
       of 'this.state.' in the components bellow
    */
    const { city, dates, selectedDate } = this.state;

    return(
      <div className="app">
        <ZipForm onSubmit={this.onFormSubmit} />
        <WeatherList days={dates} onDayClicked={this.onDayClicked} />
        {/*
          conditional render bellow. Both needs to be true to actully
          render the CurrentDay component.
        */}
        {
          this.state.selectedDate !== null &&
          <CurrentDay city={city} day={dates[selectedDate]} />
        }
      </div>
    );
  }
}
