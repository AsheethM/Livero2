$(document).on("mobileinit", function () {
    $.mobile.autoInitializePage = false;
});

$(document).ready(function () {
    window.location.hash = 'main';
    $.mobile.initializePage();
});