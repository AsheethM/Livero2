function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
    //onDeviceReady();
}

function onBackKeyDown() {
    go_back();
}


function onDeviceReady() {
    // Register the event listener
    //document.addEventListener("backbutton", onBackKeyDown, false);

    window.FirebasePlugin.getToken(function(token) {
        alert("TOKEN:"+token);
        localStorage.setItem("phone_token", token);
    }, function(error) {
        localStorage.setItem("phone_token", "error");
    });

    $( "body>[data-role='panel']" ).panel();
    $( "[data-role='header'], [data-role='footer']" ).toolbar({theme: "a"});

    //localStorage.setItem('server_ip', 'localhost/PRI/');
    localStorage.setItem('server_ip', '192.168.1.32/PRI/');
    localStorage.setItem('user_id', 2);
}

