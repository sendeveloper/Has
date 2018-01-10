import { Ingenicoresourceshas } from './ingenicoresourceshas';

export class Has extends Ingenicoresourceshas{
	constructor(){
		
	}
	setCookie(strName, sid) {
		document.cookie = strName + "=" + sid;
	};
	deleteCookie(name) {
	    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	};
	getCookieVal(offset) {
		var endStr = document.cookie.indexOf(";", offset);
		if (endStr === -1) {
			endStr = document.cookie.length;
		}

		return document.cookie.substring(offset, endStr);
	};
	getCookie(name) {
		var arg = name + "=",
			alen = arg.length,
			clen = document.cookie.length,
			i = 0,
			j;

		while (i < clen) {
			j = i + alen;
			if (document.cookie.substring(i, j) === arg) {
				return this.getCookieVal(j);
			}

			i = document.cookie.indexOf(" ", i) + 1;
			if (i === 0) {
				break;
			}
		}
		return null;
	};
	connectionOpeningHappened = false;
	debug = false;
	isUnitTest = false;
	ClientName = "";

	onConnectedHandler(message) {};
	closeHandler() {};
	onConnectionErrorHandler(evtData) {};
	onErrorMessageHandler(message) {};

	init(port, clientName) {
		if (!this.isNotUndefinedOrNullOrEmpty(port)) {
			this.onConnectionErrorHandler("Port value is missing from initialization request/call. Please provide the port number.");
			return;
		}
		
		if (!this.isNotUndefinedOrNullOrEmpty(clientName)) {
			this.onConnectionErrorHandler("clientName is missing from initialization request/call. Please provide the clientName");
			return;
		}
		
		this.ClientName = clientName;
		this.connect(port, clientName);
	};

	log(msg) {
		if (this.debug && window.console) {
			console.log(msg);
		}
	};

	isNotNullOrEmpty(expectedData) {	
		return (expectedData !== null && expectedData !== "");
	};

	isNotUndefinedOrNull(expectedData){
		return (typeof expectedData !== "undefined" && expectedData != null);
	};

	isNotUndefinedOrNullOrEmpty(expectedData){
		return (this.isNotUndefinedOrNull(expectedData) && expectedData !== "");
	};

	isFunciton(name){
		return (typeof name === "function");
	};

	getWebSocketObject(websocketSupport, url) {
		return new window[websocketSupport](url);
	};

	time = new Date();
	nowebsocketSupportMessage = "Your browser does not support WebSocket!";
	socketConnection = null;

	sendMessageToSocketServer(jr) {
		if (this.socketConnection !== undefined && this.isNotNullOrEmpty(this.socketConnection)) {
			if (this.socketConnection && this.socketConnection.readyState === this.socketConnection.OPEN) {
				var finalRequest = JSON.stringify(jr);
				if(finalRequest.length <= 1600) {
					this.socketConnection.send(JSON.stringify(jr));
				} else {
					this.onErrorMessageHandler("Request was too large, Request must be less than 1024 bytes");
				}
			} else {
				this.onErrorMessageHandler("WebSocket not connected to send message, connection state: " + this.socketConnection.readyState);
			}
		} else {
			this.onErrorMessageHandler("No websocket session to send message.");
		}
	};

	isConnected() {
	    return (this.socketConnection.readyState === this.socketConnection.OPEN);
	}

	connect(port, clientName) {
		this.connectionOpeningHappened = false;
		
		try {
			var websocketSupport = window.hasOwnProperty("MozWebSocket") ? 'MozWebSocket' : (window.hasOwnProperty("WebSocket") ? 'WebSocket' : null);
			
			var HASConnectionType = this.getCookie("HASConnectionType");

			if ( (this.isNotNullOrEmpty(HASConnectionType) && HASConnectionType.toUpperCase() === "ACTIVEX") || !this.isNotNullOrEmpty(websocketSupport)) {
				if (window.hasOwnProperty("ActiveXObject") && this.isFunciton(this.initLegacy)) {
					if (this.initLegacy()) {
						this.setCookie("HASConnectionType", "ACTIVEX");
						this.onConnectedHandler("ActiveX Created");
					} else {
						this.connectSocketServer(websocketSupport, port, clientName);
					}
				} else {
					this.onConnectionErrorHandler(this.nowebsocketSupportMessage);
				}
			} else {
				this.connectSocketServer(websocketSupport, port, clientName);			
			}
		}
		catch(e)
		{
			this.log("Exception: " + e.message);
			this.onConnectionErrorHandler("Exception in creating HAS interface. error: " + e.message);
		}
	}	
			
	connectSocketServer(websocketSupport, port, clientName) {

		try {
			var self = this;
			this.deleteCookie("HASConnectionType");
			if (!this.isNotNullOrEmpty(clientName)) {
				clientName = "";
			}

			var url = 'wss://localhost:' + port + '/' + clientName;
			this.socketConnection = this.getWebSocketObject(websocketSupport, url);

			this.socketConnection.onopen = function() {
				self.connectionOpeningHappened = true;
				self.setCookie("HASConnectionType", "WEBSOCKET");
				self.onConnectedHandler("WebSocket session opened.");
			};

			this.socketConnection.onmessage = function(evt) {
				
				self.log(evt);
				var response = JSON.parse(evt.data);
				
				if(self.isNotNullOrEmpty(response))
				{				
					switch (response.type.toUpperCase()) {			
						case "ERROR":
								self.onErrorMessageHandler(response.error);
							break;
						case "COMMON":
							if (self.isFunciton(self.commonHASHandler) 
								&& self.isNotNullOrEmpty(response.commonResponse)) 
							{
								self.commonHASHandler(response.commonResponse);
							}
							break;
						case "INGENICO":
							if (self.isFunciton(self.ingenicoHASHandler) 
								&& self.isNotNullOrEmpty(response.ingenicoResponse)) 
							{
								self.ingenicoHASHandler(response.ingenicoResponse);
							}
							break;
						case "AVAYA":
							if (self.isFunciton(self.avayaOnMessageHandler) 
								&& self.isNotNullOrEmpty(response.avayaResponse)) 
							{
								self.avayaOnMessageHandler(response.avayaResponse);
							}
							break;
						default:
							self.log("no handller found.");
							break;
					}
				} else
				{				
					self.onErrorMessageHandler("Error: websocket response is null");
				}
			};

			this.socketConnection.onerror = function(evt) {
				self.log("onError: ");
				self.log(evt);
				if (!(window.hasOwnProperty("ActiveXObject") && (typeof self.initLegacy != "function")) 
					|| self.connectionOpeningHappened) {
					self.onConnectionErrorHandler("Error in Web socket Connection");
				}
			};

			this.socketConnection.onclose = function(event) {

				self.deleteCookie("HASConnectionType");
				self.log("Connection closed");
				self.log(event);

				if(self.connectionOpeningHappened)
				{				
					self.closeHandler();
				}
				else
				{				
					if (window.hasOwnProperty("ActiveXObject") 
						&& !self.connectionOpeningHappened 
						&& event.code === 1006
						&& self.isFunciton(self.initLegacy))
					{
						if (self.initLegacy()) {
							self.setCookie("HASConnectionType", "ACTIVEX");
							self.onConnectedHandler("ActiveX Created");
						} else {
							self.onConnectionErrorHandler("Cannot create HAS Websocket/ActiveX interface.");
						}
					} else {
						self.onConnectionErrorHandler("Cannot create HAS WebSocket interface.");
					}
				}
			};
		} catch (e) {
			this.log("Exception: " + e.message);
			this.onConnectionErrorHandler("Exception in creating HAS interface. error: " + e.message);
		}
	};
}