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
		let stripe = require('stripe')('sk_test_51IVtCaFexfjPoyS3RGrjHVd4WTuLQlwE1s4MtDGOnnm19I0DA0l5K24EtGRMirFz6PQhQ6KJcwnzxlshw81INppQ00XNsQTZpF');

 		let session = stripe.checkout.sessions.create({
		    payment_method_types: ['card'],
		    line_items: [
		      {
		        price_data: {
		          currency: 'php',
		          product_data: {
		            name: 'T-shirt',
		          },
		          unit_amount: 2000,
		        },
		        quantity: 1,
		      },
		    ],
		    mode: 'payment',
		    success_url: 'https://example.com/success',
		    cancel_url: 'https://example.com/cancel',
		  });

 		res.json({
 			timestamp: Math.floor(Date.now()).toString(),
			status: "200",
			message: 'Request processed successfully',
			path: req.originalUrl,
			data: {
				status_description: "Transaction Successful",
				status_code: "OK.00.00",
				id: session.id
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