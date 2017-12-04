

function get_transactions(server_ip, shop_id)
{
    var json = null;
    $.ajax({
        url: "http://"+server_ip+"/Vendor/Transaction/get_transactions.php",
        method: "post",
        data: {"shop_id": shop_id},
        dataType:"json",
        async : false,
        success:function (data) {
            json = data;
        },
        error : function () {
            json = {success:false, message : "Request Get Transactions: KO"};
        }
    });
    return json;
};


function get_command(server_ip, transaction_id, shop_id)
{
    var json = null;
    $.ajax({
        url: "http://" + server_ip + "Vendor/Transaction/get_command.php",
        method: "post",
        data: {"transaction_id": transaction_id, "shop_id": shop_id},
        dataType: "json",
        async: false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success:false, message:"Request Get Command : KO"};
        }
    });

    return json;
}