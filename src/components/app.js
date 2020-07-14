import React , { Component, useState, useEffect } from 'react';
import { Route, Switch, Router } from "react-router-dom";
import { connect } from "react-redux";

// import './css/animate.scss';

import Home from "./pages/home";
import Devices from "./pages/devices";

const App = (props) => {

	const [state, setState] = useState({currentUrl:""});

	const render = () => {
		return (
			<div>
				<div className="mainContainer" style={{ minHeight: window.outerHeight - 80 }}>
					<Switch>
						<Route exact path = "/devices" component={Devices}/>
						<Route path = "/" component={Home}/>
					</Switch>
				</div>
			</div>
		);
	}
	return render();
}

export default App;