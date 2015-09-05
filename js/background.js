var proxyer = {
		status : "off",
		start : function(){
			var config = {
				mode: "pac_script",
				pacScript: {
					data: "function FindProxyForURL(url, host) {\n" +
					  "		if(host== 'twitter.com' || host == 'www.google.com' || host == 'www.google.com.sg') {\n" +
					  "			return 'PROXY 127.0.0.1:8080';\n" +
					  "     }\n" +
				      "return 'DIRECT';}"
				}
			};
			chrome.proxy.settings.set({value: config, scope: 'regular'});
			this.status = "on";
		},
		stop : function(){
			var config = {mode:"system"};
			chrome.proxy.settings.set({value: config, scope: 'regular'});
			this.status = "off";
		}
	}
	
proxyer.stop();