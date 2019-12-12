import React , { Component } from 'react';
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import ReactGA from 'react-ga';
import Header from './global/header';
import Body from './global/body';
import BlockDetail from './blockDetail';
// import './css/animate.scss';


export const routes = {
	HOME: '/'
};

class App extends Component {

	handleRoute = e => {
		ReactGA.pageview(e.url);
		this.setState({ currentUrl: e.url });
	};

	constructor(props){
		super(props);
		this.state = {
			currentUrl: ''
		};
		
	}

	componentWillMount() {
		ReactGA.initialize('UA-127710081-1');
	}

	renderDefaultRoutes = () => [
		// <Body path="/" />,
		// <BlockDetail path="/blockDatail/:address" />
	]
	// 	return (
	// 		// [
	// 		// 	<div>
	// 		// 		<Body path="/" />
	// 		// 	</div>,
	// 		// 	<div path="/blockDatail/:address">
	// 		// 		<h1>test</h1>
	// 		// 	</div>
	// 		// ]
			
	// 	);
	// }

	render() {
		
		return (
			<div>
				<Header currentUrl={this.state.currentUrl} />
				<div className="mainContainer" style={{ minHeight: window.outerHeight - 80 }}>
					{/* <Router onChange={this.handleRoute}>
						{this.renderDefaultRoutes()}
					</Router> */}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	
});

export default connect(
	mapStateToProps,
	null
)(App);