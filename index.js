//------------------------------------------------------------------------------------
var ccgp=0;
var ccgs=0;
var ccga=0;
var name;
var chat="chat";
var id=[];
var city=[];
var nam=[];
var lat=[];
var lng=[];
var des=[];
var distance=[];
var latx;
var longx;
var sendp=0;;
var reqp=0;
function groupclick(e)
{ var cc;
if( e == "gp")
	{cc=ccgp;}

else if( e == "gs")
	{cc=ccgs;}

else if( e == "ga")
	{cc=ccga;}
	
var	 term = { button1 : cc , user : name, button : e };
			
	$.ajax({ 
	 
        url: 'http://www.indiageeks.in/app/feed.php', 
        type: "POST",
        data: term ,       
        dataType: 'json', 
        error: function(jqXHR, strError){
            if(strError == 'timeout')
            {
             alert("Your Internet connection is slow please try again");
            }
            else{
        alert("Sorry we could not establish connection");    
            }
            },
            timeout:60000,
        success: function(data) 
        {
        	if(e== "gp")
        	{
        	if(ccgp==0){
        		
        		
        		$("#"+e).html("Unsubscribe"); ccgp = 1;}
        	
        		
        		else
        			{$("#"+e).html("Subscribe");ccgp=0;}
        	
        	}
        	else if(e== "gs")
        	{
        	if(ccgs==0){
        		
        		
        		$("#"+e).html("Unsubscribe"); ccgs = 1;}
        	
        		
        		else
        			{$("#"+e).html("Subscribe");ccgs =0;}
        	
        	}
        	else if(e== "ga")
        	{
        	if(ccga ==0){
        		
        		
        		$("#"+e).html("Unsubscribe"); ccga = 1;}
        	
        		
        		else
        			{$("#"+e).html("Subscribe");ccga =0;}
        	
        	}
        }});
	
	
}
function group()
{
	$(".useroptions").hide();
	var term ={ user : name};
	$.ajax({ 
		beforeSend: function() { $.mobile.showPageLoadingMsg();}, 
	     complete: function() { $.mobile.hidePageLoadingMsg();},
        url: 'http://www.indiageeks.in/app/feedc.php', 
        type: "POST",
        data: term ,       
        dataType: 'json', 
        error: function(jqXHR, strError){
            if(strError == 'timeout')
            {
             alert("Your Internet connection is slow please try again");
            }
            else{
        alert("Sorry we could not establish connection");    
            }
            },
            timeout:60000,
        success: function(data) 
        {
        	
        if(data.placement == 0)
        	{
      
        	$("#gp").html("Subscribe");ccgp=0;
        	
        	}
        else
        	{
        	
        	$("#gp").html("Unsubscribe");ccgp=1;
        	}
        
        if(data.symposium == 0)
    	{
    	
    	$("#gs").html("Subscribe");ccgs=0;
    	
    	}
    else
    	{
    	
    	$("#gs").html("Unsubscribe");ccgs=1;
    	}
    
        if(data.article == 0)
    	{
    	alert(data.placement);
    	$("#ga").html("Subscribe");ccga=0;
    	
    	}
    else
    	{
    	
    	$("#ga").html("Unsubscribe");ccga=1;
    	}
    
        	
        	
        	$("#grouplist").show();	
        }});
	

}

