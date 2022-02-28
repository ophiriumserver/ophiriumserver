let expressJwt = require('express-jwt');
let jwt = require('jsonwebtoken');
// let { v4: uuidv4 } = require('uuid');

let firebase = require('firebase');
let firebaseConfig = {
  apiKey: "AIzaSyCblmPKvJhgEFSmsNmz8aIxatXiswNb82I",
  authDomain: "ophirium-test.firebaseapp.com",
  projectId: "ophirium-test",
  storageBucket: "ophirium-test.appspot.com",
  messagingSenderId: "713993150764",
  appId: "1:713993150764:web:704537cc9b55d21aa8cc89",
  measurementId: "G-C6WSJ77F2R"
}
firebase.initializeApp(firebaseConfig);

function create(parameters, callback) {
  let database = firebase.database();
  let request = {
    table: parameters.table,
    data: parameters.data,
    tempData: {}
  }

  Object.keys(parameters.data).forEach(function(key) {
      request.tempData[key] = parameters.data[key];
  });
  // request.tempData['uuid'] = uuidv4();

  let pushRef = database.ref(request.table).push();
  let table = request.table.split('/');
  let lastItem = table[table.length - 1];
  request.tempData[lastItem + '_id'] = pushRef.key;

  // firebase.database().ref(request.table + '/' + pushRef.key + '_' + request.data['uuid']).set(request.data, (error) => {
  database.ref(request.table + '/' + pushRef.key + '/data').set(request.tempData, (error) => {
    if (error) {
      callback({
        status: 500,
        error: error 
      });
    } else {
      callback({
        status: 200,
        data: {
          [lastItem + '_id']: pushRef.key
        } 
      });
    }
  });
}

function read(parameters, callback) {
  let request = {
    table: parameters.table,
    data: parameters.data,
    tempData: {}
  }

  async function getBalance() {

      let snapshot = await firebase.database().ref(request.table).once('value', snapshot => {
        
      }).catch(function(error) {
        if (error) {
          callback({
            status: 500,
            error: error 
          });
        }
      });

      let value = snapshot.val();
      return value;
  }

  getBalance().then(function (response) {
      // console.log(response);
      console.log(response);

      callback({
        status: 200,
        data: response 
      });
  });

  
}

function update(parameters, callback) {
  let database = firebase.database();
  let request = {
    table: parameters.table,
    id: parameters.id,
    data: parameters.data,
    tempData: {}
  }

  Object.keys(parameters.data).forEach(function(key) {
      request.tempData[key] = parameters.data[key];
  });

  let table = request.table.split('/');
  let lastItem = table[table.length - 1];

  database.ref(request.table + '/' + request.id).update(request.tempData, (error) => {
    if (error) {
      callback({
        status: 500,
        error: error 
      });
    } else {
      callback({
        status: 200,
        data: {
          [lastItem + '_id']: request.tempData[lastItem + '_id']
        } 
      });
    }
  });
}

function remove(parameters, callback) {
  let database = firebase.database();
  let request = {
    table: parameters.table,
    id: parameters.id,
    data: parameters.data,
    tempData: {}
  }

  database.ref(request.table + '/' + request.id).remove(function(error) {
    if (error) {
      callback({
        status: 500, 
        error: error 
      });
    } else {
      callback({
        status: 200
      });
    }
  });
}

module.exports = { create, read, update, remove };