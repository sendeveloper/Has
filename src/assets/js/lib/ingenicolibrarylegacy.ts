export class Ingenicolibrarylegacy{
	constructor(){

	}
	hasActiveXobject: any;
	activeXRequestType: any;
	initLegacy() {
	
		try{
			
			this.log("IngenicoLibraryWS.initLegacy");
					
			this.hasActiveXobject = CreateHASActiveX();
		
			var isScreenPopAXCreated = CreateHASScreenPopAX();
					
			if(!(this.hasActiveXobject && isScreenPopAXCreated ))
			{
				return false;
			}
				
			
			this.log("activeX created");
			
			this.activeXRequestType = "";
			
			return true;
			
		} catch(e){
			this.log(e.message);
			return false;
		}
	};

	ConnectSentryContinueous() {			
		if(typeof HASScreenPopAX != "undefined"){
			this.log("HASScreenPopAX connecting to sentry..");
			var returnCode = HASScreenPopAX.ConnectSentryContinueous(this.ClientName);
		}
	};

	ConnectSentry() {			
		if(typeof HASScreenPopAX != "undefined"){
			this.log("HASScreenPopAX connecting to sentry..");
			var returnCode = HASScreenPopAX.ConnectSentry(this.ClientName);
		}
	};
	// Duplicate function
	// getMACAddress() {
	// 	this.activeXRequestType = "";
	// 	var macAddress = '';
	// 	// var macAddress = CashDrawerComm.GetLocalMACIdentifier();
	// 	this.onMacAddressHandler(macAddress);
	// };

	// Duplicate function
	// getComputerName(){
	// 	this.activeXRequestType = "";
	// 	this.log("getting computer name from activeX");
	// 	// var computerName = window.significantpos.GetComputerName();
	// 	var computerName = "";
	// 	this.onComputerNameHandler(computerName);
	// };

	// Duplicate function
	// openCashDrawer() {
	// 	this.activeXRequestType = "";
	// 	this..log("opening cashDrawer from activeX");
	// 	CashDrawerComm.SendDrawerData("COM1", 9600, 1, 7, 1, "[[");
	// 	//HTML Legacy Library
	// 	if(verifySignificantPOSObjectAndDevice(significantpos))
	// 	{
	// 		window.significantpos.OpenDrawer();
	// 	}
	// };

	// Duplicate function
	// launchQuikView(ban, msisdn, ssoToken, channel) {
	// 	this.activeXRequestType = "";
	// 	try{
	// 		if(this.hasActiveXobject != null){
	// 			this.hasActiveXobject.launchQuikView(ban, msisdn, ssoToken, channel);
	// 		} else {
	// 			this.onErrorMessageHandler("activeX for QV not present.");
	// 		}				
	// 	} catch(e){
	// 		this.log("error in launchQuikView, error: " + e.message);
	// 		this.onErrorMessageHandler(e.message);
	// 	}			
	// };
}

var HASScreenPopAX;
var ingenicolibraryws = new IngenicoLibraryWS();

function addActiveXEventListers(obj, _strEventId, _functionCallback) {

	// if(document.attachEvent){		
	// 	obj.attachEvent(_strEventId, _functionCallback); 
	// }	
	// else{
	// 	var handler;
	// 	try {
			
	// 	   // handler = document.createElement("script");
	// 	   // handler.setAttribute("for", obj.id);
	// 	   // handler.setAttribute("event", _strEventId);

	// 	   var scriptText = _functionCallback.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];
	// 	   // handler.appendChild(document.createTextNode(scriptText));
	// 	   // document.body.appendChild(handler);
	// 	}
	// 	catch(ex) {
	// 	   IngenicoLibraryWS.log("coudn't add addActiveXEventListers. exception : " + e.message );
	// 	}
		
	// }
}

function CreateHASActiveX(){
	var hasActiveXobject = null;
	try{
		// hasActiveXobject = new ActiveXObject("HASActiveX.HASActiveXControl");
	} catch (e){		
		// IngenicoLibraryWS.log("Error in CreateHASActiveX : " + e.message);
		ingenicolibraryws.log("Error in CreateHASActiveX : " + e.message);
	}	
	return hasActiveXobject;
}

