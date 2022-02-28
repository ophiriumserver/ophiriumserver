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
 		// res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
 		
 		function sort(prop) {    
		    return function(a, b) {    
		        if (a[prop] > b[prop]) {    
		            return -1;    
		        } else if (a[prop] < b[prop]) {    
		            return 1;    
		        }    
		        return 0;    
		    }    
		} 

 		// Authorization
 		let jwtUtil = require('../models/jwt.js');
		jwtUtil.verify({
			token: req.params.id
		}, function(response) {
			console.log(response);
			if(response.data == undefined) {
				// Transaction Failed
				res.status(200).json({
		 			timestamp: Math.floor(Date.now()).toString(),
					status: "200",
					message: 'Request processed successfully',
					path: req.originalUrl,
					data: {
						status_description: "Transaction Failed",
						status_code: "ER.00.00"
					}
				});
			} else {

				let firebaseUtil = require('../models/firebase.js');
				let account_id = response.data.account_id;
				// console.log('account_id: ' + account_id);

				firebaseUtil.read({
					table: 'database/account/' + account_id + '/transaction',
				}, function(response) {
					if(response.error != undefined) {
						res.status(200).json({
				 			timestamp: Math.floor(Date.now()).toString(),
							status: "200",
							message: 'Request processed successfully',
							path: req.originalUrl,
							data: {
								status_description: "Transaction Failed",
								status_code: "ER.00.00",
								error: response.error
							}
						});
					} else { 

						
						let transferLimit = [];
						try {
							let transaction = [];
							for (const [key, value] of Object.entries(response.data)) {
								// if(count <= 15) {
								transaction.push(value.data);
								// }
							}
							transaction.sort(sort('iat'));

							let count = 0;
							for (const [key, value] of Object.entries(transaction)) {
								count++;

								if(count <= 15) {
									transferLimit.push(value);
								}
							}
						}
						catch (e) {
						}

						res.status(200).json({
				 			timestamp: Math.floor(Date.now()).toString(),
							status: "200",
							message: 'Request processed successfully',
							path: req.originalUrl,
							data: {
								status_description: "Transaction Successful",
								status_code: "OK.00.00",
								transaction: transferLimit
							}
						});

					}
				});

			}
		});

	},
	save:function(req, res, next){
		console.log('POST a data');
		console.log(req.body);
		
		// Authorization
		if(req.headers.authorization == undefined) {
			res.status(200).json({
	 			timestamp: Math.floor(Date.now()).toString(),
				status: "200",
				message: 'Request processed successfully',
				path: req.originalUrl,
				data: {
					status_description: "Transaction Failed",
					status_code: "ER.00.00",
					error: "No Authorization"
				}
			});
			res.sendStatus(200);
		} 

 		let jwtUtil = require('../models/jwt.js');
		jwtUtil.verify({
			token: req.headers.authorization
		}, function(response) {
			let account_id = response.data.account_id;

			if(response.data == undefined) {
				// Transaction Failed
				res.status(200).json({
		 			timestamp: Math.floor(Date.now()).toString(),
					status: "200",
					message: 'Request processed successfully',
					path: req.originalUrl,
					data: {
						status_description: "Transaction Failed",
						status_code: "ER.00.00",
						error: "Invalid Authorization"
					}
				});
			} else {
				// Transaction Successful
				console.log(response);

				let firebaseUtil = require('../models/firebase.js');

				// Get Balance
				firebaseUtil.read({
					table: 'database/account/' + response.data.account_id
				}, function(response) {

					if(response.error != undefined) {
				  		res.status(200).json({
				 			timestamp: Math.floor(Date.now()).toString(),
							status: "200",
							message: 'Request processed successfully',
							path: req.originalUrl,
							data: {
								status_description: "Transaction Failed",
								status_code: "ER.00.00",
								error: response.error
							}
						});
					} else {
						// console.log(response.data.reward_point);
						let account = {
							incentive_amount: 0,
							balance_amount: 0,
							transaction_amount: 0,
							transfer_debit_amount: 0,
							transfer_credit_amount: 0,
							total_balance_amount: 0,
						}

						try {
							// Get total incentive amount
							for (const [key, value] of Object.entries(response.data.incentive)) {
								account.incentive_amount += value.data.reward_point;
							}
						}
						catch (e) {
						}

						try {
							// Get total balance amount
							for (const [key, value] of Object.entries(response.data.reward_point)) {
								account.balance_amount += value.data.reward_point;
							}
						}
						catch (e) {
						}

						try {
							// Get total transaction amount
							for (const [key, value] of Object.entries(response.data.transaction)) {
								account.transaction_amount += value.data.reward_point;
							}
						}
						catch (e) {
						}

						try {
							// Get total transfer debit amount
							for (const [key, value] of Object.entries(response.data.transfer)) {
								if(value.data.process === 'DEBIT') {
									account.transfer_debit_amount += value.data.reward_point;
								}
							}
						}
						catch (e) {
						}

						try {
							// Get total transfer credit amount
							for (const [key, value] of Object.entries(response.data.transfer)) {
								if(value.data.process === 'CREDIT') {
									account.transfer_credit_amount += value.data.reward_point;
								}
							}
						}
						catch (e) {
						}

						account.total_balance_amount = Math.max(0, (account.balance_amount + account.incentive_amount + account.transfer_credit_amount) - (account.transaction_amount + account.transfer_debit_amount));

						// console.log(account);
						global.account = {
							balance: 0
						}
						global.account.balance = account.total_balance_amount;

						// res.status(200).json({
				 	// 		timestamp: Math.floor(Date.now()).toString(),
						// 	status: "200",
						// 	message: 'Request processed successfully',
						// 	path: req.originalUrl,
						// 	data: {
						// 		status_description: "Transaction Successful",
						// 		status_code: "OK.00.00",
						// 		balance: account.total_balance_amount
						// 		// account_id: response.data.account_id
						// 	}
						// });
					}
				});

				// Get Product
				firebaseUtil.read({
					table: 'database/product'
				}, function(response) {
					if(response.error != undefined) {
				  		res.status(200).json({
				 			timestamp: Math.floor(Date.now()).toString(),
							status: "200",
							message: 'Request processed successfully',
							path: req.originalUrl,
							data: {
								status_description: "Transaction Failed",
								status_code: "ER.00.00",
								error: response.error
							}
						});
					} else {

						// Computation
						let transact = false;
						for (const [key, value] of Object.entries(response.data)) {
							if(req.body.product_id === value.data.product_id) {
								console.log('Balance: ' + global.account.balance);
								console.log('Cost: ' + value.data.reward_point);
								if(global.account.balance >= value.data.reward_point) {
									transact = true;
									global.account.balance -= value.data.reward_point;
									global.product = value.data;
									break;
								}
							}
						}

						if(transact) {


							console.log(req.body.parameter);

							let parameter = '';

							for (const [key, value] of Object.entries(req.body.parameter)) {
								parameter += key.toUpperCase() + ': ' + value.toUpperCase() + '\n';
								console.log('key: ' + key);
								console.log('value: ' + value);
							}


							const Vonage = require('@vonage/server-sdk')

							const vonage = new Vonage({
							  apiKey: "39b3790d",
							  apiSecret: "ZZ4c56AtVi8MxQ9h"
							})

							const from = 'Vonage APIs';
							const to = '639916868942';
							const text = parameter;

							vonage.message.sendSms(from, to, text, (err, responseData) => {
							    if (err) {
							        console.log(err);
							        res.status(200).json({
							 			timestamp: Math.floor(Date.now()).toString(),
										status: "200",
										message: 'Request processed successfully',
										path: req.originalUrl,
										data: {
											status_description: "Transaction Failed",
											status_code: "ER.00.00",
											error: err
										}
									});
							    } else {
							        if(responseData.messages[0]['status'] === "0") {
							            console.log('Message sent successfully.');



							            req.body['iat'] = Math.floor(Date.now() / 1000);
										req.body['name'] = global.product.name;
										req.body['reward_point'] = global.product.reward_point;
										req.body['eta'] = global.product.eta;
										req.body['delivered'] = false;
										req.body['claimed'] = false;
										// Save Transaction
										firebaseUtil.create({
											table: 'database/account/' + account_id + '/transaction', 
											data: req.body
										}, function(response) {
											console.log(response);
											if(response.error != undefined) {
										  		res.status(200).json({
										 			timestamp: Math.floor(Date.now()).toString(),
													status: "200",
													message: 'Request processed successfully',
													path: req.originalUrl,
													data: {
														status_description: "Transaction Failed",
														status_code: "ER.00.00",
														error: response.error
													}
												});
											} else {

												  res.json({
										 			timestamp: Math.floor(Date.now()).toString(),
													status: "200",
													message: 'Request processed successfully',
													path: req.originalUrl,
													data: {
														status_description: "Transaction Successful",
														status_code: "OK.00.00",
														reward_point: global.account.balance
													}
												});
											}
										});





							        } else {
							            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);

							            res.status(200).json({
								 			timestamp: Math.floor(Date.now()).toString(),
											status: "200",
											message: 'Request processed successfully',
											path: req.originalUrl,
											data: {
												status_description: "Transaction Failed",
												status_code: "ER.00.00",
												error: `Message failed with error: ${responseData.messages[0]['error-text']}`
											}
										});
							        }
							    }
							});


							

						} else {

							// Raise Insufficient Fund
							res.status(200).json({
					 			timestamp: Math.floor(Date.now()).toString(),
								status: "200",
								message: 'Request processed successfully',
								path: req.originalUrl,
								data: {
									status_description: "Transaction Failed",
									status_code: "ER.00.00",
									error: "Insufficient Ophir",
									// account_id: account_id,
									reward_point: global.account.balance
								}
							});

						}

					}
				});

				



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