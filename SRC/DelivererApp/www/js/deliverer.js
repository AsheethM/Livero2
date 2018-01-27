/*------------------------------------------------------------------------------------------*/


function normal_login(url, email, password) {
        var json = null;
        $.ajax({
            url : url,
            method: "post",
            data:{'email' : email, 'password':password},
            dataType: "json",
            async: false,
            success: function (data) {
                json = data;
            },
            error: function () {
                json = {success:false, message:"Request Get Connection  : KO"};
            }
        });

        return json;
}

function get_shops_nearby(url) {
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        dataType: "json",
        async: false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success:false, message:"Request Get Shops: KO"};
        }
    });
    return json;
}

/* Transactions Functions */
/**
 *
 * @param url
 * @param deliverer_id
 * @param shop_id
 * @returns {*}
 */
function get_transactions_waiting_deliverer_with_shop_id(url, deliverer_id, shop_id) {
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        data:{'shop_id' : shop_id, 'deliverer_id':deliverer_id},
        dataType: "json",
        async: false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success:false, message:"Request Get Transactions Without Deliverers  : KO"};
        }
    });
    console.log(json)
    alert(json.message);
    return json;
}

/**
 *
 * @param url
 * @param deliverer_id
 * @param transaction_id
 * @returns {*}
 */
function get_infotrmations_about_transaction_and_bid(url, deliverer_id, transaction_id) {
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        data:{'transaction_id' : transaction_id, 'deliverer_id':deliverer_id},
        dataType: "json",
        async: false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success:false, message:"Request Get Informations About Transaction  : KO"};
        }
    });
    return json;
}

/**
 *
 * @param url
 * @param deliverer_id
 * @param transaction_id
 * @param bid
 * @returns {*}
 */
function set_bid(url, deliverer_id, transaction_id, bid) {
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        data:{'transaction_id' : transaction_id, 'deliverer_id':deliverer_id, 'bid' : bid},
        dataType: "json",
        async: false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success:false, message:"Request Set Bid  : KO"};
        }
    });

    console.log(json);
    return json;
}

function get_current_orders(url, deliverer_id) {
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        data:{'deliverer_id':deliverer_id},
        dataType: "json",
        async: false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success:false, message:"Request Get Current Orders : KO"};
        }
    });
    console.log(json.message);
    return json;
}

function get_order_instance_informations(url, deliverer_id, transaction_id) {
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        data:{'deliverer_id':deliverer_id, 'transaction_id' : transaction_id},
        dataType: "json",
        async: false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success:false, message:"Request Get Current Orders : KO"};
        }
    });
    console.log(json.message);
    return json;
}

function get_deliverer_account(url, deliverer_id){
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        data:{'user_id':deliverer_id},
        dataType: "json",
        async: false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success:false, message:"Request Get Deliverer Account : KO"};
        }
    });
    console.log(json.message);
    return json;
}

function update_deliverer_account(url, deliverer_id, phone_number, licence, vehicule)
{
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        data:{'user_id':deliverer_id, 'phone' : phone_number, 'licence' : licence, 'vehicule' : vehicule},
        dataType: "json",
        success: function (data) {
            json = data;
            console.log(json.message);

        },
        error: function () {
            json = {success:false, message:"Request Update Deliverer Account : KO"};
        }
    });
    return json;
}