function info(e)
{  
	alert ("entered");
var term;


$(".useroptions").hide();
$("#userinfo").show();	
	if(e == 2){
		if($('#newemail').val() != ""){
	 term = { button: name, button2: $('#newemail').val(),button1 : e };
	}
		else
			{
			alert("Please enter an valid E-mail!");
			$("#newemail").val("");
			return;
			}
	}
	else if(e == 3)
	 {
		if ($('#password2').val()!= "" & $('#password2con').val()!="" & $("#password2cur").val()!= "" )
		{
			if($('#password2').val() == $('#password2con').val()){
		term = { button: name, button2: $('#password2').val() ,button3: $("#password2cur").val(),button1 : e };
		
			}
		else
		{
			$("#passnotmatch").html("<b style=\"color:red;\">Passwords do not match!</b>");
			 return;
		}}
		else
			{
			alert("Please fill in all the required information!");
			$('#password2').val("");
			$('#password2cur').val("");
			$('#password2con').val("");
			return;
			}
	 }
	else
	 {term = { button: name, button1 : e };}
	 $.ajax({ 
	        url: 'http://www.indiageeks.in/app/info.php', 
	        type: "POST",
	        data: term ,       
	        dataType: 'json', 
	        error: function(jqXHR, strError){
	            if(strError == 'timeout')
	            {
	             alert("Your Internet connection is slow please try again");
	             $("#infocontent").html("<br/><b style=\"color:red;\">Sorry we could not fetch details, Please try refresh</b>");
	            }
	            else{
	        alert("Sorry we could not establish connection");    
	        $("#infocontent").html("<br/><b style=\"color:red;\">Sorry we could not fetch details, Please try refresh</b>");
	            }
	            },
	            timeout:60000,
	        success: function(data) 
	        {
	if(e== 2)
		{
		
		
		
		$("#newemail").val("");
		alert("E-mail updated");
		info('1');
		
		}
	else if(e==3)
		{
		 if( typeof(data.name) != "undefined")
         {
		$('#password2').val("");
		$('#password2cur').val("");
		$('#password2con').val("");
		$("#passnotmatch").html("");
		alert ("Password updated");
         }
		 else
			 {
	
				$('#password2cur').val("");
				$("#passnotmatch").html("");
			 alert("The password you have entered is wrong");
			 }
		}
	else{
	        	$("#infocontent").html("<br/><b style=\"color:green;\">User Name:"+data.name+"</b><br/><b style=\"color:green;\">E-Mail:"+data.email+"</b><br/><b style=\"color:green;\">Phone:"+data.phone+"</b><br/><b style=\"color:green;\">Year:"+data.year);
	}    	        	
	}
	

});


}



function chatchannel()
{
	
	chat= $("#channelname").val();
	showmessages();
	

}

function userpanel()
{
	$('.api-div').hide();
    $('#api-userp').show();
    $(".useroptions").hide();
    $("#userboard").show();
	  var disp = $('ul #listdivider').css("display");
	    //alert(disp + ' : ' + api);
	    if (disp === 'none') {
	        $('div.ui-collapsible').trigger("collapse");
	    } else {
	        $.mobile.silentScroll(0);            
	    }	

}

function showmessages(){
	
	var term = { button1 : chat };
	
	 $.ajax({ 
	        url: 'http://www.indiageeks.in/app/show-message.php', 
	        type: "POST",
	        data: term ,       
	        dataType: 'json', 
	        error: function(jqXHR, strError){
	            if(strError == 'timeout')
	            {
	             alert("Your Internet connection is slow please try again");
	            }
	            else{
	        alert("Sorry we could not establish connection");    
	            }
	            },
	            timeout:60000,
	        success: function(data) 
	        {document.getElementById('messages').innerHTML = "";
	        	for(var i in data ){
	
	        		 $('#messages').prepend(data[i]);
	
	
	}
	}

});
	        		 setTimeout('showmessages()',5000);
}



function send(){

	
	//Send an XMLHttpRequest to the 'send.php' file with all the required informations
	
	 var term = { button: $('#message').val(), button1 : chat , namee :name};
	//Send an XMLHttpRequest to the 'send.php' file with all the required informations
	 $('#message').val("");	
	
	/*
	if(window.XMLHttpRequest){
		alert("dasda");
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET",sendto,false);
	xmlhttp.send(null);
	}
	else{
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	xmlhttp.open("GET",sendto,false);
	xmlhttp.send();
	}*/
	 $.ajax({ 
	        url: 'http://www.indiageeks.in/app/send.php', 
	        type: "POST",
	        data: term ,
	        dataType: 'json', 
	        error: function(jqXHR, strError){
	            if(strError == 'timeout')
	            {
	             alert("Your Internet connection is slow please try again");
	            }
	            else{
	        alert("Sorry we could not establish connection");    
	            }
	            },
	            timeout:13000,
	        success: function(data) 
	        { 
	 for(var i in data)
	        	{
	        	var error = '';
	//If an error occurs the 'send.php' file send`s the number of the error and based on that number a message is displayed
	switch(parseInt(data[i])){
	
	case 3:

		error = 'Don`t forget the message!';
	break;
	case 4:
		
	error = 'The message is too long!';
	break;

	}
	if(error == ''){

		document.getElementById('error').innerHTML = '';
	showmessages();
	}
	
	else{
	
	document.getElementById('error').innerHTML = error;
	}
	}}
	 });
}


