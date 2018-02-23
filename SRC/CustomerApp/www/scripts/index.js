
var panel_init = false;
var customer_id = localStorage.getItem('customer_id');
var server_ip = 'http://192.168.1.58/'; //'http://localhost/'; //'http://green.projectyogisha.com/';
var cus_ip = 'pri/src/Backend/Customer/';
var wto; // slidebar variable
var vendor_item_number = 0;
var ajax_call = null;
var coordlat = 0;
var coordlon = 0;

function refresh_coordinates(position) {
    coordlat = position.coords.latitude;
    coordlon = position.coords.longitude;
}

function get_date_from_sql(datetime) {
    var tab = datetime.split(/[- :]/);
    return tab[2] + "/" + tab[1] + "/" + tab[0];
}


/*         AJAX QUERY      */

function get_shops_nearby(position) {
    var json = null;
    customer_id = localStorage.getItem('customer_id');
    ajax_call = $.ajax({
        url: server_ip + cus_ip + "get_gps_nearest.php",
        data: { 'latitude': position.coords.latitude, 'longitude': position.coords.longitude, 'distance': $("#distance_value").val() },
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function (data) {
            json = data;
            /*$("#main_shop_list").html("");
            for (var i in data.name) {
                $("#main_shop_list").append(" <li><a href=\"#\">  <img src=\"" + data.logos[i] + "\">  <h2>" + data.name[i] + "</h2>   <p>" + data.latitude[i] + "__" + data.longitude[i] + "</p></a></li>");
            }
            $("#vendorlist").listview("refresh");
            //  initializeMap(); */
        },
        error: function (jqXHR, exception) {
            json = { success: false, message: "Request get shops nearby: KO" };
        },
        beforeSend: function () {
            if (ajax_call !== null) {
                ajax_call.abort();
            }
        },
        timeout: 13000
    });
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
    return shops;
}

function retrieve_items_from_db(shop_id) {
   
    var json = null;

    ajax_call = $.ajax({

        url: server_ip + cus_ip + "fetch_shop_items.php",
        data: { 'vendor_id': shop_id, 'offset': vendor_item_number },
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function (data) {
            json = data;

        },

        beforeSend: function () {
            if (ajax_call !== null) {
                ajax_call.abort();
            }
        },


        error: function (jqXHR, exception) {
            if (jqXHR.aborted)
                return;
            alert(exception);

        },
        timeout: 13000
    });

    var shop_list = [];
    console.log(json);
    for (var i = 0; i < json.product.length; i++) {
        console.log(json.product[i]);
        shop_list.push({
            item_id: json.product[i].id,
            item_name: json.product[i].product_name,
            item_price: json.product[i].price,
            item_desc: json.product[i].description,
            item_img: json.product[i].image
        });
    }

    console.log(shop_list);
    return shop_list;
}

function send_order_to_serv(order, shop_id, price, address) {
    // TODO
    // check server response
    //
    navigator.geolocation.getCurrentPosition(refresh_coordinates, onError);
    console.log(order);
    ajax_call = $.ajax({
        //########### TMP FIELD ##########
        url: server_ip + cus_ip + "set_item_list.php",
        //################################
        data: {
            'items_and_quantity': order,
            'shop_id': shop_id,
            'customer_id': customer_id,
            'user_lat': coordlat,
            'user_long': coordlon,
            'price': price,
            'address': address
        },
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function (data) {
            alert("Your order has been succesfully registered.");
        },

        beforeSend: function () {
            if (ajax_call !== null) {
                ajax_call.abort();
            }
        },

        error: function (jqXHR, exception) {
            if (jqXHR.aborted)
                return;
            alert(exception);
            return false;
        },
        timeout: 13000
    });
    return true;

};

