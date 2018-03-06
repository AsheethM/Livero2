//localStorage.setItem('server_ip', 'localhost/');
//localStorage.setItem('server_ip', '192.168.43.128/');
localStorage.setItem('server_ip', 'green.projectyogisha.com/');
localStorage.setItem('path', 'Shop/');
var user_id ;
var server_ip = localStorage.getItem('server_ip');
var path = localStorage.getItem('path');
var pathToServer = ""+ server_ip + path;
user_id = localStorage.getItem('user_id');

var page_section = ['myShop', 'settings', 'my_account', 'history', 'myOrders'];
var page_shops = ['myShop', 'myShop_Items', 'myShop_ItemInformation'];
var page_shops2 = ['myShop', 'myShop_Items', 'myShop_ItemAdd'];
var page_myShop =['myShop', 'myShop_Information', 'myShop_schedule'];
var page_orders_newest = ['myOrders', 'myOrders_Newest', 'myOrders_Newest_Instance'];
var page_orders_validated = ['myOrders','myOrders_Validated', 'myOrders_Validated_Instance'];
var page_history = ['history', 'history_Order_Instance'];

function log_off() {
    localStorage.clear();
    $('#panel_listview .ui-btn').addClass('ui-state-disabled');
    $.mobile.pageContainer.pagecontainer('change','#login', {transition : 'slideup'});
}

