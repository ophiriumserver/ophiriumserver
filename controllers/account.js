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

 		let firebaseUtil = require('../models/firebase.js');
		firebaseUtil.create({
			table: 'database/account', 
			data: req.body
		}, function(response) {
			console.log(response);
			// let { v4: uuidv4 } = require('uuid');
			let account_id = response.data.account_id;

			let a = account_id;
			let encode = '';
			for (let i = 0; i < a.length; i++) {
			  let x = a.slice(i, i+1);
			  encode += x.charCodeAt(0);
			  
			}
			// console.log(encode);

			// console.log(account_id.abjad());

			res.status(200).json({
	 			timestamp: Math.floor(Date.now()).toString(),
				status: "200",
				message: 'Request processed successfully',
				path: req.originalUrl,
				data: {
					status_description: "Transaction Successful",
					status_code: "OK.00.00",
					account_number: encode.substring(0, 16)
				}
			});

			// firebaseUtil.update({
			// 	table: 'database/account',
			// 	id: response.data.account_id + '/data',
			// 	data: verifiedJwt
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
			// 	} else {
			// 		res.status(200).json({
			//  			timestamp: Math.floor(Date.now()).toString(),
			// 			status: "200",
			// 			message: 'Request processed successfully',
			// 			path: req.originalUrl,
			// 			data: {
			// 				status_description: "Transaction Successful",
			// 				status_code: "OK.00.00"
			// 			}
			// 		});
			// 	}
			// });

		});





 	// 	function getRandomNumberBetween(min,max){
		//     return Math.floor(Math.random()*(max-min+1)+min);
		// }

		// function repeat() {
		// 	let firebaseUtil = require('../models/firebase.js');
		// 	firebaseUtil.read({
		// 		table: 'database/account',
		// 	}, function(response) {
		// 		if(response.error != undefined) {
		// 			res.status(200).json({
		// 	 			timestamp: Math.floor(Date.now()).toString(),
		// 				status: "200",
		// 				message: 'Request processed successfully',
		// 				path: req.originalUrl,
		// 				data: {
		// 					status_description: "Transaction Failed",
		// 					status_code: "ER.00.00",
		// 					error: response.error
		// 				}
		// 			});
		// 		} else {
		// 			let card_number = getRandomNumberBetween(1000000000000000, 9999999999999999);
		// 			let exist = false;
		// 			try {
		// 				for (const [key, value] of Object.entries(response.data)) {
		// 				  if(card_number === value.data.card_number) {
		// 						exist = true;
		// 					}
		// 				}
		// 			}
		// 			catch (e) {
		// 			}

		// 			if(!exist) {
		// 				res.status(200).json({
		// 						timestamp: Math.floor(Date.now()).toString(),
		// 					status: "200",
		// 					message: 'Request processed successfully',
		// 					path: req.originalUrl,
		// 					data: {
		// 						status_description: "Transaction Successful",
		// 						status_code: "OK.00.00",
		// 						card_number: card_number
		// 					}
		// 				});
		// 			}
		// 		}
		// 	});
		// }

		// console.log();









		// function generateCardNumber(parameters, callback) {
		// 	let firebaseUtil = require('../models/firebase.js');
		// 	firebaseUtil.read({
		// 		table: 'database/account',
		// 	}, function(response) {
		// 		if(response.error != undefined) {
		// 			res.status(200).json({
		// 	 			timestamp: Math.floor(Date.now()).toString(),
		// 				status: "200",
		// 				message: 'Request processed successfully',
		// 				path: req.originalUrl,
		// 				data: {
		// 					status_description: "Transaction Failed",
		// 					status_code: "ER.00.00",
		// 					error: response.error
		// 				}
		// 			});
		// 		} else {
		// 			let card_number = parameters.card_number;
		// 			let exist = false;
		// 			try {
		// 				for (const [key, value] of Object.entries(response.data)) {
		// 				  if(card_number === value.data.card_number) {
		// 						exist = true;
		// 					}
		// 				}
		// 			}
		// 			catch (e) {
		// 			}

		// 			if(!exist) {
		// 				callback({
		// 					status: 200,
		// 					card_number: parameters.card_number
		// 				});
		// 			} else {
		// 				callback({
		// 					status: 500
		// 				});
		// 				// repeat();
		// 			}
		// 		}
		// 	});
		// }

		// generateCardNumber({
		// 	card_number: 1000000000000002
		// }, function(response) {
		// 	while(response.status == 500) {
		// 		generateCardNumber({
		// 			card_number: getRandomNumberBetween(1000000000000000, 9999999999999999)
		// 		}, function(response) {
		// 			console.log(response);
		// 		});
		// 	}
		// 	res.status(200).json({
		// 		timestamp: Math.floor(Date.now()).toString(),
		// 		status: "200",
		// 		message: 'Request processed successfully',
		// 		path: req.originalUrl,
		// 		data: {
		// 			status_description: "Transaction Successful",
		// 			status_code: "OK.00.00",
		// 			card_number: response.card_number
		// 		}
		// 	});
		// });
	
		// res.status(200).json({
 	// 		timestamp: Math.floor(Date.now()).toString(),
		// 	status: "200",
		// 	message: 'Request processed successfully',
		// 	path: req.originalUrl,
		// 	data: {
		// 		status_description: "Transaction Successful",
		// 		status_code: "OK.00.00",
				
		// 	}
		// });

		

	},
	getById:function(req, res, next){
 		console.log('GET data by Id');
 		console.log(req.params.id);
 		res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
 		
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

						// console.log('account_id: ' + account_id);

						firebaseUtil.read({
							table: 'database/account',
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

								try {
									for (const [key, value] of Object.entries(response.data)) {
									  if(account_id == value.data.account_id) {
											res.status(200).json({
									 			timestamp: Math.floor(Date.now()).toString(),
												status: "200",
												message: 'Request processed successfully',
												path: req.originalUrl,
												data: {
													status_description: "Transaction Successful",
													status_code: "OK.00.00",
													account: value.data
												}
											});
										}
									}
								}
								catch (e) {
								}

								

								// Object.keys(response.data).forEach(function(key) {
								// 	if(uuid == response.data[key].data.uuid) {
								// 		// console.log(uuid);
								// 		// console.log(response.data[key].data.uuid);
								// 		// delete response.data[key].data['account_id'];
								// 		res.status(200).json({
								//  			timestamp: Math.floor(Date.now()).toString(),
								// 			status: "200",
								// 			message: 'Request processed successfully',
								// 			path: req.originalUrl,
								// 			data: {
								// 				status_description: "Transaction Successful",
								// 				status_code: "OK.00.00",
								// 				account: response.data[key].data
								// 			}
								// 		});
								// 	}
								// });
							}
						});


				   	}
				  })
				  .catch(error => {
				    console.error(error)
				  });
			}
		});

 	// 	res.status(200).json({
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
	getAccountBlockedById:function(req, res, next){
 		console.log('GET Account blocked by Id');
 		console.log(req.params.id);
 		
 		// Authorization
 		let jwtUtil = require('../models/jwt.js');
		jwtUtil.verify({
			token: req.params.id
		}, function(response) {
			// console.log(response);
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
						// console.log(response.data.transfer);
						try {
							let transactionHash = [];
							for (const [key, value] of Object.entries(response.data.transfer)) {
								delete value.data['token'];
								delete value.data['transfer_id'];
								// console.log(JSON.stringify(value.data));

								let crypto = require('crypto');
								let hash = crypto.createHash('sha256').update(JSON.stringify(value.data)).digest('base64');
								// console.log(JSON.stringify(value.data));
								transactionHash.push(hash);
							 //  if(account_id == value.data.account_id) {
								// 	res.status(200).json({
							 // 			timestamp: Math.floor(Date.now()).toString(),
								// 		status: "200",
								// 		message: 'Request processed successfully',
								// 		path: req.originalUrl,
								// 		data: {
								// 			status_description: "Transaction Successful",
								// 			status_code: "OK.00.00",
								// 			account: value.data
								// 		}
								// 	});
								// }
							}
							// console.log(transactionHash);

							let findDuplicates = (arr) => {
							  let sorted_arr = arr.slice().sort(); // You can define the comparing function here. 
							  // JS by default uses a crappy string compare.
							  // (we use slice to clone the array so the
							  // original array won't be modified)
							  let results = [];
							  for (let i = 0; i < sorted_arr.length - 1; i++) {
							    if (sorted_arr[i + 1] == sorted_arr[i]) {
							      results.push(sorted_arr[i]);
							    }
							  }
							  return results;
							}

							// console.log(findDuplicates(transactionHash).length);

							if(findDuplicates(transactionHash).length > 0) {
								res.status(200).json({
						 			timestamp: Math.floor(Date.now()).toString(),
									status: "200",
									message: 'Request processed successfully',
									path: req.originalUrl,
									data: {
										status_description: "Transaction Successful",
										status_code: "OK.00.00",
										blocked: true
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
										blocked: false
									}
								});
							}
						}
						catch (e) {
						}

					}
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
				// let { v4: uuidv4 } = require('uuid');
				// req.body['uuid'] = uuidv4();
				// req.body['authorities'] = ['AP_ALL', 'AP_ACC_ALL', 'AP_ACC_GET', 'AP_ACC_ADD', 'AP_ACC_UPD', 'AP_ACC_DEL'];

				req.body['active'] = true;
				let firebaseUtil = require('../models/firebase.js');
				firebaseUtil.create({
					table: 'database/account', 
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

						// Generate new account token using secret key
						let getUuid = require('uuid-by-string');
						let jwt = require('jsonwebtoken');
						let token = jwt.sign({ 
							account_id: response.data.account_id,
							wallet_address: getUuid(response.data.account_id, 5)
						}, global.application.getConfig().jwt.key, { expiresIn: 1 * 60 * 60 * 876000 });

						// Parse generated token using secret key
						let verifyToken = jwt.verify(token, global.application.getConfig().jwt.key, (error, verifiedJwt) => {
							if(error){
								res.status(200).json({
						 			timestamp: Math.floor(Date.now()).toString(),
									status: "200",
									message: 'Request processed successfully',
									path: req.originalUrl,
									data: {
										status_description: "Transaction Failed",
										status_code: "ER.00.00",
										error: error.message
									}
								});
							} else {

								// Create a seed reward point 
								let firebaseUtil = require('../models/firebase.js');
								firebaseUtil.create({
									table: 'database/account/' + response.data.account_id + '/reward_point', 
									data: {
										"iat": Math.floor(Date.now() / 1000),
									    "token": token,
									    "reward_point": 0
									}
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

								// Create a seed credit to the source account
								firebaseUtil.create({
									table: 'database/account/' + response.data.account_id + '/transfer', 
									data: {
										"iat": Math.floor(Date.now() / 1000),
										"process": "CREDIT",
									    "token": token,
									    "reward_point": 0
									}
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

								// Create a seed debit to the destination account
								firebaseUtil.create({
									table: 'database/account/' + response.data.account_id + '/transfer', 
									data: {
										"iat": Math.floor(Date.now() / 1000),
										"process": "DEBIT",
									    "token": token,
									    "reward_point": 0
									}
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

								// Create a seed wallet address to new account
								let getUuid = require('uuid-by-string');
								firebaseUtil.update({
									table: 'database/wallet_address',
									id: getUuid(response.data.account_id, 5), 
									data: {
										"account_id": response.data.account_id,
										"token": token
									}
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
								
								// Add the token information to new account
								verifiedJwt['token'] = token;
								verifiedJwt['wallet_address'] = getUuid(response.data.account_id, 5);
								firebaseUtil.update({
									table: 'database/account',
									id: response.data.account_id + '/data',
									data: verifiedJwt
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
										res.status(200).json({
								 			timestamp: Math.floor(Date.now()).toString(),
											status: "200",
											message: 'Request processed successfully',
											path: req.originalUrl,
											data: {
												status_description: "Transaction Successful",
												status_code: "OK.00.00",
												token: token,
												exp: verifiedJwt.exp
												// account_id: response.data.account_id
											}
										});
									}
								});



								// // Create 1 reward point credit to the source account
								// req.body['process'] = 'CREDIT';
								// req.body['iat'] = Math.floor(Date.now() / 1000);
								// firebaseUtil.create({
								// 	table: 'database/account/' + account_id + '/transfer', 
								// 	data: {
								// 		token: verifiedJwt['token'],
								// 		reward_point: 1
								// 	}
								// }, function(response) {
								// 	console.log(response);
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

								// // Create 1 reward point debit to the destination account
								// req.body['process'] = 'DEBIT';
								// req.body['iat'] = Math.floor(Date.now() / 1000);
								// firebaseUtil.create({
								// 	table: 'database/account/' + response.data.account_id + '/transfer', 
								// 	data: {
								// 		token: verifiedJwt['token'],
								// 		reward_point: 1
								// 	}
								// }, function(response) {
								// 	console.log(response);
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
								// 	} else {
								// 		res.status(200).json({
								//  			timestamp: Math.floor(Date.now()).toString(),
								// 			status: "200",
								// 			message: 'Request processed successfully',
								// 			path: req.originalUrl,
								// 			data: {
								// 				status_description: "Transaction Successful",
								// 				status_code: "OK.00.00",
								// 				// reward_point: global.account.balance
								// 				// account_id: response.data.account_id
								// 			}
								// 		});
								// 	}
								// });



							}
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
		res.status(200).json({
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
		res.status(200).json({
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