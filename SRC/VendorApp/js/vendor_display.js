var server_ip = localStorage.getItem("server_ip");
var user_id = localStorage.getItem("user_id");
var shop_id = localStorage.getItem("shop_id");

$(document).ready(function () {
    $("#div-command").hide();
    $("#div-error").hide();

    var data = get_transactions(server_ip, shop_id);
    if (data.success) {
        if (data.isTransactions) {
            $.each(data.results, function (index, value) {
                var transaction_num = "Order num:" + (index + 1);
                var status = "Status : ";
                switch (value.status) {
                    case 1 :
                        status += "Waiting for you validation";
                        break;
                    case 2 :
                        status += "Waiting for you customer";
                        break;
                    case 3:
                        status += "Waiting for a deliverer";
                        break;
                    case 4:
                        status += "Waiting the end of the transaction";
                        break;
                    default :
                        break;
                }

                var bloc_one = transaction_num + "<br>" + status + "<br>";
                var bloc_two = "<button id='trans_" + value.id + "_" + value.status + "_" + (index + 1) + "'>Check the Order</button>";
                $("#div-transaction").append("<p>" + bloc_one + bloc_two + "</p>");
            });

            $("#div-transaction").delegate("button", "click", function () {
                var transaction_id = $(this).attr("id").split("_")[1];
                var transaction_status = $(this).attr("id").split("_")[2];
                var order_num = $(this).attr("id").split("_")[3];
                $("#div-transaction").hide();


                var res = get_command(server_ip, transaction_id, shop_id);
                if (res.success) {

                }
            });
        }
    }
});
