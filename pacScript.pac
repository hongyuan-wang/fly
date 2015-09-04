function FindProxyForURL(url, host) {
	if(host== 'twitter.com' || host == 'www.google.com' || host == 'www.google.com.sg') {
		return 'PROXY 127.0.0.1:8080';
	}
	return 'DIRECT';
}