window.onload = function () { 
	setLastConfigStatus();
	getHosts();
	getGeneralStats();
	displayBasicCharts();
}

//this should be taken from database probably
var average_parameters = ['hardware.system_stats.io.used','hardware.memory.used'];
var metric_parameters = ['hardware.system_stats.io.used','hardware.memory.used'];
var host_chart_id = ['host-io-chart','host-ram-chart'];
var general_chart_id = ['general-io-chart','general-ram-chart'];

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
	    //console.log(obj);
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
	//console.log(call_data);
	// GET request
	var http = new XMLHttpRequest();
	http.open("GET", "http://localhost:8080/get_stats_by_host?"+call_data, true);
	http.onreadystatechange = function()
	{
	    if(http.readyState == 4 && http.status == 200) {
	        //console.log(http.responseText);
	        var stats = JSON.parse(http.responseText);
	        for(x = 0; x < general_chart_id.length; x++){
	        	metricData = setChartData(metric_parameters[x], stats);
	        	averageData = setChartData(average_parameters[x], stats);
				try{
					renderChart(host_chart_id[x], "Host Ram Chart", averageData, metricData);
				}catch(err){
					console.log(err);
				}
			}

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
	        for(x = 0; x < general_chart_id.length; x++){
	        	metricData = setChartData(metric_parameters[x], stats);
	        	averageData = setChartData(average_parameters[x], stats);
				try{
					renderChart(general_chart_id[x], "General Ram Chart", averageData, metricData);
				}catch(err){
					console.log(err);
				}
			}
	    }
	}
}


function setChartData(parameter, stats){
    var data = new Object();
    data.type = "line";    
    data.dataPoints = [];
    for (var i = 0; i < stats.length; i++) { 
	    date = stats[i].meta.date.substring(0,10);
	    var obj = stats[i];
	    for (var j = 0; j < obj.stats.length; j++){
			if (obj.stats[j].stat_name == parameter){
			    data.dataPoints.push({x: date,
			    				 y:	parseFloat(obj.stats[j].value)});
			}
		}
	}
	console.log(data);
	return data;
}


function renderChart(chartID, chartName, averageData, metricData) {
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
			metricData, averageData
		]
	});
	chart.render();
}


function displayBasicCharts(){
	var averageData = {	// dataSeries 2 - average values
		   	type: "line",
			   dataPoints:[
			    {x:1, y:8}, //dataPoint
			    {x:2, y:9}, //dataPoint
			    {x:5, y:4} //dataPoint
			]
		};
	var metricData = 		{ 	//metric values
			// Change type to "bar", "area", "spline", "pie",etc.
			type: "line",
			dataPoints: [
				{ label: "apple",  y: 10  },
				{ label: "orange", y: 15  },
				{ label: "banana", y: 25  },
				{ label: "mango",  y: 30  },
				{ label: "grape",  y: 28  }
			]
		};


	renderChart("host-ram-chart", "Host Ram Chart", averageData, metricData);
	renderChart("host-io-chart", "Host IO Chart", averageData, metricData);

	renderChart("general-ram-chart", "General RAM Chart", averageData, metricData);
	renderChart("general-io-chart", "General IO Chart", averageData, metricData);

}