function onBackKeyDown() {
    var cur_page = $.mobile.activePage.attr("id");
    var pos = page_shops.indexOf(cur_page);
    var pos_bis = page_shops2.indexOf(cur_page);
    var pos1 = page_myShop.indexOf(cur_page);
    var pos2 = page_orders_newest.indexOf(cur_page);
    var pos3 = page_orders_validated.indexOf(cur_page);
    var pos4 = page_history.indexOf(cur_page);

    if (pos !== -1 && pos !== 0) {
        var prev_page = page_shops2[pos - 1];
        $.mobile.pageContainer.pagecontainer('change', '#' + prev_page, {
            content: localStorage.getItem('old_content'),
            transition: 'slideup'
        });
    }
    else if (pos_bis !== -1 && pos_bis !== 0) {
        var prev_page = page_shops2[pos_bis - 1];
        $.mobile.pageContainer.pagecontainer('change', '#' + prev_page, {
            content: localStorage.getItem('old_content'),
            transition: 'slideup'
        });
    }
    else if (pos1 !== -1 && pos1 !== 0) {
        var prev_page = page_myShop[pos1 - 1];
        $.mobile.pageContainer.pagecontainer('change', '#' + prev_page, {
            content: localStorage.getItem('old_content'),
            transition: 'slideup'
        });
    }
    else if (pos2 !== -1 && pos2 !== 0)
    {
        var prev_page = page_orders_newest[pos2 - 1];
        $.mobile.pageContainer.pagecontainer('change', '#' + prev_page, {
            content: localStorage.getItem('old_content'),
            transition: 'slideup'
        });
    }
    else if (pos3 !== -1 && pos3 !== 0)
    {
        var prev_page = page_orders_validated[pos3 - 1];
        $.mobile.pageContainer.pagecontainer('change', '#' + prev_page, {
            content: localStorage.getItem('old_content'),
            transition: 'slideup'
        });
    }
    else if (pos4 !== -1 && pos4 !== 0)
    {
        var prev_page = page_history[pos4 - 1];
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
    $( "body>[data-role='panel']" ).panel();
    $( "[data-role='header'], [data-role='footer']" ).toolbar({theme: "a"});
    $("#livero_toolbar").css('background-color', 'rgba(0, 150, 150, 0.5)');
}

function display_login() {
    $("#login_btn").off().click(function(){
        var url = "http://"+pathToServer+"login_normal.php";
        var email = $("#email").val();
        var password = $("#password").val();
        //var res = get_connection(url, email, password);
        $.ajax({
            url : url,
            type : 'POST',
            method: 'post',
            data: {'email': email, 'password' : password},
            dataType: 'json',
            success: function (res) {
                if (res.success)
                {
                    $('#panel_listview .ui-btn').removeClass('ui-state-disabled');
                    localStorage.setItem('user_id', res.results[0].user_id);
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
                    alert("Wrong Login or Password");
                }
            },
            error: function () {
                console.log("* Request Get Connection: KO");
            }
        });

    });
}

function display_account(){
    var url = "http://"+pathToServer+"get_account.php";
    //var res = get_account(url, user_id, user_id);
    $.ajax({
        url : url,
        method: "post",
        data:{'user_id' : user_id, 'shop_id' : user_id},
        dataType: "json",
        success: function (res) {
            console.log("USER ACCOUNT");
            if (res.success)
            {
                var user = res.results[0];
                $("#account_name").html(user.firstname+" "+user.lastname);
                $("#account_email").html(user.email);
                $("#account_birthdate").html(user.birthdate);
                //$("#account_phone").val(user.user_phone);
                $("#account_phone").html(user.user_phone);
            }
            else
            {
                console.log(res);
            }
        },
        error: function () {
            console.log("* Request Get Account : KO");
        }
    });
}

function display_myshop() {
}

function display_myshopInformation() {
    user_id = localStorage.getItem('user_id');
    $("#ul_shop_schedule").empty();
    var url = "http://"+pathToServer+"get_account.php";
    //var res = get_account(url, user_id, user_id);
    $.ajax({
        url : url,
        method: "post",
        data:{'user_id' : user_id, 'shop_id' : user_id},
        dataType: "json",
        success: function (res) {
            console.log("SHOP ACCOUNT");
            if (res.success)
            {
                var shop = res.results[0];
                $("#shop_name").html(shop.shop_name);
                $("#shop_address").html(shop.address);
                //$("#shop_phone").val(shop.shop_phone);
                $("#shop_phone").html(shop.shop_phone);

                $.ajax({
                    url : "http://"+pathToServer+"get_shop_schedule.php",
                    method: "post",
                    data:{'shop_id' : user_id},
                    dataType: "json",
                    success: function (res2) {
                        if (res2.success)
                        {
                            if (res2.isDays){
                                $.each(res2.results, function (index, value) {
                                    $("#ul_shop_schedule").append(
                                      $('<li>').html(value.shop_day+" "+value.opening_hour+" - "+value.closing_hour)
                                    )
                                });
                            }
                            else
                            {
                                $("#ul_shop_schedule").append(
                                    $('<li>').html("No Days for your shops")
                                );
                            }
                        }
                    },
                    error : function()
                    {
                        console.log("Erreur");
                    }
                });
            }
            else
            {
                console.log(res);
            }
        },
        error: function () {
            console.log("* Request Get Account : KO");
        }
    });
}

function display_myshopItems() {
    $("#myShop_ItemsList").empty();
    $("#myShop_ItemsMessage").empty();

    var url = "http://" + pathToServer +"get_products_with_shop_id.php";
    //var res = get_products_with_shop_id(url, user_id);
    $.ajax({
        url : url,
        method: "post",
        data:{"shop_id":user_id},
        dataType: "json",
        success: function (res) {
            console.log("ITEMS_LIST");
            if (res.success) {
                if (res.isProducts) {
                    $.each(res.results, function (index, value) {
                        $("#myShop_ItemsList").append(
                            $('<li>')
                                .append($('<a>')
                                    .attr('href','#')
                                    .attr('class','ui-btn ui-icon-carat-r ui-btn-icon-right')
                                    .append($('<img>').attr('src',''))
                                    .append($('<h3>').append(value.product_name))
                                    .off().click(function () {
                                        var content = {value : value};
                                        $.mobile.pageContainer.pagecontainer('change','#myShop_ItemInformation', {content : content , transition : 'slideup'});
                                    })));

                    });
                }
                else
                {
                    $("#myShop_ItemsMessage").html("No Product for this Shop");
                }
            }
            else
            {
                console.log(res);
            }
        },
        error: function () {
            console.log("* Request Get Products  : KO");
        }
    });
}

function display_myshopItemInformation(content) {
    var product = content.value;
    $("#item_product_name").val(product.product_name);
    $("#item_product_price").val(product.price);
    $("#item_product_description").val(product.description);

    $("#item_update_btn").off().click(function () {
        var url = "http://"+pathToServer+"update_product.php";
        var product_name = $("#item_product_name").val();
        var price = $("#item_product_price").val();
        var description = $("#item_product_description").val();
        //var res = update_product(url,user_id, product.id, product_name, price, description);
        $.ajax({
            url : url,
            method: "post",
            data: {'id_shop': user_id, 'product_id': product.id, 'product_name' : product_name, 'product_price' : price,
                'product_description' : description},
            dataType: "json",
            success: function (data) {
                json = data;
            },
            error: function () {
                console.log("* Request Update Product: KO");
            }
        });
    });

    $("#item_delete_btn").off().click(function () {
        var url = "http://"+pathToServer+"delete_product.php";
        //var res = delete_product(url, user_id, product.id);
        $.ajax({
            url : url,
            method: "post",
            data: {'id_shop': user_id, 'product_id': product.id},
            dataType: "json",
            async: false,
            success: function (res) {
                if (res.success)
                {
                    $.mobile.pageContainer.pagecontainer('change','#myShop_Items', {transition : 'slideup'});
                }
            },
            error: function () {
                console.log("* Request Delete Product: KO");
            }
        });
    });

}

function display_myshopAddItem() {
    user_id = localStorage.getItem('user_id');
    shop_id = user_id;
    $("#item_add_product_name").val('');
    $("#item_add_product_price").val('');
    $("#item_add_product_description").val('');
    $("#item_add_btn").off().click(function () {
        var product_name = $("#item_add_product_name").val();
        var product_price = $("#item_add_product_price").val();
        var product_description = $("#item_add_product_description").val();

        var url = "http://"+pathToServer+"add_product.php";
        //var res = add_product(url, user_id, product_name, product_price, product_description);
        $.ajax({
            url : url,
            method: "post",
            data: {'id_shop': user_id, 'product_name' : product_name, 'product_price' : product_price,
                'product_description' : product_description},
            dataType: "json",
            success: function (res) {
                console.log("ADD_PRODUCT_BTN");
                if (res.success)
                {
                    $.mobile.pageContainer.pagecontainer('change','#myShop_Items', {transition : 'slideup'});
                }
            },
            error: function () {
                console.log("* Request Add Product: KO");
            }
        });
    });
}

function display_history(){
    $("#History_Orders_list").empty();
    $("#History_message").empty();
    user_id = localStorage.getItem('user_id');
    shop_id = user_id;
    var url = "http://"+pathToServer+"get_shop_history.php";
    //var res = get_shop_history(url, user_id);
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
                    $("#History_message").html("You don't have any finished transactions")
            }
            else
                console.log(res);
        },
        error: function () {
            console.log("* Request Get Shop History: KO");
        }
    });
}

