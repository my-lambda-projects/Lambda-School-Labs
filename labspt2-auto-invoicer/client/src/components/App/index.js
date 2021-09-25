import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Route, withRouter } from "react-router-dom";
import { saveAs } from "file-saver";

import LandingPage from "../../views/LandingPage";
import BillingPage from "../../views/BillingPage";
import SettingsPage from "../../views/SettingsPage";
import InvoiceList from "../../views/InvoiceList";
import InvoiceView from "../../views/InvoiceView";
import SignInModal from "../SignInModal";
import EditInvoiceForm from "../EditInvoiceForm";
import Dashboard from "../Dashboard";
import Navigation from "../Navigation/Navigation";
import SignUpStepper from "../SignUpStepper/";
import CreateInvoiceStepper from "../CreateInvoiceStepper";

import UserContext from "../../context/UserContext";
import "./App.css";
import Error404Page from "./../Errors/404/404";
import Error500Page from "./../Errors/500/500";

const App = props => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [toggleAuth, setToggleAuth] = useState(false);
  const [toggleSignIn, setToggleSignIn] = useState(false);

  const context = useContext(UserContext);

  const getUser = async () => {
    await context.getUser();
    console.log(context.user.companies, "here");
    setLoggedIn(true);
    if (context.user.companies.length === 0) {
      props.history.push(`/user/${context.user._id}/setup`);
    } else {
      props.history.push(`/user/${context.user._id}/dashboard`);
    }
  };

  useEffect(() => {
    getUser();
    //console.log("this is my context", context);
  }, [loggedIn]);

  const toggleAuthModal = () => {
    return setToggleAuth(!toggleAuth);
  };

  const signInModal = () => {
    return setToggleSignIn(!toggleSignIn);
  };

  const signOut = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
        withCredentials: true
      })
      .then(() => {
        setLoggedIn(!loggedIn);
        window.location.replace("/");
      })
      .catch(err => console.log(err));
  };

  const createPDF = invoice => {
    const file = {
      company: invoice.company,
      customer: invoice.customer,
      balance: invoice.balance,
      date: invoice.date,
      discount: invoice.discount,
      dueDate: invoice.dueDate,
      description: invoice.description,
      items: invoice.items,
      notes: invoice.notes,
      number: invoice.number,
      terms: invoice.terms,
      shipping: invoice.shipping,
      subtotal: invoice.subtotal,
      tax: invoice.tax,
      total: invoice.total
    };
    axios
      .post("https://pdf-server-invoice.herokuapp.com/create-pdf", file)
      .then(() =>
        axios.get("https://pdf-server-invoice.herokuapp.com/fetch-pdf", {
          responseType: "blob"
        })
      )
      .then(res => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, `${file.number}-invoice.pdf`);
      })
      .catch(err => {
        console.log(err);
        return "Error";
      });
  };

  const appPadding = loggedIn ? `128px` : `64px`;

  return (
    <div className="App" style={{ marginTop: appPadding }}>
      <Navigation
        handleSignIn={signInModal}
        handleSignOut={signOut}
        loggedIn={loggedIn}
      />
      {toggleSignIn ? (
        <SignInModal click={signInModal} auth={toggleAuthModal} />
      ) : null}
      <section className="routes-container">
        <Route path="/user/:id/billing" component={BillingPage} />
        <Route path="/user/:id/dashboard" component={Dashboard} />
        <Route
          path="/user/:id/setup"
          render={props => <SignUpStepper {...props} />}
        />
        <Route
          path="/user/:id/error/404"
          render={props => <Error404Page {...props} />}
        />
        <Route
          path="/user/:id/error/500"
          render={props => <Error500Page {...props} />}
        />
        <Route
          path="/user/:id/invoice/create"
          render={props => (
            <CreateInvoiceStepper {...props} click={createPDF} />
          )}
        />
        <Route path="/user/:id/settings" component={SettingsPage} />
        <Route exact path="/" render={props => <LandingPage {...props} />} />
        <Route
          path="/user/:id/invoices"
          render={props => <InvoiceList {...props} click={createPDF} />}
        />
        <Route
          path="/user/:id/invoice/:invoiceID/view"
          render={props => <InvoiceView {...props} />}
        />
        <Route
          path="/user/:id/invoice/:invoiceID/edit"
          render={props => <EditInvoiceForm {...props} />}
        />
      </section>
    </div>
  );
};

export default withRouter(App);
