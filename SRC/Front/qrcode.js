/**
 *  Retrieve client qrcode
 *
 * @param url : The HTTP request
 * @param transaction_id : The transaction id in the database
 * @param client_id : The client id in the database
 * @returns : <img>  tag containing the QRCode
 */
function get_client_qrcode(url, transaction_id, client_id)
{
    var res = "";
    var json = null;
    $.ajax({
        url : url,
        method: 'post',
        data: {'transaction_id' : transaction_id, 'client_id' : client_id},
        dataType: 'json',
        async : false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success: false, message: "Request Get Client Token: KO"};
        }
    });

    if (json.success)
    {
        var token = json.results[0].client_token;
        res +=  '<img src="https://api.qrserver.com/v1/create-qr-code/?data='+token+'&amp;size=100x100" alt="" title="" />';
    }
    else
        res += json.message;
    return res;
}

/**
 *  Retrieve vendor qrcode
 *
 * @param url : The HTTP request
 * @param transaction_id : The transaction id in the database
 * @param vendor_id : The client id in the database
 * @returns : <img>  tag containing the QRCode
 */
function get_vendor_qrcode(url, transaction_id, vendor_id)
{
    var res = "";
    var json = null;
    $.ajax({
        url : url,
        method: 'post',
        data: {'transaction_id' : transaction_id, 'shop_id' : vendor_id},
        dataType: 'json',
        async : false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success: false, message: "Request Get Client Token: KO"};
        }
    });
    alert("Hello1");
    alert(json);
    if (json.success)
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
 * Check if the token taken by the deliverer's camera is the same as the client token
 *
 * @param url : The HTTP request
 * @param transaction_id  : The transaction id in the database
 * @param deliverer_id : The deliverer id in the database
 * @param token : token from deliverer scan
 * @returns : boolean
 */
function check_client_qrcode(url, transaction_id, deliverer_id, token)
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
            json = {success: false, message: "Request Get Client Token: KO"};
        }
    });
    alert (json.message);
    return json.success;
}

/**
 * Check if the token taken by the deliverer's camera is the same as the vendor token
 *
 * @param url : The HTTP request
 * @param transaction_id : The transaction id in the database
 * @param deliverer_id : The deliverer id in the database
 * @param token : token from deliverer scan
 * @returns : boolean
 */
function check_vendor_qrcode(url, transaction_id, deliverer_id, token)
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
            json = {success: false, message: "Request Get Client Token: KO"};
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
 * @param is_client : true if scanning client phone
 * @returns : boolean
 */
function scan(url, transaction_id, deliverer_id, is_client)
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
            alert("Scanning failed: " + error);
        }
    );

    alert('lalalalla');
    if (res)
    {
        if (is_client)
            return check_client_qrcode(url, transaction_id, deliverer_id, token);
        else
            return check_vendor_qrcode(url, transaction_id, deliverer_id, token);
    }
    return res;
}