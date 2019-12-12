import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import style from './style.scss';

class Footer extends Component {

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
		return (
			<div className={`uk-background-secondary ${style.fanEthFooter}`}>
				<div />
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
)(Footer);