function HASScreenPopAX_OnHASSentryProxyConnected () {
	// IngenicoLibraryWS.log("on sentry connected " );
	// IngenicoLibraryWS.onScreenPopReadyHandler("HAS Sentry Proxy connected.");
	ingenicolibraryws.log("on sentry connected " );
	ingenicolibraryws.onScreenPopReadyHandler("HAS Sentry Proxy connected.");
}
function HASScreenPopAX_OnHASSentryProxyConnectionError() {
	// IngenicoLibraryWS.log("OnSentryConnectionError : "  );
	// IngenicoLibraryWS.onErrorMessageHandler("HAS Sentry Proxy connection error.");
	ingenicolibraryws.log("OnSentryConnectionError : "  );
	ingenicolibraryws.onErrorMessageHandler("HAS Sentry Proxy connection error.");
}
function HASScreenPopAX_OnHASSentryProxyMessage() {
	var data = arguments[0];
	// IngenicoLibraryWS.log("OnSentryMessage: " + data );
	ingenicolibraryws.log("OnSentryMessage: " + data );
	var obj = JSON.parse(data);
	switch(obj.type){
		case "DATA": 
			// IngenicoLibraryWS.onScreenPopHandler(JSON.parse(data));
			ingenicolibraryws.onScreenPopHandler(JSON.parse(data));
			break;
		case "SENTRYCONNECTED": 
			// IngenicoLibraryWS.onScreenPopReadyHandler(JSON.parse(data));
			ingenicolibraryws.onScreenPopReadyHandler(JSON.parse(data));
			break;
		case "SENTRYDISCONNECTED": 		
			// IngenicoLibraryWS.onErrorMessageHandler("Sentry Connection Error.");
			ingenicolibraryws.onErrorMessageHandler("Sentry Connection Error.");
			break;
		default: break;			
	}
}
	
function CreateHASScreenPopAX(){
	
	// IngenicoLibraryWS.log("Creating HASScreenPopAX..");
	ingenicolibraryws.log("Creating HASScreenPopAX..");
	
	try{
		// var actX  = new ActiveXObject("HASScreenPopActiveX.ScreenPopActiveX");

		// var object = document.createElement('object');
		// object.setAttribute('classid','CLSID:E6FBED50-B20E-4AB2-820B-F20EDE117A3F');
		// object.setAttribute('id',         'HASScreenPopAX');
		// object.setAttribute('width',      '0');
		// object.setAttribute('height',     '0');
		// document.body.appendChild(object);
	
		// IngenicoLibraryWS.log("setting event handlers for HASScreenPopAX.");	
		ingenicolibraryws.log("setting event handlers for HASScreenPopAX.");	
		addActiveXEventListers(HASScreenPopAX, "OnHASSentryProxyConnected", HASScreenPopAX_OnHASSentryProxyConnected);
		addActiveXEventListers(HASScreenPopAX, "OnHASSentryProxyConnectionError", HASScreenPopAX_OnHASSentryProxyConnectionError);
		addActiveXEventListers(HASScreenPopAX, "OnHASSentryProxyMessage", HASScreenPopAX_OnHASSentryProxyMessage);		
		
		// IngenicoLibraryWS.log(JSON.stringify(HASScreenPopAX));
		ingenicolibraryws.log(JSON.stringify(HASScreenPopAX));
		if(typeof HASScreenPopAX != "undefined"){
			// IngenicoLibraryWS.log("HASScreenPopAX connecting to sentry..");		
			ingenicolibraryws.log("HASScreenPopAX connecting to sentry..");		
			// var returnCode = HASScreenPopAX.ConnectSentryContinueous(IngenicoLibraryWS.ClientName);
			var returnCode = HASScreenPopAX.ConnectSentryContinueous(ingenicolibraryws.ClientName);
		}
		else{
			// IngenicoLibraryWS.log("HASScreenPopAX not present");
			ingenicolibraryws.log("HASScreenPopAX not present");
		}
	}
	catch(ex) {
	    // IngenicoLibraryWS.log("coudn't add addActiveX. exception : " + ex.message );
	    ingenicolibraryws.log("coudn't add addActiveX. exception : " + ex.message );
		return false;
	}
	
	return true;
}
