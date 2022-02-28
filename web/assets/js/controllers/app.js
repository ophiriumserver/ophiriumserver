class Global {

}

// Get URL parameters
Global.getUrlParameters = class {
    constructor(callback) {
        // get query string from url (optional) or re
          let queryString = window.location.search.slice(1);

          // we'll store the parameters here
          let obj = {};

          // if query string exists
          if (queryString) {

            // stuff after # is not part of query string, so get rid of it
            queryString = queryString.split('#')[0];

            // split our query string into its component parts
            let arr = queryString.split('&');

            for (let i=0; i<arr.length; i++) {
              // separate the keys and the values
              let a = arr[i].split('=');

              // in case params look like: list[]=thing1&list[]=thing2
              let paramNum = undefined;
              let paramName = a[0].replace(/\[\d*\]/, function(v) {
                paramNum = v.slice(1,-1);
                return '';
              });

              // set parameter value (use 'true' if empty)
              let paramValue = typeof(a[1])==='undefined' ? true : a[1];

              // (optional) keep case consistent
              // paramName = paramName.toLowerCase();
              // paramValue = paramValue.toLowerCase();

              // if parameter name already exists
              if (obj[paramName]) {
                // convert value to array (if still string)
                if (typeof obj[paramName] === 'string') {
                  obj[paramName] = [obj[paramName]];
                }
                // if no array index number specified...
                if (typeof paramNum === 'undefined') {
                  // put the value on the end of the array
                  obj[paramName].push(paramValue);
                }
                // if array index number specified...
                else {
                  // put the value at that index number
                  obj[paramName][paramNum] = paramValue;
                }
              }
              // if param name doesn't exist yet, set it
              else {
                obj[paramName] = paramValue;
              }
            }
          }

          callback(obj);
    }
}


// On pull even refresh page
let pStart = {x: 0, y:0};
let pStop = {x:0, y:0};

function swipeStart(e) {
    if (typeof e['targetTouches'] !== "undefined"){
        let touch = e.targetTouches[0];
        pStart.x = touch.screenX;
        pStart.y = touch.screenY;
    } else {
        pStart.x = e.screenX;
        pStart.y = e.screenY;
    }
}

function swipeEnd(e){
    if (typeof e['changedTouches'] !== "undefined"){
        let touch = e.changedTouches[0];
        pStop.x = touch.screenX;
        pStop.y = touch.screenY;
    } else {
        pStop.x = e.screenX;
        pStop.y = e.screenY;
    }

    swipeCheck();
}

function swipeCheck(){
    let changeY = pStart.y - pStop.y;
    let changeX = pStart.x - pStop.x;
    if (isPullDown(changeY, changeX) ) {
        // alert('Swipe Down!');
        window.location.reload();
    }
}

function isPullDown(dY, dX) {
    // methods of checking slope, length, direction of line created by swipe action 
    return dY < 0 && (
        (Math.abs(dX) <= 100 && Math.abs(dY) >= 300)
        || (Math.abs(dX)/Math.abs(dY) <= 0.3 && dY >= 60)
    );
}

document.addEventListener('touchstart', function(e){ swipeStart(e); }, false);
document.addEventListener('touchend', function(e){ swipeEnd(e); }, false);

