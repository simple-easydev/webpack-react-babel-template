import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { getBlock, getBlockByNumber, getTranaction } from '../../api/explorer';
import style from './style.scss';
import { Link } from "react-router-dom";
import fontawesome from '../css/fontawesome/all.css';
import TransactionDetail from '../transactionDetail';


class Blockdetail extends Component {

	onClickParentAddress(parentHash){

		this.setState({ address: parentHash });
		getBlock(this.state.address, (data) => {
			this.setState({ block: data });
		});
	}

	getPrevBlock(){
		let currentBlockNumber = 0;
		if (this.state.block) currentBlockNumber = this.state.block.number;
		if (currentBlockNumber > 0){
			getBlockByNumber(currentBlockNumber - 1, (result) => {
				this.setState({ block: result });
				if (result.transactions.length > 0){
					this.getTransaction(result.transactions[0]);
				}
			});
		}
	}

	getNextBlock(){
		let currentBlockNumber = 0;
		if (this.state.block) currentBlockNumber = this.state.block.number;
		if (currentBlockNumber > 0){
			getBlockByNumber(currentBlockNumber + 1, (result) => {
				this.setState({ block: result });
				if (result.transactions.length > 0){
					this.getTransaction(result.transactions[0]);
				}
			});
		}
	}

	getTransaction(transactionAddr){

		getTranaction(transactionAddr, (result) => {
			console.log(result);
			this.setState({ transaction: result });
			
		});
	}

	constructor(props){
		super(props);
		this.state = {
			block: null,
			address: this.props.match.params.address,
			transaction: null
		};
	}

	componentWillMount(){

		
		console.log("ADDRESS ---> ", this.state.address);

		getBlock(this.state.address, (data) => {
			this.setState({ block: data });
			if (data.transactions.length > 0){
				this.getTransaction(data.transactions[0]);
			}
		});
	}

	// componentDidUpdate(prevState, prevPros){
	// 	console.log(prevState.address, this.address);
	// }

	render() {
		const block = this.state.block;
		console.log("transaction detail ----->", this.state.transaction);
		console.log("block detail ---->", block);
		if (block){
			return (
				<div className={`uk-card uk-card-default ${style.fanEthBlockDetail}`}>
					<div className="uk-card-header">
						<div className="uk-grid-small uk-flex-middle" uk-grid>
							<h4>Block Details</h4>
							<div>{block.hash}</div>
						</div>
					</div>
					<div className="uk-card-body">
						<div className={style.row}>
							<div className={style.col3}>
								Block Number
							</div>
							<div className={style.col7}>
								<i className={`${style['left-arrow']} ${fontawesome.fa} ${fontawesome['fa-chevron-left']}`} onClick = {()=>this.getPrevBlock()}/>
								{block.number}
								<i className={`${style['right-arrow']} ${fontawesome.fa} ${fontawesome['fa-chevron-right']}`} onClick = {()=>this.getNextBlock()}/>
							</div>
						</div>

						<div className={style.row}>
							<div className={style.col3}>
								Timestamp
							</div>
							<div className={style.col7}>
								{block.timestamp}
							</div>
						</div>

						<div className={style.row}>
							<div className={style.col3}>
								Nonce
							</div>
							<div className={style.col7}>
								{block.nonce}
							</div>
						</div>
						<div className={style.row}>
							<div className={style.col3}>
								ParentHash
							</div>
							<div className={style.col7}>
								<div className={style['block-detail-parent-hash']} onClick={() => {this.onClickParentAddress(block.parentHash)}}>{block.parentHash}</div>
								{/* <Link onClick = { ()=> {this.onClickParentAddress(block.parentHash)}} href={`/blockDatail/${block.parentHash}`} className="uk-button uk-button-text">{block.parentHash}</Link> */}
							</div>
						</div>
						<div className={style.row}>
							<div className={style.col3}>
								size
							</div>
							<div className={style.col7}>
								{block.size}
							</div>
						</div>

						<div className={style.row}>
							<div className={style.col3}>
								Difficulty
							</div>
							<div className={style.col7}>
								{block.difficulty}
							</div>
						</div>

						<div className={style.row}>
							<div className={style.col3}>
								Total Difficulty
							</div>
							<div className={style.col7}>
								{block.totalDifficulty}
							</div>
						</div>


						<div className={style.row}>
							<div className={style.col3}>
								transactions
							</div>
							<div className={style.col7}>
								{block.transactions.map((transaction, index) => (<div key={index} className={style.transactionLink} onClick={()=>this.getTransaction(transaction)}>{transaction}</div>))}
							</div>
						</div>

						<div className={style.row}>
							<TransactionDetail transaction={this.state.transaction} />
						</div>

					</div>
					<div className="uk-card-footer">
						<Link href="/" className="uk-button uk-button-text">Back</Link>
					</div>
				</div>
			);
		}
		
		return (<div>loading...</div>);
		
		
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
)(Blockdetail);