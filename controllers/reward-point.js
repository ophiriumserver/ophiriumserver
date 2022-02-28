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
						status_code: "ER.00.00",
						error: "Invalid Authorization"
					}
				});
			} else {
				let firebaseUtil = require('../models/firebase.js');
				let account_id = response.data.account_id;

				let axios = require('axios')
				axios
				  .get(global.application.getConfig().host + '/api/account/blocked/' + req.params.id)
				  .then(response => {
				    // console.log(`statusCode: ${res.status}`)
				    console.log(response.data.data.blocked)
				   	if(response.data.data.blocked === true) {
				   		res.status(200).json({
				 			timestamp: Math.floor(Date.now()).toString(),
							status: "200",
							message: 'Request processed successfully',
							path: req.originalUrl,
							data: {
								status_description: "Transaction Failed",
								status_code: "ER.00.00",
								error: "Account Blocked"
							}
						});
				   	} else {







						// console.log('account_id: ' + account_id);

						// Get Balance
						firebaseUtil.read({
							table: 'database/account/' + account_id
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

								res.status(200).json({
						 			timestamp: Math.floor(Date.now()).toString(),
									status: "200",
									message: 'Request processed successfully',
									path: req.originalUrl,
									data: {
										status_description: "Transaction Successful",
										status_code: "OK.00.00",
										reward_point: account.total_balance_amount
										// account_id: response.data.account_id
									}
								});
							}
						});




				   	}
				  })
				  .catch(error => {
				    console.error(error)
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

				// Parse recipient token
				jwtUtil.verify({
					token: req.body.token
				}, function(response) {
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
								error: "Invalid Recipient"
							}
						});
					} else {
						let firebaseUtil = require('../models/firebase.js');
						let account_id = response.data.account_id;


						let axios = require('axios')
						axios
						  .get(global.application.getConfig().host + '/api/account/blocked/' + req.body.token)
						  .then(response => {
						    // console.log(`statusCode: ${res.status}`)
						    console.log(response.data.data.blocked)
						   	if(response.data.data.blocked === true) {
						   		res.status(200).json({
						 			timestamp: Math.floor(Date.now()).toString(),
									status: "200",
									message: 'Request processed successfully',
									path: req.originalUrl,
									data: {
										status_description: "Transaction Failed",
										status_code: "ER.00.00",
										error: "Account Blocked"
									}
								});
						   	} else {

						  //  		res.status(200).json({
						 	// 		timestamp: Math.floor(Date.now()).toString(),
								// 	status: "200",
								// 	message: 'Request processed successfully',
								// 	path: req.originalUrl,
								// 	data: {
								// 		status_description: "Transaction Successful",
								// 		status_code: "OK.00.00",
								// 		error: "Account Not Blocked"
								// 	}
								// });

						   		// console.log(response);

								// // Transaction Successful
								// console.log(response);

								req.body['iat'] = Math.floor(Date.now() / 1000);
								let firebaseUtil = require('../models/firebase.js');
								firebaseUtil.create({
									table: 'database/account/' + account_id + '/reward_point', 
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
										res.status(200).json({
								 			timestamp: Math.floor(Date.now()).toString(),
											status: "200",
											message: 'Request processed successfully',
											path: req.originalUrl,
											data: {
												status_description: "Transaction Successful",
												status_code: "OK.00.00",
												reward_point: req.body.reward_point
											}
										});
									}
								});



						   	}
						  })
						  .catch(error => {
						    console.error(error)
						  });



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