function get_qr_code_info(order_id) {
    var json = null;

    ajax_call = $.ajax({
        //########### TMP FIELD ##########
        url: server_ip + cus_ip + "get_infos_abt_transaction_with_token.php",
        //################################
        data: { 'transaction_id': order_id, 'customer_id': customer_id },
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function (data) {
            json = data;
        },

        beforeSend: function () {
            if (ajax_call !== null) {
                ajax_call.abort();
            }
        },

        error: function (jqXHR, exception) {
            if (jqXHR.aborted)
                return;
            alert(exception);

        },
        timeout: 13000
    });

    console.log(json);
    if (json.success) {
        var order = {
            qr_token: json.results[0].customer_token,
            shop_name: json.results[0].shop_name,
            shop_id: json.results[0].shop_id,
            deliverer_firstname: json.results[0].firstname,
            deliverer_lastname: json.results[0].lastname,
            deliverer_id: json.results[0].deliverer_id,
            order_id: order_id
        };
        return order;
    }
    // TODO -> get the exact field
    // TODO treat onFailure 
};


function get_order_ready(order_id) {
    var json = null;

    ajax_call = $.ajax({
        // ########### TMP FIELD ##########
        url: server_ip + cus_ip + "get_transaction.php",
        // ################################
        data: { 'transaction_id': order_id, 'user_id': customer_id },
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function (data) {
            json = data;
        },

        beforeSend: function () {
            if (ajax_call !== null) {
                ajax_call.abort();
            }
        },

        error: function (jqXHR, exception) {
            if (jqXHR.aborted)
                return;
            alert(exception);

        },
        timeout: 13000
    });

    var req = json;

    if (req.length === 1) {
        if (order.status === 3) {
            if (order.complete) {
                $.mobile.pageContainer.pagecontainer('change', '#order_ready', { content: order_id, transition: 'slide' });
            }
            else {
                generate_list_almost_ready(order.id);
                $.mobile.pageContainer.pagecontainer('change', '#order_almost_ready', { content: order_id, transition: 'slide' });
            }
        }
    }
}

function generate_necessary_link_for_order(order_id, item) {
    console.log(item.status);
    switch (parseInt(item.status)) {
        case 3:
            generate_link_to_order_ready(order_id, item);
            break;
        case 4:
            generate_link_to_deliverer_pos(order_id, item);
            break;
        case 5:
            generate_link_to_deliverer_pos(order_id, item);
            generate_link_to_qrcode(order_id, item);
            break;
        case 6:
            // link to recap of delivery
            generate_link_to_recap_order(order_id);
            break;
    }
}


/* request that retrieve a list of orders of the customer */
function retrieve_orders_from_server() {
    //********************************
    // TODO clarity fields returned
    //********************************
    ajax_call = $.ajax({
        //########### TMP FIELD ##########
        url: server_ip + cus_ip + "get_transactions.php",
        //################################
        data: { 'user_id': customer_id },
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function (data) {
            json = data;
        },

        beforeSend: function () {
            if (ajax_call !== null) {
                ajax_call.abort();
            }
        },

        error: function (jqXHR, exception) {
            if (jqXHR.aborted)
                return;
            alert(exception);

        },
        timeout: 13000
    });

    var req = json.results;

    clear_list("#orders_list");
    console.log(json.isTransactions);
    if (json.isTransactions === true) { 
        $("#sorry_no_orders").html("");
        $.each(req, function (idx, item) {
            var order = item;
            if ($('#orders_list li[data-orderid="' + + '"]').length <= 0) {
                var str = translate_status_toString(order.id, order.status, item);
                var date = get_date_from_sql(order.timer);
                $("#orders_list")
                    .append($('<li>').attr('data-orderid', order.id)
                        .append($('<h3>').html("Order #" + order.id))
                        .append($('<h4>').html(order.shop_name))
                        .append($('<p>').html(date))
                        .append($('<p>').html(order.order_price + " €"))
                        .append($('<p>').html(str)));
                generate_necessary_link_for_order(order.id, item);
            }
        });
    }
    else {
        $("#sorry_no_orders").html("sorry, we don't have any order to display here because we didn't find any for you.");
    }
}

