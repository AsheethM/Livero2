/*------------------------------------------------------------------------------------------*/
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
            json = {success:false, message:"Request Get Product From ID  : KO"};
        }
    });
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
            json = {success:false, message:"Request Get Product From ID  : KO"};
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
            json = {success:false, message:"Request Get Product From ID  : KO"};
        }
    });
    return json;
}