$(function(){
	//show mode status
	var proxyer = chrome.extension.getBackgroundPage().proxyer;
	if(proxyer.status == "off") {
		$("#turn-mode").html("off");
	} else {
		$("#turn-mode").html("on");
	}
	
	$("#turn-mode").click(function(){
		var mode = $("#turn-mode").html().trim();
		if(mode == "off") {
			proxyer.start();
			$("#turn-mode").html("on");
		} else {
			proxyer.stop();
			$("#turn-mode").html("off");
		}
	});
	
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
	
	chrome.tabs.query({active:true}, function(tabs){
		var link = document.createElement("a");
		link.href = tabs[0].url;
		$("#curr-domain").html(link.hostname);
	});
	
	
});
	
