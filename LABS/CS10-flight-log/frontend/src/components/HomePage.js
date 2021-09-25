import React, { Component } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
import CardContent from '@material-ui/core/CardContent';
import { HorizontalBar } from 'react-chartjs-2';
import TopHeader from './TopHeader';
import NavBar from './NavBar';
import Auth from './Authenication/Auth';

import { data2, makeData, options } from '../utils/helper/Data';

// import logo from '../utils/Images/Logo.svg';
import './HomePage.css';

const URL = process.env.REACT_APP_URL;
const dev = process.env.REACT_APP_DEV;
let headers;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flightList: [],
      sel: 0,
      mel: 0,
      ses: 0,
      mes: 0,
      cross_country_: [],
      no_instument_app: [],
      no_ldg: [],
      day: [],
      night: [],
      actual_instr: [],
      sim_instr: [],
      pic: [],
      dual_rec: [],
      loading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500);
    axios({
      method: 'GET',
      url: `${URL}api/joined/`,
      headers,
    })
      .then((response) => {
        dev ? console.log('HOME RES', response.data) : console.log();
        this.setState({ flightList: response.data });
      })
      .catch((err) => {
       dev ? console.log(err) : console.log();
      })
      .then(() => {
        const cross_country_Arr = Array(4).fill(0);

        const no_instrument_app_Arr = Array(4).fill(0);

        const no_ldg_Arr = Array(4).fill(0);

        const dayArr = Array(4).fill(0);

        const nightArr = Array(4).fill(0);

        const actualArr = Array(4).fill(0);

        const simArr = Array(4).fill(0);

        const picArr = Array(4).fill(0);

        const recArr = Array(4).fill(0);

        let x = 0;
        const data = this.state.flightList;
        //takes the api/joined/ data and totals it by license type.
        for (const key in data) {
          for (let i = 0; i < data[key].length; i += 1) {
            // console.log(data[key][i].pic)
            cross_country_Arr[x] += data[key][i].cross_country;
            no_instrument_app_Arr[x] += data[key][i].no_instument_app;
            no_ldg_Arr[x] += data[key][i].no_ldg;
            dayArr[x] += data[key][i].day;
            nightArr[x] += data[key][i].night;
            actualArr[x] += data[key][i].actual_instr;
            simArr[x] += data[key][i].sim_instr;
            picArr[x] += data[key][i].pic;
            recArr[x] += data[key][i].dual_rec;
          }
          x += 1;
        }
        this.setState({
          day: dayArr,
          night: nightArr,
          actual_instr: actualArr,
          sim_instr: simArr,
          pic: picArr,
          dual_rec: recArr,
          cross_country: cross_country_Arr,
          no_instument_app: no_instrument_app_Arr,
          no_ldg: no_ldg_Arr,
        });
      });
  }

  render() {
    const data = makeData(
      this.state.pic,
      this.state.dual_rec,
      this.state.sim_instr,
      this.state.actual_instr,
      this.state.day,
      this.state.night,
      this.state.cross_country,
      this.state.no_instument_app,
      this.state.no_ldg,
    );

    dev ? console.log('HOME STATE', this.state) : console.log();
    headers = {
      Authorization: `JWT ${localStorage.getItem('token')}`,
    };
    const { loading } = this.state;

    if (loading) {
      return (
        <div className="HomePage">
          <NavBar />
          <TopHeader username={this.props.username} />
          <div className="HomePage-info-loading">
            <Card
              style={{
                marginTop: '10%',
                maxWidth: '700px',
                height: '500px',
                marginLeft: '15%',
                boxShadow: 'none',
              }}
            >
              <div className="load-bar">
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
              </div>
              <CardContent />
            </Card>
          </div>
        </div>
      );
    }
    return (
      <div className="HomePage">
        <NavBar />
        <TopHeader username={this.props.username} />
        <div className="HomePage-info">
          {/* <img src={logo } className="Falcano-Logo" alt="logo"/> */}
          <Card className="Homepage-totalscard">
            <h4 style={{ paddingTop: '30px' }}>
              {localStorage.getItem('premium')
                ? 'Your Falcano Hours'
                : 'Sign up for premium to display your Falcano hours'}
            </h4>

            <HorizontalBar
              data={localStorage.getItem('premium') ? data : data2}
              options={options}
            />
          </Card>
        </div>
      </div>
    );
  }
}

export default Auth(HomePage);
