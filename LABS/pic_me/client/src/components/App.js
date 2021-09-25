import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { StripeProvider } from 'react-stripe-elements';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import reducer from '../reducers';

// Common Components
import Navigation from './Navigation';
import Footer from './Footer';
import About from './About';

// Gatekeeper HOC
import Gatekeeper from './Gatekeeper';

// Views for Authentication
import SignUp from './auth/SignUp';
import Login from './auth/Login';
import Logout from './auth/Logout';
import ForgotPassword from './auth/Forgotpassword';
import Mobil from './auth/Mobil';

// Photo Views
import Upload from './picture/Upload';
import Browse from './picture/Browse';
import MyUploads from './picture/MyUploads';
import MyCollection from './picture/MyCollection';

// General Views
import Landing from './Landing';
import Settings from './settings/Settings';
import Billings from './Billings';
import Feature from './Feature';
import Bread from './Bread';

// const store = createStore(reducer, applyMiddleware(logger, thunk));
const store = createStore(reducer, applyMiddleware(thunk));

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<StripeProvider apiKey="pk_test_0srJ0Qu3Z68ZEAsuJnLERMWr">
					<Router>
						<div className="App">
							<Navigation />
							<Bread />
							<Switch>
								<Route exact path="/" component={Landing} />
								<Route exact path="/billing" component={Gatekeeper(Billings)} />
								<Route exact path="/mobil" component={Mobil} />
								<Route
									exact
									path="/settings"
									component={Gatekeeper(Settings)}
								/>
								<Route exact path="/signup" component={SignUp} />
								<Route exact path="/login" component={Login} />
								<Route
									exact
									path="/picture_upload"
									component={Gatekeeper(Upload)}
								/>
								<Route
									exact
									path="/picture_my_uploads"
									component={Gatekeeper(MyUploads)}
								/>
								<Route
									exact
									path="/picture_browse"
									component={Gatekeeper(Browse)}
								/>
								<Route exact path="/logout" component={Logout} />
								<Route
									exact
									path="/forgotpassword"
									component={ForgotPassword}
								/>
								<Route exact path="/feature" component={Gatekeeper(Feature)} />
								<Route
									exact
									path="/picture_upload"
									component={Gatekeeper(Upload)}
								/>
								<Route
									exact
									path="/picture_browse"
									component={Gatekeeper(Browse)}
								/>
								<Route
									exact
									path="/picture_my_uploads"
									component={Gatekeeper(MyUploads)}
								/>
								<Route
									exact
									path="/picture_my_collection"
									component={Gatekeeper(MyCollection)}
								/>
								<Route exact path="/about" component={About} />
							</Switch>
							<Footer />
						</div>
					</Router>
				</StripeProvider>
			</Provider>
		);
	}
}

export default App;
