var server_ip = "localhost/PRI/";
var user_id = 1;

/*-----------------------------------------------------------------------------------------------------------*/
function dashboard_load() {

    var url = "http://"+server_ip+"SRC/Backend/Transaction/Shop/get_transactions_with_shop_id.php";
    var res = get_transactions_with_shop_id(url, user_id);

    console.log(res.message);
    if (res.success)
    {
        console.log(res.results);
        if (res.isTransactions)
        {
            $.each(res.results, function (index, value) {
                if (value.status == 1)
                {
                    $("#shops_orders_newest").append(
                        $("<li>").append(
                            $("<a>").attr('id', "order_"+value.id)
                                .html("Order "+(index + 1))
                        )
                    );

                    $("#order_"+value.id).click(function () {
                        localStorage.setItem("order_id", value.id);
                        location.href="Order/checkout.html"
                    });
                }
                else if (value.status >= 2 && value.status < 6)
                {
                    $("#shops_orders_validated").append(
                        $("<li>").append(
                            $("<a>").attr('id', "order_"+value.id)
                                .html("Order "+(index + 1))
                        )
                    );

                    $("#order_"+value.id).click(function () {
                        localStorage.setItem("order_id", value.id);
                        location.href="Order/information.html"
                    });
                }
                else if (value.status == 6)
                {
                    $("#shops_orders_finalized").append(
                        $("<li>").append(
                            $("<a>").attr('id', "order_"+value.id)
                                .html("Order "+(index + 1))
                        )
                    );

                    $("#order_"+value.id).click(function () {
                        localStorage.setItem("order_id", value.id);
                        location.href="Order/information.html"
                    });
                }


            });

        }

    }

    $('#gotoAccount').click(function () {
        location.href= "Account/information.html";
    });

    $('#gotoLogout').click(function () {
        location.href = "Account/logout.html";
    });

    $("#gotoMyShopInfos").click(function () {
        location.href = "Items/myshop.html";
    });

    $("#gotoMyShopItems").click(function () {
        location.href = "Items/items.html";
    });

    $("#gotoMyShopAddItem").click(function () {
       location.href="Items/checkout.html";
    });



}

/*-----------------------------------------------------------------------------------------------------------*/

function order_checkout_load()
{
    var transaction_id = localStorage.getItem('order_id');
    var url1 = "http://"+server_ip+"SRC/Backend/Transaction/Shop/get_informations_about_transaction_with_id.php";
    var url2 = "http://"+server_ip+"SRC/Backend/Transaction/Shop/get_transaction_products_with_transaction_id.php";
    var res1 = get_informations_about_transaction_with_id(url1, transaction_id, user_id);
    var res2 = get_transaction_products_with_transaction_id_and_shop_id(url2,transaction_id, user_id);

    if (res1.success && res2.success)
    {
        $.each(res2.results, function (index, value) {
            //  console.log(value);
            $("#order_checkout_tbody").append(
                $('<tr>').attr('id', "tr_"+value.transaction_id+"_"+value.product_id)
                    .append($('<td>').append((index +1)))
                    .append($('<td>').append(value.product_name))
                    .append($('<td>').append(value.customer_quantity))
                    .append($('<td>')
                        .append($('<button>').attr('id', 'minus_'+value.product_id).attr('class', 'entry value-minus').html("-").css("background","black"))
                        .append($('<div>').attr('id', 'value_'+value.product_id).attr('class', 'entry value').html(value.shop_quantity))
                        .append($('<button>').attr('id', 'plus_'+value.product_id).attr('class', 'entry value-plus active').html("+").css("background","black")))
                    .append($('<td>').attr('id', 'price_'+value.product_id).append((value.price * value.shop_quantity)+"€"))
            );

            $('#minus_'+value.product_id).click(function () {
                var val = parseInt($('#value_'+value.product_id).html(), 10) - 1;
                if (val < 0)
                    val = 0;
                $("#value_"+value.product_id).html(val);
                $("#price_"+value.product_id).html((val * value.price)+"€");
            });

            $('#plus_'+value.product_id).click(function () {
                var val = parseInt($('#value_'+value.product_id).html(), 10) + 1;
                if (val > value.customer_quantity)
                    val = value.customer_quantity;
                $("#value_"+value.product_id).html(val);
                $("#price_"+value.product_id).html((val * value.price)+"€");
            });
        });
    }

    $("#shop_confirmation_button").click(function () {
        var transaction_id = "";
        $('#order_checkout_tbody > tr').each(function(index, value) {
            var tr_id = $(this).attr('id');
            transaction_id = tr_id.split('_')[1];
            var product_id = tr_id.split("_")[2];
            var quantity = parseInt($("#value_"+product_id).html(), 10);

            var url = "http://"+server_ip+"SRC/Backend/Transaction/Shop/update_shop_quantity_on_transaction_with_product_id.php";
            update_shop_quantity_on_transaction_with_product_id(url,transaction_id, product_id, quantity, user_id);
        });
        var url = "http://"+server_ip+"SRC/Backend/Transaction/Shop/vendor_transaction_confirmation.php";
        var res = vendor_transaction_confirmation(url, user_id, transaction_id);

        location.href = "../index.html";

    });

    //console.log(res1);
    //console.log(res2);
}

