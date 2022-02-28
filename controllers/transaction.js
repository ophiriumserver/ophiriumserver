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

									console.log(req.body.parameter);

									let parameter = '';

									for (const [key, value] of Object.entries(req.body.parameter)) {
										parameter += key.toUpperCase() + ': ' + value.toUpperCase() + '\n';
										console.log('key: ' + key);
										console.log('value: ' + value);
									}


									const Vonage = require('@vonage/server-sdk');

									const vonage = new Vonage({
									  apiKey: "39b3790d",
									  apiSecret: "ZZ4c56AtVi8MxQ9h"
									});

									const from = 'Vonage APIs';
									const to = '639916868942';
									const text = 'A text message sent using the Vonage SMS API';

									vonage.message.sendSms(from, to, text, (err, responseData) => {
									    if (err) {
									        console.log(err);
									    } else {
									        if(responseData.messages[0]['status'] === "0") {
									            console.log('Message sent successfully.');
									        } else {
									            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
									        }
									    }
									});


									// for (const [key, value] of Object.entries(req.body.parameter)) {
									// 	parameter += '<tr><td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 55px;font-family:Cabin,sans-serif;" align="left"><div class="v-color v-text-align" style="line-height: 160%; text-align: center; word-wrap: break-word;"><p style="font-size: 14px; line-height: 160%; text-align: center;"><strong><span style="font-size: 24px; line-height: 25.6px;">' + value.toUpperCase() + '</span></strong></p><p style="font-size: 16px; line-height: 160%; text-align: center;">' + key.toUpperCase() + '</p></div></td></tr>';
									// 	console.log('key: ' + key);
									// 	console.log('value: ' + value);
									// }


									// // Send email notification
									// let nodemailer = require('nodemailer');
									// let transporter = nodemailer.createTransport({
									//   service: 'gmail',
									//   secure: false,
									//   debug: false,
									//   logger: true,
									//   auth: {
									//     user: 'ziongems.ph@gmail.com',
									//     pass: 'Tumacayivan@828'
									//   }
									// });

									// let mailOptions = {
									//   from: 'ziongems.ph@gmail.com',
									//   to: [
									// 		'tumacayivan@gmail.com',
									// 		// 'tumacay@gmail.com', 
									// 		// 'eldrian_cybermax_80@yahoo.com',
									// 		// 'anatamayo0915@gmail.com'
									// 	],
									//   subject: 'Ophir',
									//   html: '<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title></title><style type="text/css"> table, td { color: #000000; } @media (max-width: 480px) { #u_content_text_9 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_9 .v-color { color: #003399 !important; } #u_content_text_13 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_10 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_11 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_12 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_14 .v-container-padding-padding { padding: 20px 20px 5px !important; } #u_content_text_14 .v-color { color: #003399 !important; } #u_content_text_14 .v-text-align { text-align: center !important; } #u_content_text_15 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_15 .v-text-align { text-align: center !important; } #u_content_text_21 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_21 .v-text-align { text-align: center !important; } #u_content_text_25 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_25 .v-text-align { text-align: center !important; } #u_content_text_24 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_24 .v-text-align { text-align: center !important; } #u_content_text_23 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_23 .v-text-align { text-align: center !important; } #u_content_text_22 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_22 .v-text-align { text-align: center !important; } #u_row_6 .v-row-columns-background-color-background-color { background-color: #eeeeee !important; } #u_content_text_8 .v-color { color: #cfcfcf !important; } } @media only screen and (min-width: 620px) { .u-row { width: 600px !important; } .u-row .u-col { vertical-align: top; } .u-row .u-col-100 { width: 600px !important; } } @media (max-width: 620px) { .u-row-container { max-width: 100% !important; padding-left: 0px !important; padding-right: 0px !important; } .u-row .u-col { min-width: 320px !important; max-width: 100% !important; display: block !important; } .u-row { width: calc(100% - 40px) !important; } .u-col { width: 100% !important; } .u-col>div { margin: 0 auto; } } body { margin: 0; padding: 0; } table, tr, td { vertical-align: top; border-collapse: collapse; } p { margin: 0; } .ie-container table, .mso-container table { table-layout: fixed; } * { line-height: inherit; } a[x-apple-data-detectors="true"] { color: inherit !important; text-decoration: none !important; } </style><link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css"></head><body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000"><table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0"><tbody><tr style="vertical-align: top"><td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"><div class="u-row-container" style="padding: 0px;background-color: transparent"><div class="u-row v-row-columns-background-color-background-color" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #131921;"><div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;"><div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;"><div style="width: 100% !important;"><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><table style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:Cabin,sans-serif;" align="left"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><!-- https://cdn.templates.unlayer.com/assets/1597218650916-xxxxc.png" alt="Image --><td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center"> <img align="center" border="0" src="https://reward-point-system.herokuapp.com/web/assets/img/ZIONOphir.PNG" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;max-width: 240.8px;" width="240.8" /> </td></tr></table></td></tr></tbody></table><table style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:Cabin,sans-serif;" align="left"><div class="v-color v-text-align" style="color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;"><p style="font-size: 14px; line-height: 140%;"><strong>AUTO-GENERATED SYSTEM</strong></p></div></td></tr></tbody></table></div></div></div></div></div></div><div class="u-row-container" style="padding: 0px;background-color: transparent"><div class="u-row v-row-columns-background-color-background-color" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;"><div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;"><div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;"><div style="width: 100% !important;"><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><table id="u_content_text_9" style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 55px;font-family:Cabin,sans-serif;" align="left"><div class="v-color v-text-align" style="line-height: 160%; text-align: center; word-wrap: break-word;"><p style="font-size: 14px; line-height: 160%; text-align: center;"><span style="font-size: 24px; line-height: 38.4px;"><strong><span style="line-height: 38.4px; font-size: 24px;">' + global.product.name.toUpperCase() + '</span></strong> </span> </p><hr></div></td></tr></tbody></table><table id="parameter" style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody>' + parameter + '</tbody></table></div></div></div></div></div></div></td></tr></tbody></table></body></html>'
									// };

									// transporter.sendMail(mailOptions, function(error, info){
									//   console.log(error);
									//   console.log(info);
									//   if (error) {
									//     // console.log(error);
									//     res.status(200).json({
								 // 			timestamp: Math.floor(Date.now()).toString(),
									// 		status: "200",
									// 		message: 'Request processed successfully',
									// 		path: req.originalUrl,
									// 		data: {
									// 			status_description: "Transaction Failed",
									// 			status_code: "ER.00.00",
									// 			response: error
									// 		}
									// 	});
									//   } else {
									//     // console.log('Email sent: ' + info.response);
									//     res.json({
								 // 			timestamp: Math.floor(Date.now()).toString(),
									// 		status: "200",
									// 		message: 'Request processed successfully',
									// 		path: req.originalUrl,
									// 		data: {
									// 			status_description: "Transaction Successful",
									// 			status_code: "OK.00.00",
									// 			response: 'Email sent: ' + info.response,
									// 			reward_point: global.account.balance
									// 		}
									// 	});
									//   }
									// });








									// res.status(200).json({
							 	// 		timestamp: Math.floor(Date.now()).toString(),
									// 	status: "200",
									// 	message: 'Request processed successfully',
									// 	path: req.originalUrl,
									// 	data: {
									// 		status_description: "Transaction Successful",
									// 		status_code: "OK.00.00",
									// 		// account_id: account_id,
									// 		reward_point: global.account.balance
									// 	}
									// });
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