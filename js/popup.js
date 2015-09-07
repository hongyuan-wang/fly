$(function(){
	//show mode status
	var proxyer = chrome.extension.getBackgroundPage().proxyer;
	if(proxyer.status == "off") {
		$('#status-toggle').bootstrapToggle('off');
	} else {
		$('#status-toggle').bootstrapToggle('on');
	}
	
	$("#status-toggle").change(function(){
		if($(this).prop('checked')) {
			proxyer.start();
			chrome.browserAction.setIcon({path: 'img/icon-on.png'});
		} else {
			proxyer.stop();
			chrome.browserAction.setIcon({path: 'img/icon-off.png'});
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
			
			proxyer.start();
			$('#status-toggle').bootstrapToggle('on');
		});
	});
	
	chrome.tabs.query({active:true}, function(tabs){
		var link = document.createElement("a");
		link.href = tabs[0].url;
		$("#curr-domain").html(link.hostname);
	});
	
	
});
	
