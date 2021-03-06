import { Ingenicohas } from './ingenicohas';

export class Avayahas extends Ingenicohas{
	constructor(){
		super();
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
