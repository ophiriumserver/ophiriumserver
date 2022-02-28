/* 
 * Copyright (C) MOTHER - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by 
 * Mac Neil Ivan Tumacay <tumacayivan@gmail.com>, 04/20/2021
 */

let express = require('express');
let router = express();
let controller = require('../controllers/incentive');
const jwt = require('jsonwebtoken');

// GET all data
router.get('/incentive', function(req, res, next) {
	controller.get(req, res, next);
});

// GET data by Id
router.get('/incentive/:id', function(req, res, next) {
	controller.getById(req, res, next);
});

// POST a data
router.post('/incentive', function(req, res, next) {
	controller.save(req, res, next);
});

// UPDATE a data by Id
router.put('/incentive/update/:id', function(req, res, next) {
	controller.update(req, res, next);
});

// DELETE a data by Id
router.delete('/incentive/delete/:id', function(req, res, next) {
	controller.delete(req, res, next);
});

module.exports = router;