function display_history_order_instance(content) {
    user_id = localStorage.getItem('user_id');
    $("#history_order_products_ul").empty();
    shop_id = user_id;
    var transaction_id = content.value.id;
    var url1 = "http://"+pathToServer+"get_informations_about_transaction_with_id.php";
    var url2 = "http://"+pathToServer+"get_transaction_products_with_transaction_id.php";
    //var res1 = get_informations_about_transaction_with_id(url1, transaction_id, user_id);
    //var res2 = get_transaction_products_with_transaction_id_and_shop_id(url2,transaction_id, user_id);

    $.ajax({
        url : url1,
        method: "post",
        data: {'shop_id': user_id, 'transaction_id' : transaction_id},
        dataType: "json",
        success: function (res1) {
            $.ajax({
                url : url2,
                method: "post",
                data: {'shop_id': user_id, 'transaction_id' : transaction_id},
                dataType: "json",
                success: function (res2) {
                    if (res1.success && res2.success) {
                        var url3 = "http://" +pathToServer+"get_information_with_id.php";
                        //var customer = get_information_with_id(url3, res1.results[0].customer_id);

                        $.ajax({
                            url : url3,
                            method: 'post',
                            data: {'user_id': res1.results[0].customer_id},
                            dataType: 'json',
                            success: function (customer) {
                                $("#history_order_customer_name").html(customer.results[0].lastname + " " + customer.results[0].firstname);
                                if (res1.results[0].deliverer_id == null) {
                                    $("#history_order_deliverer_name").html("No Deliverer Selected Yet");
                                }
                                else {
                                    //var deliverer = get_information_with_id(url3, res1.results[0].deliverer_id);
                                    $.ajax({
                                        url : url3,
                                        method: 'post',
                                        data: {'user_id': res1.results[0].deliverer_id},
                                        dataType: 'json',
                                        success: function (deliverer) {
                                            $("#history_order_deliverer_name").html(deliverer.results[0].lastname + " " + deliverer.results[0].firstname);
                                        },
                                        error: function () {
                                            console.log("* Request Get Information User: KO");
                                        }
                                    })
                                }

                                $("#history_order_status").html("Finished Transaction");

                                $.each(res2.results, function (index, value) {
                                    $("#history_order_products_ul").append(
                                        $('<li>').append(
                                            $('<div>')
                                                .attr('class', 'ui-corner-all custom-corners')
                                                .append($('<div>')
                                                    .attr('class', 'ui-bar ui-bar-a')
                                                    .append($('<h3>').html("Product n°" + (index + 1)))
                                                )
                                                .append($('<div>')
                                                    .attr('class', 'ui-body ui-body-a')
                                                    .append($('<p>').html("Product Name: " + value.product_name))
                                                    .append($('<p>').html("Quantity: " + value.shop_quantity))
                                                )
                                        ))
                                });
                                },
                            error: function () {
                                console.log("* Request Get Information User: KO");
                            }
                        })
                    }
                },
                error: function () {
                    console.log("* Request Get Transaction_Products: KO");
                }
            })
        },
        error: function () {
            console.log("* Request Get Transaction With ID: KO");
        }
    });
}

