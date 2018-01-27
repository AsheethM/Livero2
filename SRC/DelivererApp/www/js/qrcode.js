/**
 *  Retrieve customer qrcode
 *
 * @param url : The HTTP request
 * @param transaction_id : The transaction id in the database
 * @param customer_id : The customer id in the database
 * @returns : <img>  tag containing the QRCode
 */
function get_customer_qrcode(url, transaction_id, customer_id)
{
    var res = "";
    var json = null;
    $.ajax({
        url : url,
        method: 'post',
        data: {'transaction_id' : transaction_id, 'customer_id' : customer_id},
        dataType: 'json',
        async : false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success: false, message: "Request Get customer Token: KO"};
        }
    });

    if (json.success)
    {
        var token = json.results[0].customer_token;
        res +=  '<img src="https://api.qrserver.com/v1/create-qr-code/?data='+token+'&amp;size=100x100" alt="" title="" />';
    }
    else
        res += 'Error';
    return res;
}

/**
 *  Retrieve shop qrcode
 *
 * @param url : The HTTP request
 * @param transaction_id : The transaction id in the database
 * @param shop_id : The customer id in the database
 * @returns : <img>  tag containing the QRCode
 */
function get_shop_qrcode(url, transaction_id, shop_id)
{
    var res = "";
    var json = null;
    $.ajax({
        url : url,
        method: 'post',
        data: {'transaction_id' : transaction_id, 'shop_id' : shop_id},
        dataType: 'json',
        async : false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success: false, message: "Request Get customer Token: KO"};
        }
    });    if (json.success)
    {
        var token = json.results[0].shop_token;
        alert(token);
        res += '<img src="https://api.qrserver.com/v1/create-qr-code/?data='+token+'&amp;size=100x100" alt="" title="" />';
    }
    else
    {
        res += json.message;
    }
    return res;
}


/**
 * Check if the token taken by the deliverer's camera is the same as the customer token
 *
 * @param url : The HTTP request
 * @param transaction_id  : The transaction id in the database
 * @param deliverer_id : The deliverer id in the database
 * @param token : token from deliverer scan
 * @returns : boolean
 */
function check_customer_qrcode(url, transaction_id, deliverer_id, token)
{
    var json = null;
    $.ajax({
        url : url,
        method: 'post',
        data: {'transaction_id' : transaction_id, 'deliverer_id' : deliverer_id,'token' : token},
        dataType: 'json',
        async : false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success: false, message: "Request Get customer Token: KO"};
        }
    });
    alert (json.message);
    return json.success;
}

/**
 * Check if the token taken by the deliverer's camera is the same as the shop token
 *
 * @param url : The HTTP request
 * @param transaction_id : The transaction id in the database
 * @param deliverer_id : The deliverer id in the database
 * @param token : token from deliverer scan
 * @returns : boolean
 */
function check_shop_qrcode(url, transaction_id, deliverer_id, token)
{
    var json = null;
    $.ajax({
        url : url,
        method: 'post',
        data: {'transaction_id' : transaction_id, 'deliverer_id' : deliverer_id,'token' : token},
        dataType: 'json',
        async : false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success: false, message: "Request Get customer Token: KO"};
        }
    });
    alert (json.message);
    return json.success;
}

/**
 * Function to call when the scan button is clicked and returns if the scan is good or not
 *
 * @param url : The HTTP request
 * @param transaction_id : transaction id in datbase
 * @param deliverer_id : deliverer id in database
 * @param is_customer : true if scanning customer phone
 * @returns : boolean
 */
function scan(url, transaction_id, deliverer_id, is_customer)
{
    var res = false;
    var token = "";
    alert ("Hello");
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            alert("World");
            if(!result.cancelled)
            {
                if(result.format == "QR_CODE")
                {
                    res = true;
                    token = result.text;
                }
            }
        },
        function (error) {
            res = false;
            token = "error";
        }
    );
    alert("IS_CUSTOMER "+is_customer);

    if (res)
    {
        if (is_customer)
            return check_customer_qrcode(url, transaction_id, deliverer_id, token);
        else
            return check_shop_qrcode(url, transaction_id, deliverer_id, token);
    }
    return res;
}