import { apiUrls } from './index';
import axios  from 'axios';
import Web3 from 'web3';

const provider_url = 'http://3.94.204.181/eth';
// const provider_url = "http://18.208.225.186/eth";
const web3 = new Web3();
const basictoken = authenticateUser('fanthebase', 'Y!*w[dX}5<Qe4kZ!');
web3.setProvider(new Web3.providers.HttpProvider(provider_url, { headers: [{ name: 'Authorization', value: `${basictoken}` }] }));

function authenticateUser(user, password){
	let token = user + ':' + password;

	// Should i be encoding this value????? does it matter???
	// Base64 Encoding -> btoa
	let hash = btoa(token);
	return 'Basic ' + hash;
}


export function getEthSatus(callback){
	axios({
		method: 'get',
		url: apiUrls.GET_ETH_STATS,
		responseType: 'json',
		auth:{
            username: 'username',
            password: 'password'
        }
	}).then((response) => {
		callback(response.data);
	});
}


export function getBlock(address, callback){
	axios({
		method: 'get',
		url: apiUrls.GET_BLOCK,
		responseType: 'json',
		params: {
			blockNumber: address
		},
		auth:{
            username: 'username',
            password: 'password'
        }
	}).then((response) => {
		callback(response.data);
	});
}

export function getBlockByNumber(num, callback){

	web3.eth.getBlock(num, ( err, result ) => {
		callback(result);
	});
}

export function getTranaction(transactionAddr, callback){

	web3.eth.getTransaction(transactionAddr, async ( err, result ) => {
		// callback(result);
		const estimatedGas = await web3.eth.estimateGas(result);
		const gasPrice = await web3.eth.getGasPrice();
		const consummedFee = estimatedGas * gasPrice;
		result.fee = consummedFee/1000000000000000000;
		callback(result);
	});
	
}