function display_myordersNewest() {
    $("#myOrders_Newest_message").empty();
    $("#NewestOrders_list").empty();

    user_id = localStorage.getItem('user_id');
    shop_id = user_id;
    var url = "http://"+pathToServer+"get_transactions_with_shop_id.php";
    //var res = get_transactions_with_shop_id(url, user_id);
    $.ajax({
        url : url,
        method: "post",
        data: {'shop_id': user_id},
        dataType: "json",
        success: function (res) {
            console.log(res);
            if (res.success)
            {
                if (res.isTransactions) {
                    var isOrder = false;
                    $.each(res.results, function (index, value) {
                        var order = value;
                        if (order.status == 1)
                        {
                            isOrder = true;
                            $('#NewestOrders_list').append(
                                $('<li>').append(
                                    $('<a>').attr('href','#')
                                        .attr('class','ui-btn ui-icon-carat-r ui-btn-icon-right')
                                        .append($('<h3>').append("Order n°"+(index + 1)))
                                        .off().click(function () {
                                        var content = {value : value};
                                        $.mobile.pageContainer.pagecontainer('change','#myOrders_Newest_Instance', {content : content , transition : 'slideup'});
                                    }))
                            );
                        }
                    });
                    if (!isOrder)
                    {
                        $("#myOrders_Newest_message").html("No orders have come");
                    }
                }
                else
                {
                    $("#myOrders_Newest_message").html("No orders have come");
                }
            }
            else
                console.log(res);
        },
        error: function () {
            console.log("* Request Get Transactions: KO");
        }
    });
}

