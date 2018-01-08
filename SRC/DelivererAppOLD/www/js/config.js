function onLoad() {
    //document.addEventListener("deviceready", onDeviceReady, false);
    onDeviceReady();
}

function onBackKeyDown() {
    go_back();
}


function onDeviceReady() {
    // Register the event listener
    document.addEventListener("backbutton", onBackKeyDown, false);

    window.FirebasePlugin.getToken(function(token) {
        // save this server-side and use it to push notifications to this device
        localStorage.setItem("phone_token", token);
    }, function(error) {
        localStorage.setItem("phone_token", "error");
    });

    $( "body>[data-role='panel']" ).panel();
    $( "[data-role='header'], [data-role='footer']" ).toolbar({theme: "a"});

    console.log('Done');
    localStorage.setItem('server_ip', 'localhost/PRI/');
    localStorage.setItem('user_id', 3);
}

