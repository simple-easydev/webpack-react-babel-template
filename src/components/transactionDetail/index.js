import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import style from './style.scss';
import fontawesome from '../css/fontawesome/all.css';

class TransactionDetail extends Component {

	constructor(props){
		super(props);
		this.state = {
			transaction: null
		};
	}

	componentWillReceiveProps(){
		console.log("componentWillReceiveProps");
	}
    
	render(){
		console.log("transaction detail ----->", this.props.transaction);
		return (
			<div className={style.row}>
				{this.props.transaction &&
				<div className={style.row}>
					<div className={style.col3}>
						Transaction Fee:
					</div>
					<div className={style.col7}>
						{this.props.transaction.fee}
					</div>
				</div>
				}
			</div>
		);
	}
}


export default TransactionDetail;