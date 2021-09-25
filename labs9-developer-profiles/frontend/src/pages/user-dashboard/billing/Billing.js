import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { centerFlex } from '../../../global-styles/Mixins';


var noLeaks;
class Billing extends Component {
  state = {
    currentSubPeriodEnd: '',
    monthSubmitLoading: false,
    monthSubmitSuccess: false,
    monthSubmitFailure: false,
    yearSubmitLoading: false,
    yearSubmitSuccess: false,
    yearSubmitFailure: false,
  }

  componentDidMount() {
    if (this.props.userInfo.stripe_customer_id) {
      let customerId = this.props.userInfo.stripe_customer_id;
      axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/api/get-customer`, {customerId})
      .then(res => {
        let date = res.data.subscriptions.data[0].current_period_end  * 1000;
        let normDate = new Date(date);
        normDate = normDate.toString();
        let normDateArr = normDate.split(' ');
        normDate = `${normDateArr[0]} ${normDateArr[1]} ${normDateArr[2]} ${normDateArr[3]}`;
        this.setState({currentSubPeriodEnd: normDate})
      })
      .catch(err => console.log(err));
    }
  }

  selectPackage = (e, packageSelected) => {
    e.preventDefault();


    var handler = window.StripeCheckout.configure({
      key: "pk_test_V4TVCnAGCgyfBK9pXODIWhfA",
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: token => {
        if (packageSelected === 'month') {
          this.setState({ monthSubmitLoading: true });
        } else if (packageSelected === 'year') {
          this.setState({ yearSubmitLoading: true });
        }
        axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/api/create-customer`, {stripeToken: token.id, userEmail: token.email})
        .then(res => {
          axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/api/subscribe-customer`, {customerId: res.data.id, packageSelected})
          .then(res => {
            let date = res.data.current_period_end * 1000;
            let normDate = new Date(date);
            normDate = normDate.toString();
            let normDateArr = normDate.split(' ');
            normDate = `${normDateArr[0]} ${normDateArr[1]} ${normDateArr[2]} ${normDateArr[3]}`;
            axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}`, {stripe_customer_id: res.data.customer, stripe_subscription_name: res.data.plan.nickname})
            .then(res => {
              if (packageSelected === 'month') {
                this.setState({monthSubmitLoading: false, monthSubmitSuccess: true, currentSubPeriodEnd: normDate})
                noLeaks = setTimeout(() => {
                  this.setState({ monthSubmitSuccess: false })
                }, 2000)
              } else if (packageSelected === 'year') {
                this.setState({yearSubmitLoading: false, yearSubmitSuccess: true, currentSubPeriodEnd: normDate})
                noLeaks = setTimeout(() => {
                  this.setState({ yearSubmitSuccess: false })
                }, 2000)
              }
              this.props.updateProgress()
            })
            .catch(err => {
              console.log(err)
            })
          })
          .catch(err => {
            console.log(err)
          })
        })
        .catch(err => {
          console.log(err)
        })
      }
    });
    if (packageSelected === 'month') {
      handler.open({
        name: 'Developer Profiles',
        description: `You selected the 'Quick Hire' Package`,
      });
    } else if (packageSelected === 'year') {
      handler.open({
        name: 'Developer Profiles',
        description: `You selected the 'Always Looking' Package`,
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(noLeaks)
  }

  render() {
    console.log(this.state.currentSubPeriodEnd)
    let yearButtonContent;
    if (this.state.yearSubmitLoading) {
      yearButtonContent = <i className=" loading fas fa-spinner fa-2x fa-spin"></i>;
    } else if (this.state.yearSubmitSuccess) {
      yearButtonContent = <i className="success fa fa-check-circle fa-2x"></i>;
    } else {
      yearButtonContent ='Choose Package';
    }

    let monthButtonContent;
    if (this.state.monthSubmitLoading) {
      monthButtonContent = <i className=" loading fas fa-spinner fa-2x fa-spin"></i>;
    } else if (this.state.monthSubmitSuccess) {
      monthButtonContent = <i className="success fa fa-check-circle fa-2x"></i>;
    } else {
      monthButtonContent ='Choose Package';
    }
    return (
      <BillingDiv>
          <header>
            {this.props.userInfo.subscriptionSuccess ?
              <h1 className="billing-main-success-heading">Billing</h1>
              :
              <h1 className="billing-main-heading">Billing</h1>
            }
          </header>
          {this.props.userInfo.subscriptionSuccess ?
            <div className="billing-success-container">
              <main className="billing-success">
                <header>
                  <h1 className="sub-active-heading">Subscription Active <span><i className="success fa fa-check" aria-hidden="true"></i></span></h1>
                </header>
                <section className="package-selected">
                  <h3 className="sub-sub-heading">Package Selected:</h3>
                  {this.props.userInfo.stripe_subscription_name === 'Always looking yearly' ?
                    <div>
                      <p className="text">{this.props.userInfo.stripe_subscription_name}</p>
                      <p className="text">$9.99/year</p>
                    </div>
                    :
                    <div>
                      <p className="text">{this.props.userInfo.stripe_subscription_name}</p>
                      <p className="text">$0.99/month</p>
                    </div>
                  }
                </section>
                <section className="sub-renew">
                  <h3 className="sub-sub-heading">Your Subscription Is Set to Renew:</h3>
                  <p className="text">{this.state.currentSubPeriodEnd}</p>
                </section>
                <section className="cancel-btn-section">
                  <button onClick={() => console.log('deletee')}>
                    Cancel Subscription
                  </button>
                </section>
              </main>
            </div>
            :
            <div className="options">
              <div className="option">
                <header>
                  <h3 className="sub-option-heading">Always Looking</h3>
                </header>
                <section className="price-section">
                  <h3 className="sub-price-heading">$9.99</h3>
                  <label>/yearly</label>
                </section>
                <section className="features-section">
                  <p className="text">Live profile for anyone to see</p>
                  <p className="text">Be found quickly with advanced filtering</p>
                  <p className="text">Simple and live profile customization</p>
                  <p className="text">Choose any city in the world for relocation</p>
                  <p className="text">Keep your doors open to opportunity year-round</p>
                </section>
                <section className="btn-section">
                  <button onClick={(e) => this.selectPackage(e, 'year')}>
                    {yearButtonContent}
                  </button>
                </section>
              </div>
              <div className="option">
                <header>
                  <h3 className="sub-option-heading">Quick Hire</h3>
                </header>
                <section className="price-section">
                  <h3 className="sub-price-heading">$0.99</h3>
                  <label>/monthly</label>
                </section>
                <section className="features-section">
                  <div>
                    <p className="text">Live profile for anyone to see</p>
                    <p className="text">Be found quickly with advanced filtering</p>
                    <p className="text">Simple and live profile customization</p>
                    <p className="text">Choose any city in the world for relocation</p>
                  </div>
                </section>
                <section className="btn-section">
                  <button onClick={(e) => this.selectPackage(e, 'month')}>
                    {monthButtonContent}
                  </button>
                </section>
              </div>
            </div>
          }
          <ButtonContainer>
            <Link to="/dashboard/education">Back</Link>
            <Link to="/dashboard">Home</Link>
          </ButtonContainer>
      </BillingDiv>
    )
  }
}

export const BillingDiv = styled.div`
  width: calc(100% - 300px);
  margin-left: 300px;
  padding-top: 130px;
  padding-left: 50px;
  padding-right: 50px;
  @media (max-width: 1400px) {
    width: calc(100% - 80px);
    margin-left: 80px;
  }
  @media (max-width: 1150px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  @media (max-width: 650px) {
    width: 100%;
    padding-top: 200px;
    margin-left: 0px;
  }
  @media (max-width: 600px) {
    padding-top: 300px;
  }
  @media (max-width: 400px) {
    padding-top: 350px;
  }
  @media (max-width: 450px) {
    padding-left: 10px;
    padding-right: 10px;
  }
  @media (max-width: 400px) {
    padding-left: 5px;
    padding-right: 5px;
  }
  .billing-main-heading {
    font-size: 5rem;
    color: rgb(42,42,42);
    margin-bottom: 50px;
    text-align: center;
    @media (max-width: 1100px) {
      font-size: 4rem;
    }
    @media (max-width: 950px) {
      text-align: left;
    }
    @media (max-width: 600px) {
      font-size: 3.5rem;
    }
    @media (max-width: 450px) {
      line-height: 35px;
      padding-left: 10px;
    }
    @media (max-width: 400px) {
      font-size: 3.2rem;
      padding-left: 5px;
    }
  }
  .billing-main-success-heading {
    font-size: 5rem;
    color: rgb(42,42,42);
    margin-bottom: 50px;
    text-align: center;
    @media (max-width: 1100px) {
      font-size: 4rem;
    }
    @media (max-width: 600px) {
      font-size: 3.5rem;
      line-height: 35px;
    }
    @media (max-width: 450px) {
      font-size: 3.2rem;
    }
  }
  .sub-heading {
    font-size: 3rem;
    margin-bottom: 50px;
  }
  .sub-active-heading {
    font-size: 4rem;
    margin-bottom: 50px;
    color: var(--accent-color);
    @media (max-width: 1100px) {
      font-size: 3.5rem;
    }
    @media (max-width: 600px) {
    font-size: 2.8rem;
    line-height: 35px;
    }
    @media (max-width: 450px) {
      font-size: 2.7rem;
    }
  }
  .sub-option-heading {
    font-size: 4rem;
    margin-bottom: 50px;
    color: var(--accent-color);
    @media (max-width: 1100px) {
      font-size: 3.7rem;
    }
    @media (max-width: 600px) {
    font-size: 3.2rem;
    line-height: 35px;
    }
    @media (max-width: 450px) {
      font-size: 3rem;
    }
  }
  .sub-sub-heading {
    font-size: 2.5rem;
    margin-bottom: 20px;
    border-top: 1px solid lightgrey;
    border-bottom: 1px solid lightgrey;
    padding: 12px 8px;
    @media (max-width: 600px) {
    font-size: 2.4rem;
    line-height: 30px;
    }
    @media (max-width: 450px) {
      font-size: 2.2rem;
    }
  }
  .sub-price-heading {
    font-size: 3.2rem;
    @media (max-width: 450px) {
      font-size: 2.9rem;
    }
  }
  .text {
    color: rgba(42,42,42,.8);
    font-size: 1.7rem;
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 25px;
    line-height: 23px;
  }
  .success {
    color: var(--lp_btn_color);
  }
  .loading {
    color: var(--lp_btn_color);
  }


  .billing-success-container {
    ${centerFlex()}
    @media (max-width: 950px) {
      margin-bottom: 75px;
    }
    .billing-success {
      padding: 20px;
      border: 1px solid lightgrey;
      border-radius: 5px;
      height: 550px;
      width: 700px;
      .package-selected, .sub-renew {
        margin-bottom: 50px;
      }
      .cancel-btn-section {
        position: absolute;
        bottom: 3%;
        left: 50%;
        transform: translateX(-50%);
        button {
          width: 260px;
          color: white;
          padding: 15px 0;
          font-size: 1.5rem;
          letter-spacing: 1.5px;
          background-color: var(--accent-color);
          border: none;
          border-radius: 100px;
          ${centerFlex()};
          &:hover {
            color: var(--lp_btn_color);
            transform: scale(1.1);
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
            cursor: pointer;
          }
          &:active {
            transform: scale(1);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
          }
        }
      }
    }
  }


  .options{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    @media (max-width: 1100px) {
      justify-content: space-between;
    }
    @media (max-width: 950px) {
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
    .option {
      width: 45%;
      max-width: 550px;
      height: 650px;
      padding: 50px;
      text-align: center;
      border: 1px solid lightgrey;
      border-radius: 5px;
      @media (max-width: 1600px) {
        height: 700px;
      }
      @media (max-width: 1450px) {
        width: 49%;
      }
      @media (max-width: 1100px) {
        height: 720px;
      }
      @media (max-width: 950px) {
        height: 650px;
        width: 100%;
        margin-bottom: 75px;
      }
      @media (max-width: 600px) {
        height: 700px;
      }
      @media (max-width: 500px) {
        padding:  40px 20px 0;
      }
      @media (max-width: 450px) {
        height: 720px;
      }
      label {
        color: rgba(42,42,42,.8);
        font-size: 1.7rem;
        margin-bottom: 8px;
        font-weight: bold;
        line-height: 23px;
        letter-spacing: 1px;
        margin-right: 5px;
        @media (max-width: 450px) {
          font-size: 1.5rem;
        }
      }
      .price-section {
        margin-bottom: 40px;
      }
      .btn-section {
        position: absolute;
        bottom: 7%;
        left: 50%;
        transform: translateX(-50%);
        button {
          width: 260px;
          height: 70px;
          color: white;
          padding: 20px 30px;
          font-size: 2rem;
          letter-spacing: 1.5px;
          background-color: var(--accent-color);
          border: none;
          border-radius: 100px;
          ${centerFlex()};
          margin-left: 25px;
          margin-right: 25px;
          &:hover {
            color: var(--lp_btn_color);
            transform: scale(1.1);
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
            cursor: pointer;
          }
          &:active {
            transform: scale(1);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
          }
        }
      }
    }
  }
`;

export const ButtonContainer = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 75px;
  margin-bottom: 50px;
  @media (max-width: 950px) {
    margin-top: 0;
  }
  a {
    width: 230px;
    height: 55px;
    display: block;
    text-decoration: none;
    color: white;
    padding: 20px 30px;
    font-size: 2rem;
    letter-spacing: 1.5px;
    background-color: var(--lp_btn_color);
    border: none;
    border-radius: 100px;
    ${centerFlex()};
    &:hover {
      color:var(--accent-color);
      transform: scale(1.1);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      cursor: pointer;
    }
    &:active {
      transform: scale(1);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }
    &:first-child {
      margin-right: 50px;
    }
  }
`;

export default Billing;