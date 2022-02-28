/* 
 * Copyright (C) MOTHER - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by 
 * Mac Neil Ivan Tumacay <tumacayivan@gmail.com>, 04/20/2021
 */

module.exports = {
	get:function(req, res, next){
 		console.log('GET all data');
 		res.json({
 			timestamp: Math.floor(Date.now()).toString(),
			status: "200",
			message: 'Request processed successfully',
			path: req.originalUrl,
			data: {
				status_description: "Transaction Successful",
				status_code: "OK.00.00"
			}
		});
	},
	getById:function(req, res, next){
 		console.log('GET data by Id');
 		console.log(req.params.id);

 		const Web3 = require('web3')
		const rpcURL = 'https://rinkeby.infura.io/v3/0b3a7572e719498abed3fb6f6723dd76'
		const web3 = new Web3(rpcURL)

		let tokenAddress = "0x5d2905cf4119f34247ddc63014da3933b58aead0";
		let walletAddress = req.params.id;


		if(!Web3.utils.isAddress(walletAddress)) {
			res.json({
	 			timestamp: Math.floor(Date.now()).toString(),
				status: "200",
				message: 'Request processed successfully',
				path: req.originalUrl,
				data: {
					status_description: "Transaction Failed",
					status_code: "ER.00.00"
				}
			});
		}

		// let walletAddress = "0x85b8799d23fd6e9b841d4348250fc79d4ac7d77c";

		// The minimum ABI to get ERC20 Token balance
		let minABI = [
		  // balanceOf
		  {
		    "constant":true,
		    "inputs":[{"name":"_owner","type":"address"}],
		    "name":"balanceOf",
		    "outputs":[{"name":"balance","type":"uint256"}],
		    "type":"function"
		  },
		  // decimals
		  {
		    "constant":true,
		    "inputs":[],
		    "name":"decimals",
		    "outputs":[{"name":"","type":"uint8"}],
		    "type":"function"
		  }
		];

		let contract = new web3.eth.Contract(minABI,tokenAddress);
		async function getBalance() {
		  balance = await contract.methods.balanceOf(walletAddress).call();
		  return balance;
		}

		// console.log(getBalance());

		getBalance().then(function (result) {
		    console.log(result);

		    res.json({
	 			timestamp: Math.floor(Date.now()).toString(),
				status: "200",
				message: 'Request processed successfully',
				path: req.originalUrl,
				data: {
					status_description: "Transaction Successful",
					status_code: "OK.00.00",
					balance: result
				}
			});
		});

 	// 	res.json({
 	// 		timestamp: Math.floor(Date.now()).toString(),
		// 	status: "200",
		// 	message: 'Request processed successfully',
		// 	path: req.originalUrl,
		// 	data: {
		// 		status_description: "Transaction Successful",
		// 		status_code: "OK.00.00"
		// 	}
		// });
	},
	save:function(req, res, next){
		console.log('POST a data');
		console.log(req.body);

		/* TRANSFER BABEL */

		const Web3 = require('web3')
		const Tx = require('ethereumjs-tx').Transaction

		const Web3js = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/0b3a7572e719498abed3fb6f6723dd76'))

		let tokenAddress = '0x5d2905cf4119f34247ddc63014da3933b58aead0' // HST contract address
		let toAddress = req.body.recipient // where to send it
		// let toAddress = '0xfb4b13e176690fe3c2bb24de346d8e4e8e9ecccd' // where to send it
		let fromAddress = '0x85b8799d23fd6e9b841d4348250fc79d4ac7d77c' // your wallet
		let privateKey = Buffer.from('47aef6f405a039bdce9ee5006800579bb7f66ead0597bce6b4ce6a893704e2c6', 'hex')

		let contractABI = [
		  // transfer
		  {
		    'constant': false,
		    'inputs': [
		      {
		        'name': '_to',
		        'type': 'address'
		      },
		      {
		        'name': '_value',
		        'type': 'uint256'
		      }
		    ],
		    'name': 'transfer',
		    'outputs': [
		      {
		        'name': '',
		        'type': 'bool'
		      }
		    ],
		    'type': 'function'
		  }
		]

		let contract = new Web3js.eth.Contract(contractABI, tokenAddress, {from: fromAddress})

		// 1e18 === 1 HST
		let amount = Web3js.utils.toHex(req.body.amount)
		// let amount = Web3js.utils.toHex(1e18)

		Web3js.eth.getTransactionCount(fromAddress)
		  .then((count) => {
		    let rawTransaction = {
		      'from': fromAddress,
		      'gasPrice': Web3js.utils.toHex(20 * 1e9),
		      'gasLimit': Web3js.utils.toHex(210000),
		      'to': tokenAddress,
		      'value': 0x0,
		      'data': contract.methods.transfer(toAddress, amount).encodeABI(),
		      'nonce': Web3js.utils.toHex(count)
		    }
		    let transaction = new Tx(rawTransaction, {chain: 'rinkeby'})
		    transaction.sign(privateKey)
		    Web3js.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
		      .on('transactionHash', console.log)
		  })







		/* TRANSFER ETHEREUM */

		// const Web3 = require("web3");
		// const EthereumTx = require('ethereumjs-tx').Transaction;
		// const axios = require('axios');
		// const ethNetwork = 'https://rinkeby.infura.io/v3/0b3a7572e719498abed3fb6f6723dd76';
		// const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

		// console.log(web3.eth.accounts.create());
		 
		// async function transferFund(sendersData, recieverData, amountToSend) {
		//     return new Promise(async (resolve, reject) => {
		//         var nonce = await web3.eth.getTransactionCount(sendersData.address);
		//         web3.eth.getBalance(sendersData.address, async (err, result) => {
		//             if (err) {
		//                 return reject();
		//             }
		//             let balance = web3.utils.fromWei(result, "ether");
		//             console.log(balance + " ETH");
		//             if(balance < amountToSend) {
		//                 console.log('insufficient funds');
		//                 return reject();
		//             }
		   
		//             let gasPrices = await getCurrentGasPrices();
		//             let details = {
		//                 "to": recieverData.address,
		//                 "value": web3.utils.toHex(web3.utils.toWei(amountToSend.toString(), 'ether')),
		//                 "gas": 21000,
		//                 "gasPrice": gasPrices.low * 1000000000,
		//                 "nonce": nonce,
		//                 "chainId": 4 // EIP 155 chainId - mainnet: 1, rinkeby: 4
		//             };
		           
		//             const transaction = new EthereumTx(details, {chain: 'rinkeby'});
		//             let privateKey = sendersData.privateKey.split('0x');
		//             let privKey = Buffer.from(privateKey[1],'hex');
		//             transaction.sign(privKey);
		           
		//             const serializedTransaction = transaction.serialize();
		           
		//             web3.eth.sendSignedTransaction('0x' + serializedTransaction.toString('hex'), (err, id) => {
		//                 if(err) {
		//                     console.log(err);
		//                     return reject();
		//                 }
		//                 const url = `https://rinkeby.etherscan.io/tx/${id}`;
		//                 console.log(url);
		//                 resolve({id: id, link: url});
		//             });
		//         });
		//     });
		// }

		// async function getCurrentGasPrices() {
		//     let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json');
		//     let prices = {
		//       low: response.data.safeLow / 10,
		//       medium: response.data.average / 10,
		//       high: response.data.fast / 10
		//     };
		//     return prices;
		// }

		// async function getBalance(address) {
		//     return new Promise((resolve, reject) => {
		//         web3.eth.getBalance(address, async (err, result) => {
		//             if(err) {
		//                 return reject(err);
		//             }
		//             resolve(web3.utils.fromWei(result, "ether"));
		//         });
		//     });
		// }

		// transferFund({address: '0x85b8799d23fd6e9b841d4348250fc79d4ac7d77c', privateKey: '0x47aef6f405a039bdce9ee5006800579bb7f66ead0597bce6b4ce6a893704e2c6'},{address: '0xfb4b13e176690fe3c2bb24de346d8e4e8e9ecccd'},0.10)

		res.json({
 			timestamp: Math.floor(Date.now()).toString(),
			status: "200",
			message: 'Request processed successfully',
			path: req.originalUrl,
			data: {
				status_description: "Transaction Successful",
				status_code: "OK.00.00"
			}
		});
  	},
	update:function(req, res, next){
		console.log('UPDATE data by Id');
		console.log(req.params.id);
		console.log(req.body);
		res.json({
 			timestamp: Math.floor(Date.now()).toString(),
			status: "200",
			message: 'Request processed successfully',
			path: req.originalUrl,
			data: {
				status_description: "Transaction Successful",
				status_code: "OK.00.00"
			}
		});
  	},
	delete:function(req, res, next){
		console.log('DELETE data by Id');
		console.log(req.params.id);
		res.json({
 			timestamp: Math.floor(Date.now()).toString(),
			status: "200",
			message: 'Request processed successfully',
			path: req.originalUrl,
			data: {
				status_description: "Transaction Successful",
				status_code: "OK.00.00"
			}
		});
  	}
}