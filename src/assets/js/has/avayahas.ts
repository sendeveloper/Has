import { Has } from './has';

export class Avayahas extends Has{
	constructor(){

	}
	onScreenPopReadyHandler(data){
	}
	onScreenPopHandler(object){
	}
	avayaOnMessageHandler(avaya){
		this.log("Avaya Handler");
		if (this.isNotNullOrEmpty(avaya)) {
			switch (avaya.type.toUpperCase()) {
			case "CONNECTED":
				this.log("Avaya onScreenPopReadyHandler " + avaya);
				this.onScreenPopReadyHandler(avaya);
				break;
			case "DISCONNECTED":
				this.log("Avaya Connection Handler");
				this.onErrorMessageHandler("Screen Pop Connection Error.");
				break;
			case "DATA":
				this.log("Avaya onScreenPopHandler " + avaya);
				this.onScreenPopHandler(avaya);
				break;
			}
		}
	}
}