$( "#popupPanel" ).on({
    popupbeforeposition: function() {
        var h = $( window ).height();
        var w = $( window ).width();
     
        $( "#popupPanel" ).css( "height", h );
        $( "#popupPanel" ).css( "width", w/2 );
    }




});


function getdistance()
{
	
    var t="11";
    var term = { button: $('#dist-mini').val(), button1 : t};  
    $.ajax({ 
        url: 'http://www.indiageeks.in/app/dist.php', 
        type: "POST",
        data: term ,
        dataType: 'json', 
        error: function(jqXHR, strError){
            if(strError == 'timeout')
            {
             alert("Your Internet connection is slow please try again");
            }
            else{
        alert("Sorry we could not establish connection");    
            }
            },
            timeout:13000,
        success: function(data) 
        { 
        	
        	for(var i in data.city){
        	
        		id[i] = data.id[i];
        		city[i] = data.city[i];
        		nam[i] = data.name[i];
        		des[i] = data.des[i];
        		lat[i] = data.latitude[i];
            	lng[i] = data.longitude[i];
    	  //  	  $('#searchs').append('<li> <h2>'+data[i]+'</p><a onclick=\"showcities()\">show cities</a></li>');
        //  $('#searchlist').listview('refresh');
        	
        	}}
    
    });
    
    
    
   // return false; // keeps the page from not refreshing 


}

function distcalc(lat1,lon1,lat2,lon2)
{
	var R = 6371; // km
	lat1 = parseFloat(lat1);
	lon1 = parseFloat(lon1);
	lat2 = parseFloat(lat2);
	lon2 = parseFloat(lon2);
	var dlt = parseFloat((lat2>lat1)?(lat2-lat1):(lat1-lat2));
	var dlg = parseFloat((lon2>lon1)?(lon2-lon1):(lon1-lon2));
	var dLat = toRad(dlt);
	var dLon = toRad(dlg);
	lat1 = toRad(lat1);
	lat2 = toRad(lat2);

	var a = Math.sin(dLat/2)*Math.sin(dLat/2)+Math.sin(dLon/2)*Math.sin(dLon/2)*Math.cos(lat1)*Math.cos(lat2); 
	var c = 2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)); 
	var d = R*c;	
 
	return d;
}

function toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
}







//------------------------------------------------------------------------------------





function pop()
{   
	if($('#api-searcho').is(':visible'))
	 {
		$('.api-div').hide();
	    $('#api-intro').show();
	    var disp = $('ul #listdivider').css("display");
	    //alert(disp + ' : ' + api);
	    if (disp === 'none') {
	        $('div.ui-collapsible').trigger("collapse");
	    } else {
	        $.mobile.silentScroll(0);            
	    }
	 }
	else
	{

	$('.api-div').hide();
    $('#api-searcho').show();
    var disp = $('ul #listdivider').css("display");
    //alert(disp + ' : ' + api);
    if (disp === 'none') {
        $('div.ui-collapsible').trigger("collapse");
    } else {
        $.mobile.silentScroll(0);            
    }
	}	

}

