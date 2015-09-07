var proxyer = {
		status : "on",
		start : function(){
			chrome.storage.sync.get("domain-list", function(items){
				var hostCondition = "";
				if(typeof(items['domain-list']) != "undefined") {
					for(var i=0; i<items['domain-list'].length; i++) {
						hostCondition += "host == '" + items['domain-list'][i] + "' || ";
					}
					hostCondition = hostCondition.substring(0, hostCondition.lastIndexOf("||"));
				} else {
					hostCondition = 'false';
				}
				
				var config = {
					mode: "pac_script",
					pacScript: {
						data: "function FindProxyForURL(url, host) {\n" +
						  "		if(" + hostCondition + ") {\n" +
						  "			return 'PROXY 127.0.0.1:8080';\n" +
						  "     }\n" +
						  "return 'DIRECT';}"
					}
				};
				chrome.proxy.settings.set({value: config, scope: 'regular'});
			});
			this.status = "on";
			
		},
		stop : function(){
			var config = {mode:"system"};
			chrome.proxy.settings.set({value: config, scope: 'regular'});
			this.status = "off";
		}
	}
	
proxyer.start();