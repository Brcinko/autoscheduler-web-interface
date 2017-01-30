window.onload = function () { 
	setLastConfigStatus();
	getHosts();
	getGeneralStats();
	displayBasicCharts();
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

/*function getResponse(request) {
	request.onreadystatechange = function() {
	  if (request.readyState == 4 && request.status == 200) {
	    obj = JSON.parse(request.responseText);
	    console.log(obj);
	    return obj;
	  }
	}
}*/

function getHosts(){
	var request = new XMLHttpRequest();
	request.open("GET", "http://localhost:8080/get_hosts_list", true);
	request.send(null);
	//get data from response
	//var obj = getResponse(request);
	obj = request.onreadystatechange = function() {
	  if (request.readyState == 4 && request.status == 200) {
	    // console.log(request.response);
	    obj = JSON.parse(request.responseText);
	    console.log(obj);
	    var box = document.getElementById("host-select");
		obj.hosts.forEach(function(item){
		    //console.log(item);
		    var opt = document.createElement("option");
		    
		    opt.value = item
		    opt.innerHTML = item;
		    box.appendChild(opt);
		});
	    return obj;
	  }
	}
	//console.log(obj);
	
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
	        //console.log(http.responseText);
	        var stats = JSON.parse(http.responseText);

	    }
	}
	http.send(null);
}

function getGeneralStats(){
	var http = new XMLHttpRequest();
	http.open("GET", "http://localhost:8080/get_general_stats", true);
	http.send(null);
	http.onreadystatechange = function()
	{
	    if(http.readyState == 4 && http.status == 200) {
	        var stats = JSON.parse(http.responseText);
	        //console.log(stats);
	        //toto sa potom moze kludne premenovat a v cykle do vkladania objectu dat aj x os
	        var data = new Object();
	        data.dataPoints = [];
	        for (var i = 0; i < stats.length; i++) { 
			    date = stats[i].meta.date;
			    var obj = stats[i];
			    for (var j = 0; j < obj.stats.length; j++){
			    	console.log(obj.stats[j].value);
					if (obj.stats[j].stat_name == "hardware.disk.used"){
					    data.dataPoints.push({x: date,
					    				 y:	obj.stats[j].value});
					}
				}
			}
			console.log(data);
	    }
	}
}


function renderChart(chartID, chartName) {
	var chart = new CanvasJS.Chart(chartID, {
		theme: "theme1",//theme1
		title:{
			text: chartName              
		},
		toolTip: {
        	enabled: false  //tooltip disable
      	},
		animationEnabled: true,   // change to true
		data: [              
		{ 	//metric values
			// Change type to "bar", "area", "spline", "pie",etc.
			type: "line",
			dataPoints: [
				{ label: "apple",  y: 10  },
				{ label: "orange", y: 15  },
				{ label: "banana", y: 25  },
				{ label: "mango",  y: 30  },
				{ label: "grape",  y: 28  }
			]
		},
 
		{	// dataSeries 2 - average values
		   	type: "line",
			   dataPoints:[
			    {x:1, y:8}, //dataPoint
			    {x:2, y:9}, //dataPoint
			    {x:3, y:4} //dataPoint
			]
		}
		]
	});
	chart.render();
}


function displayBasicCharts(){
	renderChart("host-ram-chart", "Host Ram Chart");
	renderChart("host-cpu-chart", "Host CPU Chart");
	renderChart("host-io-chart", "Host I/O Chart");
	renderChart("host-disk-chart", "Host Disk Chart");
	renderChart("general-ram-chart", "General RAM Chart");
	renderChart("general-cpu-chart", "General CPU Chart");
	renderChart("general-io-chart", "General I/O Chart");
	renderChart("general-disk-chart", "General Disk Chart");
}