new Global.getUrlParameters(function(parameter) {
    if(parameter.token === undefined) {
        Swal.fire(
          'Error',
          'No Authorization',
          'error'
        )
    } else {

        // Get account by id
        fetch(localStorage.connection_url + '/api/account/' + parameter.token, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          // body: JSON.stringify(data),
        })
        .then(data => data.json())
        .then(response => {
            // // // console.log(response.data);
            if(response.data.status_code === 'ER.00.00') {
                Swal.fire(
                  'Error',
                  response.data.error,
                  'error'
                )
            } else {
                // // // console.log(response.data.account.wallet_address);
                $('h5.wallet_address_label').text(response.data.account.wallet_address);
                // $('input#wallet_address').val(response.data.account.wallet_address);

                localStorage.setItem('wallet_address', response.data.account.wallet_address);
            }
        })
        .catch((error) => {
          console.error('Error:', error);
        });

        // Get reward point by id
        fetch(localStorage.connection_url + '/api/reward-point/' + parameter.token, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          // body: JSON.stringify(data),
        })
        .then(data => data.json())
        .then(response => {
            // // // console.log(response.data);
            if(response.data.status_code === 'ER.00.00') {
                // Swal.fire(
                //   'Error',
                //   response.data.error,
                //   'error'
                // )
            } else {
                // Set account token and reward point in local storage
                localStorage.setItem('token', parameter.token);
                localStorage.setItem('reward_point', response.data.reward_point);

                // Set account reward point
                // $('span#reward_point').text(response.data.reward_point.toLocaleString());


                // Create account reward point animation
                var $rewardPoint = $('span#reward_point'),
                    value = response.data.reward_point;
                $({percentage: 0}).stop(true).animate({percentage: value}, {
                    duration : 2000,
                    easing: "easeOutExpo",
                    step: function () {
                        // percentage with 1 decimal;
                        var percentageVal = Math.round(this.percentage * 10) / 10;
                        
                        $rewardPoint.text(percentageVal.toLocaleString());
                    }
                }).promise().done(function () {
                    // hard set the value after animation is done to be
                    // sure the value is correct
                    $rewardPoint.text(value.toLocaleString());
                    // console.log(value.toLocaleString());
                });


                // Set account QR code
                let typeNumber = 11;
                let errorCorrectionLevel = 'L';
                let qr = qrcode(typeNumber, errorCorrectionLevel);
                qr.addData(parameter.token);
                qr.make();
                $('div.qrcode').html(qr.createImgTag());
                $('div.qrcode img').attr('class', 'img-fluid');
                $('div.qrcode img').css('width', '100%');
                // // // // console.log('http://localhost:8080/api/reward-point/' + parameter.token);



                // // Claim incentive
                // fetch(localStorage.connection_url + '/api/incentive', {
                //   method: 'POST',
                //   mode: 'cors',
                //   headers: {
                //     'Content-Type': 'application/json',
                //     'Authorization': localStorage.token
                //   },
                //   body: JSON.stringify({
                //     token: localStorage.token
                //   }),
                // })
                // .then(data => data.json())
                // .then(response => {
                //     // // // // console.log(response.data);
                //     if(response.data.status_code === 'ER.00.00') {
                //         // alert(response.data.error);
                //         Swal.fire(
                //           'Error',
                //           response.data.error,
                //           'error'
                //         )
                //     } else {
                //         // // // console.log(response);

                //     }
                // })
                // .catch((error) => {
                //   console.error('Error:', error);
                // });



            }
        })
        .catch((error) => {
          console.error('Error:', error);
        });

        // setInterval(function(){ 

        //   // Get reward point by id
        //   fetch(localStorage.connection_url + '/api/reward-point/' + parameter.token, {
        //     method: 'GET',
        //     mode: 'cors',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     // body: JSON.stringify(data),
        //   })
        //   .then(data => data.json())
        //   .then(response => {
        //       // // // console.log(response.data);
        //       if(response.data.status_code === 'ER.00.00') {
        //           Swal.fire(
        //             'Error',
        //             'Invalid Authorization',
        //             'error'
        //           )
        //       } else {
        //           // Set account token in local storage
        //           localStorage.setItem('token', parameter.token);

        //           // Set account reward point
        //           // $('span#reward_point').text(response.data.reward_point.toLocaleString());

        //           // // // // console.log('localStorage.reward_point: ' + localStorage.reward_point);
        //           // // // // console.log('response.data.reward_point: ' + response.data.reward_point);

        //           if(localStorage.reward_point != response.data.reward_point) {
        //             localStorage.setItem('reward_point', response.data.reward_point);
        //             $('div.receive').modal('hide');

        //             // Create account reward point animation
        //             var $rewardPoint = $('span#reward_point'),
        //                 value = response.data.reward_point;
        //             $({percentage: 0}).stop(true).animate({percentage: value}, {
        //                 duration : 2000,
        //                 easing: "easeOutExpo",
        //                 step: function () {
        //                     // percentage with 1 decimal;
        //                     var percentageVal = Math.round(this.percentage * 10) / 10;
                            
        //                     $rewardPoint.text(percentageVal.toLocaleString());
        //                 }
        //             }).promise().done(function () {
        //                 // hard set the value after animation is done to be
        //                 // sure the value is correct
        //                 $rewardPoint.text(value.toLocaleString());
        //             });




        //             // Get transaction by id
        //             fetch(localStorage.connection_url + '/api/transaction/' + parameter.token, {
        //               method: 'GET',
        //               mode: 'cors',
        //               headers: {
        //                 'Content-Type': 'application/json'
        //               },
        //               // body: JSON.stringify(data),
        //             })
        //             .then(data => data.json())
        //             .then(response => {
        //                 // // // console.log(response.data);
        //                 if(response.data.status_code === 'ER.00.00') {
        //                     // alert(response.data.error);
        //                     Swal.fire(
        //                       'Error',
        //                       'Invalid Authorization',
        //                       'error'
        //                     )
        //                 } else {
        //                     // // // console.log('Get transaction by id');
        //                     // // // console.log(response.data.transaction);
        //                     $('div.orders').html('');
        //                     $.each(response.data.transaction, function(key, value){
        //                         // // // // console.log(value);
        //                         let date = moment(value.iat * 1000).format('L HH:mm').toUpperCase()
        //                         if(value.claimed === true) {
        //                             $('div.orders').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">' + value.name + '</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">Delivery Time: ' + value.eta + '<br></h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #00c4d4;font-size: 28px;">' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: #f8df31;margin: 0;">CLAIMED</p> <p class="card-text" style="color: rgb(108,117,125);margin: 0;font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //                         } else if(value.claimed === false) {
        //                             $('div.orders').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">' + value.name + '</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">Delivery Time: ' + value.eta + '<br></h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #00c4d4;font-size: 28px;">' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: #f8df31;margin: 0;font-size: 18px;">Self Organized Shipping</p> <p class="card-text" style="color: rgb(108,117,125);margin: 0;font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //                             // $('div.orders').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">' + value.name + '</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">Delivery Time: ' + value.eta + '<br></h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #00c4d4;font-size: 28px;">' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: #7a7a7a;margin: 0;">NOT YET CLAIMED</p> <p class="card-text" style="color: rgb(108,117,125);margin: 0;font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //                         }
        //                     });
        //                 }
        //             })
        //             .catch((error) => {
        //               console.error('Error:', error);
        //             });

        //             // Get transfers by id
        //             fetch(localStorage.connection_url + '/api/transfer/' + parameter.token, {
        //               method: 'GET',
        //               mode: 'cors',
        //               headers: {
        //                 'Content-Type': 'application/json'
        //               },
        //             })
        //             .then(data => data.json())
        //             .then(response => {
        //                 // // // // console.log(response.data);
        //                 if(response.data.status_code === 'ER.00.00') {
        //                     // alert(response.data.error);
        //                     Swal.fire(
        //                       'Error',
        //                       'Invalid Authorization',
        //                       'error'
        //                     )
        //                 } else {
        //                     // // // console.log('Get transfers by id');
        //                     // // // console.log(response.data.transfer);
        //                     $('div.history').html('');
        //                     $.each(response.data.transfer, function(key, value){
        //                         // console.log(value);
        //                         let date = moment(value.iat * 1000).format('L HH:mm').toUpperCase()

        //                         if(value.incentive_id != undefined && value.reward_point != 0) {
        //                             $('div.history').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">Daily Reward</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">You received ' + value.reward_point.toLocaleString() + ' Ophir from a faucet</h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #f8df31;font-size: 28px;">+' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: rgb(108,117,125);font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //                         }

        //                         if(value.transfer_id != undefined && value.reward_point != 0) {
        //                             if(value.process === 'CREDIT') {
        //                                 $('div.history').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">Ophir Transfer</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">You received ' + value.reward_point.toLocaleString() + ' Ophir from ' + value.source_wallet_address + '</h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #f8df31;font-size: 28px;">+' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: rgb(108,117,125);font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //                             } else if(value.process === 'DEBIT') {
        //                                 $('div.history').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">Ophir Transfer</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">You transferred ' + value.reward_point.toLocaleString() + ' Ophir to ' + value.destination_wallet_address + '</h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #7a7a7a;font-size: 28px;">-' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: rgb(108,117,125);font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //                             }
        //                         }

        //                         if(value.transaction_id != undefined && value.reward_point != 0) {
        //                             $('div.history').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">Claim Reward</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">You spent ' + value.reward_point.toLocaleString() + ' Ophir by claiming ' + value.name + '</h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #7a7a7a;font-size: 28px;">-' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: rgb(108,117,125);font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //                         }

        //                         if(value.reward_point_id != undefined && value.reward_point != 0) {
        //                             $('div.history').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">Ophir Transfer</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">You received ' + value.reward_point.toLocaleString() + ' Ophir</h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #f8df31;font-size: 28px;">+' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: rgb(108,117,125);font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //                         }
                                
        //                     });
        //                 }
        //             })
        //             .catch((error) => {
        //               console.error('Error:', error);
        //             });



        //           }

        //           // Set account QR code
        //           let typeNumber = 11;
        //           let errorCorrectionLevel = 'L';
        //           let qr = qrcode(typeNumber, errorCorrectionLevel);
        //           qr.addData(parameter.token);
        //           qr.make();
        //           $('div.qrcode').html(qr.createImgTag());
        //           $('div.qrcode img').attr('class', 'img-fluid');
        //           $('div.qrcode img').css('width', '100%');
        //           // // // // console.log('http://localhost:8080/api/reward-point/' + parameter.token);
        //       }
        //   })
        //   .catch((error) => {
        //     console.error('Error:', error);
        //   });


        // }, localStorage.refresh_interval);


        // Get transfers by id
        fetch(localStorage.connection_url + '/api/transfer/' + parameter.token, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(data => data.json())
        .then(response => {
            // // // // console.log(response.data);
            if(response.data.status_code === 'ER.00.00') {
                // alert(response.data.error);
                // // // console.log(response.data);
                // Swal.fire(
                //   'Error',
                //   'Invalid Authorization 2',
                //   'error'
                // )
            } else {
                // // // console.log('Get transfers by id');
                // // // console.log(response.data.transfer);
                $('div.history').html('');
                $.each(response.data.transfer, function(key, value){
                    // console.log(value);
                    let date = moment(value.iat * 1000).format('L HH:mm').toUpperCase()

                    if(value.incentive_id != undefined && value.reward_point != 0) {
                        $('div.history').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">Daily Reward</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">You received ' + value.reward_point.toLocaleString() + ' Ophir from a faucet</h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #f8df31;font-size: 28px;">+' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: rgb(108,117,125);font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
                    }

                    if(value.transfer_id != undefined && value.reward_point != 0) {
                        if(value.process === 'CREDIT') {
                            $('div.history').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">Ophir Transfer</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">You received ' + value.reward_point.toLocaleString() + ' Ophir from ' + value.source_wallet_address + '</h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #f8df31;font-size: 28px;">+' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: rgb(108,117,125);font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
                        } else if(value.process === 'DEBIT') {
                            $('div.history').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">Ophir Transfer</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">You transferred ' + value.reward_point.toLocaleString() + ' Ophir to ' + value.destination_wallet_address + '</h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #7a7a7a;font-size: 28px;">-' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: rgb(108,117,125);font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
                        }
                    }

                    if(value.transaction_id != undefined && value.reward_point != 0) {
                        $('div.history').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">Claim Reward</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">You spent ' + value.reward_point.toLocaleString() + ' Ophir by claiming ' + value.name + '</h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #7a7a7a;font-size: 28px;">-' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: rgb(108,117,125);font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
                    }

                    if(value.reward_point_id != undefined && value.reward_point != 0) {
                        $('div.history').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">Ophir Transfer</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">You received ' + value.reward_point.toLocaleString() + ' Ophir</h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #f8df31;font-size: 28px;">+' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: rgb(108,117,125);font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
                    }
                    
                });
            }
        })
        .catch((error) => {
          console.error('Error:', error);
        });


        // // Get all products
        // fetch(localStorage.connection_url + '/api/product', {
        //   method: 'GET',
        //   mode: 'cors',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        // })
        // .then(data => data.json())
        // .then(response => {
        //     // // // // console.log(response.data);
        //     if(response.data.status_code === 'ER.00.00') {
        //         // alert(response.data.error);
        //         Swal.fire(
        //           'Error',
        //           'Invalid Authorization',
        //           'error'
        //         )
        //     } else {
        //         // // // console.log('Get all products');
        //         // // // console.log(response.data.transfer);
        //         $('div.shop').html('');
        //         $.each(response.data.product, function(key, value){
        //             // // console.log(value);

        //             if(value.active === true) {
        //               $('div.shop').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body" product_id="' + value.product_id + '"> <h5 class="card-title">' + value.name + '</h5> <h5 class="text-muted card-subtitle mb-2" style="font-size: 18px;">Delivery Time: ' + value.eta + '</h5> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #00c4d4;font-size: 28px;">' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul><button class="btn btn-lg btn-info btn-block view" type="button">View</button> </div> </div> </div>');

        //               // $('div.shop').append('<div class="card mt-2" style="box-shadow: 0px 2px 20px 0px rgb(225,225,225);"> <div class="card-body" style="padding: 0;"> <div class="form-group"> <div class="d-flex mx-auto" style="/*width: 150px;*/height: 200px;box-shadow: 0px 4px 4px rgb(255,255,255);background: #ffffff;border-bottom: 1px solid rgb(227,227,227);position: relative;"><span style="position: absolute;color: rgb(255,255,255);background: rgb(23,162,184);margin: 5px;padding: 5px;">Ophir<br /></span><img class="img-fluid d-flex mx-auto" src="' + value.image + '" style="object-fit: cover;border-top-left-radius: .25rem;border-top-right-radius: .25rem;" /></div> </div> <div class="form-group"> <h5>' + value.name + '</h5> </div> <div class="form-group" style="margin: 0;" product_id="' + value.product_id + '"> <h6 class="mb-2" style="font-size: 18px;margin: 0 !important;background: #f99f1c;color: rgb(255,255,255);">Self Organized Shipping</h6> <span class="spend" style="cursor: pointer !important;"> <ul class="list-inline" style="/*background: #131921;*/background: rgb(0,46,69);background: linear-gradient(0deg, rgba(0,46,69,1) 35%, rgba(0,86,131,1) 98%, rgba(22,31,54,1) 100%, rgba(22,31,54,1) 100%);padding: 10px;border-bottom-right-radius: .25rem;border-bottom-left-radius: .25rem;margin-bottom: 0;"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;" /></li> <li class="list-inline-item"><span style="color: #00c4d4;font-size: 28px;">' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> </span></div> </div> </div>');
        //             }

                    
        //             // $('div.shop').append('<div class="card mt-2" style="box-shadow: 0px 2px 20px 0px rgb(225,225,225);"> <div class="card-body" style="padding: 0;"> <div class="form-group"> <div class="d-flex mx-auto" style="/*width: 150px;*/height: 200px;box-shadow: 0px 4px 4px rgb(255,255,255);background: #ffffff;border-bottom: 1px solid rgb(227,227,227);position: relative;"><span style="position: absolute;color: rgb(255,255,255);background: rgb(23,162,184);margin: 5px;padding: 5px;">Ophir<br /></span><img class="img-fluid d-flex mx-auto" src="https://cdn.shopify.com/s/files/1/0357/2901/4916/files/partner-gcash_0a702fe4-faf5-4bf5-b08a-3d861fb230d8_480x480.png?v=1604733560" style="object-fit: cover;border-top-left-radius: .25rem;border-top-right-radius: .25rem;" /></div> </div> <div class="form-group"> <h5 class="mb-0">' + value.name + '</h5> <h6 class="text-muted mb-2" style="font-size: 18px;">Delivery Time: ' + value.eta + '<br /></h6> </div> <div class="form-group" style="margin: 0;"> <h6 class="mb-2" style="font-size: 18px;margin: 0 !important;background: #f99f1c;color: rgb(255,255,255);">Self Organized Shipping</h6> <span style="cursor: pointer !important;"> <ul class="list-inline" style="/*background: #131921;*/background: rgb(0,46,69);background: linear-gradient(0deg, rgba(0,46,69,1) 35%, rgba(0,86,131,1) 98%, rgba(22,31,54,1) 100%, rgba(22,31,54,1) 100%);padding: 10px;border-bottom-right-radius: .25rem;border-bottom-left-radius: .25rem;margin-bottom: 0;"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;" /></li> <li class="list-inline-item"><span style="color: #00c4d4;font-size: 28px;">' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> </span></div> </div> </div>');

        //         });

                

        //         $('button.view').click(function() {
        //             let product_id = $(this).closest('div').attr('product_id');
        //             window.product_id = product_id;

        //             // Get all products
        //             fetch(localStorage.connection_url + '/api/product', {
        //               method: 'GET',
        //               mode: 'cors',
        //               headers: {
        //                 'Content-Type': 'application/json'
        //               },
        //             })
        //             .then(data => data.json())
        //             .then(response => {
        //                 // // // // console.log(response.data);
        //                 if(response.data.status_code === 'ER.00.00') {
        //                     // alert(response.data.error);
        //                     Swal.fire(
        //                       'Error',
        //                       'Invalid Authorization',
        //                       'error'
        //                     )
        //                 } else {
        //                     $.each(response.data.product, function(key, value){
        //                       if(product_id === value.product_id) {
        //                         // // // console.log(value);
        //                         $('div.shopParameter .modal-title').text(value.name);
        //                         $('div.shopParameter .modal-body').html('');
        //                         $.each(value.parameter, function(key1, value1){
        //                           if(value1 != null) {
        //                             // // console.log(value1);
        //                             $('div.shopParameter .modal-body').append('<div class="form-group"><label style="font-size: 20px;">' + value1.name + '</label><input type="text" id="' + value1.id + '" class="form-control" style="font-size: 20px;"></div>');
        //                           }
        //                         });
        //                         $('div.shopParameter .modal-body').append('<div class="form-group"><button class="btn btn-info btn-block btn-lg spend" type="button">Spend</button></div>');

        //                         if(value.parameter != undefined)  {                                 
        //                          $('div.shopParameter').modal('toggle');
        //                         }
        //                       }
        //                     });

        //                     $('button.spend').click(function() {
        //                       // // console.log(window.product_id);
        //                       var data = {};
        //                       $('div.shopParameter input').each(function() {
        //                         data[this.id] = this.value;
        //                       });

        //                       $('div.shopParameter select').each(function() {
        //                         data[this.id] = this.value;
        //                       });
        //                       // // console.log(data);


        //                       // Claim reward
        //                       fetch(localStorage.connection_url + '/api/transaction', {
        //                         method: 'POST',
        //                         mode: 'cors',
        //                         headers: {
        //                           'Content-Type': 'application/json',
        //                           'Authorization': localStorage.token
        //                         },
        //                         body: JSON.stringify({
        //                           product_id: window.product_id,
        //                           parameter: data
        //                         }),
        //                       })
        //                       .then(data => data.json())
        //                       .then(response => {
        //                           // // // // console.log(response.data);
        //                           if(response.data.status_code === 'ER.00.00') {
        //                               // alert(response.data.error);
        //                               Swal.fire(
        //                                 'Error',
        //                                 response.data.error,
        //                                 'error'
        //                               )
        //                           } else {
        //                               // // // console.log(response);

        //                               // Get transaction by id
        //                               fetch(localStorage.connection_url + '/api/transaction/' + parameter.token, {
        //                                 method: 'GET',
        //                                 mode: 'cors',
        //                                 headers: {
        //                                   'Content-Type': 'application/json'
        //                                 },
        //                                 // body: JSON.stringify(data),
        //                               })
        //                               .then(data => data.json())
        //                               .then(response => {
        //                                   // // // console.log(response.data);
        //                                   if(response.data.status_code === 'ER.00.00') {
        //                                       // alert(response.data.error);
        //                                       Swal.fire(
        //                                         'Error',
        //                                         'Invalid Authorization',
        //                                         'error'
        //                                       )
        //                                   } else {
        //                                       // // // console.log('Get transaction by id');
        //                                       // // // console.log(response.data.transaction);
        //                                       $('div.orders').html('');
        //                                       $.each(response.data.transaction, function(key, value){
        //                                           // // // // console.log(value);
        //                                           let date = moment(value.iat * 1000).format('L HH:mm').toUpperCase()
        //                                           if(value.claimed === true) {
        //                                               $('div.orders').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">' + value.name + '</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">Delivery Time: ' + value.eta + '<br></h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #00c4d4;font-size: 28px;">' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: #f8df31;margin: 0;">CLAIMED</p> <p class="card-text" style="color: rgb(108,117,125);margin: 0;font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //                                           } else if(value.claimed === false) {
        //                                             $('div.orders').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">' + value.name + '</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">Delivery Time: ' + value.eta + '<br></h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #00c4d4;font-size: 28px;">' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: #f8df31;margin: 0;font-size: 18px;">Self Organized Shipping</p> <p class="card-text" style="color: rgb(108,117,125);margin: 0;font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //                                               // $('div.orders').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">' + value.name + '</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">Delivery Time: ' + value.eta + '<br></h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #00c4d4;font-size: 28px;">' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: #7a7a7a;margin: 0;">NOT YET CLAIMED</p> <p class="card-text" style="color: rgb(108,117,125);margin: 0;font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //                                           }
        //                                       });
        //                                   }
        //                               })
        //                               .catch((error) => {
        //                                 console.error('Error:', error);
        //                               });




        //                               // Get transfers by id
        //                               fetch(localStorage.connection_url + '/api/transfer/' + parameter.token, {
        //                                 method: 'GET',
        //                                 mode: 'cors',
        //                                 headers: {
        //                                   'Content-Type': 'application/json'
        //                                 },
        //                               })
        //                               .then(data => data.json())
        //                               .then(response => {
        //                                   // // // // console.log(response.data);
        //                                   if(response.data.status_code === 'ER.00.00') {
        //                                       // alert(response.data.error);
        //                                       Swal.fire(
        //                                         'Error',
        //                                         'Invalid Authorization',
        //                                         'error'
        //                                       )
        //                                   } else {
        //                                       // // // console.log('Get transfers by id');
        //                                       // // // console.log(response.data.transfer);
        //                                       $('div.history').html('');
        //                                       $.each(response.data.transfer, function(key, value){
        //                                             // console.log(value);
        //                                             let date = moment(value.iat * 1000).format('L HH:mm').toUpperCase()

        //                                             if(value.incentive_id != undefined && value.reward_point != 0) {
        //                                                 $('div.history').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">Daily Reward</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">You received ' + value.reward_point.toLocaleString() + ' Ophir from a faucet</h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #f8df31;font-size: 28px;">+' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: rgb(108,117,125);font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //                                             }

        //                                             if(value.transfer_id != undefined && value.reward_point != 0) {
        //                                                 if(value.process === 'CREDIT') {
        //                                                     $('div.history').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">Ophir Transfer</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">You received ' + value.reward_point.toLocaleString() + ' Ophir from ' + value.source_wallet_address + '</h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #f8df31;font-size: 28px;">+' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: rgb(108,117,125);font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //                                                 } else if(value.process === 'DEBIT') {
        //                                                     $('div.history').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">Ophir Transfer</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">You transferred ' + value.reward_point.toLocaleString() + ' Ophir to ' + value.destination_wallet_address + '</h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #7a7a7a;font-size: 28px;">-' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: rgb(108,117,125);font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //                                                 }
        //                                             }

        //                                             if(value.transaction_id != undefined && value.reward_point != 0) {
        //                                                 $('div.history').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">Claim Reward</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">You spent ' + value.reward_point.toLocaleString() + ' Ophir by claiming ' + value.name + '</h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #7a7a7a;font-size: 28px;">-' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: rgb(108,117,125);font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //                                             }

        //                                             if(value.reward_point_id != undefined && value.reward_point != 0) {
        //                                                 $('div.history').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">Ophir Transfer</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">You received ' + value.reward_point.toLocaleString() + ' Ophir</h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #f8df31;font-size: 28px;">+' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: rgb(108,117,125);font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //                                             }
                                                    
        //                                         });
        //                                   }
        //                               })
        //                               .catch((error) => {
        //                                 console.error('Error:', error);
        //                               });

        //                               $('div.shopParameter').modal('toggle');

        //                               Swal.fire(
        //                                 'Success',
        //                                 'Transaction Successful',
        //                                 'success'
        //                               )



        //                               // alert(response.data.status_description);
        //                           }
        //                       })
        //                       .catch((error) => {
        //                         console.error('Error:', error);
        //                       });




        //                     });
        //                 }
        //             })
        //             .catch((error) => {
        //               console.error('Error:', error);
        //             });

        //         });


        //         // $('button.spend').click(function() {
        //         //     let product_id = $(this).closest('div').attr('product_id');
        //         //     // // // console.log(product_id);

        //         //     // Claim reward
        //         //     fetch(localStorage.connection_url + '/api/transaction', {
        //         //       method: 'POST',
        //         //       mode: 'cors',
        //         //       headers: {
        //         //         'Content-Type': 'application/json',
        //         //         'Authorization': localStorage.token
        //         //       },
        //         //       body: JSON.stringify({
        //         //         product_id: product_id
        //         //       }),
        //         //     })
        //         //     .then(data => data.json())
        //         //     .then(response => {
        //         //         // // // // console.log(response.data);
        //         //         if(response.data.status_code === 'ER.00.00') {
        //         //             // alert(response.data.error);
        //         //             Swal.fire(
        //         //               'Error',
        //         //               response.data.error,
        //         //               'error'
        //         //             )
        //         //         } else {
        //         //             // // // console.log(response);




        //         //             // // Get account reward point
        //         //             // fetch(localStorage.connection_url + '/api/reward-point/' + localStorage.token, {
        //         //             //   method: 'GET',
        //         //             //   mode: 'cors',
        //         //             //   headers: {
        //         //             //     'Content-Type': 'application/json'
        //         //             //   },
        //         //             // })
        //         //             // .then(data => data.json())
        //         //             // .then(response => {
        //         //             //     // // // console.log(response.data);
        //         //             //     if(response.data.status_code === 'ER.00.00') {
        //         //             //         // alert(response.data.error);
        //         //             //         Swal.fire(
        //         //             //           'Error',
        //         //             //           'Invalid Authorization',
        //         //             //           'error'
        //         //             //         )
        //         //             //     } else {
        //         //             //         // Set account reward point
        //         //             //         // $('span#reward_point').text(response.data.reward_point.toLocaleString());
        //         //             //         localStorage.setItem('reward_point', response.data.reward_point);

        //         //             //         // Create account reward point animation
        //         //             //         var $rewardPoint = $('span#reward_point'),
        //         //             //             value = response.data.reward_point;
        //         //             //         $({percentage: 0}).stop(true).animate({percentage: value}, {
        //         //             //             duration : 2000,
        //         //             //             easing: "easeOutExpo",
        //         //             //             step: function () {
        //         //             //                 // percentage with 1 decimal;
        //         //             //                 var percentageVal = Math.round(this.percentage * 10) / 10;
                                            
        //         //             //                 $rewardPoint.text(percentageVal.toLocaleString());
        //         //             //             }
        //         //             //         }).promise().done(function () {
        //         //             //             // hard set the value after animation is done to be
        //         //             //             // sure the value is correct
        //         //             //             $rewardPoint.text(value.toLocaleString());
        //         //             //         });
        //         //             //     }
        //         //             // })
        //         //             // .catch((error) => {
        //         //             //   console.error('Error:', error);
        //         //             // });



        //         //             // Get transaction by id
        //         //             fetch(localStorage.connection_url + '/api/transaction/' + parameter.token, {
        //         //               method: 'GET',
        //         //               mode: 'cors',
        //         //               headers: {
        //         //                 'Content-Type': 'application/json'
        //         //               },
        //         //               // body: JSON.stringify(data),
        //         //             })
        //         //             .then(data => data.json())
        //         //             .then(response => {
        //         //                 // // // console.log(response.data);
        //         //                 if(response.data.status_code === 'ER.00.00') {
        //         //                     // alert(response.data.error);
        //         //                     Swal.fire(
        //         //                       'Error',
        //         //                       'Invalid Authorization',
        //         //                       'error'
        //         //                     )
        //         //                 } else {
        //         //                     // // // console.log('Get transaction by id');
        //         //                     // // // console.log(response.data.transaction);
        //         //                     $('div.orders').html('');
        //         //                     $.each(response.data.transaction, function(key, value){
        //         //                         // // // // console.log(value);
        //         //                         let date = moment(value.iat * 1000).format('L HH:mm').toUpperCase()
        //         //                         if(value.claimed === true) {
        //         //                             $('div.orders').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">' + value.name + '</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">Delivery Time: ' + value.eta + '<br></h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #00c4d4;font-size: 28px;">' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: #f8df31;margin: 0;">CLAIMED</p> <p class="card-text" style="color: rgb(108,117,125);margin: 0;font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //         //                         } else if(value.claimed === false) {
        //         //                           $('div.orders').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">' + value.name + '</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">Delivery Time: ' + value.eta + '<br></h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #00c4d4;font-size: 28px;">' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: #f8df31;margin: 0;font-size: 18px;">Self Organized Shipping</p> <p class="card-text" style="color: rgb(108,117,125);margin: 0;font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //         //                             // $('div.orders').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">' + value.name + '</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">Delivery Time: ' + value.eta + '<br></h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #00c4d4;font-size: 28px;">' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: #7a7a7a;margin: 0;">NOT YET CLAIMED</p> <p class="card-text" style="color: rgb(108,117,125);margin: 0;font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //         //                         }
        //         //                     });
        //         //                 }
        //         //             })
        //         //             .catch((error) => {
        //         //               console.error('Error:', error);
        //         //             });




        //         //             // Get transfers by id
        //         //             fetch(localStorage.connection_url + '/api/transfer/' + parameter.token, {
        //         //               method: 'GET',
        //         //               mode: 'cors',
        //         //               headers: {
        //         //                 'Content-Type': 'application/json'
        //         //               },
        //         //             })
        //         //             .then(data => data.json())
        //         //             .then(response => {
        //         //                 // // // // console.log(response.data);
        //         //                 if(response.data.status_code === 'ER.00.00') {
        //         //                     // alert(response.data.error);
        //         //                     Swal.fire(
        //         //                       'Error',
        //         //                       'Invalid Authorization',
        //         //                       'error'
        //         //                     )
        //         //                 } else {
        //         //                     // // // console.log('Get transfers by id');
        //         //                     // // // console.log(response.data.transfer);
        //         //                     $('div.history').html('');
        //         //                     $.each(response.data.transfer, function(key, value){
        //         //                         // // // // console.log(value);
        //         //                         let date = moment(value.iat * 1000).format('L HH:mm').toUpperCase()

        //         //                         if(value.transfer_id != undefined && value.reward_point != 0) {
        //         //                             if(value.process === 'DEBIT') {
        //         //                                 $('div.history').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">Transaction</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">You received ' + value.reward_point.toLocaleString() + ' Ophir</h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #f8df31;font-size: 28px;">+' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: rgb(108,117,125);font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //         //                             } else if(value.process === 'CREDIT') {
        //         //                                 $('div.history').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">Transaction</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">You transferred ' + value.reward_point.toLocaleString() + ' Ophir</h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #7a7a7a;font-size: 28px;">-' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: rgb(108,117,125);font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //         //                             }
        //         //                         }

        //         //                         if(value.transaction_id != undefined && value.reward_point != 0) {
        //         //                             $('div.history').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">Transaction</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">You spent ' + value.reward_point.toLocaleString() + ' Ophir</h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #7a7a7a;font-size: 28px;">-' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: rgb(108,117,125);font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //         //                         }

        //         //                         if(value.reward_point_id != undefined && value.reward_point != 0) {
        //         //                             $('div.history').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">Transaction</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">You received ' + value.reward_point.toLocaleString() + ' Ophir</h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #f8df31;font-size: 28px;">+' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: rgb(108,117,125);font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //         //                         }
                                        
        //         //                     });
        //         //                 }
        //         //             })
        //         //             .catch((error) => {
        //         //               console.error('Error:', error);
        //         //             });














        //         //             Swal.fire(
        //         //               'Success',
        //         //               'Transaction Successful',
        //         //               'success'
        //         //             )

        //         //             // alert(response.data.status_description);
        //         //         }
        //         //     })
        //         //     .catch((error) => {
        //         //       console.error('Error:', error);
        //         //     });



        //         // });
                
        //     }
        // })
        // .catch((error) => {
        //   console.error('Error:', error);
        // });



        // // Get transaction by id
        // fetch(localStorage.connection_url + '/api/transaction/' + parameter.token, {
        //   method: 'GET',
        //   mode: 'cors',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   // body: JSON.stringify(data),
        // })
        // .then(data => data.json())
        // .then(response => {
        //     // // // console.log(response.data);
        //     if(response.data.status_code === 'ER.00.00') {
        //         // alert(response.data.error);
        //         Swal.fire(
        //           'Error',
        //           'Invalid Authorization',
        //           'error'
        //         )
        //     } else {
        //         // // // console.log('Get transaction by id');
        //         // // // console.log(response.data.transaction);
        //         $('div.orders').html('');
        //         $.each(response.data.transaction, function(key, value){
        //             // // // // console.log(value);
        //             let date = moment(value.iat * 1000).format('L HH:mm').toUpperCase()
        //             if(value.claimed === true) {
        //                 $('div.orders').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">' + value.name + '</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">Delivery Time: ' + value.eta + '<br></h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #00c4d4;font-size: 28px;">' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: #f8df31;margin: 0;">CLAIMED</p> <p class="card-text" style="color: rgb(108,117,125);margin: 0;font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //             } else if(value.claimed === false) {
        //                 $('div.orders').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">' + value.name + '</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">Delivery Time: ' + value.eta + '<br></h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #00c4d4;font-size: 28px;">' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: #f8df31;margin: 0;font-size: 18px;">Self Organized Shipping</p> <p class="card-text" style="color: rgb(108,117,125);margin: 0;font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //                 // $('div.orders').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">' + value.name + '</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">Delivery Time: ' + value.eta + '<br></h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #00c4d4;font-size: 28px;">' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: #7a7a7a;margin: 0;">NOT YET CLAIMED</p> <p class="card-text" style="color: rgb(108,117,125);margin: 0;font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
        //             }
        //         });
        //     }
        // })
        // .catch((error) => {
        //   console.error('Error:', error);
        // });

    }
});


