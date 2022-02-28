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

		// res.setHeader('Access-Control-Allow-Origin', '*');
		// res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');  
		// res.setHeader('Acces-Control-Allow-Methods','GET, POST, PATCH, DELETE');

		function formatDateDaily(date) {
		    let d = new Date(date),
		        month = '' + (d.getMonth() + 1),
		        day = '' + d.getDate(),
		        year = d.getFullYear();

		    if (month.length < 2) 
		        month = '0' + month;
		    if (day.length < 2) 
		        day = '0' + day;

		    return [year, month, day].join('');
		}

		function formatDateMonthly(date) {
		    let d = new Date(date),
		        month = '' + (d.getMonth() + 1),
		        day = '' + d.getDate(),
		        year = d.getFullYear();

		    if (month.length < 2) 
		        month = '0' + month;
		    if (day.length < 2) 
		        day = '0' + day;

		    return [year, month].join('');
		}

		function formatDateYearly(date) {
		    let d = new Date(date),
		        month = '' + (d.getMonth() + 1),
		        day = '' + d.getDate(),
		        year = d.getFullYear();

		    if (month.length < 2) 
		        month = '0' + month;
		    if (day.length < 2) 
		        day = '0' + day;

		    return [year].join('');
		}
		 
		// console.log(formatDate(Math.floor(Date.now())));

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

				// console.log('account_id: ' + account_id);

				// res.status(200).json({
		 	// 		timestamp: Math.floor(Date.now()).toString(),
				// 	status: "200",
				// 	message: 'Request processed successfully',
				// 	path: req.originalUrl,
				// 	data: {
				// 		status_description: "Transaction Successful",
				// 		status_code: "OK.00.00"
				// 	}
				// });

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

						// Validate the account if existing
						firebaseUtil.read({
							table: 'database/account/' + account_id,
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
								console.log(response);
								if(response.data === null) {
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
									// let firebaseUtil = require('../models/firebase.js');
									let date = new Date();
									let dateToday = new Date(new Date().setHours(0,0,0,0));
									// console.log('dateToday: ' + dateToday.getTime());

									// Get Daily Incentive
									firebaseUtil.update({
										table: 'database/account/' + account_id + '/incentive', 
										id: formatDateDaily(Math.floor(Date.now())) + '/data',
										data: {
											incentive_id: formatDateDaily(Math.floor(dateToday.getTime())),
											token: req.body.token,
											reward_point: 1,
											interval: 'DAILY',
											iat: Math.floor(dateToday.getTime() / 1000)
										}
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
										}
									});

									// Get Monthly Incentive
									// firebaseUtil.update({
									// 	table: 'database/account/' + response.data.account_id + '/incentive', 
									// 	id: formatDateMonthly(Math.floor(Date.now())) + '/data',
									// 	data: {
									// 		incentive_id: formatDateMonthly(Math.floor(dateToday.getTime())),
									// 		token: req.body.token,
									// 		reward_point: 1,
									// 		interval: 'MONTHLY', 
									// 		iat: Math.floor(dateToday.getTime() / 1000)
									// 	}
									// }, function(response) {
									// 	if(response.error != undefined) {
									//   		res.status(200).json({
									//  			timestamp: Math.floor(Date.now()).toString(),
									// 			status: "200",
									// 			message: 'Request processed successfully',
									// 			path: req.originalUrl,
									// 			data: {
									// 				status_description: "Transaction Failed",
									// 				status_code: "ER.00.00",
									// 				error: response.error
									// 			}
									// 		});
									// 	}
									// });

									// Get Yearly Incentive
									// firebaseUtil.update({
									// 	table: 'database/account/' + response.data.account_id + '/incentive', 
									// 	id: formatDateYearly(Math.floor(Date.now())) + '/data',
									// 	data: {
									// 		incentive_id: formatDateYearly(Math.floor(dateToday.getTime())),
									// 		token: req.body.token,
									// 		reward_point: 1,
									// 		interval: 'YEARLY',
									// 		iat: Math.floor(dateToday.getTime() / 1000)
									// 	}
									// }, function(response) {
									// 	if(response.error != undefined) {
									//   		res.status(200).json({
									//  			timestamp: Math.floor(Date.now()).toString(),
									// 			status: "200",
									// 			message: 'Request processed successfully',
									// 			path: req.originalUrl,
									// 			data: {
									// 				status_description: "Transaction Failed",
									// 				status_code: "ER.00.00",
									// 				error: response.error
									// 			}
									// 		});
									// 	}
									// });

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
						});


					}
				});

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