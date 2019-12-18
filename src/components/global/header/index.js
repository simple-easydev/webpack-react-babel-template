import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import SearchBar from '../../search-bar';
import cstyle from './style.scss';
import gStyle from '../../../style/index.scss';
const style = {...cstyle, ...gStyle};


class Header extends Component {

	handleScroll = (e) => {
		(window.pageYOffset || document.documentElement.scrollTop) ?
			this.state.isTop && this.setState({ isTop: false })
			: !this.state.isTop && this.setState({ isTop: true });
	}


	toggleMobileMenu = () => this.setState(prev => ({ mobileMenuOpened: !prev.mobileMenuOpened }));

	constructor(props){
		super(props);
		this.state = {
			loggedOff: false,
			mobileMenuOpened: false,
			isTop: true
		};
	}
    
	componentDidMount(){
		
		window.addEventListener('scroll', this.handleScroll);
		
	}

	componentWillReceiveProps(nextProps){
		
	}
	

	componentWillUnmount(){
		window.removeEventListener('scroll', this.handleScroll);
	}

	render() {
		console.log(style);

		return (
			<div className={`${style["uk-background-primary"]} ${style.fanEthHeader}`}>
				<h1> Block Explorer</h1>

				<div className={`${style.searchBarContainer}`}>
					<SearchBar />
				</div>
				
			</div>
		);
	}
}


const mapStateToProps = (state) => ({
	
});


const mapDispatchToProps = dispatch => bindActionCreators({
	
}, dispatch);


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);