// Round off to two decimal places
function round(value, precision) {
    let aPrecision = Math.pow(10, precision);
    return Math.round(value * aPrecision) / aPrecision;
}

// Get cryptocurrencies price list
let coinbaseAPI = "https://www.coinbase.com/api/v2/assets/search?base=PHP&country=PH&filter=all&include_prices=true&limit=10&order=asc&page=1&query=&resolution=day&sort=rank";
$.getJSON(coinbaseAPI, {
    tagmode: "any",
    format: "json"
})
.done(function(data) {
    $.each(data.data, function(i, item) {
        $('div.marquee').append('<a href="#" style="color: #ffffff;">' + item.symbol + '/PHP:</span> <span class="amount" style="color: #7bee5b;">' + round(item.latest, 2).toLocaleString("en") + ' </a>');
    });
});

// Show an option
$('button.send').click(function() {
    // $('div.send').modal('toggle');
    Swal.fire({
      title: 'Send via QR Code or Wallet Address?',
      width: 400,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Send via QR Code',
      denyButtonText: 'Send via Wallet Address',
      cancelButtonText: 'Close',
      cancelButtonColor: '#6c757d',
      confirmButtonColor: '#17a2b8',
      denyButtonColor: '#e0a800',
      showClass: {
        backdrop: 'swal2-noanimation', // disable backdrop animation
        popup: '',                     // disable popup animation
        icon: ''                       // disable icon animation
      },
      hideClass: {
        popup: '',                     // disable popup fade-out animation
      }
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // Swal.fire('Send via QR Code', '', 'success')
        $('div.sendToQRCode').modal('toggle');
      } else if (result.isDenied) {
        // Swal.fire('Send via Wallet Address', '', 'success')
        $('div.sendToWalletAddress').modal('toggle');
      }
    })
});

