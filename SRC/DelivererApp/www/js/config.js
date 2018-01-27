function onLoad() {
    //document.addEventListener("deviceready", onDeviceReady, false);
    onDeviceReady();

}

function onBackKeyDown() {
    go_back();
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
    localStorage.clear();

    if (localStorage.getItem('user_id') === null){
        $.mobile.pageContainer.pagecontainer('change','#login', {content : content , transition : 'slideup'});
    }
    else
        $.mobile.pageContainer.pagecontainer('change','#home', {content : content , transition : 'slideup'});



    localStorage.setItem('server_ip', 'localhost/PRI/');
    //localStorage.setItem('server_ip', '192.168.1.32/PRI/');
    localStorage.setItem('user_id', 2);


}

