/*-------------------------------------------------------------------------------
All the functions will return a Json Object.
The Json object will always contain (as key):
    - success is a boolean which tells if the request has been made successfully or not
    - message is a string which gives a message to display to the user

If we do a request to get something from the database, the Json Obect will contain another key:
    - results which will be a Json Array containing the specific fields we need.
 ----------------------------------------------------------------------------- */
function get_connection(url, login, password)
{

    var json = null;
    $.ajax({
        url : url,
        type : 'POST',
        method: 'post',
        data: {'email': login, 'password' : password},
        dataType: 'json',
        async : false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success: false, message: "* Request Get Connection: KO"};
        }
    });
    return json;
}


function get_information_with_id(url, user_id)
{
    var json = null;
    $.ajax({
        url : url,
        method: 'post',
        data: {'user_id': user_id},
        dataType: 'json',
        async : false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success: false, message: "* Request Get Information User: KO"};
        }
    });
    return json;
}

function get_shop_history(url, user_id)
{
    var json = null;
    $.ajax({
        url : url,
        method: 'post',
        data: {'user_id': user_id},
        dataType: 'json',
        async : false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success: false, message: "* Request Get Shop History: KO"};
        }
    });
    return json;
}
/* ----------------------------------------------------------------------------- */
/*Account functions*/

function get_account(url, user_id, shop_id) {
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        data:{'user_id' : user_id, 'shop_id' : shop_id},
        dataType: "json",
        async: false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success:false, message:"* Request Get Account : KO"};
        }
    });
    return json;
}

function update_account(url, user_id, shop_id, user_firstname, user_lastname, user_email, user_birthdate, user_phone,
                        shop_name, shop_address, shop_postcode, shop_town, shop_phone)
{
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        data:{'user_id' : user_id, 'shop_id' : shop_id, 'user_firstname' : user_firstname, 'user_lastname' : user_lastname,
            'user_email' : user_email, 'user_birthdate' : user_birthdate, 'user_phone' : user_phone,
            'shop_name': shop_name, 'shop_address' : shop_address, 'shop_postcode' : shop_postcode,
            'shop_town' : shop_town, 'shop_phone' : shop_phone},
        dataType: "json",
        async: false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success:false, message:"* Request Update Account  : KO"};
        }
    });
    return json;
}


/* ----------------------------------------------------------------------------- */

function get_products_with_shop_id(url, shop_id)
{
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        data:{"shop_id":shop_id},
        dataType: "json",
        async: false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success:false, message:"* Request Get Products  : KO"};
        }
    });
    return json;
}


function get_product_from_id(url, shop_id, product_id)
{
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        data:{'id_shop' : shop_id, 'product_id':product_id},
        dataType: "json",
        async: false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success:false, message:"Request Get Product From ID  : KO"};
        }
    });
    return json;
}


function update_product(url, shop_id, product_id, product_name, product_price, product_description)
{
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        data: {'id_shop': shop_id, 'product_id': product_id, 'product_name' : product_name, 'product_price' : product_price,
            'product_description' : product_description},
        dataType: "json",
        async: false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success:false, message:"* Request Update Product: KO"};
        }
    });
    return json;
}


function delete_product(url, shop_id, id_product)
{
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        data: {'id_shop': shop_id, 'product_id': id_product},
        dataType: "json",
        async: false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success:false, message:"* Request Delete Product: KO"};
        }
    });
    return json;
}


function add_product(url, shop_id, product_name, product_price, product_description)
{
    console.log("ADD_PRODUCT");
    console.log("/ADD_PRODUCT");
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        data: {'id_shop': shop_id, 'product_name' : product_name, 'product_price' : product_price,
            'product_description' : product_description},
        dataType: "json",
        async: false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success:false, message:"* Request Add Product: KO"};
        }
    });
    return json;
}

/* ----------------------------------------------------------------------------- */
/* Transaction functions */



function get_transactions_with_shop_id(url, shop_id)
{
    var json = null;
    console.log(url);
    console.log(shop_id);
    $.ajax({
        url : url,
        method: "post",
        data: {'shop_id': shop_id},
        dataType: "json",
        async: false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success:false, message:"* Request Get Transactions: KO"};
        }
    });
    return json;
}



function get_informations_about_transaction_with_id(url, transaction_id, shop_id)
{
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        data: {'shop_id': shop_id, 'transaction_id' : transaction_id},
        dataType: "json",
        async: false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success:false, message:"* Request Get Transaction With ID: KO"};
        }
    });
    return json;
}


function get_transaction_products_with_transaction_id_and_shop_id(url, transaction_id, shop_id)
{
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        data: {'shop_id': shop_id, 'transaction_id' : transaction_id},
        dataType: "json",
        async: false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success:false, message:"* Request Get Transaction_Products: KO"};
        }
    });
    return json;
}


function update_shop_quantity_on_transaction_with_product_id(url, transaction_id, product_id, vendor_quantity, shop_id)
{
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        data: {'shop_id': shop_id, 'transaction_id' : transaction_id,
            'product_id' : product_id, 'shop_quantity' : vendor_quantity},
        dataType: "json",
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success:false, message:"* Request Update Vendor Quantity: KO"};
            console.log(json.message);
        }
    });
    return json;
}


function vendor_transaction_confirmation(url, shop_id, transaction_id, same, total_price)
{
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        data: {'shop_id': shop_id, 'transaction_id' : transaction_id, 'same' : same, 'total_price':total_price},
        dataType: "json",
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success:false, message:"* Request Vendor Transaction Confirmation: KO"};
        }
    });
    return json;
}