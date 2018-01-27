
function onload() {


            document.addEventListener("deviceready", onDeviceReady, false);
           
        }



function onDeviceReady() {
	$('#logu').hide(); 
	$('.loggin').hide();
	$(".useroptions").hide();
	navigator.splashscreen.hide();    
	latest();
}
   
    

// onError Callback receives a PositionError object
//

function register()
{
	
	var x=0;
    var name=document.getElementById("name").value;
    var email=document.getElementById("email").value;
    var password=document.getElementById("password").value;
    var password2=document.getElementById("pwd1").value;
    var year=document.getElementById("year").value;
    var phone=document.getElementById("phone").value;
    

    
    if(name=="")
    	{alert("Name field is empty!"); x=1;}
    else if(email=="")
	{alert("Email field is empty!"); x=1;}
    else if(password=="")
	{alert("Password field is empty!"); x=1;}
    else if(year=="")
	{alert("Year field is empty!"); x=1;}
    else if(phone=="")
	{alert("Phone field is empty!"); x=1;}

    if(password!=password2)
    	{
    	alert("Password fields doesnt match!");
    	 x=1;
    	}
    
 var term = { button: email, button1 : name, button2: password, button3: year, button4: phone };   
    if(x==0){
    $.ajax({ 
    	beforeSend: function() { $.mobile.showPageLoadingMsg(); }, 
	    complete: function() { $.mobile.hidePageLoadingMsg() },    
    	url: 'http://www.indiageeks.in/app/register.php', 
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
        	if(data==0)
        	alert("Username already exist!");
        	else if(data==1)
        		alert("Succesfully registered!");
            $(".txtbox").val("");
        }
    
});}else {alert("Correct the fields before registering!");}
return false; 
}


function login()
{
	
	
	 var term = { user: $('#email1').val(), pass : $('#password1').val()};
	 $('#email1').val("");
	 $('#password1').val("");
	    $.ajax({ 
	    	beforeSend: function() { $.mobile.showPageLoadingMsg();}, 
	         complete: function() { $.mobile.hidePageLoadingMsg();}, 
	    	url: 'http://www.indiageeks.in/app/login.php', 
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
	        	
	           if( typeof(data.name) != "undefined")
	           {
	        	 if(data.state ==1)
	        		 {
	        		 
	        		 alert("Another person has already logged into the account!");
	        		 }
	        	 else
	        		 {
	        	alert("Hello " +data.name+" You are now logged In!!!");
	            $('.loggedon').hide();
	            $('.loggin').show();
	            $('.api-div').hide();
	            $('.api-div#api-intro').show();
	            $('#logu').show();
	            document.getElementById('username').innerHTML="User:&nbsp"+data.name;
	            name = data.name;
	        		 }  
	      
	        }
	          
	            else{
	              
	                alert("Wrong username or password. Try again!");
	                	
	            }

	        
	   

	        
	        }
	    });
	    return false;  

	


}





