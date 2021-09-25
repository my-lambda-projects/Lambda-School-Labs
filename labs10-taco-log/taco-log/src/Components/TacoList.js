import React, { Component } from "react";
import TacoCard from "./TacoCard";
import "../css/TacoList.css";

class TacoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      cityfilter: "All",
      filteredLogs: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = () => {
    let cities = [];
    for (let i = 0; i < this.props.userInfo.taco_logs.length; i++) {
      let city = this.props.userInfo.taco_logs[i].address.split(",")[1].trim();
      if (cities.indexOf(city) === -1) {
        cities.push(city);
      }
    }
    this.setState({
      cities: cities
    });
  };

  handleChange(e) {
    e.preventDefault();

    const filteredLogs = this.props.userInfo.taco_logs.filter(log => {
      return log.address.split(",")[1].trim() === e.target.value;
    });
    this.setState({ filteredLogs: filteredLogs, cityfilter: e.target.value });
  }

  logLink() {
    this.props.locationChange();
    this.props.history.push("/home");
  }

  render() {
    return (
      <div className="taco-list-container">
        <div className="taco-list-title">My Log</div>
        {this.props.userInfo.taco_logs.length !== 0 ? (
          <div className="taco-list-inner-container">
            <div className="city-filter">
              Filter by City:
              <select
                value={this.state.cityfilter}
                onChange={this.handleChange}
              >
                <option value="All">All</option>
                {this.state.cities.map(city => (
                  <option value={city}>{city}</option>
                ))}
              </select>
            </div>
            {this.state.cityfilter === "All" ? (
              <div className="taco-list-wrap">
                {this.props.userInfo.taco_logs.map(log => (
                  <TacoCard
                    {...this.props}
                    key={log.id}
                    id={log.id}
                    taco_location={log.taco_location}
                    taco_description={log.taco_description}
                    rating={log.rating}
                    tortilla={log.tortilla}
                    meat={log.meat}
                    cheese={log.cheese}
                    salsa={log.salsa}
                    created_at={log.created_at}
                    address={log.address}
                    photo={log.photo}
                  />
                ))}
              </div>
            ) : (
              <div className="taco-list-wrap">
                {this.state.filteredLogs.map(log => (
                  <TacoCard
                    {...this.props}
                    key={log.id}
                    id={log.id}
                    taco_location={log.taco_location}
                    taco_description={log.taco_description}
                    rating={log.rating}
                    tortilla={log.tortilla}
                    meat={log.meat}
                    cheese={log.cheese}
                    salsa={log.salsa}
                    created_at={log.created_at}
                    address={log.address}
                    photo={log.photo}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <p>You don't have any tacos logged.</p>
            <div className="btn-p-wrap">
              <p>Start logging tacos here!</p>
              <div onClick={() => this.logLink()} className="taco-log-link">
                Log a Taco
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TacoList;
