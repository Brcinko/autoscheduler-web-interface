window.onload = function () { 
	getHosts();
	getGeneralStats();
	displayBasicCharts();
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
		    console.log(item);
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
	        console.log(http.responseText);
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
	        console.log(stats);
	        //toto sa potom moze kludne premenovat a v cykle do vkladania objectu dat aj x os
	        var y_line = new Object();
	        y_line.items = [];
	        for (var i = 0; i < stats.length; i++) { 
			    y_line.items.push({y: stats[i].meta.date});
			}
			console.log(y_line);
	    }
	}
}


function renderChart(chartID, chartName) {
	var chart = new CanvasJS.Chart(chartID, {
		theme: "theme1",//theme1
		title:{
			text: chartName              
		},
		animationEnabled: true,   // change to true
		data: [              
		{
			// Change type to "bar", "area", "spline", "pie",etc.
			type: "column",
			dataPoints: [
				{ label: "apple",  y: 10  },
				{ label: "orange", y: 15  },
				{ label: "banana", y: 25  },
				{ label: "mango",  y: 30  },
				{ label: "grape",  y: 28  }
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
