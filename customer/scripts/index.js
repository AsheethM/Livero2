var customer_id = localStorage.getItem('customer_id');
var server_ip = '';

function get_shops_nearby() {
    //
    //  REQUEST TODO
    //
    return [{ shop_id: 1, name: 'Lidl', distance: 5000 },
    { shop_id: 3, name: 'Carrefour', distance: 400 },
    { shop_id: 4, name: 'Aldi', distance: 2000 },
    { shop_id: 5, name: 'Franprix', distance: 7000 },
    { shop_id: 6, name: 'Monoprix', distance: 5600 },
    { shop_id: 2, name: 'Auchan', distance: 6000 }];
}

function retrieve_items_from_db(shop_id) {
    //
    // REQUEST TODO
    //
    var shop_list = [];
    if (shop_id === 1) shop_list = [
        {
            item_id: 505,
            item_name: 'Lays Classic',
            item_price: 2.59,
            item_desc: 'delicious chips'
        },
        {
            item_id: 580,
            item_name: 'Doritos',
            item_price: 1.99,
            item_desc: 'delicious Doritos!!!'
        }];
    return shop_list;
}

function send_order_to_serv(order){
    //
    // REQUEST TODO
    //
}

function get_order_ready(order_id) {
    //
    // REQUEST TODO
    //
    var order = {
        id: 123,
        status: 3,
        complete: false
    };
    var req = [order];
    if (req.length === 1) {
        if (order.status === 3){
            if (order.complete) {
                window.location.href = "#order_ready";
            }
            else {
                generate_list_almost_ready(order.id);
                window.location.href = "#order_almost_ready";
            }
        }
    }
}

/* request that retrieve a list of orders of the customer */ 
function retrieve_orders_from_server() {
    //
    // REQUEST TODO
    //
    var ord = {
        id: 123,
        shop_name: "Lidl",
        transaction_date: "date",
        price: 25,
        status: 5,
        complete: false
    };


    console.log("avant ajout");
    var req = [ord];
    clear_list("#orders_list");
    $.each(req, function (idx, item) {
        var order = item;
        if ($('#orders_list li[data-orderid="' + + '"]').length <= 0){
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

function generate_shops_nearby() {
    var shops = get_shops_nearby();

    /* then complete the list from the main_shop_list page */
    for (let i = 0; i < shops.length; i++) {
        $("#main_shop_list").append($('<li>')
            .append($('<button>')
                .attr('class', 'shop_btn ui-btn ui-icon-carat-r ui-btn-icon-right')
                .attr('data-shopid', shops[i].shop_id.toString())
                .append($('<img>').attr('src', ''))
                .append($('<h3>').append(shops[i].name))
                .append($('<p>').append('<strong>Distance</strong>'))
                .append($('<p>').append(get_distance(shops[i].distance)))));
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

function translate_status_toString(order_id, status){
    switch (status)
    {
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

function generate_link_to_order_ready(order_id){
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

            window.location.href = '#qr_code_page';
            ////////////////////////////////////////////

        });

        ////////////////////////////////////////////
        //  Test                                  //  
        ////////////////////////////////////////////

        var order = {
            id: 123,
            amount: 54.50
        };
        ////////////////////////////////////////////

        $("#order_ready_amount").text(order.amount);
    }
}

function generate_link_to_recap_order(order_id) {

}

function generate_qr_code(order_id) {
    
    var img = ""; //get_customer_qrcode(order_id, customer_id);
    if (img === 'Error') {
        $("qr_code").text("error occured while loading qr_code");
    }
    else {
        $('#qr_code').attr('orderid', order_id).text(img);
    }
}

function generate_link_to_deliverer_pos(order_id) {

}


/* Order almost ready! */
function generate_list_almost_ready(order_id) {
    //
    // REQUEST TODO
    //  This request gets the informations about the items of the order where customer_quantity != vendor_quantity

    var item = {
        item_id: 505,
        item_name: 'Lays Classic',
        item_price: 2.59,
        item_desc: 'delicious chips',
        item_img: '',
        customer_quantity: 5,
        vendor_quantity: 4
    };
    var req = [item];
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
function get_distance(d)
{
    //supposed distance in metters
    if (d < 1000) return d.toString() + "m";
	else return (d / 1000).toString() + "km";
	
}

function clear_list(list_id){
	$(list_id).empty();
}

/* gets the items of the shop and complete the shop_store page */
function generate_items_from_shop(shop_id, shop_name)
{
    $('#shop_store_list').empty();
    $('#recap_shop_list').empty();
	/* get the list of items sold by vendor */
	var shop_list = retrieve_items_from_db(shop_id);
    
    $("#shop_store_name").attr('data-shopid', shop_id).text(shop_name);
	for(let i = 0; i < shop_list.length; i++)
    {
        //each iteration creates an element of the shop list
        if ($('#shop_item_' + shop_list[i].item_id.toString()).length === 0) {
           
            $("#shop_store_list").append($('<li>').attr('id', 'shop_item_' + shop_list[i].item_id.toString())
                .append($('<img>').attr('id', 'img_' + shop_list[i].item_id).attr('src',''))
                .append($('<h3>').attr('id', 'name_' + shop_list[i].item_id).append(shop_list[i].item_name))
                .append($('<p>').attr('id', 'desc_' + shop_list[i].item_id).append(shop_list[i].item_desc))
                .append($('<p>').attr('id', 'price_' + shop_list[i].item_id).append(shop_list[i].item_price.toString() + '€'))
                .append($('<div>').attr('data-role', 'controlgroup').attr('data-type', 'horizontal').attr('data-mini','true').attr('class','ui-controlgroup ui-controlgroup-horizontal ui-corner-all ui-mini')
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
function update_recap_field(item)
{
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
    define_btn_recap_confirm();
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
}

function define_my_orders_click() {
    $('#my_orders').off().click(function () {
        retrieve_orders_from_server();
        $.mobile.pageContainer.pagecontainer('change', "#orders", {transition: 'slide' });
    });
};

/* click for the #btn_recap_confirm */
function define_btn_recap_confirm() {
    $("#btn_recap_confirm").off().click(function () {
        var order = get_recap_order();
        send_order_to_serv(order);
        
        $.mobile.pageContainer.pagecontainer('change', '#notification_anouncement', { content: null, transition: 'slide' });
    });
};
function define_btn_recap_modifiy() {
    $("#btn_recap_modify").off().click(function () {
        $.mobile.pageContainer.pagecontainer('change', '#shop_store', { content: null, transition: 'slide'});
    });
}

/* Page before change events */
$(document).on('pagecontainerbeforechange', function (event, ui) {
    var content = ui.options.content;
    if (ui.toPage[0].id === 'main') {
        clear_list('#main_shop_list');
        generate_shops_nearby();
    }
    if (ui.toPage[0].id === 'shop_store') {
        if ($('#shop_store_list li').length <= 0)
            generate_items_from_shop(content.shop_id, content.shop_name);
    }
    if (ui.toPage[0].id === 'recap_cart') {
        if (content !== null && content.length > 0)
        {
            fill_recap_list(content);
        }
    }
    if (ui.toPage[0].id === 'notification_anouncement') {
        
    }
});

$(function () {
    /* add the data roles 'header' and 'footer' for the fixed toolbar / title */
    $("[data-role='header'], [data-role='footer']").toolbar({ theme: "a" });
    /* add the data-role 'panel' for the app panel */
    $("body>[data-role='panel']").panel();
    define_my_orders_click();
});