function logout()
{

var term = { user: name};
$.ajax({ 
	beforeSend: function() { $.mobile.showPageLoadingMsg();}, 
     complete: function() { $.mobile.hidePageLoadingMsg();}, 
	url: 'http://www.indiageeks.in/app/logout.php', 
    type: "POST",
    data: term ,
    dataType: 'json', 
    error: function(jqXHR, strError){
        if(strError == 'timeout')
        {
         alert("Your Internet connection is slow please try again");
        }
        else{
    alert("Sorry we could not establish connection");    
        }
        },
        timeout:13000,
    success: function(data) 
    {
        
    	 document.getElementById('username').innerHTML="";
    	alert("Logged out");
    	$('.loggedon').show();
    	$('.api-div').hide();
    	$('#logu').hide();
    	$('.api-div#api-intro').show();
    	$('.loggin').hide();
    	reqp=0;sendp=0;
    }
});
return false;  



}

function searchboxx()
{
	var t="";
	$('#stp').hide();
    $('#sts').hide();
    $('#sta').hide();
    $('.api-div').hide();
    $('#api-search').show();
    $('#searchp').html('');
    $( '#searchs').html('');
    $( '#searchagroup').html('');
    var disp = $('ul #listdivider').css("display");
    //alert(disp + ' : ' + api);
    if (disp === 'none') {
        $('div.ui-collapsible').trigger("collapse");
    } else {
        $.mobile.silentScroll(0);            
    }
    if($('#placementp').is(':checked'))
    {
    	t= t+"1";
    if($('#pc1').is(':checked')	)	
    	{
    	t= t+"1";
    
    	}
    else
    	{
    	
    	t= t+"0";
    	}
    	if($('#pc2').is(':checked')	)
    	{
        	t= t+"1";
        
        	}
        else
        	{
        	
        	t= t+"0";
        	}
    		if($('#pc3').is(':checked')	)
    		{
    	    	t= t+"1";
    	    
    	    	}
    	    else
    	    	{
    	    	
    	    	t= t+"0";
    	    	}
    			if($('#pc4').is(':checked')	)
    			{
    		    	t= t+"1";
    		    
    		    	}
    		    else
    		    	{
    		    	
    		    	t= t+"0";
    		    	}
    			
    }else{t= t+"00000";}
    if($('#symposiump').is(':checked'))
    {
    	t= t+"1";
    if($('#sc1').is(':checked')	)	
    	{
    	t= t+"1";
    
    	}
    else
    	{
    	
    	t= t+"0";
    	}
    	if($('#sc2').is(':checked')	)
    	{
        	t= t+"1";
        
        	}
        else
        	{
        	
        	t= t+"0";
        	}
    		if($('#sc3').is(':checked')	)
    		{
    	    	t= t+"1";
    	    
    	    	}
    	    else
    	    	{
    	    	
    	    	t= t+"0";
    	    	}
    			if($('#sc4').is(':checked')	)
    			{
    		    	t= t+"1";
    		    
    		    	}
    		    else
    		    	{
    		    	
    		    	t= t+"0";
    		    	}
    			if($('#sc5').is(':checked')	)
    	    	{
    	        	t= t+"1";
    	        
    	        	}
    	        else
    	        	{
    	        	
    	        	t= t+"0";
    	        	}
    			if($('#sc6').is(':checked')	)
    	    	{
    	        	t= t+"1";
    	        
    	        	}
    	        else
    	        	{
    	        	
    	        	t= t+"0";
    	        	}
    			if($('#sc7').is(':checked')	)
    	    	{
    	        	t= t+"1";
    	        
    	        	}
    	        else
    	        	{
    	        	
    	        	t= t+"0";
    	        	}
    }else{t= t+"00000000";}
    if($('#articlep').is(':checked'))
    {
    	t= t+"1";
    if($('#ac1').is(':checked')	)	
    	{
    	
    	t= t+"1";
    
    	}
    else
    	{
    	
    	t= t+"0";
    	}
    	if($('#ac2').is(':checked')	)
    	{
        	t= t+"1";
        
        	}
        else
        	{
        	
        	t= t+"0";
        	}
    		if($('#ac3').is(':checked')	)
    		{
    	    	t= t+"1";
    	    
    	    	}
    	    else
    	    	{
    	    	
    	    	t= t+"0";
    	    	}
    			if($('#ac4').is(':checked')	)
    			{
    		    	t= t+"1";
    		    
    		    	}
    		    else
    		    	{
    		    	
    		    	t= t+"0";
    		    	}
    }
    else{t= t+"00000";}
   
    
    var term = { button: $('#search-mini').val(), button1 : t};   
 
    $.ajax({ 
    	 beforeSend: function() { $.mobile.showPageLoadingMsg(); }, 
         complete: function() { $.mobile.hidePageLoadingMsg() }, 
    	url: 'http://www.indiageeks.in/app/conn.php', 
        type: "POST",
        data: term ,
        dataType: 'json', 
        error: function(jqXHR, strError){
            if(strError == 'timeout')
            {
             alert("Your Internet connection is slow please try again");
            }
            else{
        alert("Sorry we could not establish connection");    
            }
            },
            timeout:13000,
        success: function(data) 
        {
        	
        	for(var i in data.name){
        	
    if(data.id[i].charAt(0)== 'p')
        { 
    	$('#stp').show()
        $('#searchp').append('<li> <h2>'+data.name[i]+'</h2><p>'+data.des[i]+'</p><p><a href="#" onclick=\"getcontents(this.id)\" id=\"'+data.id[i]+'\" >Read More</a></p><p>Last Modified:'+data.time[i]+'</p></li>');
               $('#searchlist').listview('refresh');
           }
        	
    
    else if(data.id[i].charAt(0)== 's')
        {
    	$('#sts').show();
    	  $('#searchs').append('<li> <h2>'+data.name[i]+'</h2><p>'+data.des[i]+'</p><p><a href="#" onclick=\"getcontents(this.id)\" id=\"'+data.id[i]+'\" >Read More</a></p><p>Date of Symposium:'+data.time[i]+'</p></li>');
          $('#searchlist').listview('refresh');
    	
        }	
    else if(data.id[i].charAt(0)== 'a')
    {
	$('#sta').show();
	  $('#searcha').append('<li> <h2>'+data.name[i]+'</h2><p>'+data.des[i]+'</p><p><a href="#" onclick=\"getcontents(this.id)\" id=\"'+data.id[i]+'\" >Read More</a></p><p>Date of Symposium:'+data.time[i]+'</p></li>');
      $('#searchlist').listview('refresh');
	
    }	
    	        	
        	}
        
  
        
        }
    });
    return false; // keeps the page from not refreshing 



}



