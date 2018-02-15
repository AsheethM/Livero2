server_ip = localStorage.getItem('server_ip');
user_id = localStorage.getItem('user_id');
function onBackKeyDown() {
    go_back();
}


function display_home() {
    user_id = localStorage.getItem("user_id");
    $( "body>[data-role='panel']" ).panel();
    $( "[data-role='header'], [data-role='footer']" ).toolbar({theme: "a"});
    $("#livero_toolbar").css('background-color', 'rgba(0, 150, 150, 0.5)');
}

function display_login() {
    $("#login_btn").off().click(function(){
        var url = "http://"+server_ip+"/SRC/Backend/Shop/login_normal.php";
        var email = $("#email").val();
        var password = $("#password").val();
        var res = get_connection(url, email, password);
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
}

function display_account(){
    user_id = localStorage.getItem('user_id');
    var url = "http://"+server_ip+"/SRC/Backend/Shop/get_account.php";
    var res = get_account(url, user_id, user_id);
    console.log("USER ACCOUNT");
    console.log(user_id);
    console.log(server_ip);
    console.log(res);
    console.log("/USER ACCOUNT");
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
}

function display_myshop() {
}

function display_myshopInformation() {
    user_id = localStorage.getItem('user_id');
    var url = "http://"+server_ip+"/SRC/Backend/Shop/get_account.php";
    var res = get_account(url, user_id, user_id);
    console.log("SHOP ACCOUNT");
    console.log(res);
    console.log("/SHOP ACCOUNT");
    if (res.success)
    {
        var shop = res.results[0];
        $("#shop_name").html(shop.shop_name);
        $("#shop_address").html(shop.address);
        //$("#shop_phone").val(shop.shop_phone);
        $("#shop_phone").html(shop.shop_phone);
    }
    else
    {
        console.log(res);
    }
}

function display_myshopItems() {
    $("#myShop_ItemsList").empty();
    $("#myShop_ItemsMessage").empty();

    var url = "http://" + server_ip + "/SRC/Backend/Shop/get_products_with_shop_id.php";
    var res = get_products_with_shop_id(url, user_id);

    console.log("ITEMS_LIST");
    console.log(res);
    console.log("/ITEMS_LIST");

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
}

function display_myshopItemInformation(content)
{
    var product = content.value;
    $("#item_product_name").val(product.product_name);
    $("#item_product_price").val(product.price);
    $("#item_product_description").val(product.description);

    $("#item_update_btn").off().click(function () {
        var url = "http://"+server_ip+"/SRC/Backend/Shop/update_product.php";
        var product_name = $("#item_product_name").val();
        var price = $("#item_product_price").val();
        var description = $("#item_product_description").val();
        var res = update_product(url,user_id, product.id, product_name, price, description);
    });

    $("#item_delete_btn").off().click(function () {
        var url = "http://"+server_ip+"/SRC/Backend/Shop/delete_product.php";
        var res = delete_product(url, user_id, product.id);
        if (res.success)
        {
            $.mobile.pageContainer.pagecontainer('change','#myShop_Items', {transition : 'slideup'});
        }
    });

}

function display_myshopAddItem()
{
    user_id = localStorage.getItem('user_id');
    shop_id = user_id;
    $("#item_add_product_name").val('');
    $("#item_add_product_price").val('');
    $("#item_add_product_description").val('');
    $("#item_add_btn").off().click(function () {
        var product_name = $("#item_add_product_name").val();
        var product_price = $("#item_add_product_price").val();
        var product_description = $("#item_add_product_description").val();

        var url = "http://"+server_ip+"/SRC/Backend/Shop/add_product.php";
        var res = add_product(url, user_id, product_name, product_price, product_description);
        console.log("ADD_PRODUCT_BTN");
        console.log(res);
        console.log("/ADD_PRODUCT_BTN");
        if (res.success)
        {
            $.mobile.pageContainer.pagecontainer('change','#myShop_Items', {transition : 'slideup'});
        }
    });
}

function display_history(){
    $("#History_Orders_list").empty();
    $("#History_message").empty();
    user_id = localStorage.getItem('user_id');
    shop_id = user_id;
    var url = "http://"+server_ip+"/SRC/Backend/Shop/get_shop_history.php";
    var res = get_shop_history(url, user_id);
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
}

function display_history_order_instance(content) {
    user_id = localStorage.getItem('user_id');
    $("#history_order_products_ul").empty();
    shop_id = user_id;
    var transaction_id = content.value.id;
    var url1 = "http://"+server_ip+"/SRC/Backend/Shop/get_informations_about_transaction_with_id.php";
    var url2 = "http://"+server_ip+"/SRC/Backend/Shop/get_transaction_products_with_transaction_id.php";
    var res1 = get_informations_about_transaction_with_id(url1, transaction_id, user_id);
    var res2 = get_transaction_products_with_transaction_id_and_shop_id(url2,transaction_id, user_id);

    console.log("VALIDATED ORDER INSTANCE");
    console.log(transaction_id);
    console.log(res1);
    console.log(res2);
    console.log("/VALIDATED ORDER INSTANCE");

    if (res1.success && res2.success) {
        var url3 = "http://" + server_ip + "/SRC/Backend/Customer/get_information_with_id.php";
        var customer = get_information_with_id(url3, res1.results[0].customer_id);
        console.log("ORDER_CUSTOMER_INFORMATION");
        console.log(customer);
        console.log("/ORDER_CUSTOMER_INFORMATION");

        $("#history_order_customer_name").html(customer.results[0].lastname + " " + customer.results[0].firstname);

        if (res1.results[0].deliverer_id == null) {
            $("#history_order_deliverer_name").html("No Deliverer Selected Yet");
        }
        else {
            var deliverer = get_information_with_id(url3, res1.results[0].deliverer_id);
            console.log("ORDER_DELIVERER_INFORMATION");
            console.log(customer);
            console.log("/ORDER_DELIVERER_INFORMATION");
            $("#history_order_deliverer_name").html(deliverer.results[0].lastname + " " + deliverer.results[0].firstname);
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
    }
}

function display_myordersNewest() {
    $("#myOrders_Newest_message").empty();
    $("#NewestOrders_list").empty();

    user_id = localStorage.getItem('user_id');
    shop_id = user_id;
    var url = "http://"+server_ip+"/SRC/Backend/Shop/get_transactions_with_shop_id.php";
    var res = get_transactions_with_shop_id(url, user_id);
    console.log("NEWEST ORDERS");
    console.log(res);
    console.log("/NEWEST ORDERS");

    if (res.success)
    {
        if (res.isTransactions) {
            $.each(res.results, function (index, value) {
               var order = value;
                if (order.status == 1)
                {
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
        }
        else
        {
            $("#myOrders_Newest_message").html("No orders have come");
        }
    }
}

function display_myordersNewestInstance(content)
{
    $("#myOrders_Newest_Instance_message").empty();
    user_id = localStorage.getItem('user_id');
    shop_id = user_id;
    var transaction_id = content.value.id;
    var url1 = "http://"+server_ip+"/SRC/Backend/Shop/get_informations_about_transaction_with_id.php";
    var url2 = "http://"+server_ip+"/SRC/Backend/Shop/get_transaction_products_with_transaction_id.php";
    var res1 = get_informations_about_transaction_with_id(url1, transaction_id, user_id);
    var res2 = get_transaction_products_with_transaction_id_and_shop_id(url2,transaction_id, user_id);

    console.log("NEWEST ORDER INSTANCE");
    console.log(transaction_id);
    console.log(res1);
    console.log(res2);
    console.log("/NEWEST ORDER INSTANCE");

    if (res1.success && res2.success)
    {
        var url3 = "http://"+server_ip+"/SRC/Backend/Customer/get_information_with_id.php";
        alert("TEST");
        var customer = get_information_with_id(url3,res1.results[0].customer_id);
        console.log("ORDER_CUSTOMER_INFORMATION");
        console.log(customer);
        console.log("/ORDER_CUSTOMER_INFORMATION");

        $("#newest_order_customer_name").html(customer.results[0].lastname+" "+customer.results[0].firstname);

        $.each(res2.results, function (index, value) {
            console.log("HELLO");
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
            var same = true;
            $.each($("#newest_order_products_ul li") , function (index, value) {
                var input = $(this).find('input');
                var shop_quantity = parseInt(input.val());
                var product_id = input.attr('id');
                var user_quantity = parseInt($('#span_'+product_id).html());
                if (shop_quantity > user_quantity)
                {
                    shop_quantity = user_quantity;
                }
                if (shop_quantity !== user_quantity)
                    same = false;

                var url = "http://"+server_ip+"/SRC/Backend/Shop/update_shop_quantity_on_transaction_with_product_id.php";
                update_shop_quantity_on_transaction_with_product_id(url,transaction_id, product_id, shop_quantity, user_id);
            });

            var url = "http://"+server_ip+"/SRC/Backend/Shop/vendor_transaction_confirmation.php";
            var res = vendor_transaction_confirmation(url, user_id, transaction_id);
            console.log("TRANSACTION_CONFIRMATION_UPDATE");
            console.log(res);
            console.log("/TRANSACTION_CONFIRMATION_UPDATE");
        });

    }


}

function display_myordersValidated()
{
    $("#ValidatedOrders_list").empty();
    $("#myOrders_Validated_message").empty();

    user_id = localStorage.getItem('user_id');
    shop_id = user_id;
    var url = "http://"+server_ip+"/SRC/Backend/Shop/get_transactions_with_shop_id.php";
    var res = get_transactions_with_shop_id(url, user_id);
    console.log("VALIDATED ORDERS");
    console.log(res);
    console.log("/VALIDATED ORDERS");

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
}

function display_myordersValidatedInstance(content)
{
    user_id = localStorage.getItem('user_id');
    $("#validated_order_products_div").empty();
    shop_id = user_id;
    var transaction_id = content.value.id;
    var url1 = "http://"+server_ip+"/SRC/Backend/Shop/get_informations_about_transaction_with_id.php";
    var url2 = "http://"+server_ip+"/SRC/Backend/Shop/get_transaction_products_with_transaction_id.php";
    var res1 = get_informations_about_transaction_with_id(url1, transaction_id, user_id);
    var res2 = get_transaction_products_with_transaction_id_and_shop_id(url2,transaction_id, user_id);

    console.log("VALIDATED ORDER INSTANCE");
    console.log(transaction_id);
    console.log(res1);
    console.log(res2);
    console.log("/VALIDATED ORDER INSTANCE");

    if (res1.success && res2.success) {
        var url3 = "http://" + server_ip + "/SRC/Backend/Customer/get_information_with_id.php";
        var customer = get_information_with_id(url3, res1.results[0].customer_id);
        console.log("ORDER_CUSTOMER_INFORMATION");
        console.log(customer);
        console.log("/ORDER_CUSTOMER_INFORMATION");

        $("#validated_order_customer_name").html(customer.results[0].lastname + " " + customer.results[0].firstname);

        if (res1.results[0].deliverer_id == null) {
            $("#validated_order_deliverer_name").html("No Deliverer Selected Yet");
        }
        else {
            var deliverer = get_information_with_id(url3, res1.results[0].deliverer_id);
            console.log("ORDER_DELIVERER_INFORMATION");
            console.log(customer);
            console.log("/ORDER_DELIVERER_INFORMATION");
            $("#validated_order_deliverer_name").html(deliverer.results[0].lastname + " " + deliverer.results[0].firstname);
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

        var url4 = "http://"+server_ip+"/SRC/Backend/Shop/get_shop_token.php";
        var shop_qrcode = get_shop_qrcode(url4, transaction_id, user_id);

        console.log("ORDER_SHOP_TOKEN");
        console.log(shop_qrcode);
        console.log("/ORDER_SHOP_TOKEN");

        $('#validated_shop_qrcode').html(shop_qrcode);
    }
}

function display_settings() {

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