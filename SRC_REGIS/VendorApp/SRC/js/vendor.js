/*-------------------------------------------------------------------------------
All the functions will return a Json Object.
The Json object will always contain (as key):
    - success is a boolean which tells if the request has been made successfully or not
    - message is a string which gives a message to display to the user

If we do a request to get something from the database, the Json Obect will contain another key:
    - results which will be a Json Array containing the specific fields we need.
 ----------------------------------------------------------------------------- */

// This function will be deleted when we'll integrate the user management module
function get_connection(url, login, password)
{
    var json = null;
    alert(login);
    $.ajax({
        url : url,
        method: 'post',
        data: {'login': login, 'password': password},
        dataType: 'json',
        async : false,
        success: function (data) {
            alert("World");
            json = data;
        },
        error: function () {
            alert("Hello");
            json = {success: false, message: "Request Get Connection: KO"};
        }
    });
    return json;
}

/* ----------------------------------------------------------------------------- */

/**
 * Retrieve all the transactions for a given shop
 *
 * @param url : the Http request
 * @param shop_id : the id of the shop in the database
 * @returns : Json Object with keys that are:
 *            {
 *              success
 *              message
 *              results : is an array of JsonObject with keys that are:
 *              {
 *                  id (Transaction id)
 *                  status
 *              }
 *            }
 *      -
 */
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

/**
 * Retrieve all the products for a given transaction
 *
 * @param url : the Http request
 * @param transaction_id : the id of the transaction in the database
 * @param shop_id : the id of the shop in the database
 * @returns Json Object with keys that are:
 *            {
 *              success
 *              message
 *              results : is an array of JsonObject with keys that are:
 *              {
 *                  id (Product_id)
 *                  product_name
 *                  price
 *                  quantity
 *              }
 *            }
 */
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
            json = {success:false, message:"Request Get Account : KO"};
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
            json = {success:false, message:"Request Update Account  : KO"};
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
            json = {success:false, message:"Request Delete Product: KO"};
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