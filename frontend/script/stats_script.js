window.onload = function () { 
	getHosts();
	getGenerallStats();
}

function getResponse(request) {
	request.onreadystatechange = function() {
	  if (request.readyState == 4 && request.status == 200) {
	    obj = JSON.parse(request.responseText);
	    console.log(obj);
	    return obj;
	  }
	}
}

function getHosts(){
	var request = new XMLHttpRequest();
	request.open("GET", "http://localhost:8080/get_hosts_list", true);
	request.send(null);
	//get data from response
	var obj = getResponse(request);
	obj = request.onreadystatechange = function() {
	  if (request.readyState == 4 && request.status == 200) {
	    // console.log(request.response);
	    obj = JSON.parse(request.responseText);
	    console.log(obj);
	    var box = document.getElementById("host-select");
		obj.hosts.forEach(function(item){
		    console.log(item);
		    var opt = document.createElement("option");
		    
		    opt.value = item
		    opt.innerHTML = item;
		    box.appendChild(opt);
		});
	    return obj;
	  }
	}
	console.log(obj);
	
}

function setHost(){
	var x = document.getElementById("host-select").selectedIndex;
	var host = document.getElementById("host-select").options;
	var call_data = "host_id=" + host[x].text;
	console.log(call_data);
	// GET request
	var http = new XMLHttpRequest();
	http.open("GET", "http://localhost:8080/get_stats_by_host?"+call_data, true);
	http.onreadystatechange = function()
	{
	    if(http.readyState == 4 && http.status == 200) {
	        alert(http.responseText);
	    }
	}
	http.send(null);
}

function getGenerallStats(){


}

