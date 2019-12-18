/* eslint-disable eqeqeq */
import React from 'react';

import { connect } from "react-redux";
import cstyle from './style.scss';
import gStyle from '../../../style/index.scss';
const style = {...gStyle, ...cstyle};


import { getEthSatus, getBlockByNumber } from '../../../api/explorer';
import * as blockchainAction from '../../../modules/blockchain/blockchain.action';
import { Link } from "react-router-dom";

class Body extends React.Component {

	handleScroll = (e) => {
		(window.pageYOffset || document.documentElement.scrollTop) ?
			this.state.isTop && this.setState({ isTop: false })
			: !this.state.isTop && this.setState({ isTop: true });
	}

	onClickloadMoreBlock = (e)=>{
		// eslint-disable-next-line no-console
		console.log('onClickloadMoreBlock', this.props.blocks);

		const length = this.props.blocks.length;
		let prevBN = this.props.blocks[length - 1].number - 1;
		if (prevBN > 0){
			getBlockByNumber(prevBN, ( result ) => {
				this.props.setPrevBlock(result);
			});
		}
		
	}


	toggleMobileMenu = () => this.setState(prev => ({ mobileMenuOpened: !prev.mobileMenuOpened }));

	getCurrentBlock = () => {
		getEthSatus((data) => {
			this.props.setEthState(data);
			// setTimeout(() => {
			// 	this.getCurrentBlock();
			// }, 1000 * 10);
		});
	}

	getDiffTimeStr(timeVal){
		let now = Math.round(new Date().getTime()/1000);
		let diff = (now - timeVal);
		let result = `${diff} seconds ago`;
		if (diff > 60 ){
			result = `${Math.round(diff/60)} minutes ago`;
		}

		if (diff > 3600 ){
			result = `${Math.round(diff/3600)} hours ago`;
		}

		return result;
	}

	constructor(props){
		super(props);
	}
    
	componentDidMount(){
		
		// window.addEventListener('scroll', this.handleScroll);
		this.getCurrentBlock();
		
	}

	componentWillUnmount(){
		window.removeEventListener('scroll', this.handleScroll);
		
	}

	componentWillReceiveProps(props){
		console.log("props ---->", props);
	}

	render() {
		
		const blocks = this.props.blocks;
		console.log("blocks =====> ", blocks);
		

		return (
			<div>
				<button className={`${style["uk-button"]} ${style["uk-button-default"]}`} onClick={this.onClickloadMoreBlock}>Load More Block</button>
				<div className={`${style.fanEthStatsContainer}`} >
					<table className={`${style["uk-table"]} ${style["uk-table-divider"]}`} >
						<thead>
							<tr>
								<th>Block Number</th>
								<th>Block Hash</th>
								<th>Time Stamp</th>
							</tr>
						</thead>
						<tbody>
							{
								blocks.map((val, index) => (
									<tr key={index}>
										<td>#{val.number}</td>
										<td>
											<Link to={`/blockDatail/${val.hash}`} className={`${style["uk-button uk-button-text"]}`}>{val.hash}</Link>
											{/* <h1>{val.hash}</h1> */}
										</td>
										<td>{this.getDiffTimeStr(val.timestamp)}</td>
									</tr>
								))
							}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}


const mapStateToProps = ({ blockchain }) => ({
	blocks: blockchain.blocks,
	count: blockchain.count
});

export default connect(
	mapStateToProps,
	{
		...blockchainAction
	}
)(Body);