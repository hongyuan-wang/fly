chrome.storage.sync.get("domain-list", function(items){
	if(typeof(items['domain-list']) == "undefined") {
		chrome.storage.sync.set({"domain-list": []});
	}
});

var proxyer = {
		status : "on",
		start : function(){
			chrome.storage.sync.get("domain-list", function(items){
				var hostCondition = "";
				if(items['domain-list'].length != 0) {
					for(var i=0; i<items['domain-list'].length; i++) {
						hostCondition += "host == '" + items['domain-list'][i] + "' || ";
						hostCondition += "host.match( '/" + items['domain-list'][i] + "') != null || ";
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
			// var config = {mode:"system 	"};
			// chrome.proxy.settings.set({value: config, scope: 'regular'});
			var config = {
					mode: "pac_script",
					pacScript: {
						data: "function FindProxyForURL(url, host) {\n" +
						  "			return 'PROXY 127.0.0.1:8080';}"
					}
				};
			chrome.proxy.settings.set({value: config, scope: 'regular'});
			
			this.status = "off";
		}
	}
	
proxyer.start();

//buffer to store timeout-domains
var buffer = [];
chrome.webRequest.onErrorOccurred.addListener(
	function(details){
		if(details.error == "net::ERR_CONNECTION_TIMED_OUT") {
			var link = document.createElement("a");
			link.href = details.url;
			buffer.push(link.hostname);
		}
	},
	{urls: ["<all_urls>"]}
);