/* eslint-disable eqeqeq */
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import style from './style.scss';
import { getEthSatus, getBlockByNumber } from '../../../api/explorer';
import { setEthState, setPrevBlock } from '../../../modules/blockchain/blockchain.action';
import { Link } from "react-router-dom";

class Body extends Component {

	handleScroll = (e) => {
		(window.pageYOffset || document.documentElement.scrollTop) ?
			this.state.isTop && this.setState({ isTop: false })
			: !this.state.isTop && this.setState({ isTop: true });
	}

	onClickloadMoreBlock(e){
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
		this.state = {
			blocks: []
		};
		this.onClickloadMoreBlock = this.onClickloadMoreBlock.bind(this);
	}
    
	componentDidMount(){
		
		// window.addEventListener('scroll', this.handleScroll);
		this.getCurrentBlock();
		
	}

	componentWillUnmount(){
		window.removeEventListener('scroll', this.handleScroll);
		
	}

	render() {
		
		const blocks = this.props.blocks;

		return (
			<div>
				<button className={`uk-button uk-button-default`} onClick={this.onClickloadMoreBlock}>Load More Block</button>
				<div className={`${style.fanEthStatsContainer}`} >
					<table className="uk-table uk-table-divider">
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
									<tr>
										<td>#{val.number}</td>
										<td>
											<Link href={`/blockDatail/${val.hash}`} className="uk-button uk-button-text">{val.hash}</Link>
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


const mapStateToProps = (state) => ({
	blocks: state.block.blocks
});


const mapDispatchToProps = dispatch => bindActionCreators({
	setEthState, setPrevBlock
}, dispatch);


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Body);