function get_list_almost_ready(order_id) {
    ajax_call = $.ajax({
        //########### TMP FIELD ##########
        url: server_ip + cus_ip + "get_order_almost_ready.php",
        //################################
        data: { 'transaction_id': order_id, 'client_id': customer_id },
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function (data) {
            json = data;
        },

        beforeSend: function () {
            if (ajax_call !== null) {
                ajax_call.abort();
            }
        },

        error: function (jqXHR, exception) {
            if (jqXHR.aborted)
                return;
            alert(exception);

        },
        timeout: 13000
    });

    return json; // TODO treat the recieved query
}

function cancel_order(order_id) {
    ajax_call = $.ajax({
        //########### TMP FIELD ##########
        url: server_ip + cus_ip + "cancel_order.php",
        //################################
        data: { 'transaction_id': order_id, 'client_id': customer_id },
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function (data) {
            json = data;
        },

        beforeSend: function () {
            if (ajax_call !== null) {
                ajax_call.abort();
            }
        },

        error: function (jqXHR, exception) {
            if (jqXHR.aborted)
                return;
            alert(exception);

        },
        timeout: 13000
    });

    return json;
}

function pay_order(order_id) {
    ajax_call = $.ajax({
        //########### TMP FIELD ##########
        url: server_ip + cus_ip + "pay_order.php",
        //################################
        data: { 'transaction_id': order_id, 'client_id': customer_id },
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function (data) {
            json = data;
        },

        beforeSend: function () {
            if (ajax_call !== null) {
                ajax_call.abort();
            }
        },

        error: function (jqXHR, exception) {
            if (jqXHR.aborted)
                return;
            alert(exception);

        },
        timeout: 13000
    });
    console.log(json.message);
    return json.success;
}
/*         !AJAX QUERY      */


function generate_shops_nearby(position) {
    var shops = get_shops_nearby(position);
    $("#main_shop_list").empty();
    vendor_item_number = 0;
    /* then complete the list from the main_shop_list page */
    for (let i = 0; i < shops.length; i++) {
        $("#main_shop_list").append($('<li>')
            .append($('<button>')
                .attr('class', 'shop_btn ui-btn ui-icon-carat-r ui-btn-icon-right')
                .attr('data-shopid', shops[i].shop_id.toString())
                .append($('<img>').attr('class', 'lvr_shop_img').attr('src', shops[i].logo))
                .append($('<h3>').append(shops[i].name))));
        //.append($('<p>').append('<strong>Distance</strong>'))
        //.append($('<p>').append(get_distance(shops[i].distance)))));
        $('.shop_btn[data-shopid="' + shops[i].shop_id.toString() + '"]').click(function () {
            generate_items_from_shop(shops[i].shop_id, shops[i].name);
            console.log("define_shop_list_click");
            define_shop_list_confirm_click();
            $.mobile.pageContainer.pagecontainer('change', '#shop_store', {
                content: {
                    shop_id: shops[i].shop_id,
                    shop_name: shops[i].shop_name
                },
                transition: 'slide'
            });
        });
    }
}

function translate_status_toString(order_id, status, item) {
    switch (parseInt(status)) {
        case 1:
            return "Waiting for vendor confirmation";
        case 2:
            return "waiting for a deliverer";
        case 3:
            // link to order ready/almost ready
            return "order ready";
        case 4:
            return "deliverer going to the shop";
        case 5:
          
            return "in delivery";
        case 6:
            // link to recap of delivery
            return "delivered";
    }
}

function generate_link_to_qrcode(order_id, item) {
    $('#orders_list li[data-orderid="' + order_id + '"]')
        .append($("<a>").attr('id', 'btn_qr_code_' + order_id + "").attr('href', '#').attr('class', 'ui-btn').attr("data-orderid", order_id)
            .append("In delivery!"));
    $("#btn_qr_code_" + order_id + "").off().click(function () {
        $.mobile.pageContainer.pagecontainer('change', '#qr_code_page', { content: { "order_id": order_id, "info": item }, transition: 'slide' });
    });
    console.log("done");
}