function display_myordersNewestInstance(content) {
    $("#myOrders_Newest_Instance_message").empty();
    user_id = localStorage.getItem('user_id');
    shop_id = user_id;
    var transaction_id = content.value.id;
    $("#newest_order_products_ul").empty();
    var url1 = "http://"+pathToServer+"get_informations_about_transaction_with_id.php";
    var url2 = "http://"+pathToServer+"get_transaction_products_with_transaction_id.php";
    //var res1 = get_informations_about_transaction_with_id(url1, transaction_id, user_id);

    $.ajax({
        url: url1,
        method: "post",
        data: {'shop_id': user_id, 'transaction_id': transaction_id},
        dataType: "json",

        success: function (res1) {
            //var res2 = get_transaction_products_with_transaction_id_and_shop_id(url2,transaction_id, user_id);
            console.log(res1);
            $.ajax({
                url : url2,
                method: "post",
                data: {'shop_id': user_id, 'transaction_id' : transaction_id},
                dataType: "json",

                success: function (res2) {
                    console.log(res2);
                    if (res1.success && res2.success)
                    {
                        var url3 = "http://"+pathToServer+"get_information_with_id.php";

                        //var customer = get_information_with_id(url3,res1.results[0].customer_id);

                        $.ajax({
                            url : url3,
                            method: 'post',
                            data: {'user_id': res1.results[0].customer_id},
                            dataType: 'json',

                            success: function (customer) {
                                $("#newest_order_customer_name").html(customer.results[0].lastname+" "+customer.results[0].firstname);
                                },
                            error: function () {
                                $("#newest_order_customer_name").html("");
                                console.log("* Request Get Information User: KO");
                            }
                        });

                        $.each(res2.results, function (index, value) {
                            $("#newest_order_products_ul")
                                .append($('<li>')
                                    .append($('<div>')
                                        .attr('class', 'ui-corner-all custom-corners')
                                        .append($('<div>')
                                            .attr('class', 'ui-bar ui-bar-a')
                                            .append($('<h3>').html("Item n°"+(index+1)))
                                        )
                                        .append($('<div>')
                                            .attr('class', 'ui-body ui-body-a')
                                            .append($('<p>').html("Product Name: "+value.product_name))
                                            .append($('<span>')
                                                //.attr('hidden', 'hidden')
                                                .html(value.price)
                                                .attr('id',"test_"+value.product_id))
                                            .append($("<p>")
                                                .append($('<span>').html("User Quantity: "))
                                                .append($('<span>')
                                                    .attr('id', 'span_'+value.product_id)
                                                    .html(value.customer_quantity))
                                            )
                                            .append($("<p>")
                                                .append($('<span>').html("Shop Quantity:"))
                                                .append($('<input>')
                                                    .attr('type', 'number')
                                                    .attr('data-mini', 'true')
                                                    .attr('id', value.product_id)
                                                    .val(value.shop_quantity)
                                                )

                                            )

                                        )
                                    )
                                )
                        });


                        $("#myOrders_Newest_Instance_validation_btn").off().click(function () {
                            $("#myOrders_Newest_Instance_message").empty();
                            var error = false;
                            var same = 1;
                            var total_price = 0;
                            $.each($("#newest_order_products_ul li") , function (index, value) {
                                var input = $(this).find('input');
                                var shop_quantity = parseInt(input.val());
                                var product_id = input.attr('id');
                                var user_quantity = parseInt($('#span_'+product_id).html());
                                var product_price = parseInt($('#test_'+product_id).html());
                                console.log(product_price);
                                if (shop_quantity > user_quantity)
                                {
                                    shop_quantity = user_quantity;
                                }
                                if (shop_quantity !== user_quantity)
                                    same = 2;

                                total_price += shop_quantity * product_price;

                                var url = "http://"+pathToServer+"update_shop_quantity_on_transaction_with_product_id.php";
                                update_shop_quantity_on_transaction_with_product_id(url,transaction_id, product_id, shop_quantity, user_id);
                            });

                            var url = "http://"+pathToServer+"vendor_transaction_confirmation.php";
                            vendor_transaction_confirmation(url, user_id, transaction_id, same, total_price);

                            var min = 1;
                            setTimeout(function(){

                                $.ajax({
                                    url : "http://"+pathToServer+"update_deliverer_in_transaction.php",
                                    method: 'post',
                                    data: {'shop_id': user_id, 'transaction_id' : transaction_id},
                                    dataType: 'json',

                                    success: function (customer) {
                                        console.log("Requete réusssi");
                                    },
                                    error: function () {
                                        console.log("* Request Update Deliverer: KO");
                                    }
                                });
                            }, (min * 60 * 1000));

                            $.mobile.pageContainer.pagecontainer('change','#home', {content : content , transition : 'slideup'});
                        });

                    }
                },
                error: function () {
                    console.log("* Request Get Transaction_Products: KO");
                }
            });
        },
        error: function () {
            console.log("* Request Get Transaction With ID: KO");
        }
    });


}

