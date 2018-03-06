//localStorage.setItem('server_ip', 'localhost/');
//localStorage.setItem('server_ip', '192.168.43.128/');
//localStorage.setItem('server_ip', '192.168.1.32/');
//localStorage.setItem('path', 'PRI/SRC/Backend/Deliverer/');
localStorage.setItem('server_ip', 'green.projectyogisha.com/');
localStorage.setItem('path','Deliverer/');
var user_id ;
var server_ip = localStorage.getItem('server_ip');
var path = localStorage.getItem('path');

var pathToServer = ""+server_ip+path;

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

function log_off(){
    localStorage.clear();
    $('#panel_listview .ui-btn').addClass('ui-state-disabled');
    $.mobile.pageContainer.pagecontainer('change','#login', {transition : 'slideup'});
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
        var url = "http://"+pathToServer+"login_normal.php";
        var email = $("#email").val();
        var password = $("#password").val();
        //var res = normal_login(url, email, password);
        $.ajax({
            url : url,
            method: "post",
            data:{'email' : email, 'password':password},
            dataType: "json",
            success: function (res) {
                if (res.success)
                {
                    localStorage.setItem('user_id', res.results[0].user_id);
                    $('#panel_listview .ui-btn').removeClass('ui-state-disabled');
                    user_id = res.results[0].user_id;
                    var phone_token = localStorage.getItem("phone_token");
                    $.ajax(
                        {
                            url : "http://"+pathToServer+"add_phone_token.php",
                            method : "post",
                            data : {'user_id' : user_id, 'phone_token' : phone_token},
                            dataType: "json",
                            success: function (result) {},
                            error: function () {}
                        }
                    );

                    $.mobile.pageContainer.pagecontainer('change','#home', {transition : 'slideup'});
                }
                else
                {
                    alert("Wrong Login OR Password");
                }
            },
            error: function () {
                console.log("Request Get Connection  : KO");
            }
        });
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
    var pass = $("#password_r").val();
    var pass_com = $("#confirm_password_r").val();
    var phone = $("#phone").val();
    if (!email.trim() ||!first.trim()||!last.trim()||!dob.trim()||!pass.trim()||!pass_com.trim())
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

    var url = "http://"+pathToServer+"registration_normal.php";
    //var result = register(url, email, pass, last, first, phone, dob);
    $.ajax({
        url : url,
        method: "post",
        data:{'email' : email, 'password':pass, 'lastname' : last, 'firstname' : first,
            'phone' : phone, 'birthdate' : dob},
        dataType: "json",
        success: function (result) {
            if (result.success)
            {
                alert("You can now login");
                $.mobile.pageContainer.pagecontainer('change','#login', {transition : 'slideup'});
            }
            else
            {
                console.log(result);
            }
        },
        error: function () {
            console.log("* Request Get Connection  : KO");
        }
    });
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

    navigator.geolocation.getCurrentPosition(generate_shops_nearby, function (position) {
        $('#shops_message').html("<p> Cannot display shops </p>");
    });

    $('#distance_value').change(function () {
        clearTimeout(wto);
        wto = setTimeout(function () {
            navigator.geolocation.getCurrentPosition(generate_shops_nearby, function (position) {
                $('#shops_message').html("<p> Cannot display shops </p>");
            });
        }, 500);
    });
}

function generate_shops_nearby(position) {
    var distance = $("#distance_value").val();
    $("#shops_list").empty();
    $('#shops_message').empty();
    vendor_item_number = 0;

    $.ajax({
        url: "http://"+pathToServer+"get_gps_nearest.php",
        data: { 'latitude': position.coords.latitude, 'longitude': position.coords.longitude, 'distance': distance},
        type: 'POST',
        dataType: 'json',
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

            if (shops.length > 0) {
                $.each(shops, function (i, value) {
                    $("#shops_list").append($('<li>')
                        .append($('<button>')
                            .attr('class', 'shop_btn ui-btn ui-icon-carat-r ui-btn-icon-right')
                            .attr('data-shopid', shops[i].shop_id.toString())
                            .append($('<img>').attr('class', 'lvr_shop_img')
                                .attr('src', "http://"+server_ip+shops[i].logo)
                                .attr('style', 'max-width:50px'))
                            .append($('<h3>').append(shops[i].name))));
                    $('.shop_btn[data-shopid="' + shops[i].shop_id.toString() + '"]').click(function () {
                        var content = {id:shops[i].shop_id.toString()};
                        $.mobile.pageContainer.pagecontainer('change','#shop_orders', {content : content , transition : 'slideup'});
                    });
                });
            }
            else
            {
                $('#shops_message').html("<p> Cannot display shops </p>");
            }

        },
        error: function (jqXHR, exception) {
            alert("Error getSHops");
            console.log("* Request get shops nearby: KO");
        },
        timeout: 13000
    });
}