function generate_link_to_order_ready(order_id, item) {
    
    if ($('#orders_list li[data-orderid="' + order_id + '"]').length > 0) {
        $('#orders_list li[data-orderid="' + order_id + '"]')
            .append($("<a>").attr('id', 'btn_to_order_ready' + order_id).attr('href', '#').attr('class', 'ui-btn').attr('data-orderid', order_id)
                .append("Order ready!"));
        $("#btn_to_order_ready" + order_id + "").off().click(function(){
            $.mobile.pageContainer.pagecontainer('change', '#order_ready', { content: { "order_id" : order_id, "info" : item }, transition: 'slide' });
        });
        $("#btn_order_ready_pay").off().click(function () {
            res = pay_order(order_id);
            if (res === true){
                $.mobile.pageContainer.pagecontainer('change', '#qr_code_page', { content: order_id, transition: 'slide' });
            }
            else {
                alert("An error has occured with your payement, please try again or contact the support team.");
            }
        });
    }
}

function generate_link_to_recap_order(order_id) {

}

function generate_qr_code_page(content) {
    /* deliverer name
    shop name
    order id

    */
    console.log(content);
    var order = get_qr_code_info(content.order_id);

    var qr_token = order.qr_token;
    console.log(order);
    $('#qr_shop_name').attr('data-shopid', order.shop_id).html(order.shop_name);
    $('#qr_deliverer_name').attr('data-delivererid', order.deliverer_id).html(order.deliverer_firstname + " " + order.deliverer_lastname);
    $('#qr_order_id').attr('data-orderid', order.order_id).html('Order #: ' + order.order_id);
    load_qr_code(order.order_id, qr_token);
}

function load_qr_code(order_id, qr_token) {
    var img = 'https://api.qrserver.com/v1/create-qr-code/?data=' + qr_token + '&amp;size=180x180';
    if (img === 'Error') {
        $('#qr_code').attr('data-qrtoken', qr_token).html('<p>An error occured while loading qr_code</p> <button id="reload_qr">reload QR code</button>');
        $('#reload_qr').click
        $("#reload_qr").off().click(function () {
            load_qr_code(qr_token);
        });
    }
    else {
        $('#qr_code').attr('orderid', order_id).html('<img class="qr_code_img" src="' + img + '">');
    }
}

function generate_link_to_deliverer_pos(order_id) {

}


/* Order almost ready! */
function generate_list_almost_ready(order_id) {
    //
    // REQUEST TODO
    //  This request gets the informations about the items of the order where customer_quantity != vendor_quantity
    var req = get_list_almost_ready(order_id);

    /* var item = {
        item_id: 505,
        item_name: 'Lays Classic',
        item_price: 2.59,
        item_desc: 'delicious chips',
        item_img: '',
        customer_quantity: 5,
        vendor_quantity: 4
    }; */

    clear_list('#order_almost_ready_list');
    $.each(req, function () {
        req_item = $(this);
        $("#order_almost_ready").attr("data-orderid", order_id)
            .append($('<li>').attr('data-itemid', req_item.item_id))
            .append($('<img>').attr('src', req_item.item_img))
            .append($('<h3>').append(req_item.item_name))
            .append($('<p>').append(req_item.item_price))
            .append($('<p>').append(req_item.item_desc))
            .append($('<p>').append("wanted quantity: " + req_item.customer_quantity))
            .append($('<p>').append("shop's quantity: " + req_item.vendor_quantity));
    });
}