function getcontents(e)
{
	 $('.api-div').hide();
	 $('#api-display').show();
	  
	 $('#displayh').html('');
	 $('#displayc').html('');
	 $('#displayf').html('');
if(e.charAt(0) == 'p')
	 {
	
	  var term = { button: e};   
	   
	    $.ajax({ 
	    	 beforeSend: function() { $.mobile.showPageLoadingMsg(); }, 
	         complete: function() { $.mobile.hidePageLoadingMsg() }, 
	    	url: 'http://www.indiageeks.in/app/ret.php', 
	        type: "POST",
	        data: term ,
	        dataType: 'json', 
	        error: function(jqXHR, strError){
	            if(strError == 'timeout')
	            {
	             alert("Your Internet connection is slow please try again");
	            }
	            else{
	        alert("Sorry we could not establish connection");    
	            }
	            },
	            timeout:13000,
	        success: function(data) 
	        {
	        	 var h=	 ($(window).height()) - ( $('#displayf').height())-( $('#displayh').height())-( $('#header').height())-( $('#menuc').height());
	        
	        
	         $('#displayc').css({height : h});     
	   
		        	$('#displayh').append('<h2>'+data.name+'</h2>').trigger( "create" );
		        	$('#displayc').append('<p>'+data.content+'</p>').trigger( "create" );
		        	$('#displayf').append('<h4>'+data.time+'<br/> <p>CopyRights INdiaGeeks TEam</p></h4>').trigger( "create" );	        	 
		        	$('#displaypage').trigger("create");

	        
	        }
	    });
	    return false;  

	
	 }
else if(e.charAt(0) == 's')
{


	 var term = { button: e};
	   
	    $.ajax({ 
	        url: 'http://www.indiageeks.in/app/ret.php', 
	        type: "POST",
	        data: term ,
	        dataType: 'json', 
	        error: function(jqXHR, strError){
	            if(strError == 'timeout')
	            {
	             alert("Your Internet connection is slow please try again");
	            }
	            else{
	        alert("Sorry we could not establish connection");    
	            }
	            },
	            timeout:13000,
	        success: function(data) 
	        {
	        var h=	 ($(window).height()) - ( $('#displayf').height())-( $('#displayh').height())-( $('#header').height())-( $('#menuc').height());
	        
	        
	         $('#displayc').css({height : h});     
	   
		        	$('#displayh').append('<h2>'+data.name+'</h2>').trigger( "create" );
		        	$('#displayc').append('<p>'+data.content+'<br/>Date of Symposium<br/> '+data.date+' </p>').trigger( "create" );
		        	$('#displayf').append('<h4>'+data.time+'<br/> <p>CopyRights INdiaGeeks TEam</p></h4>').trigger( "create" );	        	 
		        	$('#displaypage').trigger("create");

	        
	        }
	    });
	    return false;  
}
if(e.charAt(0) == 'a')
{

 var term = { button: e};   
  
   $.ajax({ 
   	 beforeSend: function() { $.mobile.showPageLoadingMsg(); }, 
        complete: function() { $.mobile.hidePageLoadingMsg() }, 
   	url: 'http://www.indiageeks.in/app/ret.php', 
       type: "POST",
       data: term ,
       dataType: 'json', 
       error: function(jqXHR, strError){
           if(strError == 'timeout')
           {
            alert("Your Internet connection is slow please try again");
           }
           else{
       alert("Sorry we could not establish connection");    
           }
           },
           timeout:13000,
       success: function(data) 
       {
       	 var h=	 ($(window).height()) - ( $('#displayf').height())-( $('#displayh').height())-( $('#header').height())-( $('#menuc').height());
       
       
        $('#displayc').css({height : h});     
  
	        	$('#displayh').append('<h2>'+data.name+'</h2>').trigger( "create" );
	        	$('#displayc').append('<p>'+data.content+'</p>').trigger( "create" );
	        	$('#displayf').append('<h4>'+data.time+'<br/> <p>CopyRights INdiaGeeks TEam</p></h4>').trigger( "create" );	        	 
	        	$('#displaypage').trigger("create");

       
       }
   });
   return false;  


}

}


