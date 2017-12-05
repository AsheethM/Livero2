function add_phone_token(url, user_id, phone_token)
{
    alert(phone_token);
    alert(user_id);
    var json = null;
    $.ajax({
        url : url,
        method: "post",
        data: {'user_id' : user_id, 'phone_token' : phone_token},
        dataType: "json",
        async: false,
        success: function (data) {
            json = data;
        },
        error: function () {
            json = {success:false, message:"Request Add Phone Token: KO"};
        }
    });
    return json;
}