import React, { Component } from 'react';
import { route } from "react-router-dom";

export default class Redirect extends Component {

	componentDidMount(){
		route(this.props.to, true);
	}

	render() {
		return null;
	}
}