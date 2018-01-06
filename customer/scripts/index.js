function get_shops_nearby() {
    //
    //  REQUEST TODO
    //
	/* --------- This is for test purposes ---------- */ 
    return [{ shop_id: 1, name: 'Lidl', distance: 5000 },
    { shop_id: 3, name: 'Carrefour', distance: 400 },
    { shop_id: 4, name: 'Aldi', distance: 2000 },
    { shop_id: 5, name: 'Franprix', distance: 7000 },
    { shop_id: 6, name: 'Monoprix', distance: 5600 },
    { shop_id: 2, name: 'Auchan', distance: 6000 }];
	/* ---------------------------------------------- */
}

function retrieve_items_from_db(shop_id) {
    //
    // REQUEST TODO
    //
	
	var shop_list = [];
    /* --------- This is for test purposes ---------- */
    if (shop_id == 1) shop_list = [
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
	/* ---------------------------------------------- */
    return shop_list;
}

function send_order_to_serv(order){
    //
    // REQUEST TODO
    //
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
function retrieve_items_from_shop(shop_id, shop_name)
{
    $('#shop_store_list').empty();
    $('#recap_shop_list').empty();
	console.log(shop_id == 1);
	/* get the list of items sold by vendor */
	var shop_list = retrieve_items_from_db(shop_id);
    console.log(shop_name);
    $("#shop_store_name").attr('data-shopid', shop_id).text(shop_name);
	for(let i = 0; i < shop_list.length; i++)
    {
        //each iteration creates an element of the shop list
        if ($('#shop_item_' + shop_list[i].item_id.toString()).length == 0) {
            console.log("yes");
		    $("#shop_store_list").append($('<li>').attr('id', 'shop_item_'+shop_list[i].item_id.toString())
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
    if (item.item_qty == 0) $('#recap_item_' + item.item_id).remove();
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
    console.log($("#shop_store_name"));
    var recap_shop_id = $("#shop_store_name").attr('data-shopid');
    $("#recap_shop_name").attr('data-shopid', $("#shop_store_name").attr('data-shopid')).text($('#shop_store_name').text());

    $.each(recap_list, function (idx, item) {
        if ($('#recap_item_' + item.item_id).length > 0) update_recap_field(item);
        else create_recap_field(item);
        price += Math.round(parseFloat(item.item_price.split('€')[0]) * parseFloat(item.item_qty) * 100) / 100;
    });
    $('#recap_total_price').text("price: " +price + "€");
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
        }
        order.item_list.push(item);
    });
    return order;
}

/* Order almost ready! */
function generate_list_almost_ready(order_id) {

}
/* click functions */

/* the onClick action from the shop_list_confirm button */
$(function () {
    $('#btn_shop_list_confirm').click(function () {
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
        if (recap_list.length > 0)
        {
            fill_recap_list(recap_list);
        }
        window.location.href = '#recap_cart';
    });
});
/* add the data-role 'panel' for the app panel */
$(function() {
	$( "body>[data-role='panel']" ).panel();
});

/* add the data roles 'header' and 'footer' for the fixed toolbar / title */ 
$(function(){
	$( "[data-role='header'], [data-role='footer']" ).toolbar({theme: "a"});
});

$(function(){
clear_list('#main_shop_list');
	
/* should create a list with a database query to get a list of shops nearby */
//	REQUEST TODO
    var shops = get_shops_nearby();
	
	/* then complete the list from the main_shop_list page */
	for(let i = 0; i < shops.length; i++)
	{
		$("#main_shop_list").append($('<li>')
		.append($('<a>')
			.attr('href','#shop_store')
			.attr('class','ui-btn ui-icon-carat-r ui-btn-icon-right')
			.attr('id', 'shop_'+shops[i].shop_id.toString())
			.append($('<img>').attr('src',''))
			.append($('<h3>').append(shops[i].name))
			.append($('<p>').append('<strong>Distance</strong>'))
			.append($('<p>').append(get_distance(shops[i].distance)))));
        $("#shop_" + shops[i].shop_id.toString()).click(function () {
            retrieve_items_from_shop(shops[i].shop_id, shops[i].name);
        });
	}
});

$(function () {
    $("#btn_recap_modify").click(function () {
        list_items = [];
        if ($('#recap_shop_list li').length != 0) {
            $.each($('#recap_shop_list li'), function () {
                item = $(this);
            });
        }
    });
});

/* click for the #btn_recap_confirm */
$(function () {
    $("#btn_recap_confirm").click(function () {
        var order = get_recap_order();
        send_order_to_serv(order);
        console.log(order);
        window.location.href = "#notification_anouncement";
    });
});