$('#page-home').live('pageinit', function(event){  
    $('.api-div').hide();
    $('.api-div#api-intro').show();
    
    $('#intro').click(function() {
        $('.api-div').hide();
        $('.api-div#api-intro').show();
        $.mobile.silentScroll(0);            
    });
    
   
    
    
    
    $('div ul li a').click(function(event) {
        event.preventDefault();
        //alert('clicked : ' + $(this).attr('id'));
        var attrId = $(this).attr('id');

        if (attrId.indexOf("click") !== 0) {
            return;
        }
        
        var api = '#api' + attrId.substring(attrId.indexOf('-'));
        
        // hide all div's, show only this one
        $('.api-div').hide();
        $(api).show();

        // if small screen and portrait - close after tap
        var disp = $('ul #listdivider').css("display");
        //alert(disp + ' : ' + api);
        if (disp === 'none') {
            $('div.ui-collapsible').trigger("collapse");
        } else {
            $.mobile.silentScroll(0);            
        }
    }); 
    
    $('#listdivider').click(function(event) {
        event.preventDefault();
        $('.api-div').hide();
        $('.api-div#api-intro').show();
        $.mobile.silentScroll(0);
    });
});

function symposiuml()
{
	$('.api-div').hide();
	 $('#api-symposiuml').show();
	 var disp = $('ul #listdivider').css("display");
	    //alert(disp + ' : ' + api);
	    if (disp === 'none') {
	        $('div.ui-collapsible').trigger("collapse");
	    } else {
	        $.mobile.silentScroll(0);            
	    }
}