/* Ordre ready function to generate the useful infos */
function generate_order_ready_infos(content) {
    console.log(content);
    var order_price = content.info.order_price;
    var deliverer_price = content.info.deliverer_price;
    if (deliverer_price === null) {
        alert("An error has occured with the deliverer price, please contact support for more informations.");
        $.mobile.pageContainer.pagecontainer('change', '#orders', { content: null, transition: 'slide' });
    }
    var total_price = parseFloat(order_price) + parseFloat(deliverer_price);
    $("#order_ready_amount").html("");
    $("#order_ready_amount").append($('<p>').html("Order price: " + order_price + "€"))
        .append($('<p>').html("Deliverer price: " + deliverer_price + "€"))
        .append($('<p>').html("Total Price: " + total_price + "€"));
}


/* Take a distance in metters and returns the distance wether in Km or m */
function get_distance(d) {
    //supposed distance in metters
    if (d < 1000) return d.toString() + "m";
    else return (d / 1000).toString() + "km";

}

function clear_list(list_id) {
    $(list_id).empty();
}

/* gets the items of the shop and complete the shop_store page */
function generate_items_from_shop(shop_id, shop_name) {
    $('#shop_store_list').empty();
    $('#recap_shop_list').empty();
    /* get the list of items sold by vendor */
    var shop_list = retrieve_items_from_db(shop_id);

    $("#shop_store_name").attr('data-shopid', shop_id).text(shop_name);
    if (shop_list.length === 0) {
        $("#shop_store_empty").html("Sorry, we have no items in this shop. You can try another one or come back later!");
    }
    else {
        $("#shop_store_empty").html("");
    }
    for (let i = 0; i < shop_list.length; i++) {
        //each iteration creates an element of the shop list
        if ($('#shop_item_' + shop_list[i].item_id.toString()).length === 0) {

            $("#shop_store_list").append($('<li>').attr('id', 'shop_item_' + shop_list[i].item_id.toString()).attr('class','ui-field-contain')
                .append($('<img>').attr('id', 'img_' + shop_list[i].item_id).attr('src', ''))
                .append($('<h3>').attr('id', 'name_' + shop_list[i].item_id).append(shop_list[i].item_name))
                .append($('<p>').attr('id', 'desc_' + shop_list[i].item_id).append(shop_list[i].item_desc))
                .append($('<p>').attr('id', 'price_' + shop_list[i].item_id).append(shop_list[i].item_price.toString() + '€'))
                .append($('<div>').attr('data-role','controlgroup').attr('data-type','horizontal').attr('class','ui-controlgroup ui-controlgroup-horizontal ui-corner-all').attr('data-mini','true').append(
                $('<button>').attr('class', 'ui-btn ui-btn-icon-notext ui-btn-inline ui-icon-minus ui-corner-all').click(function () {
                        var qty = parseInt($('#qty_' + shop_list[i].item_id).text());
                        if (qty > 0) qty--;
                        $('#qty_' + shop_list[i].item_id).text(qty);
                }))
                    .append($('<button>').attr('class', 'ui-btn ui-btn-icon-notext ui-btn-inline ui-icon-plus ui-corner-all').click(function () {
                        var qty = parseInt($('#qty_' + shop_list[i].item_id).text());
                        if (qty < 99) qty++;
                        $('#qty_' + shop_list[i].item_id).text(qty);
                })))
                .append($('<span>').attr('class', 'ui-li-count').attr('id', 'qty_' + shop_list[i].item_id).html('0'))

            );
        }
    }
}
/* recap things */
function update_recap_field(item) {
    if (item.item_qty === 0) $('#recap_item_' + item.item_id).remove();
    else $('#recap_qty_' + item.item_id).text(item.item_qty);
}

function create_recap_field(item) {
    $('#recap_shop_list').append($('<li>').attr('id', 'recap_item_' + item.item_id)
        .append($('<img>').attr('id', 'recap_item_' + item.item_id).attr('src', ''))
        .append($('<h3>').attr('id', 'recap_name_' + item.item_id).append(item.item_name))
        .append($('<p>').attr('id', 'recap_desc_' + item.item_id).append(item.item_desc))
        .append($('<p>').attr('id', 'recap_price_' + item.item_id).append(item.item_price))
        .append($('<p>').attr('id', 'recap_qty_' + item.item_id).append(item.item_qty)));
}

