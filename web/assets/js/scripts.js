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

// Transfer fund to another account
$('button.send').click(function() {
    $('div.send').modal('toggle');
});

// Receive fund from another account
$('button.receive').click(function() {
    $('div.receive').modal('toggle');
    
    let typeNumber = 9;
    let errorCorrectionLevel = 'L';
    let qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData('http://192.168.254.44:8080/api/account/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjoiLU1aTmN0UTJ4V0EyVjVVRGtSYm4iLCJpYXQiOjE2MTk2MTYwNDUsImV4cCI6NDc3MzIxNjA0NX0.T0yl31WYgwUuhwSW5slXDmjquiYWu-jtJiTpsEOrEws');
    qr.make();

    $('div.qrcode').html(qr.createImgTag());
    $('div.qrcode img').attr('class', 'img-fluid');
    $('div.qrcode img').css('width', '100%');
    // $('div#qrcode img').attr('width', '200');
});