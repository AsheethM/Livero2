var user_id = localStorage.getItem('user_id');
var shop_id = localStorage.getItem('shop_id');
var server_ip = localStorage.getItem('server_ip');

var page_section = ['shops', 'settings', 'my_account', 'history', 'my_orders'];
var page_shops = ['shops', 'shop_orders', 'shop_order_instance'];

function go_back()
{
    var cur_page = $.mobile.activePage.attr("id");

        var pos = page_shops.indexOf(cur_page);
        if (pos !== -1 && pos !== 0) {
            var prev_page = page_shops[pos - 1];
            $.mobile.pageContainer.pagecontainer('change', '#' + prev_page, {
                content: localStorage.getItem('old_content'),
                transition: 'slideup'
            });
        }
        else if (page_section.includes(cur_page)) {
            $.mobile.pageContainer.pagecontainer('change', '#home', {transition: 'slideup'});
        }
}

/*----------------Shops Section----------------------------------*/
function display_shop()
{
    var url = "http://"+server_ip+"Backend/Shop/Deliverer/get_shop_list.php";
    // Mettre le loader js
    //var res = get_shops_nearby(url);
    var results = [{ shop_id: 1, shop_name: 'Lidl', distance: 5000 },
        { shop_id: 3, shop_name: 'Carrefour', distance: 400 },
        { shop_id: 4, shop_name: 'Aldi', distance: 2000 },
        { shop_id: 5, shop_name: 'Franprix', distance: 7000 },
        { shop_id: 6, shop_name: 'Monoprix', distance: 5600 },
        { shop_id: 2, shop_name: 'Auchan', distance: 6000 }];

    var res = {success:true, message:'No Error', results:results};
    if (res.success)
    {
        $("#shops_list").empty();
        $.each(res.results, function (index, value){
            $('#shops_list').append($('<li>')
                .append($('<a>')
                    .attr('href','#')
                    .attr('class','ui-btn ui-icon-carat-r ui-btn-icon-right')
                    .attr('id', 'shop_'+value.shop_id.toString())
                    .append($('<img>').attr('src',''))
                    .append($('<h3>').append(value.shop_name))
                    .append($('<p>').append('<strong>Distance</strong>'))
                    .append($('<p>').append(value.distance))));

            $("#shop_" + value.shop_id.toString()).click(function () {
                var content = {id:value.shop_id};
                console.log("Hello World");
                $.mobile.pageContainer.pagecontainer('change','#shop_orders', {content : content , transition : 'slideup'});
            });
        });
    }
    else
    {
        $('#shops_message').html("<p> Cannot display shops </p>");
    }
}

function display_shop_orders(content)
{
    var shop_id = content.id;
    var url = "http://"+server_ip+"Backend/Transaction/Deliverer/get_transactions_waiting_deliverer_with_shop_id.php";
    // Mettre le loader js
    //var res = get_shops_nearby(url);
    var results = [{id:1, order_price:300, customer_lat:100, customer_long:100, timer:'11:55:00'},
        {id:2, order_price:600, customer_lat:150, customer_long:200, timer:'11:55:00'}];

    var res = {success:true, message:'No Error', results:results};
    if (res.success)
    {
        $("#shop_orders_list").empty();
        $.each(res.results, function (index, value){
            $('#shop_orders_list').append($('<li>')
                .append($('<a>')
                    .attr('class','ui-btn ui-icon-carat-r ui-btn-icon-right')
                    .attr('id', 'shop_order_'+value.id.toString())
                    .append($('<h3>').append('Delivery :'+value.id))
                    .append($('<p>').append('<strong>Order Price : </strong> '+value.order_price))));

            $("#shop_order_" + value.id.toString()).click(function () {
                localStorage.setItem('old_content', content);
                console.log ("Timer :"+value.timer);
                var new_content = {id:value.id, timer:value.timer};
                $.mobile.pageContainer.pagecontainer('change','#shop_order_instance', {content : new_content , transition : 'slideup'});
            });
        });
    }
    else
    {
        $('#shop_orders_message').html("<p> Cannot display shops </p>");
    }
}

function display_shop_order_instance(content)
{
    var order_id = content.id;
    var timer = content.timer;

    console.log(timer);
    var url = "http://"+server_ip+"Backend/Transaction/Deliverer/get_informations_about_transaction_and _bid_with_id.php";
    // Mettre le loader js
    //var res = get_shops_nearby(url);
    var results = [{bid:10}];
    var res = {success:true, message:'No Error', results:results};

    var current_bid = res.results[0].bid;
    $('#shop_order_instance_cur_bid').html(current_bid+' €');
    $('#shop_order_instance_timer').html(timer);

    $("#shop_order_instance_confirm").click(function () {
        url = "http://"+server_ip+"Backend/Transaction/Deliverer/set_bid.php";
        var bid = parseFloat($('#shop_order_instance_bid').val());
        res = set_bid(url, user_id, bid);
        localStorage.setItem('old_content', content);
        $.mobile.pageContainer.pagecontainer('change','#after_bid', {content : res , transition : 'slideup'});
    });
}


function display_mt_orders(content) {
    var url = "http://"+server_ip+"Backend/Transaction/Deliverer/get_current_orders.php";
    var results = [];
    var res = {success:true, message:'No Error', results:results};
    $('#my_orders_list').empty();
    if (res.success)
    {
        $.each(res.results, function (index, value) {
            $('#my_orders_list').append($('li').append(
                $('a')
                    .attr('class','ui-btn ui-icon-carat-r ui-btn-icon-right')
                    .attr('id', 'my_order_'+value.id)
                    .append($('p').html("Order n° "+index + 1))
                    // Récuperer la distance si possible
            ));

            $('#my_order_'+value.id).click(function () {

            });
        })
    }
    else
    {
        $("#my_orders_message").html("<p>"+res.message+"</p>");
    }
}

$(document).on('pagecontainerbeforechange', function (event, ui) {
    //set_toolbar(true);

    var content = ui.options.content;
    if (ui.toPage[0].id === 'my_orders')
    {
    }
    else if (ui.toPage[0].id === 'shops')
    {
        display_shop();
    }
    else if (ui.toPage[0].id === 'shop_orders')
    {
        display_shop_orders(content);
    }
    else if (ui.toPage[0].id === 'shop_order_instance')
    {
        display_shop_order_instance(content);
    }
    else if (ui.toPage[0].id === 'home')
    {
        console.log('Hello Home');
    }
    else if (ui.toPage[0].id === 'account')
    {
        console.log('Hello Account');
    }
    else if (ui.toPage[0].id === 'settings')
    {
        console.log('Hello Settings');
    }
    else if (ui.toPage[0].id === 'history')
    {
        console.log('Hello History');
    }
});
/*--------------------------------------------------------------------*/