function fill_recap_list(recap_list) {
    var price = 0;
    var recap_shop_id = $("#shop_store_name").attr('data-shopid');
    $("#recap_shop_name").attr('data-shopid', $("#shop_store_name").attr('data-shopid')).text($('#shop_store_name').text());

    $.each(recap_list, function (idx, item) {
        if ($('#recap_item_' + item.item_id).length > 0) update_recap_field(item);
        else create_recap_field(item);
        price += Math.round(parseFloat(item.item_price.split('€')[0]) * parseFloat(item.item_qty) * 100) / 100;
    });
    $('#recap_total_price').text("price: " + price + "€");
    define_btn_recap_modifiy();
    define_btn_recap_confirm(recap_shop_id, price);
}

/* after recap */

function get_recap_order() {
    if ($('#recap_shop_list').length <= 0) return null;
    /*
        order = the shop id + total price + a list of { item + quantity }
    */
    var order = {
        shop_id: $('#recap_shop_name').attr('data-shopid'),
        total_price: parseFloat($("#recap_total_price").text().split(' ')[1].split('$')[0]),
        item_list: []
    };

    $.each($('#recap_shop_list li'), function () {
        var item_id = parseInt($(this).attr('id').split('_')[2]);
        var item = {
            id: item_id,
            qty: parseInt($("#recap_qty_" + item_id).text())
        };
        order.item_list.push(item);
    });
    return order;
}

function get_recap_adress() {
    if ($("#recap_address").val() === "") {
        $("#address_error").html("please fill the adress field.");
        return null;
    }
    else if ($("#recap_zipcode").val() === "") {
        $("#address_error").html("please fill the zipcode field.");
        return null;
    }
    else if ($("#recap_city").val() === "") {
        $("#address_error").html("please fill the city field.");
        return null;
    }
    var adress = "" + $("#recap_address").val() + " " +
        $("#recap_zipcode").val() + " " +
        $("#recap_city").val();
    return adress;
}

/* click functions */

