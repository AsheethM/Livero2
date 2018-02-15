var user_id = "";
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


function display_home() {
    user_id = localStorage.getItem("user_id");
    $( "body>[data-role='panel']" ).panel();
    $( "[data-role='header'], [data-role='footer']" ).toolbar({theme: "a"});
}

/*----------------Login Section----------------------------------*/
function display_login()
{
    $("#login_btn").off().click(function(){
        var url = "http://"+server_ip+"/SRC/Backend/Deliverer/login_normal.php";
        var email = $("#email").val();
        var password = $("#password").val();
        var res = normal_login(url, email, password);
        console.log("LOGIN");
        console.log(res);
        console.log("/LOGIN");
        if (res.success)
        {
            localStorage.setItem('user_id', res.results[0].user_id);
            user_id = res.results[0].user_id;
            $.mobile.pageContainer.pagecontainer('change','#home', {transition : 'slideup'});
        }
        else
        {
            console.log(res);
        }
    });
    $("#register_btn").off().click(function () {
        $.mobile.pageContainer.pagecontainer('change','#api-registration', {transition : 'slideup'});
    });
}

function registration_normal ()
{
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var email = $("#email_r").val();
    var first = $("#first").val();
    var last = $("#last").val();
    var dob = $("#dob").val();
    var address = $("#address").val();
    var pass = $("#password_r").val();
    var pass_com = $("#confirm_password_r").val();
    var phone = $("#phone").val();
    if (!email.trim() ||!first.trim()||!last.trim()||!dob.trim()||!address.trim()||!pass.trim()||!pass_com.trim())
    {

        $("#resgitration_result").html("<span style=\"color:red;\">Please enter the required fields</span>");
        return;
    }
    else if ( pass  !== pass_com )
    {
        $("#resgitration_result").html("<span style=\"color:red;\">Passwords dont match</span>");
        return;
    }
    else if (!re.test(email))
    {
        $("#resgitration_result").html("<span style=\"color:red;\">E-mail is not correct</span>");
        return;
    }
    else
    {
        $("#resgitration_result").html("");
    }

    var url = "http://"+server_ip+"/SRC/Backend/Deliverer/registration_normal.php";
    var result = register(url, email, pass, last, first, phone, dob);
    console.log("REGISTRATION");
    console.log(result);
    console.log("/REGISTRATION");
    if (result.success)
    {
        alert("You can now login");
        $.mobile.pageContainer.pagecontainer('change','#login', {transition : 'slideup'});
    }
    else
    {
        alert("NOPE");
        console.log(result);
    }
}

function display_register() {
    $("#register_submit_btn").off().click(function () {
        registration_normal();
    });
}
/*----------------Login Section----------------------------------*/



/*----------------Shops Section----------------------------------*/
var wto;

function display_shop()
{
    $("#shops_list").empty();

    $('#distance_value').change(function () {
        clearTimeout(wto);
        wto = setTimeout(function () {
            console.log("Entered");
            navigator.geolocation.getCurrentPosition(generate_shops_nearby, onError);
        }, 500);
    });


    /*var url = "http://"+server_ip+"/SRC/Backend/Test/get_shop_list.php";
    var res = get_shops_nearby(url);
    if (res.success)
    {
        $.each(res.results, function (index, value){
            $('#shops_list').append($('<li>')
                .append($('<a>')
                    .attr('href','#')
                    .attr('class','ui-btn ui-icon-carat-r ui-btn-icon-right')
                    .attr('id', 'shop_'+value.id.toString())
                    .append($('<img>').attr('src',''))
                    .append($('<h3>').append(value.shop_name))));

            $("#shop_" + value.id.toString()).off().click(function () {
                var content = {id:value.id};
                $.mobile.pageContainer.pagecontainer('change','#shop_orders', {content : content , transition : 'slideup'});
            });
        });
    }
    else
    {
        $('#shops_message').html("<p> Cannot display shops </p>");
    }*/
}

