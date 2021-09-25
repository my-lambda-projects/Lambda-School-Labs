import React, { Component, Fragment } from 'react';
import './TopHeader.css';
import { Link } from 'react-router-dom';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import axios from 'axios';
import { Capitalize } from '../utils/helper/helperFuncions';

const URL = process.env.REACT_APP_URL;

let headers;

class TopHeader extends Component {
  state = {
    authenticated: false,
    displayTotal: false,
    breadcrumb: [],
    rightLinks: [],
    flightList: [],
    openModal: false,
    sel: 0,
    mel: 0,
    ses: 0,
    mes: 0,
    cross_country: 0,
    no_instument_app: 0,
    no_ldg: 0,
    day: 0,
    night: 0,
    actual_instr: 0,
    sim_instr: 0,
    pic: 0,
    dual_rec: 0,
    total: 0,
  };

  componentDidMount() {
    axios({
      method: 'GET',
      url: `${URL}api/joined/`,
      headers,
    })
      .then((response) => {
        this.setState({ flightList: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
    if (Array.isArray(this.props.breadcrumb)) {
      this.setState({ breadcrumb: this.props.breadcrumb });
    }

    if (this.props.displayTotal) {
      this.setState({ displayTotal: true });
    }
  }

  toggleModal = () => {
    if (localStorage.getItem('premium') !== 'true') {
      alert('Purchase Premium for access to your total flight hours');
      return;
    }
    let [
      cross_country_total,
      no_instrument_app_total,
      no_ldg_total,
      dayTotal,
      nightTotal,
      actualTotal,
      simTotal,
      picTotal,
      totalhrs,
      recTotal,
    ] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const license_totals = {
      SEL: 0,
      SES: 0,
      MEL: 0,
      MES: 0,
    };

    let agg = true;
    while (agg === true) {
      const { flightList } = this.state;
      for (const key in flightList) {
        for (let i = 0; i < flightList[key].length; i++) {
          cross_country_total += flightList[key][i].cross_country;
          no_instrument_app_total += flightList[key][i].no_instument_app;
          no_ldg_total += flightList[key][i].no_ldg;
          dayTotal += flightList[key][i].day;
          nightTotal += flightList[key][i].night;
          actualTotal += flightList[key][i].actual_instr;
          simTotal += flightList[key][i].sim_instr;
          picTotal += flightList[key][i].pic;
          totalhrs += flightList[key][i].total_hours;
          recTotal += flightList[key][i].dual_rec;
          license_totals[key] += flightList[key][i].total_hours;
        }
      }
      this.setState({
        day: Math.round(dayTotal * 10) / 10,
        night: Math.round(nightTotal * 10) / 10,
        actual_instr: Math.round(actualTotal * 10) / 10,
        sim_instr: Math.round(simTotal * 10) / 10,
        pic: Math.round(picTotal * 10) / 10,
        dual_rec: Math.round(recTotal * 10) / 10,
        total: Math.round(totalhrs * 10) / 10,
        cross_country: Math.round(cross_country_total * 10) / 10,
        no_instument_app: Math.round(no_instrument_app_total * 10) / 10,
        no_ldg: Math.round(no_ldg_total * 10) / 10,
        sel: Math.round(license_totals.SEL * 10) / 10,
        ses: Math.round(license_totals.SES * 10) / 10,
        mes: Math.round(license_totals.MES * 10) / 10,
        mel: Math.round(license_totals.MEL * 10) / 10,
      });
      agg = false;
    }
    if (agg === false) {
      this.setState({ openModal: !this.state.openModal });
    }
  };

  signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('premium');
    window.location.replace('/');
  };

  render() {
    headers = {
      Authorization: `JWT ${localStorage.getItem('token')}`,
    };
    return (
      <div className="Topheader">
        <Modal className="TotalsModal" toggle={this.toggleModal} isOpen={this.state.openModal}>
          <ModalHeader>
            <div>
              <p className="LicenseType">{`SEL Hours : ${this.state.sel}`}</p>
              <p className="LicenseType">{`SES Hours : ${this.state.ses}`}</p>
            </div>
            <div>
              <p className="LicenseType">{`MEL Hours : ${this.state.mel}`}</p>
              <p className="LicenseType">{`MES Hours : ${this.state.mes}`}</p>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="TotalsBodyChildren">
              <div className="XXX">
                <p>Cross Country :</p>
                <p>No. Instr. App. :</p>
                <p>No. Ldg. :</p>
                <p>Day :</p>
                <p>Night :</p>
              </div>
              <div className="XXX">
                <p>{this.state.cross_country}</p>
                <p>{this.state.no_instument_app}</p>
                <p>{this.state.no_ldg}</p>
                <p>{this.state.day}</p>
                <p>{this.state.night}</p>
              </div>
            </div>

            <div className="TotalsBodyChildren">
              <div className="XXX">
                <p>Actual :</p>
                <p>SIM :</p>
                <p>Grnd Trnr. :</p>
                <p>PIC :</p>
                <p>Dual Rec. :</p>
              </div>
              <div className="XXX">
                <p>{this.state.actual_instr}</p>
                <p>{this.state.sim_instr}</p>
                <p>0</p>
                <p>{this.state.pic}</p>
                <p>{this.state.dual_rec}</p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>{`Total Hours : ${this.state.total}`}</ModalFooter>
        </Modal>
        <div className="BreadCrumb">
          <Link className="BreadCrumb-link" to="/home">
            <span className="desktop">Home</span>
            <i className="fas fa-home fa-lg tablet" aria-hidden="true" />
          </Link>

          {this.state.breadcrumb.map((item, i) => {
            const label = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
            return (
              <Fragment key={i}>
                <i className="fas fa-angle-right BreadCrumb-link-angle-right desktop" />
                <div className="BreadCrumb-link desktop">{label}</div>
              </Fragment>
            );
          })}
        </div>
        {' '}
        {/* end of breadcrumb */}
        {this.state.displayTotal ? (
          <Fragment>
            <div className="Total desktop" onClick={this.toggleModal}>
              <span className="ViewTotal-Span">Total Hours</span>
            </div>
            <div className="Total tablet" onClick={this.toggleModal}>
              <span className="ViewTotal-Span">Hours</span>
            </div>
          </Fragment>
        ) : (
          ''
        )}
        <span className="Welcome desktop">{`Welcome ${Capitalize(this.props.username)}`}</span>
        <span className="SignOut" onClick={this.signOut}>

          Signout
        </span>
      </div>
    );
  }
}

export default TopHeader;
