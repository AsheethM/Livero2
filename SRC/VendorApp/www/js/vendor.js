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


function get_information_with_id(url, user_id) {
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

function get_shop_history(url, user_id) {
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

/**
 * Retrive the information from the user and his shop
 *
 * @param url : the HTTP request
 * @param user_id : the id of the user in the database
 * @param shop_id : the id of the shop in the database
 * @returns Json Object with keys that are:
 *            {
 *              success
 *              message
 *              results : is an array of JsonObject with keys that are:
 *              {
 *                  user_id
 *                  firstname
 *                  lastname
 *                  birthdate
 *                  email
 *                  user_phone
 *                  shop_id
 *                  shop_name
 *                  address
 *                  postcode
 *                  town
 *                  shop_phone
 *              }
 *            }:
 */
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

/**
 * Update the information about the user in the database
 *
 * @param url : the HTTP request
 * @param user_id : the id of the user in the database
 * @param shop_id : the id of the shop in the database
 * @param user_firstname : firstname of the user
 * @param user_lastname : lastname of the user
 * @param user_email : email of the user
 * @param user_birthdate : birthdate of the user
 * @param user_phone : user's phone number
 * @param shop_name : Shop name
 * @param shop_address : Shop address
 * @param shop_postcode : Shop postcode
 * @param shop_town : shop town
 * @param shop_phone : Shop(s phone
 * @returns Json Object with keys that are:
 *            {
 *              success
 *              message
 *            }
 */
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
/* Product functions */

/**
 * Retrieve all the products of a given shop
 *
 * @param url : the HTTP request
 * @param shop_id : the id of the shop in the database
 * @returns Json Object with keys that are:
 *            {
 *              success
 *              message
 *              results : is an array of JsonObject with keys that are:
 *              {
 *                  id (Product id)
 *                  product_name
 *                  description
 *                  price
 *              }
 *            }
 */
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

/**
 * Retrieve information about a specific product from the product id
 *
 * @param url : the HTTP request
 * @param shop_id: the id of the shop in the database
 * @param product_id : the id of the product in the database
 * @returns Json Object with keys that are:
 *            {
 *              success
 *              message
 *              results : is an array of JsonObject with keys that are:
 *              {
 *                  id (Product id)
 *                  product_name
 *                  description
 *                  price
 *              }
 *            }
 */
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

/**
 * Update a product in the database
 *
 * @param url : the HTTP request
 * @param shop_id
 * @param product_id : the id of the product in the database
 * @param product_name : The name of the product
 * @param product_price : The price of the product
 * @param product_description : the description of the product
 * @returns Json Object with keys that are:
 *            {
 *              success
 *              message
 *            }
 */
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

/**
 * Delete a product from the database
 *
 * @param url: the HTTP request
 * @param shop_id : the id of the shop in the database
 * @param id_product : the id of the product in the database
 * @returns Json Object with keys that are:
 *            {
 *              success
 *              message
 *            }
 */
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

/**
 * Add a product in the database
 *
 * @param url : the HTTP request
 * @param shop_id : the id of the shop in the database
 * @param product_name : The name of the product
 * @param product_price : The price of the product
 * @param product_description : The description of the product
 * @returns Json Object with keys that are:
 *            {
 *              success
 *              message
 *            }
 */
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


/**
 *
 * @param url
 * @param shop_id
 * @returns {*}
 */
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


/**
 *
 * @param url
 * @param transaction_id
 * @param shop_id
 * @returns {*}
 */
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

/**
 *
 * @param url
 * @param transaction_id
 * @param shop_id
 * @returns {*}
 */
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

/**
 *
 * @param url
 * @param transaction_id
 * @param product_id
 * @param vendor_quantity
 * @param shop_id
 * @returns {*}
 */
function update_shop_quantity_on_transaction_with_product_id(url, transaction_id, product_id, vendor_quantity, shop_id) {
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        data: {'shop_id': shop_id, 'transaction_id' : transaction_id,
            'product_id' : product_id, 'shop_quantity' : vendor_quantity},
        dataType: "json",
        success: function (data) {
            json = data;
            console.log(json.message);
        },
        error: function () {
            json = {success:false, message:"* Request Update Vendor Quantity: KO"};
            console.log(json.message);
        }
    });
    return json;
}

/**
 *
 * @param url
 * @param shop_id
 * @param transaction_id
 * @param isComplete
 * @returns {*}
 */
function vendor_transaction_confirmation(url, shop_id, transaction_id) {
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        data: {'shop_id': shop_id, 'transaction_id' : transaction_id},
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