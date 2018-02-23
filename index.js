
var ajax_call;
var timer_function;
var gps_id;
var wto; //slider variable
var vender_items_number;
var vendor_id;
var json;

$( document ).ready(function() {
 $(".api-div").css("display", "none");
//  $("#api-login").css("display", "block");
	open_vendor('open-displayvendor');  
  // navigator.geolocation.clearWatch(watchID);
//fetch_info();
$('#distance_value').change(function() {
  clearTimeout(wto);
  wto = setTimeout(function() {
 navigator.geolocation.getCurrentPosition(fetch_vendor_list, onError);
  }, 1000);
});



  });



    function onSuccess(position) {

    $("#geolocation").html(
							'data that is sent:' +
							'Latitude: '  + position.coords.latitude      + '<br />' +
                            'Longitude: ' + position.coords.longitude     + '<br />' +
							'Altitude: ' + position.coords.altitude     + '<br />' +
							'accuracy: ' + position.coords.accuracy     + '<br />' +
							'Speed: ' + position.coords.speed     + '<br />' +
                            'Heading: ' + position.coords.heading     + '<br />' +
							'<hr />'  );

//var term = {  latitude: position.coords.latitude, longitude:position.coords.longitude };   

ajax_call = $.ajax({

  url: "http://green.projectyogisha.com/gps.php",
  data: {  'latitude': position.coords.latitude, 'longitude':position.coords.longitude , 'altitude':position.coords.altitude,'accuracy':position.coords.accuracy,'speed':position.coords.speed,'heading':position.coords.heading },
  type: 'POST',
   success: function (data) {
     
   },
  error: function (jqXHR, exception)
  {
 if(jqXHR.aborted)
       return;	 
	 alert(exception);
	  navigator.geolocation.clearWatch(watchID);
  },
  
 beforeSend : function()    {           
        if(ajax_call != null) {
            ajax_call.abort();
        }
    },


 timeout :13000
});


	}

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
			  
    }

    // Options: throw an error if no update is received every 30 seconds.
    //

	
	
	
function fetch_gps_location ()
{
var term = { val1: $("#text_box").val()};   


 

ajax_call = $.ajax({
  dataType: 'json',
  url: "http://green.projectyogisha.com/gps_get.php",
  data: term,
  type: 'POST',
  error: function (jqXHR, exception)
  {
	   if(jqXHR.aborted)
                return;
	  alert("failed to fetch gps");
  },
  
 beforeSend : function()    {           
        if(ajax_call != null) {
            ajax_call.abort();
        }
    },


  timeout :13000,
  success:function (data)
  {
$("#display").html("");
$("#display").append("<li>latitude:"+data[0]+"</li>");
$("#display").append("<li>longitude:"+data[1]+"</li>");
$("#display").append("<li>altitude:"+data[2]+"</li>");
$("#display").listview("refresh");
  }
});


 timer_function = setTimeout(fetch_gps_location, 5000);	
}

function login_facebook()
{
	
	
	CordovaFacebook.login({
   permissions: ['email'],
   onSuccess: function(result) {
      if(result.declined.length > 0) {
         alert("The User declined something!");
      }
      /* ... */
   },
   onFailure: function(result) {
      if(result.cancelled) {
         alert("The user doesn't like my app");
      } else if(result.error) {
         alert("There was an error:" + result.errorLocalized);
      }
   }
});
}


function hide_pages()
{		

  
  clearTimeout(timer_function);
  //navigator.geolocation.clearWatch(gps_id);
  $('.api-div').hide();
}

function open_vendor (args)
{

      navigator.geolocation.getCurrentPosition(fetch_vendor_list, onError);
	      openapi(args);
}



function gps_page_open (args)
{
	
		  gps_id = navigator.geolocation.watchPosition(onSuccess, onError, {maximumAge: 3000, timeout: 50000, enableHighAccuracy: true  });
		  fetch_gps_location ();
	      openapi(args);

	
	
}


function openapi (apiid)
{
	  event.preventDefault();
        //alert('clicked : ' + $(this).attr('id'));
 

        var api = '#api' + apiid.substring(apiid.indexOf('-'));
        
        // hide all div's, show only this one
		hide_pages();
        $(api).show();

        // if small screen and portrait - close after tap
        var disp = $('ul #listdivider').css("display");
        //alert(disp + ' : ' + api);
        if (disp === 'none') {
            $('div.ui-collapsible').trigger("collapse");
        } else {
            $.mobile.silentScroll(0);            
        }

	
	
	
}
  
/*****login functions****/

function login_normal()
{

ajax_call = $.ajax({

  url: "http://green.projectyogisha.com/login_normal.php",
  data: { 'email': $("#email").val(), 'password': $("#password").val()},
  type: 'POST',
   success: function (data) {

    if ("1" == data)
	{
		 open_vendor('open-displayvendor');
	}
	else
	{
		$("#login_result").html("user/name or password it wrong");
	}
   },
   
 beforeSend : function()    {           
        if(ajax_call != null) {
            ajax_call.abort();
        }
    },


  error: function (jqXHR, exception)
  {
	   if(jqXHR.aborted)
                return;
	  alert(exception);
	
  },
 timeout :13000
});
	

	
}