function order_information_load()
{
    var transaction_id = localStorage.getItem('order_id');
    var url1 = "http://"+server_ip+"SRC/Backend/Transaction/Shop/get_informations_about_transaction_with_id.php";
    var url2 = "http://"+server_ip+"SRC/Backend/Transaction/Shop/get_transaction_products_with_transaction_id.php";
    var res1 = get_informations_about_transaction_with_id(url1, transaction_id, user_id);
    var res2 = get_transaction_products_with_transaction_id_and_shop_id(url2,transaction_id, user_id);

    if (res1.success && res2.success)
    {
        var url3 = "http://"+server_ip+"SRC/Backend/Account/Customer/get_information_with_id.php";
        var customer = get_information_with_id(url3,res1.results[0].customer_id);
        console.log(customer);
        $("#order_customer_name").html(customer.results[0].lastname+" "+customer.results[0].firstname);
        if (res1.results[0].deliverer_id == null)
        {
            console.log("Hello WOrld");
            $("#order_deliverer_name").html("No Deliverer Select Yet");
        }
        else
        {
            var deliverer = get_information_with_id(url3,res1.results[0].deliverer_id);
            $("#order_deliverer_name").html("Deliverer Name :"+deliverer.results[0].lastname+" "+deliverer.results[0].firstname);
        }

        if (res1.results[0].status == 2)
        {
            $("#order_status").html("Waiting for a Deliverer");
        }
        else if (res1.results[0].status == 3)
        {
            $("#order_status").html("Waiting for Customer Confirmation");
        }
        else if (res1.results[0].status == 4)
        {
            $("#order_status").html("Waiting for Deliverer to take the order in the shop");
        }
        else if (res1.results[0].status == 5)
        {
            $("#order_status").html("Waiting for Deliverer to give order to Customer");
        }

        $.each(res2.results, function (index, value) {
            $("#order_checkout_tbody").append(
                $('<tr>').attr('id', "tr_" + value.transaction_id + "_" + value.product_id)
                    .append($('<td>').append((index + 1)))
                    .append($('<td>').append(value.product_name))
                    .append($('<td>').append(value.customer_quantity))
                    .append($('<td>').append(value.shop_quantity))
                    .append($('<td>').attr('id', 'price_' + value.product_id).append((value.price * value.shop_quantity) + "€"))
            );

        });

        var url4 = "http://"+server_ip+"SRC/Backend/QRCode/Shop/get_shop_token.php";
        var shop_qrcode = get_shop_qrcode(url4, transaction_id, user_id);
        $('#order_qrcode').html(shop_qrcode);
    }

}


/*-----------------------------------------------------------------------------------------------------------*/
/* Products */

function add_product_on_load()
{
    $("#submit_order").click(function () {
       var product_name = $("#product_name").val();
       var product_price = $("#product_price").val();
       var product_description = $("#product_description").val();

       var url = "http://"+server_ip+"SRC/Backend/Product/add_product.php";
       var res = add_product(url, user_id, product_name, product_price, product_description);

       if (res.success)
       {
           location.href="checkout.html";
       }
    });
}

function display_items_on_load()
{

    var url = "http://"+server_ip+"SRC/Backend/Product/get_products_with_shop_id.php";
    var res = get_products_with_shop_id(url, user_id);
    console.log(res);
    if (res.success)
    {
        if (res.isProducts)
        {
            console.log(res.results);
            $.each(res.results, function (index, value) {
                $("#items_tbody").append(
                    $('<tr>').attr('id', 'product_'+value.id)
                        .append($('<td>').append((index + 1)))
                        .append($('<td>').append($('<input type="text">')
                            .attr('id', 'product_name_'+value.id)
                            .val(value.product_name)))
                        .append($('<td>').append($('<input type="number">')
                            .attr('id', 'price_'+value.id)
                            .val(value.price)))
                        .append($('<td>').append($('<input type="text">')
                            .attr('id', 'description_'+value.id)
                            .val(value.description)))
                        .append($('<td>')
                            .append($('<button>')
                                .append('Update')
                                .attr('id', 'update_'+value.id)
                            )
                        )
                        .append($('<td>')
                            .append($('<button>')
                                .append('Delete')
                                .attr('id', 'delete_'+value.id)
                            )
                        )
                );

                $('#update_'+value.id).click(function () {
                    var url = "http://"+server_ip+"SRC/Backend/Product/update_product.php";
                    var product_name = $('#product_name_'+value.id).val();
                    var price = $('#price_'+value.id).val();
                    var description = $('#description_'+value.id).val();
                    console.log(product_name);
                    console.log(price);
                    console.log(description);
                    var res = update_product(url,user_id, value.id, product_name, price, description);
                });

                $('#delete_'+value.id).click(function () {
                    var url = "http://"+server_ip+"SRC/Backend/Product/delete_product.php";
                    var res = delete_product(url, user_id, value.id);
                    if (res.success)
                    {
                        location.href="./items.html";
                    }
                });
            });

        }

    }
}
