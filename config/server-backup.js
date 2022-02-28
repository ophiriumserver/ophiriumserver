// let express = require('express');
// let app = express();
// let bodyParser = require('body-parser');
// let expressJwt = require('express-jwt');
// let firebase = require('firebase');
// let firebaseDatabase = require('../models/firebase.js');
// let fs = require('fs');
// let jwt = require('jsonwebtoken');
// let readline = require('readline');
// let { v4: uuidv4 } = require('uuid');

// // let app = require('../api-routes/index.js');
// // app(express());

// global.config = {
//   test: {
//     app: {
//       name: 'Base',
//       jwt: {
//         header: 'Authorization',
//         prefix: 'Bearer',
//         issuer: 'APN',
//         subject: 'Base Authentication',
//         audience: 'Base',
//         key: 'This is the secret for signing tokens',
//         expiry: {
//           min: 1800000,
//           mid: 86400000,
//           max: 172800000
//         }
//       }
//     }
//   },
//   admin: {
//     data: {
//       user_id: '-MUpGebc5wUiSV4n7aSF',
//       franchisee_id: '-MXzP4bc5wUiSV4n8b9A',
//     }
//   },
//   user: {
//     role: {}
//   }
// };


// // global.config.test.app.jwt.key = 'This is the secret for signing tokens';
// // let datas = {
// //   user: {}
// // }

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use('/', express.static(__dirname + '/'));
// app.use('/api/session', expressJwt({secret: global.config.test.app.jwt.key}));
// // app.use('/user', require('../api-routes/user.js'));
// // app.use('api/session/client', expressJwt({secret: secret}));

// app.use(function(err, req, res, next){
//   if (err.constructor.name === 'UnauthorizedError') {
//     res.status(401).send('Unauthorized');
//   }
// });

// app.post('/login', function(req, res) {
//   // if (!(req.body.username === 'john.doe' && req.body.password === 'foobar')) {
//   //   res.status(401).send('Error 401');
//   //   console.log('Error 401');
//   //   return;
//   // }
  
//   let database = firebase.database();
//   let request = {
//     table: 'database/user'
//   }

//   database.ref(request.table).once('value', snapshot => {
//     let exist = false;
//     let childSnapshotData = {};
//     snapshot.forEach(function(childSnapshot) {
//       if(childSnapshot.val().data.username == req.body.username && childSnapshot.val().data.password == req.body.password) {
//         childSnapshotData = childSnapshot.val();
//         // delete childSnapshotData['user_id'];
//         // delete childSnapshotData['uuid'];
//         exist = true; 

//         // console.log(childSnapshotData);

        

//       }
//     });

//     request = {
//       table: 'database/user/' + childSnapshotData.data.user_id
//     };

//     database.ref(request.table).on('value', snapshot => {
//         console.log(snapshot.val());

//         let userId = snapshot.val().data.user_id;
//         let userActive = snapshot.val().data.active;
//         // console.log('\nuserId: ' + userId);
//         // console.log('userActive: ' + userActive);

//         let franchiseeId = Object.keys(snapshot.val().franchisee)[0];
//         let franchiseeActive = snapshot.val().franchisee[franchiseeId].data.active;
//         // console.log('\nfranchiseeId: ' + franchiseeId);
//         // console.log('franchiseeActive: ' + franchiseeActive);

//         let merchantId = Object.keys(snapshot.val().franchisee[franchiseeId].merchant)[0];
//         let merchantActive = snapshot.val().franchisee[franchiseeId].merchant[merchantId].data.active;
//         // console.log('\nmerchantId: ' + merchantId);
//         // console.log('merchantActive: ' + merchantActive);

//         let clientId = Object.keys(snapshot.val().franchisee[franchiseeId].merchant[merchantId].client)[0];
//         let clientActive = snapshot.val().franchisee[franchiseeId].merchant[merchantId].client[clientId].data.active;
//         // console.log('\nclientId: ' + clientId);
//         // console.log('clientActive: ' + clientActive);

//         global.credential = {
//           user: {
//             user_id: userId,
//             active: userActive
//           },
//           franchisee: {
//             franchisee_id: franchiseeId,
//             active: franchiseeActive
//           },
//           merchant: {
//             merchant_id: merchantId,
//             active: merchantActive
//           },
//           client: {
//             client_id: clientId,
//             active: clientActive
//           },
//           data: snapshot.val().data
//         };

//         console.log(global.credential);

//     });

//     if(exist) {
//       let token = jwt.sign(childSnapshotData, global.config.test.app.jwt.key, { expiresIn: 1 * 60 });
//       res.json({ token: token });
//       console.log('[200] Success: Authentication');
//     } else {
//       res.status(401).send('[401] Error');
//       console.log('[401]' + request.table);
//       return;
//     }
//   }).catch(function(error) {
//     if (error) {
//       res.status(500).send('[500] ' + error);
//       console.log('[500] ' + error);
//     }
//   });