function registration_normal ()
{
	var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	var email = $("#email_r").val();
	var first = $("#first").val();
	var last = $("#last").val();
	var dob = $("#dob").val();
	var address = $("#address").val();
	var pass = $("#password_r").val();
	var pass_com = $("#confirm_password_r").val();
	var phone = $("#phone").val()
	if (!email.trim() ||!first.trim()||!last.trim()||!dob.trim()||!address.trim()||!pass.trim()||!pass_com.trim())
	{
		
		$("#resgitration_result").html("<span style=\"color:red;\">Please enter the required fields</span>");
	return;
	}
	else if ( pass  !== pass_com )
	{
		$("#resgitration_result").html("<span style=\"color:red;\">Passwords dont match</span>");
		return;
	}
	else if (!re.test(email))
	{
			$("#resgitration_result").html("<span style=\"color:red;\">E-mail is not correct</span>");
		return;
	}
	else
	{
		$("#resgitration_result").html("");
	}

	ajax_call = $.ajax({
  url: "http://green.projectyogisha.com/registration_normal.php",
  data: { 'email': email,'actor': 3 ,'first': first,'last': last,'dob': dob, 'address': address, 'phone': phone,'password': pass},
  type: 'POST',
   success: function (data) {

    if ("1" == data)
	{
		  openapi("open-login");
	}
	else
	{
		$("#resgitration_result").html("<span style=\"color:red;\">"+data+"</span>");
	}
   },
  error: function (jqXHR, exception)
  {
	   if(jqXHR.aborted)
                return;
	  alert(exception);
	
  },
  
 beforeSend : function()    {           
        if(ajax_call != null) {
            ajax_call.abort();
        }
    },


 timeout :13000
});

	
}

/*
function initializeMap() {
    var mapOptions = {
        center: new google.maps.LatLng(43.069452, -89.411373),
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
}
*/

function fetch_vendor_list(position)
{ 

	ajax_call = $.ajax({
  url: "http://green.projectyogisha.com/get_gps_nearest.php",
  data: {'latitude': position.coords.latitude, 'longitude':position.coords.longitude, 'distance': $("#distance_value").val() },
  type: 'POST',
  dataType: 'json', 
   success: function (data) {
	
	  	$("#vendorlist").html("");
		
	  for (var i in data.name) {

	$("#vendorlist").append(" <li onclick=\"shop('"+data.id[i]+"','"+data.logos[i]+"','"+data.name[i]+"')\"><a href=\"#\">  <img src=\""+data.logos[i]+"\">  <h2>"+data.name[i]+ "</h2>   <p>"+data.latitude[i]+"__"+data.longitude[i]+"</p></a></li>");
	   }
	   $("#vendorlist").listview("refresh");
 //  initializeMap();
   },
  error: function (jqXHR, exception)
  {

	
  },
  
 beforeSend : function()    {           
        if(ajax_call != null) {
            ajax_call.abort();
        }
    },


 timeout :13000
});


}


function shop(id,logo,name)
{	
vendor_id=id;
openapi("api-vendor");
$("#logodiv").html("");
$("#myUL").html("");
$("#logodiv").append("<img src=\""+logo+"\" alt=\""+name+"\" /><br/><h2>"+name+"</h2>");
    
	ajax_call = $.ajax({

  url: "http://green.projectyogisha.com/fetch_shop_items.php",
  data: { 'vendor_id': vendor_id, 'offset':vender_items_number  },
  type: 'POST',
    dataType: 'json', 
   success: function (data) {
		json=data;
	
   },
   
 beforeSend : function()    {           
        if(ajax_call != null) {
            ajax_call.abort();
        }
	},


  error: function (jqXHR, exception)
  {
	   if(jqXHR.aborted)
                return;
	  alert(exception);
	
  },
 timeout :13000
});
var shop_list [];
for (var name in json.product)
{	
   shop_list.push({
	  item_id: json.id_items[name],
		item_name: json.product[name],
		item_price: json.price[name],
		item_desc: json.des[name],
   });
}
console.log(shop_list);

return shop_list;
}




/*
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u0020");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);

}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
	
	
	  var inputValue = $("#myInput").val();
  if (inputValue === '') {
    alert("You must write something!");
  } 
$("#myUL").append("<li><a href=\"#\">"+inputValue+" <input size=\"2\" type=\"text\" value=\"1\" /></a><a class=\"close ui-icon ui-icon-delete\"></a> </li>   </li>");	
*/
/*
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }*/ 
/*
$("#myUL").listview("refresh");
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u0020");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
 for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

*/