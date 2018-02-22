function onLoad() {
    //document.addEventListener("deviceready", onDeviceReady, false);
  //  localStorage.clear();
    onDeviceReady();

}

function onDeviceReady() {
    // Register the event listener
    //document.addEventListener("backbutton", onBackKeyDown, false);

/*    window.FirebasePlugin.getToken(function(token) {
        alert("TOKEN:"+token);
        localStorage.setItem("phone_token", token);
    }, function(error) {
        localStorage.setItem("phone_token", "error");
    });*/
    if (localStorage.getItem('customer_id') === null){
        console.log('user id === null');
        $.mobile.pageContainer.pagecontainer('change', '#login');
    }
    else
    {
        console.log('user id !== null');
        $.mobile.pageContainer.pagecontainer('change','#main', {transition : 'slideup'});
    }



    //localStorage.setItem('server_ip', 'localhost/PRI/');
    //localStorage.setItem('server_ip', '192.168.1.32/PRI/');
    //localStorage.setItem('user_id', 2);


}

