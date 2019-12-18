import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import cstyle from './style.scss';
import gStyle from '../../style/index.scss';
const style = {...gStyle, ...cstyle};

class SearchBar extends Component {

	onClickSearchButton(e){
		// route(`/blockDatail/${this.state.searchval}`, true);
	}

	onChangeSearch(e){
		this.setState({ searchval: e.target.value });
	}

	constructor(props){
		super(props);
		this.state = {
			searchval: ''
		};
		this.onClickSearchButton = this.onClickSearchButton.bind(this);
		this.onChangeSearch = this.onChangeSearch.bind(this);
	}
    
	render() {
		return (
			<div className={`${style["uk-search"]} ${style.fanEthSearchBar}`}>
				<input className={`${style["uk-search-input"]}`} type="search" placeholder="Tx Hash, Address, or Block #" value={this.state.searchval} onChange={this.onChangeSearch} />
				<button className={`${style["uk-button"]} ${style["uk-button-default"]}`} onClick={this.onClickSearchButton}>Search</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	userData: state.loggedInUser,
	locale: state.locale
});


const mapDispatchToProps = dispatch => bindActionCreators({
	
}, dispatch);


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchBar);