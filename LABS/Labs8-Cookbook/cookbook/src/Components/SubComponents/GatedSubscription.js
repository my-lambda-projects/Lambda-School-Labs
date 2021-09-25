import React from "react";
import Loading from "../SubComponents/Loading.js";
import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "../Home/SubPages/User";
import { Link } from "react-router-dom";

const GatedSubscription = props => {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data, loading }) => {
        if (loading) return <Loading></Loading>;
        if (!data.currentUser.isSubscribed) {
          return (
            <div>
              <p>This content is only available to premium user.</p>
              <p>
                Please go to{" "}
                <Link
                  style={{
                    textDecoration: "None",
                    color: "orange",
                    fontWeight: 700
                  }}
                  to="/home/settings"
                >
                  Settings
                </Link>{" "}
                page to subscribe.
              </p>
            </div>
          );
        }
        return props.children;
      }}
    </Query>
  );
};

export default GatedSubscription;