//   // let token = jwt.sign({user_type: 2}, secret, { expiresIn: 1 * 60 });
//   // res.json({ token: token });
// });

// app.get('/api/session/request', function (req, res) {
//   console.log('[200] Success: GET Request');
//   let token = jwt.sign({ user_id: '123', req: req.user }, global.config.test.app.jwt.key, { expiresIn: 1 * 60 });
//   res.json({ token: token });
// });

// app.post('/api/session/request', function(req, res) {
//   console.log('[200] Success: POST Request');
//   let token = jwt.sign({ user_id: '123' }, global.config.test.app.jwt.key, { expiresIn: 1 * 60 });
//   res.json({ token: token });
// });

// app.post('/api/session/client/create', function(req, res) {
//   console.log(global.credential.data.authorities);

//   if(!global.credential.data.authorities.includes('AP_CUS_ADD')) {
//     console.log('[500] NO CLIENT PERMISSION');
//     res.status(500).send('[500] NO CLIENT PERMISSION');
//     return;
//   } 

//   req.body['authorities'] = ['AP_ALL', 'AP_CUS_ALL', 'AP_CUS_GET', 'AP_CUS_ADD', 'AP_CUS_UPD', 'AP_CUS_DEL'];
//   req.body['active'] = true;
//   firebaseDatabase.create({
//     table: 'database/user',
//     path: 'database/user', 
//     data: req.body
//   }, function(response1) {
//     console.log(response1);
//     if(response1.error != undefined) {
//       console.log('[500] ' + response1.error);
//       return res.status(500).send('[500] ' + response1.error);
//     }

//     response1.data['active'] = true;
//     let userId = response1.data.user_id;
//     firebaseDatabase.create({
//       table: 'database/user/' + userId + '/franchisee',
//       data: response1.data
//     }, function(response2) {
//       console.log(response2);
//       if(response2.error != undefined) {
//         console.log('[500] ' + response2.error);
//         return res.status(500).send('[500] ' + response2.error);
//       }

//       response2.data['user_id'] = userId;
//       response2.data['active'] = true;
//       let franchiseeId = response2.data.franchisee_id;
//       firebaseDatabase.create({
//         table: 'database/user/' + userId + '/franchisee/' + franchiseeId + '/merchant',
//         data: response2.data
//       }, function(response3) {
//         console.log(response3);
//         if(response3.error != undefined) {
//           console.log('[500] ' + response3.error);
//           return res.status(500).send('[500] ' + response3.error);
//         }
        
//         let merchantId = response3.data.merchant_id;
//         response3.data['user_id'] = userId;
//         response3.data['franchisee_id'] = franchiseeId;
//         response3.data['active'] = true;
//         firebaseDatabase.create({
//           table: 'database/user/' + userId + '/franchisee/' + franchiseeId + '/merchant/' + merchantId + '/client',
//           path: '/api/session/client/create',
//           data: response3.data
//         }, function(response4) {
//           console.log(response4);
//           if(response4.error != undefined) {
//             console.log('[500] ' + response4.error);
//             return res.status(500).send('[500] ' + response4.error);
//           }
//           res.json({
//             status: response4.status,
//             token: response4.token
//           })
//         });

//       });

//     });

//   });

// });

// app.get('/api/session/client/read', function(req, res) {
//   console.log(global.credential.data.authorities);

//   if(!global.credential.data.authorities.includes('AP_CUS_GET')) {
//     console.log('[500] NO CLIENT PERMISSION');
//     res.status(500).send('[500] NO CLIENT PERMISSION');
//     return;
//   } 

//   firebaseDatabase.read({
//     table: 'database/user/' + global.credential.user.user_id,
//     path: '/api/session/client/read'
//     // table: 'database/user/' + global.config.admin.data.user_id
//   }, function(response) {
//     console.log(response);
//     if(response.error != undefined) {
//       console.log('[500] ' + response.error);
//       return res.status(500).send('[500] ' + response.error);
//     }
//     res.json({
//       status: response.status,
//       token: response.token
//     })
//   });

// });

// app.post('/api/session/client/update', function(req, res) {
//   console.log(global.credential.data.authorities);

//   if(!global.credential.data.authorities.includes('AP_CUS_UPD')) {
//     console.log('[500] NO CLIENT PERMISSION');
//     res.status(500).send('[500] NO CLIENT PERMISSION');
//     return;
//   } 