function display_myordersValidated() {
    $("#ValidatedOrders_list").empty();
    $("#myOrders_Validated_message").empty();

    user_id = localStorage.getItem('user_id');
    shop_id = user_id;
    var url = "http://"+pathToServer+"get_transactions_with_shop_id.php";
    //var res = get_transactions_with_shop_id(url, user_id);

    $.ajax({
        url : url,
        method: "post",
        data: {'shop_id': user_id},
        dataType: "json",
        success: function (res) {
            if (res.success)
            {
                if (res.isTransactions) {
                    $.each(res.results, function (index, value) {
                        var order = value;
                        if (order.status >= 2 && order.status <= 5)
                        {
                            $('#ValidatedOrders_list').append(
                                $('<li>').append(
                                    $('<a>').attr('href','#')
                                        .attr('class','ui-btn ui-icon-carat-r ui-btn-icon-right')
                                        .append($('<h3>').append("Order n°"+(index + 1)))
                                        .off().click(function () {
                                        var content = {value : order};
                                        $.mobile.pageContainer.pagecontainer('change','#myOrders_Validated_Instance', {content : content , transition : 'slideup'});
                                    }))
                            );
                        }
                    });
                }
                else
                {
                    $("#myOrders_Validated_message").html("You don't have validated orders");
                }
            }
        },
        error: function () {
            console.log("* Request Get Transactions: KO");
        }
    });
}

function display_myordersValidatedInstance(content) {
    user_id = localStorage.getItem('user_id');
    $("#validated_order_products_div").empty();
    shop_id = user_id;
    var transaction_id = content.value.id;
    var url1 = "http://"+pathToServer+"get_informations_about_transaction_with_id.php";
    var url2 = "http://"+pathToServer+"get_transaction_products_with_transaction_id.php";
    //var res1 = get_informations_about_transaction_with_id(url1, transaction_id, user_id);

    $.ajax({
        url : url1,
        method: "post",
        data: {'shop_id': user_id, 'transaction_id' : transaction_id},
        dataType: "json",
        success: function (res1) {
            //var res2 = get_transaction_products_with_transaction_id_and_shop_id(url2,transaction_id, user_id);

            $.ajax({
                url : url2,
                method: "post",
                data: {'shop_id': shop_id, 'transaction_id' : transaction_id},
                dataType: "json",
                success: function (res2) {
                    if (res1.success && res2.success) {
                        var url3 = "http://" + pathToServer +"get_information_with_id.php";
                        //var customer = get_information_with_id(url3, res1.results[0].customer_id);

                        $.ajax({
                            url : url3,
                            method: 'post',
                            data: {'user_id': res1.results[0].customer_id},
                            dataType: 'json',

                            success: function (customer) {
                                $("#validated_order_customer_name").html(customer.results[0].lastname + " " + customer.results[0].firstname);
                            },
                            error: function () {
                                console.log("* Request Get Information User: KO");
                            }
                        });

                        if (res1.results[0].deliverer_id == null) {
                            $("#validated_order_deliverer_name").html("No Deliverer Selected Yet");
                        }
                        else {
                            //var deliverer = get_information_with_id(url3, res1.results[0].deliverer_id);
                            $.ajax({
                                url : url3,
                                method: 'post',
                                data: {'user_id': res1.results[0].deliverer_id},
                                dataType: 'json',

                                success: function (deliverer) {
                                    $("#validated_order_deliverer_name").html(deliverer.results[0].lastname + " " + deliverer.results[0].firstname);
                                },
                                error: function () {
                                    console.log("* Request Get Information User: KO");
                                }
                            });

                        }

                        if (res1.results[0].status == 2) {
                            $("#validated_order_status").html("Waiting for a Deliverer");
                        }
                        else if (res1.results[0].status == 3) {
                            $("#validated_order_status").html("Waiting for Customer Confirmation");
                        }
                        else if (res1.results[0].status == 4) {
                            $("#validated_order_status").html("Waiting for Deliverer to take the order in the shop");
                        }
                        else if (res1.results[0].status == 5) {
                            $("#validated_order_status").html("Waiting for Deliverer to give order to Customer");
                        }

                        $.each(res2.results, function (index, value) {
                            $("#validated_order_products_div").append(
                                $('<div>')
                                    .attr('class', 'ui-corner-all custom-corners')
                                    .append($('<div>')
                                        .attr('class', 'ui-bar ui-bar-a')
                                        .append($('<h3>').html("Product n°"+(index+1)))
                                    )
                                    .append($('<div>')
                                        .attr('class', 'ui-body ui-body-a')
                                        .append($('<p>').html("Product Name: "+value.product_name))
                                        .append($('<p>').html("Quantity: "+value.shop_quantity))
                                    )
                            )

                        });

                        var url4 = "http://"+pathToServer+"get_shop_token.php";
                        //var shop_qrcode = get_shop_qrcode(url4, transaction_id, user_id);

                        $.ajax({
                            url : url4,
                            method: 'post',
                            data: {'transaction_id' : transaction_id, 'shop_id' : user_id},
                            dataType: 'json',
                            success: function (shop_qrcode) {
                                var token = shop_qrcode.results[0].shop_token;
                                var shop_qrcode_img =  '<img src="https://api.qrserver.com/v1/create-qr-code/?data='+token+'&amp;size=100x100" alt="" title="" />';
                                $('#validated_shop_qrcode').html(shop_qrcode_img);
                            },
                            error: function () {
                                console.log("Request Get Shop Token: KO");
                            }
                        });

                    }
                },
                error: function () {
                    json = {success:false, message:"* Request Get Transaction_Products: KO"};
                }
            });
        },
        error: function () {
            console.log("* Request Get Transaction With ID: KO");
        }
    });
}

