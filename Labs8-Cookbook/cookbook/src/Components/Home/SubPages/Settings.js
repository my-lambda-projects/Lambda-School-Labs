import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../SubPages/User";
import { Helmet } from "react-helmet";
import { toastMessage } from "../../../utils/toastify";

const CREATE_SUBSCRIPTION_MUTATION = gql`
  mutation createSubscription($token: String!) {
    createSubscription(token: $token) {
      id
      amount
      charge
      user {
        id
        email
      }
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateUser(data: $data, where: $where) {
      id
      email
      firstName
      lastName
      isSubscribed
    }
  }
`;

class Settings extends React.Component {
  state = {
    isEditing: false,
    fname: "",
    lname: ""
  };

  editHandler = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onToken = async (res, createSubscription) => {
    try {
      const { data } = await createSubscription({
        variables: {
          token: res.id
        },
        refetchQueries: [{ query: CURRENT_USER_QUERY }]
      });
      if (data.createSubscription) {
        toastMessage("success", "You've subscribed successfully!");
      }
    } catch (error) {
      toastMessage("error", "There was an error! Failed to subscribed.");
    }
  };

  updateUserName = async () => {
    try {
      let data = {};
      if (this.state.fname) data.firstName = this.state.fname;
      if (this.state.lname) data.lastName = this.state.lname;
      if (this.state.fname || this.state.lname) {
        await this.props.updateUser({
          variables: {
            data: data,
            where: { id: this.props.userData.currentUser.id }
          }
        });
        toastMessage("success", "Your names have been successfully updated!");
      }
    } catch (error) {
      toastMessage("error", "There was an error! Failed to change names.");
    }
  };

  cancelSubscription = async () => {
    try {
      let data = { isSubscribed: false };
      await this.props.updateUser({
        variables: {
          data,
          where: { id: this.props.userData.currentUser.id }
        },
        refetchQueries: [{ query: CURRENT_USER_QUERY }]
      });
      toastMessage(
        "success",
        "Your subscription has been successfully cancelled!"
      );
    } catch (error) {
      console.log(error);
      toastMessage(
        "error",
        "There was an error! Failed to cancel subscription."
      );
    }
  };

  render() {
    if (this.props.userData.loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="settings-page">
          <Helmet>
            <title>Settings | COOKBOOK</title>
          </Helmet>
          <div className="group-title">
            <h1>account information</h1>
            <button onClick={this.editHandler}>
              {this.state.isEditing ? (
                <p onClick={this.updateUserName}>done</p>
              ) : (
                <p>edit</p>
              )}
            </button>
          </div>
          <ul className="user-info-ul">
            <li className="name-li">
              <p className="row-title">first name</p>
              {this.state.isEditing ? (
                <input
                  name="fname"
                  className="name-input"
                  type="text"
                  value={this.state.fname}
                  onChange={this.changeHandler}
                />
              ) : (
                <p className="row-value">
                  {this.props.userData.currentUser.firstName}
                </p>
              )}
            </li>
            <li className="name-li">
              <p className="row-title">last name</p>
              {this.state.isEditing ? (
                <input
                  name="lname"
                  className="name-input"
                  type="text"
                  value={this.state.lname}
                  onChange={this.changeHandler}
                />
              ) : (
                <p className="row-value">
                  {this.props.userData.currentUser.lastName}
                </p>
              )}
            </li>
            <li className="email-li">
              <p className="row-title">email</p>
              <p className="row-value email-value">
                {this.props.userData.currentUser.email}
              </p>
            </li>
          </ul>
          <div className="membership">
            <h1>membership</h1>
            <ul className="user-membership-ul">
              <li className="status-li">
                <p className="row-title">current membership</p>
                <p className="row-value">
                  {this.props.userData.currentUser.isSubscribed
                    ? "premium"
                    : "standard"}
                </p>
              </li>
              <li className="message-li">
                <p>
                  {this.props.userData.currentUser.isSubscribed
                    ? "If you'd like to cancel your membership, please select the standard plan below"
                    : "If you'd like to subscribe, please select the premium plan below"}
                </p>
              </li>
            </ul>
            <div className="membership-cards">
              {this.props.userData.currentUser.isSubscribed ? (
                <div
                  className="card subscribed-free"
                  onClick={this.cancelSubscription}
                >
                  <h2 className="card-title">standard</h2>
                  <ul className="card-ul">
                    <li>save your recipes to cookbook</li>
                    <li>view recipe instructions and ingredients</li>
                    <li>schedule recipes and view them on your calendar</li>
                  </ul>
                  <h2 className="card-price">free</h2>
                  <button>unsubscribe</button>
                </div>
              ) : (
                <div className="card non-subscribed-free">
                  <h2 className="card-title">standard</h2>
                  <ul className="card-ul">
                    <li>save your recipes to cookbook</li>
                    <li>view recipe instructions and ingredients</li>
                    <li>schedule recipes and view them on your calendar</li>
                  </ul>
                  <h2 className="card-price">free</h2>
                  <button>registered</button>
                </div>
              )}
              {this.props.userData.currentUser.isSubscribed ? (
                <div className="card subscribed-premium">
                  <h2 className="card-title">premium</h2>
                  <ul className="card-ul">
                    <li>all standard features included</li>
                    <li>access to grocery list</li>
                    <li>
                      generate a customized shopping list of ingredients for
                      your recipes
                    </li>
                  </ul>
                  <h2 className="card-price">$10/month</h2>
                  <button>subscribed</button>
                </div>
              ) : (
                <StripeCheckout
                  stripeKey="pk_test_FyA4hajfxfEQ4jCcEaeQtTIL"
                  name="Cookbook Subscription"
                  zipcode={false}
                  amount={1000}
                  currency="USD"
                  email={this.props.userData.currentUser.email}
                  token={res =>
                    this.onToken(res, this.props.createSubscription)
                  }
                  // closed={this.onClose}
                >
                  <div className="card non-subscribed-premium">
                    <h2 className="card-title">premium</h2>
                    <ul className="card-ul">
                      <li>all standard features included</li>
                      <li>access to grocery list</li>
                      <li>
                        generate a customized shopping list of ingredients for
                        your recipes
                      </li>
                    </ul>
                    <h2 className="card-price">$10/month</h2>
                    <button>subscribe</button>
                  </div>
                </StripeCheckout>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

const getUserQuery = graphql(CURRENT_USER_QUERY, { name: "userData" });
const createSubscriptionMutation = graphql(CREATE_SUBSCRIPTION_MUTATION, {
  name: "createSubscription"
});
const updateUserMutation = graphql(UPDATE_USER_MUTATION, {
  name: "updateUser"
});

export default compose(
  getUserQuery,
  createSubscriptionMutation,
  updateUserMutation
)(Settings);