function display_shop_orders(content)
{
    $("#shop_orders_list").empty();
    var shop_id = content.id;
    var url = "http://"+pathToServer+"get_transactions_waiting_deliverer_with_shop_id.php";
    //var res = get_transactions_waiting_deliverer_with_shop_id(url, user_id, shop_id);
    $.ajax({
        url : url,
        method: "post",
        data:{'shop_id' : shop_id, 'deliverer_id':user_id},
        dataType: "json",
        success: function (res) {
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
        },
        error: function () {
            console.log("* Request Get Transactions Without Deliverers  : KO");
        }
    });
}

function display_shop_order_instance(content)
{
    $('#shop_order_instance_message').empty();
    var order_id = content.id;
    var timer = content.timer;
    $('#shop_order_instance_timer').html(timer);

    var url = "http://"+pathToServer+"get_informations_about_transaction_and _bid_with_id.php";
    //var res = get_infotrmations_about_transaction_and_bid(url, user_id, order_id);

    $.ajax({
        url : url,
        method: "post",
        data:{'transaction_id' : order_id, 'deliverer_id':user_id},
        dataType: "json",
        success: function (res) {
            if (res.isBidding) {
                var current_bid = res.results[0].bid;
                $('#shop_order_instance_cur_bid').html(current_bid + ' €');
            }
            else
            {
                $('#shop_order_instance_message').html(res.message);
            }

            $("#shop_order_instance_confirm").off().click(function () {
                url = "http://" +pathToServer+"set_bid.php";
                var bid = parseFloat($('#shop_order_instance_bid').val());
                //res = set_bid(url, user_id, order_id, bid);
                $.ajax({
                    url : url,
                    method: "post",
                    data:{'transaction_id' : order_id, 'deliverer_id':user_id, 'bid' : bid},
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        localStorage.setItem('old_content', content);
                        $.mobile.pageContainer.pagecontainer('change', '#after_bid', {content: res, transition: 'slideup'});
                    },
                    error: function () {
                        console.log("* Request Set Bid  : KO");
                    }
                });
            });
        },
        error: function () {
            console.log("Request Get Informations About Transaction  : KO");
        }
    });
}

/*---------------------------------------------------------------*/

/*----------------Order Section----------------------------------*/
function display_my_orders(content) {
    var url = "http://"+pathToServer+"get_current_orders.php";
    $('#my_orders_list').empty();
    $('#my_orders_message').empty();
    //var res = get_current_orders(url, user_id);
    $.ajax({
        url : url,
        method: "post",
        data:{'deliverer_id':user_id},
        dataType: "json",
        success: function (res) {
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
        },
        error: function () {
            console.log("* Request Get Current Orders : KO");
        }
    });
}

