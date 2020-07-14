import React , { Component, useState, useEffect } from 'react';
import { connect } from "react-redux";
import style from "./style.scss";

import history from "../../../modules/history";

const Home = (props) => {
	const [state, setState] = useState({currentUrl:""});
	const render = () => {

		const on_click_obtain_devices = () => {

			console.log("onClickObjtainDevices");
			history.push("/devices");

		}

		return (
			<div className = {style['home-container']}>
				<button className={`${style["uk-button"]} ${style["uk-button-default"]}`} onClick={on_click_obtain_devices}>Objtain Devices</button>
			</div>
		);
	}
	return render();
}

export default Home;