/* the onClick action from the shop_list_confirm button */
function define_shop_list_confirm_click() {
    $('#btn_shop_list_confirm').off().click(function () {
        var list = $('#shop_store_list li');
        var recap_list = [];
        $.each(list, function () {
            var item = $(this);
            var id_split = item.attr('id').split('_');
            var id = id_split[id_split.length - 1];
            var quantity = item.find('#qty_' + id).text();
            if (parseInt(quantity) > 0) {
                var name = item.find('#name_' + id).text();
                var description = item.find('#desc_' + id).text();
                var price = item.find('#price_' + id).text();
                recap_list.push({ item_id: id, item_name: name, item_qty: quantity, item_desc: description, item_price: price });
            }
        });
        $("#recap_total_price").html("0€");
        $("#recap_shop_name").html($("#shop_store_name").html());
        if (recap_list.length === 0) alert("You didn't select anything?! You can't make an empty order.");
        else {
            $("#recap_shop_list").empty();
            $.mobile.pageContainer.pagecontainer('change', '#recap_cart', { content: recap_list, transition: 'slide' });
        }
    });
    $('#btn_shop_list_cancel').off().click(function () {
        $.mobile.pageContainer.pagecontainer('change', '#main', { content: null, transition: 'slide' });
    });
}
function define_my_orders_click() {
    $('#my_orders').off().click(function () {
        retrieve_orders_from_server();
        $.mobile.pageContainer.pagecontainer('change', "#orders", { transition: 'slide' });
    });
};
/* click for the #btn_recap_confirm */
function define_btn_recap_confirm(shop_id, price) {
    $("#btn_recap_confirm").off().click(function () {
        var order = get_recap_order().item_list;
        var adress = get_recap_adress();
        if (adress === null || adress === "") {
            alert("please entre the adress you want to be delivered to.");
            return null;
        }
        var success = send_order_to_serv(order, shop_id, price, adress);

        if (success === true) $.mobile.pageContainer.pagecontainer('change', '#notification_anouncement', { content: null, transition: 'slide' });
    });
};
function define_btn_recap_modifiy() {
    $("#btn_recap_modify").off().click(function () {
        $.mobile.pageContainer.pagecontainer('change', '#shop_store', { content: null, transition: 'slide' });
    });
}
function define_btn_return_qr_code(content) {
    $("#btn_return_qr_code").off().click(function () {
        $.mobile.pageContainer.pagecontainer('change', '#qr_code_page', { content: content, transition: 'slide' });
    });
}
function define_btn_deliverer_pos(content) {
    /***************** TODO ADD call to google map api *****************/
    $("#qr_code_deliverer").off().click(function () {
        $.mobile.pageContainer.pagecontainer('change', '#deliverer_pos', { content: content, transition: 'slide' });
    });
}
function define_register_submit() {
    $("#register_form_btn").off().click(function () {
        event.preventDefault();
        registration_normal();
        console.log("register_form submit");
    });
}
function define_register_link() {
    $("#login_register").off().click(function () {
        $.mobile.pageContainer.pagecontainer('change', '#api-register', { transition: 'slide' });
    });
}
function define_login_submit() {
    $("#login_form_btn").off().click(function () {
        event.preventDefault();
        login_normal();
    });
}
function define_register_livero_link() {
    $("#register_livero").off().click(function () {
        $.mobile.pageContainer.pagecontainer('change', "#login", {transition: 'slide' });
    });
}
function define_cancel_order_ready(order_id) {
    $("#btn_order_ready_cancel").off().click(function () {
        if (confirm("Are you sure that you want to cancel this order?"))
        {
            cancel_order(order_id);
            $.mobile.pageContainer.pagecontainer('change', "#orders", { content: null, transition: 'slide' });
        }
    });
}
function define_search_for_a_shop_click() {
    $("#search_for_a_shop").off().click(function () {
        $.mobile.pageContainer.pagecontainer('change', "#main", { content: null, transition: 'slide' });
    });
}
function define_my_account_click() {
    $("#my_account_btn").off().click(function () {
        $.mobile.pageContainer.pagecontainer('change', "#my_account", { content: null, transition: 'slide' });
    });
}
function define_logout_click() {
    $("#logout").off().click(function () {
        logout();
    });
}
function main_function() {
    if (panel_init === false)
        init_panel();
    clear_list('#main_shop_list');
    navigator.geolocation.getCurrentPosition(generate_shops_nearby, onError);
}

function register_before_display() {
    define_register_submit();
    define_register_livero_link();
}

function login_before_display() {
    define_register_link();
    define_login_submit();
}

/* Page before change events */
$(document).on('pagecontainerbeforechange', function (event, ui) {
    var content = ui.options.content;
    console.log(ui.toPage[0].id);
    if (ui.toPage[0].id === 'login') {
        login_before_display();
    }
    else if (ui.toPage[0].id === 'main') {
        main_function();
    }
    /*else if (ui.toPage[0].id === 'shop_store') {
        if ($('#shop_store_list li').length <= 0)
            generate_items_from_shop(content.shop_id, content.shop_name);
    }*/
    else if (ui.toPage[0].id === 'recap_cart') {
        if (content !== null && content.length > 0) {
            fill_recap_list(content);
        }
    }
    else if (ui.toPage[0].id === 'order_ready') {
        generate_order_ready_infos(content);
        define_cancel_order_ready(content.order_id);
        
    }
    /*if (ui.toPage[0].id === 'notification_anouncement') {

    }*/
    else if (ui.toPage[0].id === 'qr_code_page') {
        generate_qr_code_page(content);
        define_btn_return_qr_code(content);
        define_btn_deliverer_pos(content);
    }
    else if (ui.toPage[0].id === 'api-register') {
        register_before_display();
    }

    
});

