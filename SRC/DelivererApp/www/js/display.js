var user_id = localStorage.getItem('user_id');
var shop_id = localStorage.getItem('shop_id');
var server_ip = localStorage.getItem('server_ip');

var page_section = ['shops', 'settings', 'my_account', 'history', 'my_orders'];
var page_shops = ['shops', 'shop_orders', 'shop_order_instance'];
var page_orders = ['my_orders', 'order_instance'];

function go_back()
{

    var cur_page = $.mobile.activePage.attr("id");
    var pos = page_shops.indexOf(cur_page);
    var pos2 = page_orders.indexOf(cur_page);

    if (pos !== -1 && pos !== 0) {
        var prev_page = page_shops[pos - 1];
        $.mobile.pageContainer.pagecontainer('change', '#' + prev_page, {
            content: localStorage.getItem('old_content'),
            transition: 'slideup'
        });
    }
    else if (pos2 !== -1 && pos2 !== 0)
    {
        var prev_page = page_orders[pos2 - 1];
        $.mobile.pageContainer.pagecontainer('change', '#' + prev_page, {
            content: localStorage.getItem('old_content'),
            transition: 'slideup'
        });
    }
    else if (page_section.includes(cur_page))
    {
        $.mobile.pageContainer.pagecontainer('change', '#home', {transition: 'slideup'});
    }
}