// Transfer fund to another account
$('button.sendToWalletAddress').click(function() {
    // // // console.log($('div.sendToWalletAddress input#wallet_address').val());
    // // // console.log($('div.sendToWalletAddress input#reward_point').val());

    // Transfer reward point to another account
    fetch(localStorage.connection_url + '/api/wallet', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
      },
      body: JSON.stringify({
        wallet_address: $('div.sendToWalletAddress input#wallet_address').val()
      }),
    })
    .then(data => data.json())
    .then(response => {
        // // // console.log(response.data);
        if(response.data.status_code === 'ER.00.00') {
            // alert(response.data.error);
            Swal.fire(
              'Error',
              response.data.error,
              'error'
            )
        } else {
            // // // console.log(response.data.token);





            // Transfer reward point to another account
            fetch(localStorage.connection_url + '/api/transfer', {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
              },
              body: JSON.stringify({
                token: response.data.token,
                reward_point: parseInt($('div.sendToWalletAddress input#reward_point').val())
              }),
            })
            .then(data => data.json())
            .then(response => {
                // // // console.log(response.data);
                if(response.data.status_code === 'ER.00.00') {
                    // alert(response.data.error);
                    Swal.fire(
                      'Error',
                      response.data.error,
                      'error'
                    )
                } else {
                    // // // console.log(response);
                    
                    $('div.sendToWalletAddress').modal('toggle');
                    $('div.sendToWalletAddress input#wallet_address').val('');
                    $('div.sendToWalletAddress input#reward_point').val(1);

                    // Get transfers by id
                    fetch(localStorage.connection_url + '/api/transfer/' + localStorage.token, {
                      method: 'GET',
                      mode: 'cors',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                    })
                    .then(data => data.json())
                    .then(response => {
                        // // // // console.log(response.data);
                        if(response.data.status_code === 'ER.00.00') {
                            // alert(response.data.error);
                            Swal.fire(
                              'Error',
                              response.data.error,
                              'error'
                            )
                        } else {
                            // // // console.log('Get transaction by id');
                            // // // console.log(response.data.transfer);
                            $('div.history').html('');
                            $.each(response.data.transfer, function(key, value){
                                // console.log(value);
                                let date = moment(value.iat * 1000).format('L HH:mm').toUpperCase()

                                if(value.incentive_id != undefined && value.reward_point != 0) {
                                    $('div.history').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">Daily Reward</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">You received ' + value.reward_point.toLocaleString() + ' Ophir from a faucet</h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #f8df31;font-size: 28px;">+' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: rgb(108,117,125);font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
                                }

                                if(value.transfer_id != undefined && value.reward_point != 0) {
                                    if(value.process === 'CREDIT') {
                                        $('div.history').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">Ophir Transfer</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">You received ' + value.reward_point.toLocaleString() + ' Ophir from ' + value.source_wallet_address + '</h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #f8df31;font-size: 28px;">+' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: rgb(108,117,125);font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
                                    } else if(value.process === 'DEBIT') {
                                        $('div.history').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">Ophir Transfer</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">You transferred ' + value.reward_point.toLocaleString() + ' Ophir to ' + value.destination_wallet_address + '</h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #7a7a7a;font-size: 28px;">-' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: rgb(108,117,125);font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
                                    }
                                }

                                if(value.transaction_id != undefined && value.reward_point != 0) {
                                    $('div.history').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">Claim Reward</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">You spent ' + value.reward_point.toLocaleString() + ' Ophir by claiming ' + value.name + '</h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #7a7a7a;font-size: 28px;">-' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: rgb(108,117,125);font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
                                }

                                if(value.reward_point_id != undefined && value.reward_point != 0) {
                                    $('div.history').append('<div class="form-group" style="margin-bottom: 8px;"> <div class="card"> <div class="card-body"> <h5 class="card-title">Ophir Transfer</h5> <h6 class="text-muted card-subtitle mb-2" style="font-size: 18px;">You received ' + value.reward_point.toLocaleString() + ' Ophir</h6> <ul class="list-inline"> <li class="list-inline-item"><img src="assets/img/BABEL.png" style="width: 50px;height: 50px;"></li> <li class="list-inline-item"><span style="color: #f8df31;font-size: 28px;">+' + value.reward_point.toLocaleString() + ' Ophir</span></li> </ul> <p class="card-text" style="color: rgb(108,117,125);font-size: 18px;">' + date + '<br></p> </div> </div> </div>');
                                }
                                
                            });
                        }
                    })
                    .catch((error) => {
                      console.error('Error:', error);
                    });


                    Swal.fire(
                      'Success',
                      'Transaction Successful',
                      'success'
                    )



                }
            })
            .catch((error) => {
              console.error('Error:', error);
            });











        }
    })
    .catch((error) => {
      console.error('Error:', error);
    });



    // $('div.sendToWalletAddress').modal('toggle');
});

