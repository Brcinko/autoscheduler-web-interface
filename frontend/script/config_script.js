
window.onload = function() {
	setLastConfigStatus();
	setConfigTable();
}


//set status bar on the top of the page
function setLastConfigStatus(){
	var request = new XMLHttpRequest();
	request.open("GET", "http://localhost:8080/get_last_conf", true);
	request.send(null);
	request.onreadystatechange = function()
	{
	    if(request.readyState == 4 && request.status == 200) {
	        //console.log(http.responseText);
	        var date = request.responseText;
	        document.getElementById("last-config-text").innerHTML = "Last config update: " + date;

	    }
	}
}



function setConfigTable() {
	//API call
	var request = new XMLHttpRequest();
	request.open("GET", "http://localhost:8080/get_conf", true);
	request.send(null);

	//get data from response
	obj = request.onreadystatechange = function() {
	  if (request.readyState == 4 && request.status == 200) {
	    // console.log(request.response);
	    obj = JSON.parse(request.responseText);
	    //console.log(obj);
	   for (k in obj.settings.filters) {
		   //console.log(obj.settings)
		   //console.log(k, obj.settings.filters[k].conf_status);
		   //change status clmn in table
		   var td_class = "td-" + obj.settings.filters[k].conf_status.toLowerCase();
		   try{
			   console.log(td_class.toLowerCase(), obj.settings.filters[k].conf_status.toLowerCase())
			   document.getElementById(obj.settings.filters[k].filter_name).className = td_class.toString().toLowerCase();
			   document.getElementById(obj.settings.filters[k].filter_name).innerHTML = obj.settings.filters[k].conf_status.toLowerCase();
			} catch(err)
			{
				console.log(err);
			}
		}
		for (k in obj.settings.weights){
			try{
				console.log(obj.settings.weights[k].weight_value);
				document.getElementById(obj.settings.weights[k].weight_name).innerHTML = obj.settings.weights[k].weight_value;

			} catch(err){
				console.log(err);
			}
		}
	  }
	}
	


}


