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

		// const axios = require('axios')
		// axios
		//   .get('http://localhost:8080/api/account/blocked/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiLU13eU1aSzdyQjJfNUxlb01wXy0iLCJ3YWxsZXRfYWRkcmVzcyI6IjRmZDIwNzlkLTQ0NTktNTg5YS1hZWVhLWJkZTliMjdiY2VjMiIsImlhdCI6MTY0NjAxODgzOSwiZXhwIjo0Nzk5NjE4ODM5fQ.8iM4OWl2cfspqhqU1VsrxVjE3Z1MIJWFBGhKXtyIHUk')
		//   .then(response => {
		//     // console.log(`statusCode: ${res.status}`)
		//     console.log(response.data.data.blocked)
		//   })
		//   .catch(error => {
		//     console.error(error)
		//   });


 	// 	req.body['iat'] = Math.floor(Date.now() / 1000);
		// let firebaseUtil = require('../models/firebase.js');
		// firebaseUtil.create({
		// 	table: 'database/account/' + response.data.account_id + '/reward_point', 
		// 	data: req.body
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
		// 				reward_point: req.body.reward_point
		// 			}
		// 		});
		// 	}
		// });






 		// let ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
 		// console.log(ip);

 		// let requestIp = require('request-ip');
 		// let clientIp = requestIp.getClientIp(req); 

 	// 	let getUuid = require('uuid-by-string');
		// console.log(getUuid('-MZNn7OADb4gklQnDqnr', 5));
		// console.log(getUuid('-MZkE_ng66pDVy4xGlrm', 5));
		// console.log(getUuid('-MZkE_ndzsdV4ayv9_gE', 5));




	//     const { exec } = require("child_process");
    
	//     function runShellScript(script, callback) {
	//         exec(script, (error, stdOut, stderr) => {
	            
	//             var result = {status: true};
	            
	//             if (error) {
	//                 result.status = false;
	//                 result.error = error.message;
	//             }
	//             if (stderr) {
	//                 result.status = false;
	//                 result.stderr = stderr;
	//             }
	    
	//             if(stdOut){
	//                 result.result = stdOut;
	//             }
	            
	    
	//             callback(result);
	//         });
	//     }
	    
	//     runShellScript("py ./coinsWallet.py", function(res) {
	//         console.log(res);
	// // fs.readFileSync('output.txt');
	//     });






		// let nodemailer = require('nodemailer');
		// let transporter = nodemailer.createTransport({
		//   service: 'gmail',
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
		//   html: '<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title></title><style type="text/css"> table, td { color: #000000; } @media (max-width: 480px) { #u_content_text_9 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_9 .v-color { color: #003399 !important; } #u_content_text_13 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_10 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_11 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_12 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_14 .v-container-padding-padding { padding: 20px 20px 5px !important; } #u_content_text_14 .v-color { color: #003399 !important; } #u_content_text_14 .v-text-align { text-align: center !important; } #u_content_text_15 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_15 .v-text-align { text-align: center !important; } #u_content_text_21 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_21 .v-text-align { text-align: center !important; } #u_content_text_25 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_25 .v-text-align { text-align: center !important; } #u_content_text_24 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_24 .v-text-align { text-align: center !important; } #u_content_text_23 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_23 .v-text-align { text-align: center !important; } #u_content_text_22 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_22 .v-text-align { text-align: center !important; } #u_row_6 .v-row-columns-background-color-background-color { background-color: #eeeeee !important; } #u_content_text_8 .v-color { color: #cfcfcf !important; } } @media only screen and (min-width: 620px) { .u-row { width: 600px !important; } .u-row .u-col { vertical-align: top; } .u-row .u-col-100 { width: 600px !important; } } @media (max-width: 620px) { .u-row-container { max-width: 100% !important; padding-left: 0px !important; padding-right: 0px !important; } .u-row .u-col { min-width: 320px !important; max-width: 100% !important; display: block !important; } .u-row { width: calc(100% - 40px) !important; } .u-col { width: 100% !important; } .u-col>div { margin: 0 auto; } } body { margin: 0; padding: 0; } table, tr, td { vertical-align: top; border-collapse: collapse; } p { margin: 0; } .ie-container table, .mso-container table { table-layout: fixed; } * { line-height: inherit; } a[x-apple-data-detectors="true"] { color: inherit !important; text-decoration: none !important; } </style><link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css"></head><body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000"><table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0"><tbody><tr style="vertical-align: top"><td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"><div class="u-row-container" style="padding: 0px;background-color: transparent"><div class="u-row v-row-columns-background-color-background-color" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #131921;"><div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;"><div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;"><div style="width: 100% !important;"><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><table style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:Cabin,sans-serif;" align="left"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><!-- https://cdn.templates.unlayer.com/assets/1597218650916-xxxxc.png" alt="Image --><td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center"> <img align="center" border="0" src="https://reward-point-system.herokuapp.com/web/assets/img/ZIONOphir.PNG" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;max-width: 240.8px;" width="240.8" /> </td></tr></table></td></tr></tbody></table><table style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:Cabin,sans-serif;" align="left"><div class="v-color v-text-align" style="color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;"><p style="font-size: 14px; line-height: 140%;"><strong>AUTO-GENERATED SYSTEM</strong></p></div></td></tr></tbody></table></div></div></div></div></div></div><div class="u-row-container" style="padding: 0px;background-color: transparent"><div class="u-row v-row-columns-background-color-background-color" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;"><div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;"><div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;"><div style="width: 100% !important;"><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><table id="u_content_text_9" style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 55px;font-family:Cabin,sans-serif;" align="left"><div class="v-color v-text-align" style="line-height: 160%; text-align: center; word-wrap: break-word;"><p style="font-size: 14px; line-height: 160%; text-align: center;"><span style="font-size: 24px; line-height: 38.4px;"><strong><span style="line-height: 38.4px; font-size: 24px;">Product</span></strong> </span> </p><hr></div></td></tr></tbody></table><table id="parameter" style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 55px;font-family:Cabin,sans-serif;" align="left"><div class="v-color v-text-align" style="line-height: 160%; text-align: center; word-wrap: break-word;"><p style="font-size: 14px; line-height: 160%; text-align: center;"><strong><span style="font-size: 24px; line-height: 25.6px;">09123456789</span></strong></p><p style="font-size: 18px; line-height: 160%; text-align: center;">Mobile Number</p></div></td></tr></tbody></table></div></div></div></div></div></div><div id="u_row_6" class="u-row-container" style="padding: 0px;background-color: transparent"><div class="u-row v-row-columns-background-color-background-color" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #131921;"><div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;"><div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;"><div style="width: 100% !important;"><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><table id="u_content_text_8" style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:Cabin,sans-serif;" align="left"><div class="v-color v-text-align" style="color: #fafafa; line-height: 180%; text-align: center; word-wrap: break-word;"><p style="font-size: 14px; line-height: 180%;">Copyright 2021 Ophir. All rights reserved</p></div></td></tr></tbody></table></div></div></div></div></div></div></td></tr></tbody></table></body></html>'
		// };

		// transporter.sendMail(mailOptions, function(error, info){
		//   if (error) {
		//     // console.log(error);
		//     res.json({
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
		// 			response: 'Email sent: ' + info.response
		// 		}
		// 	});
		//   }
		// });


		

		// function formatDate(date) {
		//     var d = new Date(date),
		//         month = '' + (d.getMonth() + 1),
		//         day = '' + d.getDate(),
		//         year = d.getFullYear();

		//     if (month.length < 2) 
		//         month = '0' + month;
		//     if (day.length < 2) 
		//         day = '0' + day;

		//     return [year, month, day].join('');
		// }
		 
		// console.log(formatDate(Math.floor(Date.now())));
 		

	},
	getById:function(req, res, next){
 		console.log('GET data by Id');
 		console.log(req.params.id);

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

							console.log(findDuplicates(transactionHash).length);

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

		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');  
		res.setHeader('Acces-Control-Allow-Methods','GET, POST, PATCH, DELETE');

		let nodemailer = require('nodemailer');
		let transporter = nodemailer.createTransport({
		  service: 'gmail',
		  auth: {
		    user: 'projectsc19.v3@gmail.com',
		    pass: 'Tumacay@828'
		  }
		});

		let mailOptions = {
		  from: 'projectsc19.v3@gmail.com',
		  to: [
				'tumacayivan@gmail.com',
				'tumacay@gmail.com', 
				// 'eldrian_cybermax_80@yahoo.com',
				// 'anatamayo0915@gmail.com'
			],
		  subject: req.body.name,
		  // html: ' <b>PERSONAL INFORMATION</b>\n Name: ' + req.body.name + ' \n Contact Number: ' + req.body.contact_number + ' \n Email: ' + req.body.email_address + ' \n Street Address: ' + req.body.street_address + '\n\n ORDERS\n Ivermectin USP - 50 Large Capsules (15 mg): ' + req.body.product_quantity.product1 + '\n Ivermectin USP - 100 Small Capsules (15 mg): ' + req.body.product_quantity.product2 + '\n Lianhua Qingwen Jiaonang - 24 Capsules (2 mg): ' +req.body.product_quantity.product3 + '\n P-Zee+ Ultimate Akaline Vitamin C - 60 Capsules (500 mg): ' + req.body.product_quantity.product4 + '\n Sodium Ascorbate 24 Alkaline-C - 100 Capsules (562 mg): ' + req.body.product_quantity.product5 + '\n Fingertip Oximeter: ' + req.body.product_quantity.product6
		  html: '<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <meta name="x-apple-disable-message-reformatting"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <title></title> <style type="text/css"> table, td { color: #000000; } @media (max-width: 480px) { #u_content_text_9 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_9 .v-color { color: #003399 !important; } #u_content_text_13 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_10 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_11 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_12 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_14 .v-container-padding-padding { padding: 20px 20px 5px !important; } #u_content_text_14 .v-color { color: #003399 !important; } #u_content_text_14 .v-text-align { text-align: center !important; } #u_content_text_15 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_15 .v-text-align { text-align: center !important; } #u_content_text_21 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_21 .v-text-align { text-align: center !important; } #u_content_text_25 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_25 .v-text-align { text-align: center !important; } #u_content_text_24 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_24 .v-text-align { text-align: center !important; } #u_content_text_23 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_23 .v-text-align { text-align: center !important; } #u_content_text_22 .v-container-padding-padding { padding: 5px 20px !important; } #u_content_text_22 .v-text-align { text-align: center !important; } #u_row_6 .v-row-columns-background-color-background-color { background-color: #eeeeee !important; } #u_content_text_8 .v-color { color: #cfcfcf !important; } } @media only screen and (min-width: 620px) { .u-row { width: 600px !important; } .u-row .u-col { vertical-align: top; } .u-row .u-col-100 { width: 600px !important; } } @media (max-width: 620px) { .u-row-container { max-width: 100% !important; padding-left: 0px !important; padding-right: 0px !important; } .u-row .u-col { min-width: 320px !important; max-width: 100% !important; display: block !important; } .u-row { width: calc(100% - 40px) !important; } .u-col { width: 100% !important; } .u-col>div { margin: 0 auto; } } body { margin: 0; padding: 0; } table, tr, td { vertical-align: top; border-collapse: collapse; } p { margin: 0; } .ie-container table, .mso-container table { table-layout: fixed; } * { line-height: inherit; } a[x-apple-data-detectors="true"] { color: inherit !important; text-decoration: none !important; } </style> <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css"></head><body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000"> <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0"> <tbody> <tr style="vertical-align: top"> <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"> <div class="u-row-container" style="padding: 0px;background-color: transparent"> <div class="u-row v-row-columns-background-color-background-color" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #003399;"> <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;"> <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;"> <div style="width: 100% !important;"> <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"> <table style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:Cabin,sans-serif;" align="left"> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center"> <img align="center" border="0" src="https://cdn.templates.unlayer.com/assets/1597218650916-xxxxc.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 26%;max-width: 150.8px;" width="150.8" /> </td> </tr> </table> </td> </tr> </tbody> </table> <table style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px;font-family:Cabin,sans-serif;" align="left"> <div class="v-color v-text-align" style="color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;"> <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">NEW ORDERS!</span></strong> </span> </p> </div> </td> </tr> </tbody> </table> <table style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:Cabin,sans-serif;" align="left"> <div class="v-color v-text-align" style="color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;"> <p style="font-size: 14px; line-height: 140%;"><strong>AUTO-GENERATED SYSTEM</strong></p> </div> </td> </tr> </tbody> </table> </div> </div> </div> </div> </div> </div> <div class="u-row-container" style="padding: 0px;background-color: transparent"> <div class="u-row v-row-columns-background-color-background-color" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;"> <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;"> <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;"> <div style="width: 100% !important;"> <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"> <table id="u_content_text_9" style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 55px;font-family:Cabin,sans-serif;" align="left"> <div class="v-color v-text-align" style="line-height: 160%; text-align: center; word-wrap: break-word;"> <p style="font-size: 14px; line-height: 160%; text-align: center;"><span style="font-size: 24px; line-height: 38.4px;"><strong><span style="line-height: 38.4px; font-size: 24px;">Personal Information</span></strong> </span> </p> </div> </td> </tr> </tbody> </table> <table id="u_content_text_13" style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 55px;font-family:Cabin,sans-serif;" align="left"> <div class="v-color v-text-align" style="line-height: 160%; text-align: center; word-wrap: break-word;"> <p style="font-size: 14px; line-height: 160%; text-align: center;">Full Name</p> <p style="font-size: 14px; line-height: 160%; text-align: center;"><strong><span style="font-size: 16px; line-height: 25.6px;">' + req.body.name + '</span></strong></p> </div> </td> </tr> </tbody> </table> <table id="u_content_text_10" style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 55px;font-family:Cabin,sans-serif;" align="left"> <div class="v-color v-text-align" style="line-height: 160%; text-align: center; word-wrap: break-word;"> <p style="font-size: 14px; line-height: 160%; text-align: center;"><span style="font-size: 16px; line-height: 25.6px;">Contact No.<br /><strong>' + req.body.contact_number + '</strong></span></p> </div> </td> </tr> </tbody> </table> <table id="u_content_text_11" style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 55px;font-family:Cabin,sans-serif;" align="left"> <div class="v-color v-text-align" style="line-height: 160%; text-align: center; word-wrap: break-word;"> <p style="font-size: 14px; line-height: 160%; text-align: center;"><span style="font-size: 16px; line-height: 25.6px;">Email Address</span></p> <p style="font-size: 14px; line-height: 160%; text-align: center;"><strong><span style="font-size: 16px; line-height: 25.6px;">' + req.body.email_address + '</span></strong></p> </div> </td> </tr> </tbody> </table> <table id="u_content_text_12" style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 55px;font-family:Cabin,sans-serif;" align="left"> <div class="v-color v-text-align" style="line-height: 160%; text-align: center; word-wrap: break-word;"> <p style="font-size: 14px; line-height: 160%; text-align: center;"><span style="font-size: 16px; line-height: 25.6px;">Street Address</span></p> <p style="font-size: 14px; line-height: 160%; text-align: center;"><strong><span style="font-size: 16px; line-height: 25.6px;">' + req.body.street_address + '</span></strong></p> </div> </td> </tr> </tbody> </table> <table id="u_content_text_14" style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 55px;font-family:Cabin,sans-serif;" align="left"> <div class="v-color v-text-align" style="line-height: 160%; text-align: center; word-wrap: break-word;"> <p style="font-size: 14px; line-height: 160%; text-align: center;"><span style="font-size: 24px; line-height: 38.4px;"><strong><span style="line-height: 38.4px; font-size: 24px;">Orders</span></strong> </span> </p> </div> </td> </tr> </tbody> </table> <table id="u_content_text_15" style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 55px;font-family:Cabin,sans-serif;" align="left"> <div class="v-color v-text-align" style="line-height: 160%; text-align: center; word-wrap: break-word;"> <p style="line-height: 160%; font-size: 14px; text-align: center;"><strong><span style="font-size: 24px; line-height: 38.4px;">' + req.body.product_quantity.product1 + '</span></strong></p> <p style="font-size: 14px; line-height: 160%; text-align: center;">Ivermectin USP</p> <p style="font-size: 14px; line-height: 160%; text-align: center;">50 Large Capsules (15 mg)</p> </div> </td> </tr> </tbody> </table> <table id="u_content_text_21" style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 55px;font-family:Cabin,sans-serif;" align="left"> <div class="v-color v-text-align" style="line-height: 160%; text-align: center; word-wrap: break-word;"> <p style="line-height: 160%; font-size: 14px; text-align: center;"><strong><span style="font-size: 24px; line-height: 38.4px;">' + req.body.product_quantity.product2 + '</span></strong></p> <p style="font-size: 14px; line-height: 160%; text-align: center;">Ivermectin USP</p> <p style="font-size: 14px; line-height: 160%; text-align: center;">100 Small Capsules (15 mg)</p> </div> </td> </tr> </tbody> </table> <table id="u_content_text_25" style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 55px;font-family:Cabin,sans-serif;" align="left"> <div class="v-color v-text-align" style="line-height: 160%; text-align: center; word-wrap: break-word;"> <p style="line-height: 160%; font-size: 14px; text-align: center;"><strong><span style="font-size: 24px; line-height: 38.4px;">' + req.body.product_quantity.product3 + '</span></strong></p> <p style="font-size: 14px; line-height: 160%; text-align: center;">Lianhua Qingwen Jiaonang</p> <p style="font-size: 14px; line-height: 160%; text-align: center;">24 Capsules (2 mg)</p> </div> </td> </tr> </tbody> </table> <table id="u_content_text_24" style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 55px;font-family:Cabin,sans-serif;" align="left"> <div class="v-color v-text-align" style="line-height: 160%; text-align: center; word-wrap: break-word;"> <p style="line-height: 160%; font-size: 14px; text-align: center;"><strong><span style="font-size: 24px; line-height: 38.4px;">' + req.body.product_quantity.product4 + '</span></strong></p> <p style="font-size: 14px; line-height: 160%; text-align: center;">P-Zee+ Ultimate Akaline Vitamin C</p> <p style="font-size: 14px; line-height: 160%; text-align: center;">60 Capsules (500 mg)</p> </div> </td> </tr> </tbody> </table> <table id="u_content_text_23" style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 55px;font-family:Cabin,sans-serif;" align="left"> <div class="v-color v-text-align" style="line-height: 160%; text-align: center; word-wrap: break-word;"> <p style="line-height: 160%; font-size: 14px; text-align: center;"><strong><span style="font-size: 24px; line-height: 38.4px;">' + req.body.product_quantity.product5 + '</span></strong></p> <p style="font-size: 14px; line-height: 160%; text-align: center;">Sodium Ascorbate 24 Alkaline-C</p> <p style="font-size: 14px; line-height: 160%; text-align: center;">100 Capsules (562 mg)</p> </div> </td> </tr> </tbody> </table> <table id="u_content_text_22" style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 55px;font-family:Cabin,sans-serif;" align="left"> <div class="v-color v-text-align" style="line-height: 160%; text-align: center; word-wrap: break-word;"> <p style="line-height: 160%; font-size: 14px; text-align: center;"><strong><span style="font-size: 24px; line-height: 38.4px;">' + req.body.product_quantity.product6 + '</span></strong></p> <p style="font-size: 14px; line-height: 160%; text-align: center;">Fingertip Oximeter</p> </div> </td> </tr> </tbody> </table> </div> </div> </div> </div> </div> </div> <div id="u_row_6" class="u-row-container" style="padding: 0px;background-color: transparent"> <div class="u-row v-row-columns-background-color-background-color" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #003399;"> <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;"> <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;"> <div style="width: 100% !important;"> <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"> <table id="u_content_text_8" style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:Cabin,sans-serif;" align="left"> <div class="v-color v-text-align" style="color: #fafafa; line-height: 180%; text-align: center; word-wrap: break-word;"> <p style="font-size: 14px; line-height: 180%;">Copyright 2021 Projectsc19. All rights reserved</p> </div> </td> </tr> </tbody> </table> </div> </div> </div> </div> </div> </div> </td> </tr> </tbody> </table></body></html>'
		};

		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    // console.log(error);
		    res.json({
	 			timestamp: Math.floor(Date.now()).toString(),
				status: "200",
				message: 'Request processed successfully',
				path: req.originalUrl,
				data: {
					status_description: "Transaction Failed",
					status_code: "ER.00.00",
					response: error
				}
			});
		  } else {
		    // console.log('Email sent: ' + info.response);
		    res.json({
	 			timestamp: Math.floor(Date.now()).toString(),
				status: "200",
				message: 'Request processed successfully',
				path: req.originalUrl,
				data: {
					status_description: "Transaction Successful",
					status_code: "OK.00.00",
					response: 'Email sent: ' + info.response
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