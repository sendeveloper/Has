import { Ingenicohas } from './has/ingenicohas';

export class IngenicoLibraryWS extends Ingenicohas{
	parentComponent: any;
	constructor(){
		this.parentComponent = null;
	}
	setParentComponent(t: any){
		this.parentComponent = t;
	}
	getParentComponent(){
		return this.parentComponent;
	}
	testFunc(){
		console.log('testing');
	}
	/*-------------------------------------------------------------------------------*/


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
}

