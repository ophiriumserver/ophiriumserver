// let expressJwt = require('express-jwt');
// let jwt = require('jsonwebtoken');
// let { v4: uuidv4 } = require('uuid');

// let firebase = require('firebase');
// let firebaseConfig = {
//   apiKey: "AIzaSyCoxkVz3E3dyaHNUYhDYaJJ2MryLvj4qDM",
//     authDomain: "mother-test.firebaseapp.com",
//     databaseURL: "https://mother-test-default-rtdb.firebaseio.com",
//     projectId: "mother-test",
//     storageBucket: "mother-test.appspot.com",
//     messagingSenderId: "176966815782",
//     appId: "1:176966815782:web:5094b05e680bc921c596e7",
//     measurementId: "G-7D4PNW1E9T"
// }
// firebase.initializeApp(firebaseConfig);

// function create(parameters, callback) {
//   let database = firebase.database();
//   let request = {
//     table: parameters.table,
//     path: parameters.path,
//     data: parameters.data,
//     tempData: {}
//   }

//   Object.keys(parameters.data).forEach(function(key) {
//       request.tempData[key] = parameters.data[key];
//   });
//   request.tempData['uuid'] = uuidv4();

//   let pushRef = database.ref(request.table).push();
//   let table = request.table.split('/');
//   let lastItem = table[table.length - 1];
//   request.tempData[lastItem + '_id'] = pushRef.key;

//   // firebase.database().ref(request.table + '/' + pushRef.key + '_' + request.data['uuid']).set(request.data, (error) => {
//   database.ref(request.table + '/' + pushRef.key + '/data').set(request.tempData, (error) => {
//     if (error) {
//       callback({
//         status: 500, 
//         error: error 
//       });
//       console.log('[500] ' + error);
//     } else {
//       let token = jwt.sign({ 
//         timestamp: Math.floor(Date.now() / 1000), 
//         status: 200, 
//         message: 'Data created successfully.', 
//         path: request.path, 
//         data: request.data 
//       }, 'global.config.test.app.jwt.key', { expiresIn: 1 * 60 });

//       let verifyToken = jwt.verify(token, 'global.config.test.app.jwt.key', (err, verifiedJwt) => {
//         if(err){
//           callback({
//             status: 200,
//             token: token,
//             verifiedJwt: err.message,
//             data: {
//               [lastItem + '_id']: pushRef.key
//             } 
//           });
//         }else{
//           callback({
//             status: 200,
//             token: token,
//             verifiedJwt: verifiedJwt,
//             data: {
//               [lastItem + '_id']: pushRef.key
//             } 
//           });
//         }
//       });
//       console.log('[200] Success: Create Data');
//     }
//   });
// }

// function read(parameters, callback) {
//   let database = firebase.database();
//   let request = {
//     table: parameters.table,
//     path: parameters.path,
//     data: parameters.data,
//     tempData: {}
//   }

//   database.ref(request.table).once('value', snapshot => {
//     let snapshotData = {};
//     snapshotData = snapshot.val();
//     delete snapshotData['user_id'];
//     delete snapshotData['uuid'];

//     let token = jwt.sign({ 
//       timestamp: Math.floor(Date.now() / 1000), 
//       status: 200, 
//       message: 'Data fetch successfully.', 
//       path: request.path, 
//       data: snapshotData 
//     }, 'global.config.test.app.jwt.key', { expiresIn: 1 * 60 });

//     callback({
//       status: 200,
//       token: token 
//     });
//     console.log('[200] Success: Read Data');
//   }).catch(function(error) {
//     if (error) {
//       callback({
//         status: 500, 
//         error: error 
//       });
//       console.log('[500] ' + error);
//     }
//   });
// }

// function update(parameters, callback) {
//   let database = firebase.database();
//   let request = {
//     table: parameters.table,
//     id: parameters.id,
//     path: parameters.path,
//     data: parameters.data,
//     tempData: {}
//   }

//   Object.keys(parameters.data).forEach(function(key) {
//       request.tempData[key] = parameters.data[key];
//   });

//   let table = request.table.split('/');
//   let lastItem = table[table.length - 1];

//   database.ref(request.table + '/' + request.id).update(request.tempData, (error) => {
//     if (error) {
//       callback({
//         status: 500, 
//         error: error 
//       });
//       console.log('[500] ' + error);
//     } else {

//       let token = jwt.sign({ 
//         timestamp: Math.floor(Date.now() / 1000), 
//         status: 200, 
//         message: 'Data updated successfully.', 
//         path: request.path }, 'global.config.test.app.jwt.key', { expiresIn: 1 * 60 });

//       callback({
//         status: 200,
//         token: token,
//         data: {
//           [lastItem + '_id']: request.tempData[lastItem + '_id']
//         } 
//       });
//       console.log('[200] Success: Update Data');
//     }
//   });
// }

// function remove(parameters, callback) {
//   let database = firebase.database();
//   let request = {
//     table: parameters.table,
//     id: parameters.id,
//     path: parameters.path,
//     data: parameters.data,
//     tempData: {}
//   }

//   database.ref(request.table + '/' + request.id).remove(function(error) {
//     if (error) {
//       callback({
//         status: 500, 
//         error: error 
//       });
//       console.log('[500] ' + error);
//     } else {
//       let token = jwt.sign({ 
//         timestamp: Math.floor(Date.now() / 1000), 
//         status: 200, 
//         message: 'Data deleted successfully.', 
//         path: request.path }, 'global.config.test.app.jwt.key', { expiresIn: 1 * 60 });
      
//       callback({
//         status: 200,
//         token: token
//       });
//       console.log('[200] Success: Delete Data');
//     }
//   });
// }

// module.exports = { create, read, update, remove };