function display_myshopSchedule() {
    $("#myShop_schedule_error").empty();
    var days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    $("#myShop_schedule_update").off().click(function () {
        $("#myShop_schedule_error").empty();
        var opening_time = $('#myShop_schedule_opening_time').val();
        var closing_time = $('#myShop_schedule_closing_time').val();
        var choosen_day = days[$("#myShop_schedule_select").val() - 1];

        if (closing_time < opening_time)
        {
            $("#myShop_schedule_error").html("Error on opening and closing hours");
        }
        else
        {
            $.ajax({
                    url: "http://"+pathToServer+"add_shop_schedule.php",
                    method: "post",
                    data: {'shop_id': user_id, 'opening_hour' : opening_time,
                        'closing_hour' : closing_time, 'day' : choosen_day},
                    dataType: "json",
                    success : function (res) {
                        $.mobile.pageContainer.pagecontainer('change','#myShop_Information', {transition : 'slideup'});
                    },
                    error : function () {
                        console.log("Erreur");
                    }
                });
        }
    });

}



$(document).on('pagecontainerbeforechange', function (event, ui) {
    var content = ui.options.content;

    if (ui.toPage[0].id === 'login')
    {
        display_login();
    }
    else if (ui.toPage[0].id === 'registration')
    {
        display_register();
    }
    else if (ui.toPage[0].id === 'home')
    {
        display_home();
    }
    else if (ui.toPage[0].id === 'myShop')
    {
    }
    else if (ui.toPage[0].id === 'myShop_Information')
    {
        display_myshopInformation();
    }
    else if (ui.toPage[0].id === 'myShop_Items')
    {
        display_myshopItems();
    }
    else if (ui.toPage[0].id === 'myShop_ItemInformation')
    {
        display_myshopItemInformation(content);
    }
    else if (ui.toPage[0].id === 'myShop_schedule')
    {
        display_myshopSchedule();
    }
    else if (ui.toPage[0].id === 'myShop_ItemAdd')
    {
        display_myshopAddItem();
    }
    else if (ui.toPage[0].id === 'myOrders')
    {
    }
    else if (ui.toPage[0].id === 'myOrders_Newest')
    {
        display_myordersNewest();
    }
    else if (ui.toPage[0].id === 'myOrders_Newest_Instance')
    {
        display_myordersNewestInstance(content);
    }
    else if (ui.toPage[0].id === 'myOrders_Validated')
    {
        display_myordersValidated();
    }
    else if (ui.toPage[0].id === 'myOrders_Validated_Instance')
    {
        display_myordersValidatedInstance(content);
    }
    else if (ui.toPage[0].id === 'my_account')
    {
        display_account();
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