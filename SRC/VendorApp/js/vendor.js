/* ----------------------------------------------------------------------------- */
// This function will be deleted when we'll integrate the user management module
function get_connection(url, login, password)
{
    var json = null;
    $.ajax({
        url : url,
        method: 'post',
        data: {'login': login, 'password': password},
        dataType: 'json',
        async : false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success: false, message: "Request Get Connection: KO"};
        }
    });
    return json;
}

/* ----------------------------------------------------------------------------- */
/* transactions functions */

function get_transactions(url, shop_id)
{
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        data: {"shop_id": shop_id},
        dataType:"json",
        async : false,
        success:function (data) {
            json = data;
        },
        error : function () {
            json = {success:false, message : "Request Get Transactions: KO"};
        }
    });
    return json;
}


function get_command(url, transaction_id, shop_id)
{
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        data: {"transaction_id": transaction_id, "shop_id": shop_id},
        dataType: "json",
        async: false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success:false, message:"Request Get Command : KO"};
        }
    });
    return json;
}

function update_command() {
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
            json = {success:false, message:"Request Get Account : KO"};
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
            json = {success:false, message:"Request Update Account  : KO"};
        }
    });
    return json;
}


/* ----------------------------------------------------------------------------- */
/* Product functions */


function get_products(url, shop_id)
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
            json = {success:false, message:"Request Get Products  : KO"};
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


function update_product(url, product_id, product_name, product_price, product_description)
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
            json = {success:false, message:"Request Update Product: KO"};
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
            json = {success:false, message:"Request Delete Product: KO"};
        }
    });
    return json;
}


function add_product(url, shop_id, product_name, product_price, product_description)
{
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
            json = {success:false, message:"Request Add Product: KO"};
        }
    });
    return json;
}