//   firebaseDatabase.update({
//     table: 'database/user',
//     id: '-MUvLXzT46RZGzs2EtBQ/data',
//     path: '/api/session/client/update',
//     data: req.body
//   }, function(response) {
//     console.log(response);
//     if(response.error != undefined) {
//       console.log('[500] ' + response.error);
//       return res.status(500).send('[500] ' + response.error);
//     }
//     res.json({
//       status: response.status,
//       token: response.token
//     })
//   });

// });

// app.post('/api/session/client/delete', function(req, res) {
//   console.log(global.credential.data.authorities);

//   if(!global.credential.data.authorities.includes('AP_CUS_DEL')) {
//     console.log('[500] NO CLIENT PERMISSION');
//     res.status(500).send('[500] NO CLIENT PERMISSION');
//     return;
//   } 

//   firebaseDatabase.remove({
//     table: 'database/user',
//     id: '-MUvNcA1NFDV4YWz1RLZ',
//     path: '/api/session/client/delete'
//   }, function(response) {
//     console.log(response);
//     if(response.error != undefined) {
//       console.log('[500] ' + response.error);
//       return res.status(500).send('[500] ' + response.error);
//     }
//     res.json({
//       status: response.status,
//       token: response.token
//     })
//   });

// });

// // app.get('/person', function(req, res) {

// //   let readInterface = readline.createInterface({
// //     input: fs.createReadStream(__dirname + '/phone-number.txt'),
// //     // output: process.stdout,
// //     console: false
// //   });

// //   readInterface.on('line', function(phoneNumber) {
// //     console.log(phoneNumber);
// //     let database = firebase.database();
// //     let request = {
// //       table: 'person',
// //       data: {
// //         level: 0,
// //         phone_number: phoneNumber
// //       }
// //     }

// //     Object.keys(req.body).forEach(function(key) {
// //         request.data[key] = req.body[key];
// //     });
// //     // request.data['uuid'] = uuidv4();

// //     let table = request.table.split('/');
// //     let lastItem = table[table.length - 1];
// //     request.data[lastItem + '_id'] = phoneNumber;

// //     // firebase.database().ref(request.table + '/' + pushRef.key + '_' + request.data['uuid']).set(request.data, (error) => {
// //     firebase.database().ref(request.table + '/' + phoneNumber).set(request.data, (error) => {
// //       if (error) {
// //         res.status(500).send('[500] ' + error);
// //         console.log('[500] ' + error);
// //       } else {
// //         // let token = jwt.sign({ action: 'CREATE' }, global.config.test.app.jwt.key, { expiresIn: 1 * 60 });
// //         res.json({ 
// //           status: 200
// //         });
// //         // let token = jwt.sign({ action: 'CREATE' }, global.config.test.app.jwt.key, { expiresIn: 1 * 60 });
// //         // res.json({
// //         //   token: token, 
// //         //   status: 200
// //         // });
// //         console.log('[200] Success: Create Data');
// //       }
// //     });
// //   });

// //   res.json({ 'status': 200 });
// // });

// app.listen(8080, function () {
//   console.log('listening on http://localhost:8080');

//   // JCWC
//   // let firebaseConfig = {
//   //   apiKey: "AIzaSyDaVUTrf4XktV74h7qDwYcZjd0GVmV1fZk",
//   //   authDomain: "jesus-culture-ph.firebaseapp.com",
//   //   databaseURL: "https://jesus-culture-ph.firebaseio.com",
//   //   projectId: "jesus-culture-ph",
//   //   storageBucket: "jesus-culture-ph.appspot.com",
//   //   messagingSenderId: "758513958602",
//   //   appId: "1:758513958602:web:a5ae3da2f2483c353a7e33",
//   //   measurementId: "G-JTYXP5CN2G"
//   // }

//   // Ifuel 
//   let firebaseConfig = {
//     apiKey: "AIzaSyDUiqQIaSjel7nplv-FXa5RpxBnlSO5LtM",
//     authDomain: "ifuel-dev.firebaseapp.com",
//     databaseURL: "https://ifuel-dev.firebaseio.com",
//     projectId: "ifuel-dev",
//     storageBucket: "ifuel-dev.appspot.com",
//     messagingSenderId: "406466362125",
//     appId: "1:406466362125:web:8ed6b837bdfc725539ce44"
//   }
//   firebase.initializeApp(firebaseConfig);

//   // Seed configuration user super_admin 
//   let database = firebase.database();
//   let request = {
//     table: 'config/user/role/super_admin',
//     data: {
//       type: 'super_admin',
//       name: 'Super Administrator',
//       status: 'ACTIVE'
//     }
//   }
//   request.data['uuid'] = uuidv4();

//   let table = request.table.split('/');
//   let lastItem = table[table.length - 1];
//   request.data[lastItem + '_id'] = 'super_admin';

//   database.ref(request.table).set(request.data, (error) => {
//     if (error) {
//       console.log('[500] ' + error);
//     }
//   });