function init_panel() {
    /* add the data roles 'header' and 'footer' for the fixed toolbar / title */
    $("[data-role='header'], [data-role='footer']").toolbar({ theme: "a" });
    /* add the data-role 'panel' for the app panel */
    $("body>[data-role='panel']").panel();
    define_search_for_a_shop_click();
    define_my_account_click();
    define_my_orders_click();
    define_logout_click();
    panel_init = true;
}

$(function () {
    $('#distance_value').change(function () {
        clearTimeout(wto);
        wto = setTimeout(function () {
            navigator.geolocation.getCurrentPosition(generate_shops_nearby, onError);
        }, 500);
    });
});

function set_return(btn_id, url) {
    $("#" + btn_id).off().click(function () {
        $.mobile.pageContainer.pagecontainer('change', url, { content: order_id, transition: 'slide' });
    });
};


function onError(position) { };

/*
**
**
**
** Login and registration functions
**
**
**
**
*/

function login_normal() {
    var req = null;
    ajax_call = $.ajax({

        url: server_ip + cus_ip + "login_normal.php",
        data: { 'email': $("#login_email").val(), 'password': $("#login_password").val() },
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function (data) {
            req = data;
        },

        beforeSend: function () {
            if (ajax_call !== null) {
                ajax_call.abort();
            }
        },


        error: function (jqXHR, exception) {
            if (jqXHR.aborted)
                return;
            alert(exception);

        },
        timeout: 13000
    });
    console.log(req);
    if (req.success) {
        localStorage.setItem("customer_id", req.customer_id);
        if (panel_init)
            $("#top_toolbar").toolbar("option","disabled","false");
        else init_panel();
        $.mobile.pageContainer.pagecontainer('change', '#main', { content: null, transition: 'slide' });
    }
    else {
        console.log(req.message);
        $("#login_result").html("username or password it wrong");
    }
};

function registration_normal() {
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var email = $("#email_r").val();
    var first = $("#first").val();
    var last = $("#last").val();
    var dob = $("#dob").val();
    var address = $("#address").val();
    var pass = $("#password_r").val();
    var pass_com = $("#confirm_password_r").val();
    var phone = $("#phone").val()
    if (!email.trim() || !first.trim() || !last.trim() || !dob.trim() || !pass.trim() || !pass_com.trim()) {

        $("#resgitration_result").html("<span style=\"color:red;\">Please enter the required fields</span>");
        return;
    }
    else if (pass !== pass_com) {
        $("#resgitration_result").html("<span style=\"color:red;\">Passwords doesn't match</span>");
        return;
    }
    else if (!re.test(email)) {
        $("#resgitration_result").html("<span style=\"color:red;\">E-mail is not correct</span>");
        return;
    }
    else {
        $("#resgitration_result").html("");
    }
    var json = null;
    ajax_call = $.ajax({
        url: server_ip + cus_ip + "registration_normal.php",
        data: { 'email': email, 'actor': 3, 'first': first, 'last': last, 'dob': dob, 'address': address, 'phone': phone, 'password': pass },
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function (data) {
            json = data;
        },
        error: function (jqXHR, exception) {
            if (jqXHR.aborted)
                return;
            alert(exception);

        },

        beforeSend: function () {
            if (ajax_call !== null) {
                ajax_call.abort();
            }
        },
        timeout: 13000
    });
    console.log(json);
    if (json.success) {
        console.log(json.message);
        $.mobile.pageContainer.pagecontainer('change', '#login', { content: null, transition: 'slide' });
    }
    else {
        console.log(json.message);
        $("#resgitration_result").html("<span style=\"color:red;\">An error has occured with the registration, please try again.</span>");
    }

};

function logout() {
    localStorage.clear();
    $("#top_toolbar").toolbar("option", "disabled", "true");
    $.mobile.pageContainer.pagecontainer('change', '#login', { content: null, transition: 'slidedown' });
}