// Receive fund from another account
$('button.receive').click(function() {
    navigator.clipboard.writeText(localStorage.wallet_address).then(function() {
      // // // console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });

    $('div.receive').modal('toggle');
});

// Copy to clipboard
$('h5.copy_to_clipboard').click(function() {
    navigator.clipboard.writeText(localStorage.wallet_address).then(function() {
      // // // console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
});

// Hide tab 1
$('a[href="#tab-2"]').click(function() {
    $('a[href="#tab-1"]').attr('class', 'nav-link');
});

// Hide tab 1
$('a[href="#tab-3"]').click(function() {
    $('a[href="#tab-1"]').attr('class', 'nav-link');
});


//  Show PIN Code 
// $('div.pinCode').modal('toggle');
$('#pincode-input1').pincodeInput({ inputs: 4, complete:function(value, e, errorElement){

  if(value == 1234) {
    $('div.pinCode').modal('toggle');

    var ath = addToHomescreen({
        debug: 'android',           // activate debug mode in ios emulation
        skipFirstVisit: false,  // show at first access
        startDelay: 0,          // display the message right away
        lifespan: 0,            // do not automatically kill the call out
        displayPace: 0,         // do not obey the display pace
        privateModeOverride: true,  // show the message in private mode
        maxDisplayCount: 0      // do not obey the max display count
    });
  } else {
    $('#pincode-input1').pincodeInput().data('plugin_pincodeInput').clear();
    $('#pincode-input1').pincodeInput().data('plugin_pincodeInput').focus();
    $(errorElement).html("Invalid PIN Code");
  }
  // alert("code entered: " + value);
}});
$('#pincode-input1').pincodeInput().data('plugin_pincodeInput').focus();

$('button.clearPin').click(function() {
  $('#pincode-input1').pincodeInput().data('plugin_pincodeInput').clear();
  $('#pincode-input1').pincodeInput().data('plugin_pincodeInput').focus();
});

