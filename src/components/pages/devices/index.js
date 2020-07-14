import React , { Component, useState, useEffect } from 'react';
import { connect } from "react-redux";
// import * as blockchainAction from '../modules/blockchain/blockchain.action';

import ReactLoading from "react-loading";
import * as deviceAction from "../../../modules/devices/devices.action";

import style from "./style.scss";

const Devices = (props) => {

    const [state, setState] = useState({currentUrl:""});

    useEffect(()=>{
        props.getDeviceListSaga();   
    }, [])

    useEffect(()=>{
        console.log("devices ---->", props.devices);
    }, [props.devices])

    const on_click_restart_btn = (e, dataId, index) => {
        console.log("on_click_restart_btn -> ", dataId, index);
        e.preventDefault();
        if(props.reBootDeviceSaga) props.reBootDeviceSaga(dataId, index);
        
    }

    const renderFrequencyControl = (controlFrequency, overviewFrequency) => {

        if(controlFrequency == "rebooting"){
            return <td className = {style['rebooting']}>REBOOTING</td>
        }else{

            if(controlFrequency){
                if(controlFrequency != overviewFrequency){
                    return <td className = {style['red-background']}>{controlFrequency}</td>
                }else{
                    return <td className = {style['text-right']}>{controlFrequency}</td>
                }
            }else{
                return <td className = {style['text-right']}><div className = {`${style["reloading"]}`}><ReactLoading type="spinningBubbles" color="#fff" width={32} height={32} color = {"grey"} /></div></td>
            }
        }
        
    }

    const renderReBootBtn = (identification, overviewFrequency, index) => {
        const controlFrequency = identification.controlFrequency;
        if(controlFrequency == "rebooting"){
            return <div className = {`${style["reloading"]}`}><ReactLoading type="spinningBubbles" color="#fff" width={32} height={32} color = {"grey"} /></div>
        }else{
            // return <button className={`${style["uk-button"]} ${style["uk-button-default"]}`} onClick={(e)=>on_click_restart_btn(e, identification.id, index)}>Reboot</button>

            if(controlFrequency != overviewFrequency && controlFrequency){
                return <button className={`${style["uk-button"]} ${style["uk-button-default"]}`} onClick={(e)=>on_click_restart_btn(e, identification.id, index)}>Reboot</button>
            }else{
                return "";
            }
        }
    }

	const render = () => {
        const {devices} = props;
		return (
			<div className = {style['device-list-container']}>
                <table className={`${style["uk-table"]} ${style["uk-table-divider"]} ${style["uk-table-middle"]}`} >
						<thead>
							<tr>
								<th>ID</th>
								<th>Site Name</th>
								<th>Name</th>
                                <th>Overview Frequency</th>
                                <th>Link Score</th>
                                <th>Control Frequency</th>
                                <td></td>
							</tr>
						</thead>
						<tbody>
							{
								devices.map((ele, index) => {
                                    const identification =  ele.identification;
                                    const overview =  ele.overview;
                                    let linkScore = "";
                                    try {
                                        linkScore = overview.linkScore.linkScore;
                                    } catch (error) {
                                        console.log(error);
                                    }

                                    let frequency = "";
                                    try {
                                        frequency = overview.frequency;
                                    } catch (error) {
                                        console.log(error);
                                    }

                                    const controlFrequency = identification.controlFrequency;

                                    return (
                                        <tr key={index}>
                                            <td>{identification.id}</td>
                                            <td>{identification.site.name}</td>
                                            <td>{identification.name}</td>
                                            <td className = {style['text-right']}>{frequency}</td>
                                            <td className = {style['text-right']} style = {{background:(linkScore>0.8)?"white":"yellow"}}>{linkScore}%</td>
                                                {renderFrequencyControl(controlFrequency, frequency)}
                                            <td style = {{textAlign:"center"}}>
                                                {renderReBootBtn(identification, frequency, index)}
                                            </td>
                                        </tr>
                                    )
                                })
							}
						</tbody>
					</table>
			</div>
		);
	}
	return render();
}

const mapStateToProps = ({ device }) => ({
	devices:device.devices
});

export default connect(
	mapStateToProps,
	{...deviceAction}
)(Devices);