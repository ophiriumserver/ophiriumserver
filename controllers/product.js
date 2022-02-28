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
 		// res.set('Cache-Control', 'public, max-age=300, s-maxage=600');

 		function sort(prop) {    
		    return function(a, b) {    
		        if (a[prop] > b[prop]) {    
		            return 1;    
		        } else if (a[prop] < b[prop]) {    
		            return -1;    
		        }    
		        return 0;    
		    }    
		} 

 		let firebaseUtil = require('../models/firebase.js');
		// console.log('account_id: ' + account_id);

		firebaseUtil.read({
			table: 'database/product',
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

				let product = [];
				for (const [key, value] of Object.entries(response.data)) {
					product.push(value.data);
				}
				product.sort(sort('reward_point'));

				res.status(200).json({
		 			timestamp: Math.floor(Date.now()).toString(),
					status: "200",
					message: 'Request processed successfully',
					path: req.originalUrl,
					data: {
						status_description: "Transaction Successful",
						status_code: "OK.00.00",
						product: product
					}
				});

			}
		});

	},
	getById:function(req, res, next){
 		console.log('GET data by Id');
 		console.log(req.params.id);

 		
 	// 	// Authorization
 	// 	let jwtUtil = require('../models/jwt.js');
		// jwtUtil.verify({
		// 	token: req.params.id
		// }, function(response) {
		// 	console.log(response);
		// 	if(response.data == undefined) {
		// 		// Transaction Failed
		// 		res.status(200).json({
		//  			timestamp: Math.floor(Date.now()).toString(),
		// 			status: "200",
		// 			message: 'Request processed successfully',
		// 			path: req.originalUrl,
		// 			data: {
		// 				status_description: "Transaction Failed",
		// 				status_code: "ER.00.00"
		// 			}
		// 		});
		// 	} else {
		// 		// Transaction Successful
		// 		res.json({
		//  			timestamp: Math.floor(Date.now()).toString(),
		// 			status: "200",
		// 			message: 'Request processed successfully',
		// 			path: req.originalUrl,
		// 			data: {
		// 				status_description: "Transaction Successful",
		// 				status_code: "OK.00.00",
		// 				uuid: response.data.uuid
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


				let firebaseUtil = require('../models/firebase.js');
				firebaseUtil.create({
					table: 'database/product', 
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
								status_code: "OK.00.00"
								// account_id: response.data.account_id
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