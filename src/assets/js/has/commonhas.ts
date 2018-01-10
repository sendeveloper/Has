export class Commonhas{
	constructor(){
		
	}
	getComputerName() {
		this.log("Common getComputerName");
		var getComputerNameRequest: any = {};
		getComputerNameRequest.type = "COMMON";
		getComputerNameRequest.commonRequest = {};
		getComputerNameRequest.commonRequest.type = "GetComputerName";
		this.sendMessageToSocketServer(getComputerNameRequest);
	};

	//Gets current active physical mac address. Replacement for CSCD.dll
	getMACAddress() {
		this.log("Common getMACAddress");
		var getMACAddressRequest: any = {};
		getMACAddressRequest.type = "COMMON";
		getMACAddressRequest.commonRequest = {};
		getMACAddressRequest.commonRequest.type = "GetMACAddress";
		this.sendMessageToSocketServer(getMACAddressRequest);
	};


	getHASVersion() {
		this.log("Common getHASVersion");
		var getHASVersionRequest: any = {};
		getHASVersionRequest.type = "COMMON";
		getHASVersionRequest.commonRequest = {};
		getHASVersionRequest.commonRequest.type = "HASVERSION";
		this.sendMessageToSocketServer(getHASVersionRequest);
	};

	launchQuikView(ban, msisdn, ssoToken, channel) {
		this.log("Common launchQuikView");
		var launchQVRequest: any = {};
		launchQVRequest.type = "COMMON";
		launchQVRequest.commonRequest = {};
		launchQVRequest.commonRequest.type = "LaunchQuickView";
		launchQVRequest.commonRequest.quikVeiwRequest = {};
		launchQVRequest.commonRequest.quikVeiwRequest.accountNumber = ban;
		launchQVRequest.commonRequest.quikVeiwRequest.phoneNumber = msisdn;
		launchQVRequest.commonRequest.quikVeiwRequest.ssoToken = ssoToken;
		launchQVRequest.commonRequest.quikVeiwRequest.channel = channel;
		this.sendMessageToSocketServer(launchQVRequest);
	};

	//Opens Cash Drawer. Will attempt to open USB Cash Drawer first. If it is not present fall back to Serail cash Drawer.
	openCashDrawer() {
		this.log("Common openCashDrawer");
		var openDrawerMsg: any = {};
		openDrawerMsg.type = "COMMON";
		openDrawerMsg.commonRequest = {};
		openDrawerMsg.commonRequest.type = "OpenDrawer";
		this.sendMessageToSocketServer(openDrawerMsg);
	};

	onMacAddressHandler(macAddress) {};
	onComputerNameHandler(computerName) {};
	onHASVersionHandler(versionNumber) {};

	commonHASHandler(common) {
		this.log("Common Handler");
		if (this.isNotNullOrEmpty(common)) {
			if (common.type.toUpperCase() === "COMPUTERNAME") {
				this.log("Common Computer Handler: " + common.computerName);
				this.onComputerNameHandler(common.computerName);
			} else if (common.type.toUpperCase() === "MACADDRESS") {
				this.log("Common MAC Handler: " + common.macAddress);
				this.onMacAddressHandler(common.macAddress);
			} else if (common.type.toUpperCase() === "HASVERSION") {
				this.log("Common HAS VERSION: " + common.hasVersion);
				this.onHASVersionHandler(common.hasVersion);
			} else if (common.type.toUpperCase() === "ERROR") {
				this.log("Common Error Handler: " + common.error);
				this.onErrorMessageHandler(common.error);
			}
		}
	};
}