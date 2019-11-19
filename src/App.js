// Importing components from relative path
import React from "react";
import Weather from "./components/weather";
import Form from "./components/form";
import Titles from "./components/titles";

// API Key to be able to use the OpenWeatherMap API
const Api_Key = "8d2de98e089f1c28e1a22fc19a24ef04";

class App extends React.Component {
  // Initialize state to undefined for all relevant data points
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    units: undefined,
    wind: undefined,
    error: undefined
  };

  // get eather is a method we'll use to make the API call
  // It is passed in as the loadWeather prop to Form component in the render function below
  // Use async keyword to specify it's an asynchronous function in response to an event e
  getWeather = async e => {
    // Store city and country values based on current value in form
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const units = e.target.elements.units.value;
    e.preventDefault();
    // fetch keyword for API call, await to show it's asynchronous,
    // URL defined at https://openweathermap.org/current
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=${units}&appid=${Api_Key}`
    );
    // response stored as json in `response` variable
    const response = await api_call.json();
    console.log(response);
    if (city && country) {
      this.setState({
        temperature: response.main.temp + (units === "metric" ? "° C" : "° F"),
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity + "%",
        wind: response.wind.speed + (units === "metric" ? " m/sec" : " mph"),
        description: response.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        error: "Please input search values..."
      });
    }
  };

  // Render function updates view whenever the state changes
  // Components that were imported (Titles, Weather, Form) are called below as HTML tags,
  //   with props as attributes associated with that component
  // Within the tag, props can be passed in to populate the component with the syntax
  //   <componentName prop={value}>
  // Look at the component definitions within the imported files (lines 2-5)
  //   to see how the props populate each component!
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form loadWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    wind={this.state.wind}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// App is exported as a component which allows it to be imported by another file
export default App;
