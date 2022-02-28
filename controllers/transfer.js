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

						// Get transfer by id
						firebaseUtil.read({
							table: 'database/account/' + account_id + '/transfer',
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
								if(response.data === undefined || response.data === null) {
									res.status(200).json({
							 			timestamp: Math.floor(Date.now()).toString(),
										status: "200",
										message: 'Request processed successfully',
										path: req.originalUrl,
										data: {
											status_description: "Transaction Successful",
											status_code: "ER.00.00",
											error: 'No Transaction'
										}
									});
								} else {
									let transfer = [];
									// let count = 0;
									for (const [key, value] of Object.entries(response.data)) {
										// count++;
										transfer.push(value.data);
									}
									// transfer.sort(sort('iat'));
									// res.status(200).json({
							 	// 		timestamp: Math.floor(Date.now()).toString(),
									// 	status: "200",
									// 	message: 'Request processed successfully',
									// 	path: req.originalUrl,
									// 	data: {
									// 		status_description: "Transaction Successful",
									// 		status_code: "OK.00.00",
									// 		transfer: transfer
									// 	}
									// });

									// Get transaction by id
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

											// let transaction = [];
											try {
												for (const [key, value] of Object.entries(response.data)) {
													transfer.push(value.data);
												}
												// transfer.sort(sort('iat'));
											}
											catch (e) {
											}

											// res.status(200).json({
									 	// 		timestamp: Math.floor(Date.now()).toString(),
											// 	status: "200",
											// 	message: 'Request processed successfully',
											// 	path: req.originalUrl,
											// 	data: {
											// 		status_description: "Transaction Successful",
											// 		status_code: "OK.00.00",
											// 		transfer: transfer
											// 	}
											// });

											

											// Get incentive by id
											firebaseUtil.read({
												table: 'database/account/' + account_id + '/incentive',
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

													// let transaction = [];
													try {
														for (const [key, value] of Object.entries(response.data)) {
															transfer.push(value.data);
														}
														// transfer.sort(sort('iat'));
													}
													catch (e) {
													}

													// res.status(200).json({
											 	// 		timestamp: Math.floor(Date.now()).toString(),
													// 	status: "200",
													// 	message: 'Request processed successfully',
													// 	path: req.originalUrl,
													// 	data: {
													// 		status_description: "Transaction Successful",
													// 		status_code: "OK.00.00",
													// 		transfer: transfer
													// 	}
													// });

													
													// Get reward points by id
													firebaseUtil.read({
														table: 'database/account/' + account_id + '/reward_point',
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
																for (const [key, value] of Object.entries(response.data)) {
																	transfer.push(value.data);
																}
																transfer.sort(sort('iat'));

																let count = 0;
																for (const [key, value] of Object.entries(transfer)) {
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
																	transfer: transferLimit
																}
															});
															

														}
													});



												}
											});



										}
									});



									
								}
							}
						});




				   	}
				  })
				  .catch(error => {
				    console.error(error)
				  });

				






			}
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
				let account_id = response.data.account_id;
				let wallet_address = response.data.wallet_address;

				let axios = require('axios')
				axios
				  .get(global.application.getConfig().host + '/api/account/blocked/' + req.headers.authorization)
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



				   		global.account = {
							account_id: account_id,
							wallet_address: wallet_address,
							balance: 0
						}

						// async function generateWallet() {
						//   // const fetch = require('node-fetch');
						//   const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
						//   const response = await fetch('https://ophirium-test.herokuapp.com/api/reward-point/' + token, {
						// 		method: 'get',
						// 		// body: JSON.stringify({
						// 		// 	a: 1
						// 		// }),
						// 		// headers: {'Content-Type': 'application/json'}
						// 		mode: 'cors',
						// 		headers: {
						// 			'Content-Type': 'application/json',
						// 			'Authorization': token
						// 		},
						// 	});
						// 	const data = await response.json();
						// 	  return data;
						// }

						// generateWallet().then(function (response) {
						//     console.log(response);

						    
						// });

						// Get Balance
						let firebaseUtil = require('../models/firebase.js');
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
								// global.account = {
								// 	balance: 0
								// }
								global.account.balance = account.total_balance_amount;


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
										// console.log(response);
										let account_id = response.data.account_id;
										let wallet_address = response.data.wallet_address;

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
														error: "Recipient Account Blocked"
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
												// 		error: "Recipient Account Not Blocked"
												// 	}
												// });


												console.log('account_id: ' + global.account.account_id);
												console.log('transfer_amount: ' + req.body.reward_point);
												console.log('balance_amount: ' + global.account.balance);

												// Validate transfer amount
												if(req.body.reward_point < 1) {
													res.status(200).json({
											 			timestamp: Math.floor(Date.now()).toString(),
														status: "200",
														message: 'Request processed successfully',
														path: req.originalUrl,
														data: {
															status_description: "Transaction Failed",
															status_code: "ER.00.00",
															error: "Invalid Transfer Amount",
															// account_id: account_id,
															// reward_point: global.account.balance
														}
													});
												} else {


													if(global.account.balance < req.body.reward_point) {
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
													} else {

														let firebaseUtil = require('../models/firebase.js');

														// Create a credit to the destination account
														req.body['source_wallet_address'] = global.account.wallet_address;
														req.body['process'] = 'CREDIT';
														req.body['iat'] = Math.floor(Date.now() / 1000);
														firebaseUtil.create({
															table: 'database/account/' + account_id + '/transfer', 
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
																		// reward_point: global.account.balance
																		// account_id: response.data.account_id
																	}
																});
															}
														});

														// Create a debit to the source account
														delete req.body['source_wallet_address'];
														req.body['destination_wallet_address'] = wallet_address;
														req.body['process'] = 'DEBIT';
														req.body['iat'] = Math.floor(Date.now() / 1000);
														firebaseUtil.create({
															table: 'database/account/' + global.account.account_id + '/transfer', 
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
															}
														});

														
													}


												}



										   	}
										  })
										  .catch(error => {
										    console.error(error)
										  });


										


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