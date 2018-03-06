function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
    //onDeviceReady();

}

function onBackKeyDown() {
    go_back();
}


function onDeviceReady() {
    // Register the event listener

    document.addEventListener("backbutton", onBackKeyDown, true);


    window.FirebasePlugin.getToken(function(token) {
        localStorage.setItem("phone_token", token);
    }, function(error) {
        console.log("Error on phone_token");
    });

    if (localStorage.getItem('user_id') === null){
        $.mobile.pageContainer.pagecontainer('change','#login', {transition : 'slideup'});
    }
    else
    {
        $.mobile.pageContainer.pagecontainer('change','#home', {transition : 'slideup'});
    }

}

