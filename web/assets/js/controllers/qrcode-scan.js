// Initialize QR code scanner
const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");

let scanning = false;

qrcodescan.callback = response => {
    if (response) {
        // // // console.log('source: ' + localStorage.token);
        // // // console.log('destination: ' + response);
        // // // console.log('amount: ' + $('div.sendToWalletAddress input#reward_point').val() );
        let destination = response;

        destination = destination.replace('http://localhost:8080/web/?token=', '');
        destination = destination.replace('https://localhost:8080/web/?token=', '');
        destination = destination.replace('https://reward-point-system.herokuapp.com/web/?token=', '');

        // Transfer reward point to another account
        fetch(localStorage.connection_url + '/api/transfer', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
          },
          body: JSON.stringify({
            token: destination,
            reward_point: parseInt($('div.sendToQRCode input#reward_point').val())
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
                
                $('div.sendToQRCode').modal('toggle');
                $('div.sendToQRCode input#reward_point').val(1);

                // // Get account reward point
                // fetch(localStorage.connection_url + '/api/reward-point/' + localStorage.token, {
                //   method: 'GET',
                //   mode: 'cors',
                //   headers: {
                //     'Content-Type': 'application/json'
                //   },
                // })
                // .then(data => data.json())
                // .then(response => {
                //     // // // console.log(response.data);
                //     if(response.data.status_code === 'ER.00.00') {
                //         // alert(response.data.error);
                //         Swal.fire(
                //           'Error',
                //           response.data.error,
                //           'error'
                //         )
                //     } else {
                //         // Set account reward point
                //         // $('span#reward_point').text(response.data.reward_point.toLocaleString());
                //         localStorage.setItem('reward_point', response.data.reward_point);
                        
                //         // Create account reward point animation
                //         var $rewardPoint = $('span#reward_point'),
                //             value = response.data.reward_point;
                //         $({percentage: 0}).stop(true).animate({percentage: value}, {
                //             duration : 2000,
                //             easing: "easeOutExpo",
                //             step: function () {
                //                 // percentage with 1 decimal;
                //                 var percentageVal = Math.round(this.percentage * 10) / 10;
                                
                //                 $rewardPoint.text(percentageVal.toLocaleString());
                //             }
                //         }).promise().done(function () {
                //             // hard set the value after animation is done to be
                //             // sure the value is correct
                //             $rewardPoint.text(value.toLocaleString());
                //         });
                //     }
                // })
                // .catch((error) => {
                //   console.error('Error:', error);
                // });

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

                // alert('Transaction Successful');
                // // Set account token in local storage
                // localStorage.setItem('token', parameter.token);

                // // Set account reward point
                // $('span#reward_point').text(response.data.reward_point.toLocaleString());

                // // Set account QR code
                // let typeNumber = 9;
                // let errorCorrectionLevel = 'L';
                // let qr = qrcode(typeNumber, errorCorrectionLevel);
                // qr.addData(parameter.token);
                // qr.make();
                // $('div.qrcode').html(qr.createImgTag());
                // $('div.qrcode img').attr('class', 'img-fluid');
                // $('div.qrcode img').css('width', '100%');

                // // // // console.log('http://localhost:8080/api/reward-point/' + parameter.token);
            }
        })
        .catch((error) => {
          console.error('Error:', error);
        });



        // alert(res);
        // outputData.innerText = res;
        scanning = false;

        video.srcObject.getTracks().forEach(track => {
            track.stop();
        });

        qrResult.hidden = false;
        canvasElement.hidden = true;
        btnScanQR.hidden = false;
    }
};

// Open scanner
btnScanQR.onclick = () => {
    navigator.mediaDevices
        .getUserMedia({
            video: {
                facingMode: "environment"
            }
        })
        .then(function(stream) {
            scanning = true;
            qrResult.hidden = true;
            btnScanQR.hidden = true;
            canvasElement.hidden = false;
            video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
            video.srcObject = stream;
            video.play();
            tick();
            scan();
        });
};

function tick() {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

    scanning && requestAnimationFrame(tick);
}

function scan() {
    try {
        qrcodescan.decode();
    } catch (e) {
        setTimeout(scan, 300);
    }
}

$('button.send').click(function() {
    scanning = false;

    video.srcObject.getTracks().forEach(track => {
        track.stop();
    });

    qrResult.hidden = false;
    canvasElement.hidden = true;
    btnScanQR.hidden = false;
});


$('.sendToQRCode button').click(function() {
    video.srcObject.getTracks().forEach(track => {
        track.stop();
    });

    $('div#qr-result').hide();
});