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

 		// let ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
 		// console.log(ip);

 		// let requestIp = require('request-ip');
 		// let clientIp = requestIp.getClientIp(req); 

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

				// Get account token by wallet address
				let firebaseUtil = require('../models/firebase.js');

				if(req.body.wallet_address.replace(/(?:[^\w-]|_)+/, '').length > 36) {
					res.status(200).json({
			 			timestamp: Math.floor(Date.now()).toString(),
						status: "200",
						message: 'Request processed successfully',
						path: req.originalUrl,
						data: {
							status_description: "Transaction Failed",
							status_code: "ER.00.00",
							error: "Invalid Wallet Address"
						}
					});
				} else {
					firebaseUtil.read({
						table: 'database/wallet_address/' + req.body.wallet_address.replace(/[^-a-zA-Z0-9]+/, '')
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

							let token = null;
							try {
								token = response.data.token;
							}
							catch (e) {
							}

							if(token === null) {
								res.status(200).json({
						 			timestamp: Math.floor(Date.now()).toString(),
									status: "200",
									message: 'Request processed successfully',
									path: req.originalUrl,
									data: {
										status_description: "Transaction Failed",
										status_code: "ER.00.00",
										error: "Invalid Wallet Address"
									}
								});
							} else {
								let token = response.data.token;

								let axios = require('axios')
								axios
								  .get(global.application.getConfig().host + '/api/account/blocked/' + token)
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

								   		res.status(200).json({
								 			timestamp: Math.floor(Date.now()).toString(),
											status: "200",
											message: 'Request processed successfully',
											path: req.originalUrl,
											data: {
												status_description: "Transaction Successful",
												status_code: "OK.00.00",
												token: token
											}
										});

								   	}
								  })
								  .catch(error => {
								    console.error(error)
								  });

								
							}						
							

						}
					});
				}

				



			}
		});

		// res.json({
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