//   // Seed configuration user super_user 
//   request = {
//     table: 'config/user/role/super_user', 
//     data: {
//       type: 'super_user',
//       name: 'Super User',
//       status: 'ACTIVE'
//     }
//   }
//   request.data['uuid'] = uuidv4();

//   table = request.table.split('/');
//   lastItem = table[table.length - 1];
//   request.data[lastItem + '_id'] = 'super_user';

//   database.ref(request.table).set(request.data, (error) => {
//     if (error) {
//       console.log('[500] ' + error);
//     }
//   });

//   // Get config/user/role
//   request = {
//     table: 'config/user/role'
//   }
//   database.ref(request.table).once('value', snapshot => {
//     snapshot.forEach(function(childSnapshot) {
//       global.config.user.role[childSnapshot.val().type] = childSnapshot.val();
//     });
//     // console.log(global.config.user.role);

//     // Seed database/user/administrator/data
//     request = {
//       table: 'database/user/' + global.config.admin.data.user_id + '/data',
//       data: {
//         name: 'AltPayNet Global Corp.',
//         email: 'admin.whitelabel@altpaynet.com',
//         image_url: "http://test.cdn.e-snapped.com/images/default-logo.png",
//         username: 'admin',
//         password: 'foobar',
//         authorities: ['AP_ALL', 'AP_CUS_ADD', 'AP_CUS_GET'],
//         scope: ['admin:read-write', 'api:read-write']
//       }
//     }
//     request.data['uuid'] = uuidv4();
//     table = request.table.split('/');
//     lastItem = table[table.length - 1];
//     request.data[lastItem + '_id'] = global.config.admin.data.user_id;

//     database.ref(request.table).set(request.data, (error) => {
//       if (error) {
//         console.log('[500] ' + error);
//       }
//     });

//     // Seed database/user/administrator/data/config/user/role
//     request = {
//       table: 'database/user/' + global.config.admin.data.user_id + '/config/user/role'
//     }

//     database.ref(request.table).set(global.config.user.role['super_admin'], (error) => {
//       if (error) {
//         console.log('[500] ' + error);
//       }
//     });

//     // Seed database/user/administrator/franchisee/administrator/data
//     // request = {
//     //   table: 'database/user/' + global.config.admin.data.user_id + '/franchisee/' + global.config.admin.data.franchisee_id + '/data',
//     //   data: {
//     //     name: 'AltPayNet Global Corp.',
//     //     email: 'admin.whitelabel@altpaynet.com',
//     //     phone: '+63 2 8123 4567',
//     //     line1: '905 Vicente Madrigal Building',
//     //     line2: '6793 Ayala Avenue',
//     //     city_municipality: 'Makati City',
//     //     zip: '1226',
//     //     state_province_region: 'Metro Manila',
//     //     country: 'PH',
//     //     website: 'https://altpaynet.com',
//     //     image_url: "http://test.cdn.e-snapped.com/images/default-logo.png",
//     //     status: 'ACTIVE'
//     //   }
//     // }
//     // request.data['uuid'] = uuidv4();
//     // table = request.table.split('/');
//     // lastItem = table[table.length - 1];
//     // request.data[lastItem + '_id'] = global.config.admin.data.franchisee_id;

//     // database.ref(request.table).set(request.data, (error) => {
//     //   if (error) {
//     //     console.log('[500] ' + error);
//     //   }
//     // });


//   }).catch(function(error) {
//     if (error) {
//       res.status(500).send('[500] ' + error);
//       console.log('[500] ' + error);
//     }
//   });


//   // request = {
//   //   table: 'database/user'
//   // };

//   // database.ref(request.table).on('value', snapshot => {
//   //     console.log('[200] ' + 'CHANGES!');
//   // });
  

// });



// // #write the following rule
// // RewriteEngine On
// // RewriteRule ^$ http://127.0.0.1:8080/ [P,L]
// // RewriteCond %{REQUEST_FILENAME} !-f
// // RewriteCond %{REQUEST_FILENAME} !-d
// // RewriteRule ^(.*)$ http://127.0.0.1:8080/$1 [P,L]

// // app.listen(8080, function () {
// //   console.log('listening on http://localhost:8080');
// // });

// // server.listen();
// // console.log('Express server started on port %s', JSON.stringify(server.address()));



// // let id = req.query._some_query_param; // $_GET["id"]

// // // Sample URL: https://foo.bar/items?id=234
// // app.get("/items",function(req,res){
// //    let id = req.query.id;
// //    //further operations to perform
// // });


// // // Sample URL: https://foo.bar/items/322
// // app.get("items/:id",function(req,res){
// //  let id = req.params.id;
// //  //further operations to perform
// // });