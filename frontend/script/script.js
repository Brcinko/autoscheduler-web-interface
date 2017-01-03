	console.log("idem robit request2");
	/*var request = XMLHttpRequest();
	request.open("GET", "http://localhost:8080/get_conf", true);
	request.send(null);
	print(request.responseText);*/
	//toto sa jaksik nefunguje zatial to musime zistit co s tym
	//toto pod tym je vramci vyvoja
	var obj = {
	"_id": 1,
    "settings": [
            {
                    "filter_name": "RamFilter",
                    "conf_status": "on"
            },
            {
                    "filter_name": "CoreFiler",
                    "conf_status": "on"
            },
            {
                    "filter_name": "IoOpsFilter",
                    "conf_status": "off"
            },
            {
                    "filter_name": "DiskFilter",
                    "conf_status": "on"
            },
            {
                    "filter_name": "ComputeFiler",
                    "conf_status": "on"
            },
            {
                    "filter_name": "JSONFilter",
                    "conf_status": "on"
            }
    ],
	"meta" : {
		"date" : "2014-10-01T00:00:00Z",
		"doc_version" : "0.2"
	}
};

window.onload = function() {
	for (k in obj.settings) {
	   console.log(k, obj.settings[k].conf_status);
	   //change status clmn in table
	   var td_class = ".td-" + obj.settings[k].conf_status;
	   console.log(td_class);
	   document.getElementById(obj.settings[k].filter_name).className = td_class;
	   console.log("mame classu");
	   document.getElementById(obj.settings[k].filter_name).innerHTML = obj.settings[k].conf_status;
	   


	}
}