function display_order_instance(content) {
    var transaction_id = content.id;
    var order_status = content.status;
    var url = "http://"+pathToServer+"get_order_instance_informations.php";
    $('#order_instance_message').empty();
    //var res = get_order_instance_informations(url, user_id, transaction_id);

    $.ajax({
        url : url,
        method: "post",
        data:{'deliverer_id':user_id, 'transaction_id' : transaction_id},
        dataType: "json",
        success: function (res) {
            if (res.success)
            {
                $('#order_instance_customer_name').html(res.customer[0].lastname+" "+res.customer[0].firstname);
                $('#order_instance_customer_address').html(res.results[0].dest_address);
                $('#order_instance_customer_number').html(res.customer[0].phone);

                $("#order_instance_shop_name").html(res.shop[0].shop_name);
                $('#order_instance_shop_address').html(res.shop[0].address);
                $('#order_instance_shop_number').html(res.shop[0].phone);

                $('#order_instance_qrcode').off().click(function () {
                    if (order_status == 4)
                    {
                        var url = "http://"+pathToServer+"check_shop_token.php";
                        var is_done = scan(url, transaction_id, user_id, false);
                        if (is_done)
                        {
                            var new_content = {id: transaction_id, status: 5};
                            $.mobile.pageContainer.pagecontainer('change', '#order_instance', {
                                content: new_content,
                                transition: 'slideup'
                            });
                        }
                    }
                    else if (order_status == 5)
                    {
                        var url = "http://"+pathToServer+"check_customer_token.php";
                        var is_done = scan(url, transaction_id, user_id, true);
                        if (is_done)
                        {
                            $.mobile.pageContainer.pagecontainer('change', '#home', {
                                transition: 'slideup'
                            });
                        }
                    }
                });
            }
            else
            {
                $('#order_instance_message').html(res.message);
            }
        },
        error: function () {
            console.log("* Request Get Current Orders : KO");
        }
    });
}
/*---------------------------------------------------------------*/


/*----------------Account Section----------------------------------*/
function display_account(content)
{
    $('#div_account_message').empty();
    var url = "http://"+pathToServer+"get_deliverer_account.php";
    //var res = get_deliverer_account(url, user_id);
    $.ajax({
        url : url,
        method: "post",
        data:{'user_id':user_id},
        dataType: "json",
        async: false,
        success: function (res) {
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
        },
        error: function () {
            console.log("* Request Get Deliverer Account : KO");
        }
    });
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

    if ((licence === 2) && (vehicule === '3' || vehicule === '4'))
    {
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
        var url = "http://"+pathToServer+"update_deliverer_account.php";
        //update_deliverer_account(url, user_id, phone_number, licence, str_vehicule);
        $.ajax({
            url : url,
            method: "post",
            data:{'user_id':user_id, 'phone' : phone_number, 'licence' : licence, 'vehicule' : str_vehicule},
            dataType: "json",
            success: function (data) {
                $.mobile.pageContainer.pagecontainer('change', '#home', {
                    transition: 'slideup'
                });
            },
            error: function () {
                console.log("* Request Update Deliverer Account : KO");
            }
        });

    }
}

/*---------------------------------------------------------------*/


function display_history(){
    $("#History_Orders_list").empty();
    $("#History_message").empty();
    user_id = localStorage.getItem('user_id');
    shop_id = user_id;
    var url = "http://"+pathToServer+"get_deliverer_history.php";
    //var res = get_deliverer_history(url, user_id);

    $.ajax({
        url : url,
        method: 'post',
        data: {'user_id': user_id},
        dataType: 'json',
        success: function (res) {
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
                }
            }

        },
        error: function () {
            json = {success: false, message: "* Request Get Deliverer History: KO"};
        }
    });
}

function display_history_order_instance(content) {
    user_id = localStorage.getItem('user_id');
    $("#history_order_products_ul").empty();
    shop_id = user_id;
    var transaction_id = content.value.id;

    var url = "http://"+pathToServer+"get_order_instance_informations.php";
    $('#order_instance_message').empty();
    //var res = get_order_instance_informations(url, user_id, transaction_id);

    $.ajax({
        url : url,
        method: "post",
        data:{'deliverer_id':user_id, 'transaction_id' : transaction_id},
        dataType: "json",
        success: function (res) {
            if (res.success)
            {

                $('#history_order_customer_name').html(res.customer[0].lastname+" "+res.customer[0].firstname);

                $("#history_order_shop_name").html(res.shop[0].shop_name);

                $("#history_order_status").html("Finished Transaction");

            }
        },
        error: function () {
            json = {success:false, message:"Request Get Current Orders : KO"};
        }
    });
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


