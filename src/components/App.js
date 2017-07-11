import React, { Component } from 'react';
import { get } from 'axios';
import ZipForm from './ZipForm';
import WeatherList from './WeatherList';
import CurrentDay from './CurrentDay';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherData: [],
      zipcode: '',
      city: {},
      dates: [],
      selectedDate: null
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onDayClicked = this.onDayClicked.bind(this);
  }

  componentDidMount() {
    get(`http://localhost:3000/weather`)
      .then(({ data: weatherData }) => {
        this.setState({ weatherData });
    });
  }

  onFormSubmit(zipcode) {
    const zip = zipcode * 1;
    const { weatherData } = this.state;
    const data = weatherData.find(w => w.id === zip);
    const { city, list: dates} = data;

    this.setState({ zip, city, dates, selectedDate: null });



  }

  onDayClicked(dayIndex) {
    this.setState({ selectedDate: dayIndex });
  }

  render() {
    /*
       pulling vars from state to get rid
       of 'this.state.' in the components bellow
    */
    const { weatherData, city, dates, selectedDate } = this.state;
    const zips = weatherData.map(w => w.id);

    return(
      <div className="app">
        <ZipForm zips={zips} onSubmit={this.onFormSubmit} />
        <WeatherList days={dates} onDayClicked={this.onDayClicked} />
        {
          /*
            conditional render bellow. Both needs to be true to actully
            render the CurrentDay component.
          */
          this.state.selectedDate !== null &&
          <CurrentDay city={city} day={dates[selectedDate]} />
        }
      </div>
    );
  }
}