function onError(){
    $('#shops_message').html("<p> Cannot display shops </p>");
}
function generate_shops_nearby(position) {
    var distance = $("#distance_value").val();
    var shops = get_shops_nearby(position, distance);
    $("#shops_list").empty();
    vendor_item_number = 0;
    /* then complete the list from the main_shop_list page */
    if (shops.length > 0) {
        $.each(shops, function (i, value) {
            $("#shops_list").append($('<li>')
                .append($('<button>')
                    .attr('class', 'shop_btn ui-btn ui-icon-carat-r ui-btn-icon-right')
                    .attr('data-shopid', shops[i].shop_id.toString())
                    .append($('<img>').attr('class', 'lvr_shop_img').attr('src', shops[i].logo))
                    .append($('<h3>').append(shops[i].name))));
            //.append($('<p>').append('<strong>Distance</strong>'))
            //.append($('<p>').append(get_distance(shops[i].distance)))));
            $('.shop_btn[data-shopid="' + shops[i].shop_id.toString() + '"]').click(function () {
                /*generate_items_from_shop(shops[i].shop_id, shops[i].name);
                define_shop_list_confirm_click();
                $.mobile.pageContainer.pagecontainer('change', '#shop_store', {
                    content: {
                        shop_id: shops[i].shop_id,
                        shop_name: shops[i].shop_name
                    },
                    transition: 'slide'
                });*/
                var content = {id:shop_id};
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
    $("#shop_orders_list").empty();
    var shop_id = content.id;
    var url = "http://"+server_ip+"SRC/Backend/Deliverer/get_transactions_waiting_deliverer_with_shop_id.php";
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

                $("#shop_order_" + value.id.toString()).off().click(function () {
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

    var url = "http://"+server_ip+"SRC/Backend/Deliverer/get_informations_about_transaction_and _bid_with_id.php";
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

    $("#shop_order_instance_confirm").off().click(function () {
        url = "http://" + server_ip + "SRC/Backend/Deliverer/set_bid.php";
        var bid = parseFloat($('#shop_order_instance_bid').val());
        res = set_bid(url, user_id, order_id, bid);
        localStorage.setItem('old_content', content);
        $.mobile.pageContainer.pagecontainer('change', '#after_bid', {content: res, transition: 'slideup'});
    });
}

/*---------------------------------------------------------------*/

/*----------------Order Section----------------------------------*/
function display_my_orders(content) {
    var url = "http://"+server_ip+"SRC/Backend/Deliverer/get_current_orders.php";
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

                $('#my_order_'+value.id).off().click(function () {
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
    var url = "http://"+server_ip+"SRC/Backend/Deliverer/get_order_instance_informations.php";
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

        $('#order_instance_qrcode').off().click(function () {
            console.log("QRCODE PART");
            if (order_status == 4)
            {
                var url = "http://"+server_ip+"SRC/Backend/Deliverer/check_shop_token.php";
                scan(url, transaction_id, user_id, false);
            }
            else if (order_status == 5)
            {
                var url = "http://"+server_ip+"SRC/Backend/Deliverer/check_customer_token.php";
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
    console.log("DISPLAY_ACCOUNT");
    console.log(user_id);
    console.log("/DISPLAY_ACCOUNT");
    $('#div_account_message').empty();
    var url = "http://"+server_ip+"SRC/Backend/Deliverer/get_deliverer_account.php";
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

        $("#account_update").off().click(function () {
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
    var licence = ($('#account_licence').is(":checked")) ? 1 : 2;

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
        console.log("BEFORE UPDATE");
        console.log(licence);
        console.log("/BEFORE UPDATE");
        var url = "http://"+server_ip+"SRC/Backend/Deliverer/update_deliverer_account.php";
        update_deliverer_account(url, user_id, phone_number, licence, str_vehicule);
        $.mobile.pageContainer.pagecontainer('change', '#home', {
            transition: 'slideup'
        });
    }
}
/*---------------------------------------------------------------*/


function display_history(){
    $("#History_Orders_list").empty();
    $("#History_message").empty();
    user_id = localStorage.getItem('user_id');
    shop_id = user_id;
    var url = "http://"+server_ip+"SRC/Backend/Deliverer/get_deliverer_history.php";
    var res = get_deliverer_history(url, user_id);
    if (res.success)
    {
        if (res.isTransaction)
        {
            $.each(res.results, function (index, value) {
                $("#History_Orders_list").append($('<li>')
                    .append($('<a>')
                        .attr('href','#')
                        .attr('class','ui-btn ui-icon-carat-r ui-btn-icon-right')
                        .append($('<h3>').append("Order n°"+(index + 1)))
                        .off().click(function () {
                            var content = {value : value};
                            $.mobile.pageContainer.pagecontainer('change','#history_Order_Instance', {content : content , transition : 'slideup'});
                        }))
                );
            });
        }
        else
        {
            $("#History_message").html("You don't have any finished transactions");
            alert("HELLO WORLD");
        }
    }
}

function display_history_order_instance(content) {
    user_id = localStorage.getItem('user_id');
    $("#history_order_products_ul").empty();
    shop_id = user_id;
    var transaction_id = content.value.id;

    var url = "http://"+server_ip+"SRC/Backend/Deliverer/get_order_instance_informations.php";
    $('#order_instance_message').empty();
    var res = get_order_instance_informations(url, user_id, transaction_id);

    if (res.success)
    {

        $('#history_order_customer_name').html(res.customer[0].lastname+" "+res.customer[0].firstname);

        $("#history_order_shop_name").html(res.shop[0].shop_name);

        $("#history_order_status").html("Finished Transaction");

    }
}

$(document).on('pagecontainerbeforechange', function (event, ui) {
    var content = ui.options.content;
    console.log(ui.toPage[0].id);
    if (ui.toPage[0].id === 'login')
    {
        display_login();
    }
    else if (ui.toPage[0].id === 'api-registration')
    {
        display_register();
    }
    else if (ui.toPage[0].id === 'home')
    {
        display_home(); 
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
        display_history();
    }
    else if (ui.toPage[0].id === 'history_Order_Instance')
    {
        display_history_order_instance(content);
    }
});
/*--------------------------------------------------------------------*/


