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
		var domainBtn = this;
		chrome.storage.sync.get("domain-list", function(items){
			if($(domainBtn).html() == "proxy this domain") {
				items['domain-list'].push(domain);
			} else {
				for(var i=0; i<items['domain-list'].length; i++) {
					if(items['domain-list'][i] == domain) {
						items['domain-list'].splice(i,1);
						break;
					}
				}
			}
			
			chrome.storage.sync.set({"domain-list": items['domain-list']});
		
			$('#status-toggle').bootstrapToggle('on');
			window.location.reload();
		});
	});
	
	chrome.tabs.query({active:true}, function(tabs){
		var link = document.createElement("a");
		link.href = tabs[0].url;
		$("#curr-domain").html(link.hostname);
		$("#domain-icon").attr("src", tabs[0].favIconUrl);
		
		chrome.storage.sync.get("domain-list", function(items){
			for(var i=0; i<items['domain-list'].length; i++) {
				if(items['domain-list'][i] == link.hostname) {
					$("#proxy-domain").html("direct this domain");
					return;
				}
			}
			$("#proxy-domain").html("proxy this domain");
		});
	});
	
	
});
	