/*----------------Shops Section----------------------------------*/
function display_shop()
{
    var url = "http://"+server_ip+"/SRC/Backend/Test/get_shop_list.php";
    var res = get_shops_nearby(url);
    if (res.success)
    {
        $("#shops_list").empty();
        $.each(res.results, function (index, value){
            $('#shops_list').append($('<li>')
                .append($('<a>')
                    .attr('href','#')
                    .attr('class','ui-btn ui-icon-carat-r ui-btn-icon-right')
                    .attr('id', 'shop_'+value.id.toString())
                    .append($('<img>').attr('src',''))
                    .append($('<h3>').append(value.shop_name))));

            $("#shop_" + value.id.toString()).click(function () {
                var content = {id:value.id};
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
    var url = "http://"+server_ip+"SRC/Backend/Transaction/Deliverer/get_transactions_waiting_deliverer_with_shop_id.php";
    var res = get_transactions_waiting_deliverer_with_shop_id(url, user_id, shop_id);
    if (res.success)
    {
        if (res.isTransactions)
        {
            $("#shop_orders_list").empty();
            $('#shop_orders_message').empty();
            $.each(res.results, function (index, value) {
                $('#shop_orders_list').append($('<li>')
                    .append($('<a>')
                        .attr('class', 'ui-btn ui-icon-carat-r ui-btn-icon-right')
                        .attr('id', 'shop_order_' + value.id.toString())
                        .append($('<h3>').append('Delivery :' + value.id))
                        .append($('<p>').append('<strong>Order Price : </strong> ' + value.order_price))));

                $("#shop_order_" + value.id.toString()).click(function () {
                    localStorage.setItem('old_content', content);
                    var new_content = {id: value.id, timer: value.timer};
                    $.mobile.pageContainer.pagecontainer('change', '#shop_order_instance', {
                        content: new_content,
                        transition: 'slideup'
                    });
                });
            });

        }
        else
        {
            $('#shop_orders_message').html(res.message);
        }
    }
    else
    {
        $('#shop_orders_message').html("<p> Cannot display shops </p>");
    }
}

function display_shop_order_instance(content)
{
    $('#shop_order_instance_message').empty();
    var order_id = content.id;
    var timer = content.timer;

    var url = "http://"+server_ip+"SRC/Backend/Transaction/Deliverer/get_informations_about_transaction_and _bid_with_id.php";
    var res = get_infotrmations_about_transaction_and_bid(url, user_id, order_id);

    $('#shop_order_instance_timer').html(timer);
    if (res.isBidding) {
        var current_bid = res.results[0].bid;
        $('#shop_order_instance_cur_bid').html(current_bid + ' €');
    }
    else
    {
        $('#shop_order_instance_message').html(res.message);
    }

    $("#shop_order_instance_confirm").click(function () {
        url = "http://" + server_ip + "SRC/Backend/Transaction/Deliverer/set_bid.php";
        var bid = parseFloat($('#shop_order_instance_bid').val());
        res = set_bid(url, user_id, order_id, bid);
        localStorage.setItem('old_content', content);
        $.mobile.pageContainer.pagecontainer('change', '#after_bid', {content: res, transition: 'slideup'});
    });
}

/*---------------------------------------------------------------*/

/*----------------Order Section----------------------------------*/
function display_my_orders(content) {
    var url = "http://"+server_ip+"SRC/Backend/Transaction/Deliverer/get_current_orders.php";
    $('#my_orders_list').empty();
    $('#my_orders_message').empty();
    var res = get_current_orders(url, user_id);
    if (res.success && res.isTransactions)
    {
            $.each(res.results, function (index, value) {
                $('#my_orders_list').append($('<li>').append(
                    $('<a>')
                        .attr('class','ui-btn ui-icon-carat-r ui-btn-icon-right')
                        .attr('id', 'my_order_'+value.id)
                        .append($('<p>').html("Order n° "+index + 1))
                ));

                $('#my_order_'+value.id).click(function () {
                    localStorage.setItem('old_content', content);
                    var new_content = {id: value.id, status: value.status};
                    $.mobile.pageContainer.pagecontainer('change', '#order_instance', {
                        content: new_content,
                        transition: 'slideup'
                    });
                });
            })

    }
    else
    {
        $("#my_orders_message").html("<p>"+res.message+"</p>");
    }
}

function display_order_instance(content) {
    var transaction_id = content.id;
    var order_status = content.status;
    var url = "http://"+server_ip+"SRC/Backend/Transaction/Deliverer/get_order_instance_informations.php";
    $('#order_instance_message').empty();
    var res = get_order_instance_informations(url, user_id, transaction_id);

    if (res.success)
    {
        $('#order_instance_customer_name').html(res.customer[0].lastname+" "+res.customer[0].firstname);
        $('#order_instance_customer_address').html(res.results[0].dest_address);
        $('#order_instance_customer_number').html(res.customer[0].phone);

        $("#order_instance_shop_name").html(res.shop[0].shop_name);
        $('#order_instance_shop_address').html(res.shop[0].address);
        $('#order_instance_shop_number').html(res.shop[0].phone);

        $('#order_instance_qrcode').click(function () {
            console.log("QRCODE PART");
            if (order_status == 4)
            {
                var url = "http://"+server_ip+"SRC/Backend/QRCode/Deliverer/check_shop_token.php";
                scan(url, transaction_id, user_id, false);
            }
            else if (order_status == 5)
            {
                var url = "http://"+server_ip+"SRC/Backend/QRCode/Deliverer/check_customer_token.php";
                scan(url, transaction_id, user_id, true);
            }
        });
    }
    else
    {
        $('#order_instance_message').html(res.message);
    }

}
/*---------------------------------------------------------------*/


/*----------------Account Section----------------------------------*/
function display_account(content)
{
    $('#div_account_message').empty();
    var url = "http://"+server_ip+"SRC/Backend/Account/Deliverer/get_deliverer_account.php";
    var res = get_deliverer_account(url, user_id);
    console.log(res);
    if (res.success)
    {
        $("#account_name").html(res.results[0].lastname+" "+res.results[0].firstname);
        $('#account_email').html(res.results[0].email);
        $("#account_birthdate").html(res.results[0].birthdate);
        $("#account_phone").val(res.results[0].phone);

        if (res.results[0].licence === "0")
            $("#account_licence").prop("checked",false).checkboxradio("refresh");
        else
            $("#account_licence").prop("checked",true).checkboxradio("refresh");

        if (res.results[0].vehicule === "car")
            $("#account_select option[value='4']").prop('selected', true);
        else if (res.results[0].vehicule === "motorbike")
            $("#account_select option[value='3']").prop('selected', true);
        else if (res.results[0].vehicule === "bicycle")
            $("#account_select option[value='2']").prop('selected', true);
        else
            $("#account_select option[value='1']").prop('selected', true);

        $("#account_select").selectmenu('refresh');

        $("#account_update").click(function () {
           update_account();
        });
    }
    else
    {
        $('#div_account_message').html(res.message);
    }
}

function update_account()
{
    $("#div_account_message").empty();
    var error = false;
    var message = "";
    var phone_number = $("#account_phone").val();
    var isNum =/^\d+$/.test(phone_number);

    if (phone_number.length !== 10 || !isNum)
    {
        error = true;
        message = "Phone Number is incorrect";
    }
    var licence = $('#account_licence').is(":checked");

    var vehicule = $('#account_select').val();

    if (!licence && (vehicule === '3' || vehicule === '4'))
    {
        console.log("Hello ERROR");
        error = true;
        message = "Vehicule inccrrect ! Need licence to ride";
    }

    var str_vehicule =  "";
    if (vehicule === '1')
        str_vehicule = "pedestrian";
    else if (vehicule === '2')
        str_vehicule = "bicycle";
    else if (vehicule === '3')
        str_vehicule = "motorbike";
    else if (vehicule === '4')
        str_vehicule = "car";

    if (error)
    {
        $("#div_account_message").html("<p>"+message+"</p>");
    }
    else
    {
        var url = "http://"+server_ip+"SRC/Backend/Account/Deliverer/update_deliverer_account.php";
        update_deliverer_account(url, user_id, phone_number, licence, str_vehicule);
        localStorage.setItem('old_content', content);
        $.mobile.pageContainer.pagecontainer('change', '#home', {
            transition: 'slideup'
        });
    }
}
/*---------------------------------------------------------------*/

$(document).on('pagecontainerbeforechange', function (event, ui) {
    var content = ui.options.content;

    if (ui.toPage[0].id === 'home')
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
    if (ui.toPage[0].id === 'my_orders')
    {
        display_my_orders(content);
    }
    else if (ui.toPage[0].id === 'order_instance')
    {
        display_order_instance(content);
    }
    else if (ui.toPage[0].id === 'my_account')
    {
        display_account(content);
    }
    else if (ui.toPage[0].id === 'settings')
    {
    }
    else if (ui.toPage[0].id === 'history')
    {
    }
});
/*--------------------------------------------------------------------*/


