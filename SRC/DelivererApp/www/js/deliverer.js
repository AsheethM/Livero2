/*------------------------------------------------------------------------------------------*/

function get_shops_nearby(position, distance) {
    console.log(position);
    var json = null;
    $.ajax({
        url: "http://"+ server_ip + "SRC/Backend/Deliverer/get_gps_nearest.php",
        data: { 'latitude': position.coords.latitude, 'longitude': position.coords.longitude, 'distance': distance},
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function (json) {
            var shops = [];
            for (var name in json.name) {
                shops.push({
                        shop_id: json.id[name],
                        name: json.name[name],
                        logo: json.logos[name],
                    }
                );
            }
            console.log(shops);
        },
        error: function (jqXHR, exception) {
            json = { success: false, message: "Request get shops nearby: KO" };
        },
        beforeSend: function () {
            if (ajax_call != null) {
                ajax_call.abort();
            }
        },
        timeout: 13000
    });

}

function get_deliverer_history(url, user_id) {
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
            json = {success: false, message: "* Request Get Deliverer History: KO"};
        }
    });
    return json;
}

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

function register(url, email, password, lastname, firstname, phone, birthdate) {
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        data:{'email' : email, 'password':password, 'lastname' : lastname, 'firstname' : firstname,
            'phone' : phone, 'birthdate' : birthdate},
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
    console.log("UPDATE");
    console.log(licence);
    console.log(vehicule);
    console.log(phone_number);
    console.log(deliverer_id);
    console.log("END UPDATE");
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        data:{'user_id':deliverer_id, 'phone' : phone_number, 'licence' : licence, 'vehicule' : vehicule},
        dataType: "json",
        async : false,
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