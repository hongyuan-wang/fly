$(function(){
	$("#proxy-domain").click(function(){
		var domain = $("#curr-domain").html().trim();
		chrome.storage.sync.get("domain-list", function(items){
			if(typeof(items['domain-list']) == "undefined") {
				chrome.storage.sync.set({"domain-list": [domain]});
			} else {
				items['domain-list'].push(domain);
				chrome.storage.sync.set({"domain-list": items['domain-list']});
			}
			//console.log(items['domain-list']);
		});
	});
	
	$("#turn-mode").click(function(){
		var mode = $("#turn-mode").html().trim();
		if(mode == "on") {
			//use proxy
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
			$("#turn-mode").html("off");
		} else {
			$("#turn-mode").html("on");
		}
	});
	chrome.tabs.query({active:true}, function(tabs){
		var link = document.createElement("a");
		link.href = tabs[0].url;
		$("#curr-domain").html(link.hostname);
	});
	
	
});
	
