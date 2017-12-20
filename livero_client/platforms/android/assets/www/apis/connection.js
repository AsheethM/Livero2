/* Copyright (c) 2012 Mobile Developer Solutions. All rights reserved.
 * This software is available under the MIT License:
 * The MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, 
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software 
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies 
 * or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// api-connection


function check_network() {
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

    $('#connection').html(states[networkState]);
}
function latest() {

	 $('#latest').html('');
	term="";
	 $.ajax({ 
		 beforeSend: function() { $.mobile.showPageLoadingMsg(); }, 
         complete: function() { $.mobile.hidePageLoadingMsg() }, 
	        url: 'http://www.indiageeks.in/app/latest.php', 
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
	        	
	        	
	      for(var i in data.id){
	     
	    	  if(data.id[i].charAt(0)== 's')
	        {
	        
	        $('#latest').append("<li><a  href=\"#\" onclick=\"getcontents(this.id)\" id=\""+data.id[i]+ "\"><img src=\""+data.image[i]+"\" />"+"<h3>"+data.title[i]+"</h3><p>Symposium Related</p></a><a href=\"\" data-rel=\"dialog\" data-transition=\"slideup\"></a>  </li>");
	        $('#latest').listview('refresh');
	        }
	    	  if(data.id[i].charAt(0)== 'p')
		        {
		        
		        $('#latest').append("<li><a href=\"#\" onclick=\"getcontents(this.id)\" id=\""+data.id[i]+ "\">"+"<img src=\""+data.image[i]+"\" />"+"<h3>"+data.title[i]+"</h3><p>Placement Update</p></a><a href=\"\" data-rel=\"dialog\" data-transition=\"slideup\"></a>  </li>");
		        $('#latest').listview('refresh');
		        }
	    	  if(data.id[i].charAt(0)== 'a')
		        {
		        
		        $('#latest').append("<li><a href=\"#\" onclick=\"getcontents(this.id)\" id=\""+data.id[i]+ "\">"+"<img src=\""+data.image[i]+"\" />"+"<h3>"+data.title[i]+"</h3><p>Article</p></a><a href=\"\" data-rel=\"dialog\" data-transition=\"slideup\"></a>  </li>");
		        $('#latest').listview('refresh');
		        }
		    	    
		    	  
	    	  
	    	  
	    	 
	    	  
	      }
	   
	        
	        }
	    });
	
	
	
	
}

function fplacementreset(e,count)
{
	 $('#placementlist').html("");
	 $('#symposiumlist').html("");
	 $('#articlelist').html("");
	 $('#studylist').html("");
	 fplacement(e, count);
}

function fplacement(e, count)
{
	 
		var term = { button: count , button1: e};
		 $.ajax({ 
			 beforeSend: function() { $.mobile.showPageLoadingMsg(); }, 
	         complete: function() { $.mobile.hidePageLoadingMsg() }, 
		        url: 'http://www.indiageeks.in/app/placementstream.php', 
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
		        	
		        	
		        		
		    
		        		if(e== 'p')
		        { 
		        			for(var i in data.id){
		        				
		        $('#placementlist').append('<li> <h2>'+data.name[i]+'</h2><p>'+data.des[i]+'</p><p><a href="#" onclick=\"getcontents(this.id)\" id=\"'+data.id[i]+'\" >Read More</a></p><p>Last Modified:'+data.time[i]+'</p></li>');
		         $('#placementlist').listview('refresh');
		        
		         count++;
		        			}
		        	
		        	

		        	  if( data['id'].length <1)
			           {alert("Thats Everything");
		        		  $('#morep').html('');	
			           }
		        	  else
		        		  {

				        	$('#morep').html('');		
				        	$('#morep').append('<br/><a href=\"#\" onclick=\"fplacement(\'p\',\''+(count)+'\')\">more..</a>');
		        		  
		        		  }
		        }
		        		else if(e== 'a')
				        { 
				        			for(var i in data.id){
				        				
				        $('#articlelist').append('<li> <h2>'+data.name[i]+'</h2><p>'+data.des[i]+'</p><p><a href="#" onclick=\"getcontents(this.id)\" id=\"'+data.id[i]+'\" >Read More</a></p><p>Last Modified:'+data.time[i]+'</p></li>');
				         $('#articlelist').listview('refresh');
				        
				         count++;
				        			}
				        	
				        	

				        	  if( data['id'].length <1)
					           {alert("Thats Everything");
				        		  $('#morea').html('');	
					           }
				        	  else
				        		  {

						        	$('#morea').html('');		
						        	$('#morea').append('<br/><a href=\"#\" onclick=\"fplacement(\'a\',\''+(count)+'\')\">more..</a>');
				        		  
				        		  }
				        }
		        		
		        		else if(e== 'm')
				        { 
				        			for(var i in data.id){
				        				
				        $('#studylist').append('<li> <h2>'+data.name[i]+'</h2><p>'+data.des[i]+'</p><p><a href=\"'+data.content[i]+'\"  >Download</a></p><p>Last Modified:'+data.time[i]+'</p></li>');
				         $('#studylist').listview('refresh');
				        
				         count++;
				        			}
				        	
				        	

				        	  if( data['id'].length <1)
					           {alert("Thats Everything");
				        		  $('#morem').html('');	
					           }
				        	  else
				        		  {

						        	$('#morem').html('');		
						        	$('#morem').append('<br/><a href=\"#\" onclick=\"fplacement(\'m\',\''+(count)+'\')\">more..</a>');
				        		  
				        		  }
				        }
		        		
		        		

		    
		    else if(e== 's')
		        {
		    	for(var i in data.id){
    				
			        $('#symposiumlist').append('<li> <h2>'+data.name[i]+'</h2><p>'+data.des[i]+'</p><p><a href="#" onclick=\"getcontents(this.id)\" id=\"'+data.id[i]+'\" >Read More</a></p><p>Last Modified:'+data.time[i]+'</p></li>');
			         $('#symposiumlist').listview('refresh');
			        
			         count++;
			        			}
			        	
			        	

			        	  if( data['id'].length <1)
				           {alert("Thats Everything");
			        		  $('#mores').html('');	
				           }
			        	  else
			        		  {

					        	$('#mores').html('');		
					        	$('#mores').append('<br/><a href=\"#\" onclick=\"fplacement(\'s\',\''+(count)+'\')\">more..</a>');
			        		  
			        		  }
		    	}
		     
		    
		        		 
		        	
		        	
		        	}
		    });
		}