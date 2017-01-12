//API call
var request = new XMLHttpRequest();
request.open("GET", "http://localhost:8080/get_conf", true);
request.send(null);


window.onload = function() {
	//get data from response
	obj = request.onreadystatechange = function() {
	  if (request.readyState == 4 && request.status == 200) {
	    // console.log(request.response);
	    obj = JSON.parse(request.responseText);
	    console.log(obj);
	    return obj;
	  }
	}
	
	for (k in obj.settings) {
	   // console.log(k, obj.settings[k].conf_status);
	   //change status clmn in table
	   var td_class = "td-" + obj.settings[k].conf_status;
	   try{
		   document.getElementById(obj.settings[k].filter_name).className = td_class;
		   document.getElementById(obj.settings[k].filter_name).innerHTML = obj.settings[k].conf_status;
		} catch(err)
		{

		}
	}

}


