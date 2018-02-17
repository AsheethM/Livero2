// Pour obtenir une présentation du modèle Vide, consultez la documentation suivante :
// http://go.microsoft.com/fwlink/?LinkID=397704
// Pour déboguer du code durant le chargement d'une page dans cordova-simulate ou sur les appareils/émulateurs Android, lancez votre application, définissez des points d'arrêt, 
// puis exécutez "window.location.reload()" dans la console JavaScript.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Gérer les événements de suspension et de reprise Cordova
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova a été chargé. Effectuez l'initialisation qui nécessite Cordova ici.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    };

    function onPause() {
        // TODO: cette application a été suspendue. Enregistrez l'état de l'application ici.
    };

    function onResume() {
        // TODO: cette application a été réactivée. Restaurez l'état de l'application ici.
    };
})();

var customer_id = localStorage.getItem('customer_id');
var server_ip = 'http://localhost/'; //'http://green.projectyogisha.com/';
var cus_ip = 'pri/SRC/Backend/Customer/';
var wto; // slidebar variable
var vendor_item_number = 0;
var ajax_call = null;
var coordlat = 0;
var coordlon = 0;

function refresh_coordinates(position) {
    coordlat = position.coords.latitude;
    coordlon = position.coords.longitude;
}

function get_shops_nearby(position) {
    var json = null;
    var ajax_call = $.ajax({
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
            if (ajax_call != null) {
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
            if (ajax_call != null) {
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
            return true;
        },

        beforeSend: function () {
            if (ajax_call != null) {
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
};

function get_qr_code_info(order_id) {
    var json = null;

    ajax_call = $.ajax({
        //########### TMP FIELD ##########
        url: server_ip + cus_ip + "get_customer_token.php",
        //################################
        data: { 'transaction_id': order_id, 'customer_id': customer_id },
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function (data) {
            json = data;
        },

        beforeSend: function () {
            if (ajax_call != null) {
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
    if (json.success) {
        var order = {
            qr_token: json.tokens[0],
            shop_name: json.shop_name[0],
            shop_id: json.shop_id[0],
            deliverer_name: json.deliverer_name[0],
            deliverer_id: json.deliverer_id[0],
            order_id: json.transaction_id[0]
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
        url: server_ip + cus_ip + "get_transaction_status.php",
        // ################################
        data: { 'transaction_id': order_id, 'user_id': customer_id },
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function (data) {
            json = data;
        },

        beforeSend: function () {
            if (ajax_call != null) {
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

/* request that retrieve a list of orders of the customer */
function retrieve_orders_from_server() {
    //********************************
    // TODO clarity fields returned
    //********************************
    ajax_call = $.ajax({
        //########### TMP FIELD ##########
        url: server_ip + cus_ip + "get_transaction_status.php",
        //################################
        data: { 'transaction_id': order_id, 'user_id': customer_id },
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function (data) {
            json = data;
        },

        beforeSend: function () {
            if (ajax_call != null) {
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


    /*    var ord = {
            id: 123,
            shop_name: "Lidl",
            transaction_date: "date",
            price: 25,
            status: 5,
            complete: false
        };
    
    
        console.log("avant ajout");
        var req = [ord];*/

    clear_list("#orders_list");
    $.each(req, function (idx, item) {
        var order = item;
        if ($('#orders_list li[data-orderid="' + + '"]').length <= 0) {
            $("#orders_list")
                .append($('<li>').attr('data-orderid', order.id)
                    .append($('<h3>').append(order.id))
                    .append($('<h4>').append(order.shop_name))
                    .append($('<p>').append(order.transaction_date))
                    .append($('<p>').append(order.price)));
            var str = translate_status_toString(order.id, order.status);
        }
    });
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
            if (ajax_call != null) {
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

function translate_status_toString(order_id, status) {
    switch (status) {
        case 1:
            return "Waiting for vendor confirmation";
        case 2:
            return "waiting for a deliverer";
        case 3:
            // link to order ready/almost ready
            generate_link_to_order_ready(order_id);

            return "order ready";
        case 4:
            generate_link_to_deliverer_pos(order_id);
            return "deliverer going to the shop";
        case 5:
            generate_qr_code(order_id);
            generate_link_to_deliverer_pos(order_id);
            generate_link_to_qrcode(order_id);
            return "in delivery";
        case 6:
            // link to recap of delivery
            generate_link_to_recap_order(order_id);
            return "delivered";
    }
}

function generate_link_to_qrcode(order_id) {
    $('#orders_list li[data-orderid="' + order_id + '"]')
        .append($("<a>").attr('href', '#qr_code_page').attr('class', 'ui-btn').attr("data-orderid", order_id)
            .append("In delivery!"));
    console.log("done");
}

function generate_link_to_order_ready(order_id) {
    if ($('#orders_list li[data-orderid="' + order_id + '"]').length > 0) {
        $('#orders_list li[data-orderid="' + order_id + '"]')
            .append($("<a>").attr('href', '#order_ready').attr('class', 'ui-btn').attr('data-orderid', order_id)
                .append("Order ready!"));
        $("#btn_order_ready_pay").off().click(function () {
            //
            //
            // Generate link to payement gataway HERE!
            // 
            //

            ////////////////////////////////////////////
            //  Test                                  //  
            ////////////////////////////////////////////

            $.mobile.pageContainer.pagecontainer('change', '#qr_code_page', { content: order_id, transition: 'slide' });

            ////////////////////////////////////////////

        });

        ////////////////////////////////////////////
        //  Test                                  //  
        ////////////////////////////////////////////

        /* var order = {
             id: 123,
             amount: 54.50
         };*/
        ////////////////////////////////////////////

        //$("#order_ready_amount").text(order.amount);
    }
}

function generate_link_to_recap_order(order_id) {

}

function generate_qr_code_page(content) {
    /* deliverer name
    shop name
    order id

    */
    var order = get_qr_code_info(content);

    var qr_token = order.qr_token;
    $('#qr_shop_name').attr('data-shopid', order.shop_id).html(order.shop_name);
    $('#qr_deliverer_name').attr('data-delivererid', order.deliverer_id).html(order.deliverer_name);
    $('#qr_order_id').attr('data-orderid', order.order_id).html('Order #: ' + order.order_id);
    load_qr_code(qr_token);
}

function load_qr_code(qr_token) {
    var img = 'https://api.qrserver.com/v1/create-qr-code/?data=' + qr_token + '&amp;size=360x360';
    if (img === 'Error') {
        $('#qr_code').attr('data-qrtoken', qr_token).html('<p>An error occured while loading qr_code</p> <button id="reload_qr">reload QR code</button>');
        $('#reload_qr').click
        $("#reload_qr").off().click(function () {
            load_qr_code(qr_token);
        });
    }
    else {
        $('#qr_code').attr('orderid', order_id).html('<img src="' + img + '">');
    }
}

function generate_link_to_deliverer_pos(order_id) {

}


/* Order almost ready! */ /******************************/
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
    if (shop_list.length == 0) {
        $("#shop_store_empty").html("Sorry, we have no items in this shop. You can try another one or come back later!");
    }
    else {
        $("#shop_store_empty").html("");
    }
    for (let i = 0; i < shop_list.length; i++) {
        //each iteration creates an element of the shop list
        if ($('#shop_item_' + shop_list[i].item_id.toString()).length === 0) {

            $("#shop_store_list").append($('<li>').attr('id', 'shop_item_' + shop_list[i].item_id.toString())
                .append($('<img>').attr('id', 'img_' + shop_list[i].item_id).attr('src', ''))
                .append($('<h3>').attr('id', 'name_' + shop_list[i].item_id).append(shop_list[i].item_name))
                .append($('<p>').attr('id', 'desc_' + shop_list[i].item_id).append(shop_list[i].item_desc))
                .append($('<p>').attr('id', 'price_' + shop_list[i].item_id).append(shop_list[i].item_price.toString() + '€'))
                .append($('<div>').attr('data-role', 'controlgroup').attr('data-type', 'horizontal').attr('data-mini', 'true').attr('class', 'ui-controlgroup ui-controlgroup-horizontal ui-corner-all ui-mini')
                    .append($('<p>').attr('id', 'qty_' + shop_list[i].item_id).append('0'))
                    .append($('<button>').attr('class', 'ui-first-child ui-btn ui-btn-icon-notext ui-icon-minus ui-btn-corner-all').click(function () {
                        var qty = parseInt($('#qty_' + shop_list[i].item_id).text());
                        if (qty > 0) qty--;
                        $('#qty_' + shop_list[i].item_id).text(qty);
                    }))
                    .append($('<button>').attr('class', 'ui-last-child ui-btn ui-btn-icon-notext ui-icon-plus ui-btn-corner-all').click(function () {
                        var qty = parseInt($('#qty_' + shop_list[i].item_id).text());
                        if (qty < 99) qty++;
                        $('#qty_' + shop_list[i].item_id).text(qty);
                    }))
                )
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
    if ($("#recap_address").val() == "") {
        $("#address_error").html("please fill the adress field.");
        return null;
    }
    else if ($("#recap_zipcode").val() == "") {
        $("#address_error").html("please fill the zipcode field.");
        return null;
    }
    else if ($("#recap_city").val() == "") {
        $("#address_error").html("please fill the city field.");
        return null;
    }
    var adress = "" + $("#recap_address").val() + " " +
        $("#recap_zipcode").val() + " " +
        $("#recap_city").val();
    console.log(adress);
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
            console.log(item.attr('id'));
            var id_split = item.attr('id').split('_');
            var id = id_split[id_split.length - 1];
            var quantity = item.find('div').find('#qty_' + id).text();
            if (parseInt(quantity) > 0 || $('#recap_item_' + id).length > 0) {
                var name = item.find('#name_' + id).text();
                var description = item.find('#desc_' + id).text();
                var price = item.find('#price_' + id).text();
                recap_list.push({ item_id: id, item_name: name, item_qty: quantity, item_desc: description, item_price: price });
            }
        });
        $.mobile.pageContainer.pagecontainer('change', '#recap_cart', { content: recap_list, transition: 'slide' });
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
        var order = get_recap_order();
        var adress = get_recap_adress();
        if (adress == null || adress == "") {
            alert("please entre the adress you want to be delivered to.");
            return null;
        }
        console.log(adress);
        var success = send_order_to_serv(order, shop_id, price, adress);
        if (success) $.mobile.pageContainer.pagecontainer('change', '#notification_anouncement', { content: null, transition: 'slide' });
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
        $.mobile.pageContainer.pagecontainer('change', '#register', { content: null, transition: 'slide' });
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
        $.mobile.pageContainer.pagecontainer('change', "#login", { content: order_id, transition: 'slide' });
    });
}
/* Page before change events */
$(document).on('pagecontainerbeforechange', function (event, ui) {
    var content = ui.options.content;
    if (ui.toPage[0].id === 'main') {
        if (panel_init == 0)
            init_panel();
        clear_list('#main_shop_list');
        navigator.geolocation.getCurrentPosition(generate_shops_nearby, onError);
        console.log("yes");
    }
    if (ui.toPage[0].id === 'shop_store') {
        if ($('#shop_store_list li').length <= 0)
            generate_items_from_shop(content.shop_id, content.shop_name);
    }
    if (ui.toPage[0].id === 'recap_cart') {
        if (content !== null && content.length > 0) {
            fill_recap_list(content);
        }
    }
    if (ui.toPage[0].id === 'notification_anouncement') {

    }
    if (ui.toPage[0].id === 'qr_code_page') {
        generate_qr_code_page(content, qr_token);
        define_btn_return_qr_code(content);
        define_btn_deliverer_pos(content);
    }
    if (ui.toPage[0].id === 'register') {
        define_register_submit();
        define_register_livero_link();
        console.log("here");
    }

    if (ui.toPage[0].id === 'login') {
        define_register_link();
        define_login_submit();
        console.log(server_ip + cus_ip + "Account/registration_normal.php");
    }
});

var panel_init = 0;

function init_panel() {
    /* add the data roles 'header' and 'footer' for the fixed toolbar / title */
    $("[data-role='header'], [data-role='footer']").toolbar({ theme: "a" });
    /* add the data-role 'panel' for the app panel */
    $("body>[data-role='panel']").panel();
    define_my_orders_click();
    panel_init = 1;
}

$(function () {
    $('#distance_value').change(function () {
        clearTimeout(wto);
        wto = setTimeout(function () {
            navigator.geolocation.getCurrentPosition(generate_shops_nearby, onError);
        }, 500);
    });
});

$(document).ready(function () {
    if (customer_id === null) {
        $.mobile.pageContainer.pagecontainer('change', "#login", { content: null, transition: 'slide' });
    }
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

function login_facebook() {


    CordovaFacebook.login({
        permissions: ['email'],
        onSuccess: function (result) {
            if (result.declined.length > 0) {
                alert("The User declined something!");
            }
            /* ... */
        },
        onFailure: function (result) {
            if (result.cancelled) {
                alert("The user doesn't like my app");
            } else if (result.error) {
                alert("There was an error:" + result.errorLocalized);
            }
        }
    });
};

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
            if (ajax_call != null) {
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
        console.log(req.message);
        $.mobile.pageContainer.pagecontainer('change', '#main', { content: null, transition: 'slide' });
    }
    else {
        console.log(req.message);
        $("#login_result").html("user/name or password it wrong");
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
            if (ajax_call != null) {
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
