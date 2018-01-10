
export class IngenicoLibraryWS{
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
	CreateIdObject(){
		var obj = {
			LastName :"",
			FirstName :"", // First Name
			MiddleName :"", // Middle Name
			Suffix :"", // Suffix
			StreetAddress :"", // Address
			StreetAddress_2 :"", // Address 2
			City :"", // City
			State :"", // State
			ZIPCode :"", // Zip
			ZipExt :"", // Zip+4
			IDNumber :"",  // DL Number
			IDExpDate :"", // Exp Date
			DOB :"", // DOB Date
			IDIssueDate :"",
			RawData :""
		 };
		 return obj;
	 }
	// End Object Definitions
	version: any;
	LICENSE_REGEX: any;
	SUFFIX_REGEX: any;
	processId: any;
	processIdSwipe: any;
	IDParser()
	{	
		this.LICENSE_REGEX = new RegExp('^@(?:\\|{3}|\\x0A)?(?:\\x1E|\\x1C)?\\x0D?A(?:NSI|AMVA)\x20{0,2}\\d{0,12}DL\\d{0,8}');
		this.SUFFIX_REGEX = new RegExp('(?:\x20|,|@)([JS]R|I(?:[VX]|I{0,2})|VI{0,3}|(?:1ST|(?:2N|3R)D|[4-9]TH))$');
		
	    var getSuffix = function(suffix) {
	        switch(suffix) {
	            case '1ST':
	                return 'SR';
	                // break;
	            case 'I':
	                return 'SR';
	                // break;
	            case '2ND':
	                return 'JR';
	                // break;
	            case 'II':
	                return 'JR';
	                // break;
	            case 'III':
	                return '3RD';
	                // break;
	            case 'IV':
	                return '4TH';
	                // break;
	            case 'V':
	                return '5TH';
	                // break;
	            case 'VI':
	                return '6TH';
	                // break;
	            case 'VII':
	                return '7TH';
	                // break;
	            case 'VIII':
	                return '8TH';
	                // break;
	            case 'IX':
	                return '9TH';
	                // break;
	            default:
	                return suffix;
	        }
	    }
		
		var lastFirstMiddle = function(nameArray, idObj) {
			idObj.FirstName = nameArray[1];
			idObj.LastName = nameArray[0];
			switch (nameArray.length) {
				case 3:
					idObj.MiddleName = nameArray[2];
					break;
				case 4:
					idObj.MiddleName = nameArray[2];
					idObj.Suffix = nameArray[3];
					break;
				default:
					break;
			}
		}

		var firstMiddleLast = function(nameArray, idObj) {
			idObj.FirstName = nameArray[0];
			if(nameArray.length > 2) {
				idObj.MiddleName = nameArray[1];
				idObj.LastName = nameArray[2];
			} else {
				idObj.LastName = nameArray[1];
			}
		}

		var formatDate = function(dateString) {
			dateString = dateString.replace(/-/g, '');
			if (dateString.substring(4,6) > 12) {
				return dateString.substring(0,2) + '/' + dateString.substring(2,4) + '/' + dateString.substring(4);
			} else {
				return dateString.substring(4,6) + '/' + dateString.substring(6) + '/' + dateString.substring(0,4);
			}
		}

	    this.processId = function(idScanString) {
			var idObj = this.CreateIdObject();
			idObj.RawData = encodeURIComponent(idScanString);
			
	        idScanString = idScanString.replace(this.IDParser.LICENSE_REGEX, '');
	        idScanString = idScanString.replace(/^(?:[A-Z]{0,2}\d+)?(?:DL)?/, '');
	        idScanString = idScanString.replace(/\x0D/g, '');


	        var daa = '';
			
			var dlData;
			
			if(idScanString.match(/\|{3}/)) {
				dlData = idScanString.split(/\|{3}/);
			} else {
	        	dlData = idScanString.split(/\n/);
			}

	        for (var i = 0; i < dlData.length; i++) {
	            var line = dlData[i].trim();
	            var prefix = line.substring(0,3);
	            switch (prefix) {
	                case 'DAA':
	                    daa = line.substring(3);
	                    break;
	                case 'DAB':
	                    if ( suffix = line.match(this.IDParser.SUFFIX_REGEX) ) {
	                        idObj.Suffix = getSuffix(suffix[1]);
	                        suffixOffset = line.length - suffix[0].length;
	                        idObj.LastName = line.substring(3, suffixOffset);
	                    } else {
	                        idObj.LastName = line.substring(3);
	                    }
	                case 'DAC':
	                    idObj.FirstName = line.substring(3);
	                    break;
	                case 'DAD':
	                    idObj.MiddleName = line.substring(3);
	                    break;
	                case 'DAG':
	                    idObj.StreetAddress = line.substring(3);
	                    break;
	                case 'DAH':
	                    idObj.StreetAddress_2 = line.substring(3);
	                    break;
	                case 'DAI':
	                    idObj.City = line.substring(3);
	                    break;
	                case 'DAJ':
	                    idObj.State = line.substring(3);
	                    break;
	                case 'DAK':
	                    idObj.ZIPCode = line.substring(3,8);
	                    break;
	                case 'DAL':
	                    idObj.StreetAddress = line.substring(3);
	                    break;
	                case 'DAM':
	                    idObj.StreetAddress_2 = line.substring(3);
	                    break;
	                case 'DAN':
	                    idObj.City = line.substring(3);
	                    break;
	                case 'DAO':
	                    idObj.State = line.substring(3);
	                    break;
	                case 'DAP':
	                    idObj.ZIPCode = line.substring(3,8);
	                    break;
	                case 'DAQ':
	                    idObj.IDNumber = line.substring(3);
	                    break;
	                case 'DBB':
	                    idObj.DOB = formatDate(line.substring(3));
	                    break;
	                case 'DBD':
	                    idObj.IDIssueDate = formatDate(line.substring(3));
	                    break;
	                case 'DBA':
	                    idObj.IDExpDate = formatDate(line.substring(3));
	                    break;
	                case 'DCS':
	                    idObj.LastName = line.substring(3);
	                    break;
	                case 'DCT':
	                    var givenName = line.substring(3).split(' ');
	                    idObj.FirstName = givenName[0];
	                    if (givenName.length > 1)
	                        idObj.MiddleName = givenName[1];
	                    break;
	                case 'DCU':
	                    idObj.Suffix = getSuffix(line.substring(3));
	                    break;
	                default:
	                    break;
	            }
	        }

	        if(daa.length > 0) {
				var suffix = daa.match(this.IDParser.SUFFIX_REGEX);
	            if (suffix) {
	                idObj.Suffix = getSuffix(suffix[1]);
	                var suffixOffset = line.length - suffix[0].length;
	                daa = daa.substring(0, suffixOffset);
	            }

	            switch (idObj.State) {
	                case 'AL':
	                    firstMiddleLast(daa.split(','), idObj);
	                    break;
	                case 'CO':
	                    firstMiddleLast(daa.split(','), idObj);
	                    break;
	                case 'LA':
	                    daa = daa.replace(/,?\x20/g, ',');
	                    lastFirstMiddle(daa.split(','), idObj);
	                    break;
	                case 'NY':
	                    lastFirstMiddle(daa.split('@'), idObj);
	                    break;
	                case 'PA':
	                    firstMiddleLast(daa.split(' '), idObj);
	                    break;
	                case 'TN':
	                    firstMiddleLast(daa.split(' '), idObj);
	                    break;
	                case 'VA':
	                    daa = daa.replace(/,?\x20/g, ',');
	                    lastFirstMiddle(daa.split(','), idObj);
	                    break;
	                default:
	                    lastFirstMiddle(daa.split(','), idObj);
	                    break;
	            }
	        }

	        return idObj;
	    }

	    this.processIdSwipe = function(swipeData) {
	        var idObj = this.CreateIdObject();
			idObj.RawData = encodeURIComponent(swipeData.tracks.toString());
			
	        var cityData = '';
	        var nameData = '';
	        var addressData = '';

	        // Start Track 1 Data
	        var idDataT1 = swipeData.tracks[0];
	        idDataT1 = idDataT1.split('^');

	        var i = 0;
	        idObj.State = idDataT1[i].substring(1,3);
	        cityData = idDataT1[i].substring(3);

	        if (cityData.length > 13)	{
	            idObj.City = cityData.substring(0,13);
	            nameData = cityData.substring(13);
	        } else {
	            i++;
	            idObj.City = cityData;
	            nameData = idDataT1[i];
	        }

	        if (nameData.length > 35) {
	            nameData = nameData.substring(0,35);
	            addressData = nameData.substring(35);
	        } else {
	            i++;
	            addressData = idDataT1[i];
	        }

	        if (addressData.length > 29)
	            addressData = addressData.substring(0,29);

	        var idName = nameData.split('$');
	        var idAddress = addressData.split('$');

	        idObj.LastName = idName[0];
	        idObj.FirstName = idName[1];
	        if (idName.length > 2)
	            idObj.MiddleName = idName[2];

	        idObj.StreetAddress = idAddress[0];
	        if (idAddress.length > 1)
	            idObj.StreetAddress_2 = idAddress[1];
	        // End Track 1 Data

	        // Start Track 2 Data
	        var idDataT2 = swipeData.tracks[1];
	        idDataT2 = idDataT2.replace(/^;/, '');

	        if (idDataT2.substring(6,7) == '=')
	            idDataT2 = idDataT2.replace(/=/, '');

	        idDataT2 = idDataT2.split('=');

	        idObj.IDNumber = idDataT2[0].substring(6);

	        // Check for overflow after dates
	        if (idDataT2[1].length > 12)
	            idObj.IDNumber += idDataT2[1].substring(12);

	        idObj.IDExpDate = idDataT2[1].substring(2,4) + '/' + idDataT2[1].substring(10,12) + '/20' + idDataT2[1].substring(0,2);
	        if(idDataT2[1].substring(8,10) < 13) {
	            idObj.DOB = idDataT2[1].substring(8,10) + '/' + idDataT2[1].substring(10,12) + '/' + idDataT2[1].substring(4,8);
	        } else {  // Old CA DL
	            idObj.DOB = idDataT2[1].substring(2,4) + '/' + idDataT2[1].substring(10,12) + '/' + idDataT2[1].substring(4,8);
	        }
	        // End Track 2 Data

	        // Start Track 3 Data
	        var idDataT3 = swipeData.tracks[2];
	        if (idDataT3.substring(3,8).match(/\d{5}/))
	            idObj.ZIPCode = idDataT3.substring(3,8);
			
			var prefix;
	        switch(idObj.State) {
	            case 'AZ':	// AZ First Char is Letter and must be converted. format = 'D111222334445'
	                prefix = String.fromCharCode(Number(idObj.IDNumber.substring(0,2)) + 64);
	                idObj.IDNumber = prefix + idObj.IDNumber.substring(2);
	                break;
	            case 'CA':	// CA First Char is Letter and must be converted. format = 'C11122233444'
	                prefix = String.fromCharCode(Number(idObj.IDNumber.substring(0,2)) + 64);
	                idObj.IDNumber = prefix + idObj.IDNumber.substring(2, idObj.IDNumber.length - 1 );
	                break;
	            case 'FL':	// FL First Char is Letter and must be converted. format = 'P111-222-33-444-5'
	                prefix = String.fromCharCode(Number(idObj.IDNumber.substring(0,2)) + 64);
	                idObj.IDNumber = prefix + idObj.IDNumber.substring(2);
	                break;
	            default:
	                break;
	        }
	        return idObj;
	    }
		
		this.version = '1.0.0';
	}
	getCookieVal(offset) {
		var endStr = document.cookie.indexOf(";", offset);
		if (endStr === -1) {
			endStr = document.cookie.length;
		}

		return document.cookie.substring(offset, endStr);
	};


	/*-------------------------------------------------------------------------------*/
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

	captureLanguagePreferenceconnect(port, clientName) {
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

	setCookie(strName, sid) {
		document.cookie = strName + "=" + sid;
	};
	deleteCookie(name) {
	    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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

	onScreenPopReadyHandler(data) {};
	onScreenPopHandler(object) {};

	avayaOnMessageHandler(avaya) {
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
	};
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
	captureSigType = 'CAPTURE';
	creditSigType = 'CREDIT';
	cihuSigType = 'CIHU';
	drpSigType = 'DRP';
	tesaSigType = 'TESA';
	onFileSigType = 'ON_FILE';
	eipSigType = 'EIP';

	//used to control text on CLEAR Entry Forms
	createPIN = 'PIN_CREATE';
	enterPIN = 'PIN_ENTER';
	personalGuarantor = 'PERSONAL_GUARANTOR';
	lastFour = 'LAST_FOUR';
	primaryPhone = 'PRIMARY_PHONE';
	homePhone = 'HOME_PHONE';
	pNumber = 'P_NUMBER';
	fein = 'FEIN';
	ingSSN = 'SSN';
	emailType = 'EMAIL';

	//Used to control text on informational forms
	handPayType = 'HAND_PAY';
	informType = 'INFORM';
	declinedType = 'DECLINED';
	insufficientFundsType = 'INSUFFICIENT_FUNDS';
	timeOutType = 'TIME_OUT';
	pinErrorType = 'PIN_ERROR_DEBIT';
	pinErrorHybridType = 'PIN_ERROR_HYBRID';
	cvvErrorType = 'CVV_ERROR';
	expireErrorType = 'EXPIRED_ERROR';
	refundPinErrorType = 'REFUND_PIN_ERROR';
	systemUnavailable = 'SYSTEM_UNAVAILABLE';

	//English Buttons
	iAgreeButtonText = 'I AGREE';
	agreeButtonText = 'AGREE';
	declineButtonText = 'DECLINE';
	continueButtonText = 'CONTINUE';
	cancelButtonText = 'CANCEL';
	clearButtonText = 'CLEAR';
	acceptButtonText = 'ACCEPT';
	backButtonText = 'BACK';
	reEnterButtonText = 'RE-ENTER';
	englishButtonText = 'ENGLISH';
	hardwareButtonEnterText = 'Press the ENTER key to continue';
	hardwareButtonClearText = 'Press the CLEAR key to re-key';
	hardwareButtonCancelText = 'Press the CANCEL key to go back';


	//Spanish Buttons
	iAgreeButtonTextES = 'YO ACEPTO';
	agreeButtonTextES = 'ACEPTAR';
	doNotAgreeButtonTextES = 'NO ACEPTO';
	continueButtonTextES = 'CONTINUAR';
	declineButtonTextES = 'RECHAZO';
	cancelButtonTextES = 'CANCELAR';
	clearButtonTextES = 'BORRAR';
	backButtonTextES = 'REGRESAR';
	reEnterButtonTextES = 'REINGRESAR';
	spanishButtonTextES = 'ESPA&#209;OL';
	hardwareButtonEnterTextES = 'Presiona el bot&#243;n Aceptar para continuar';
	hardwareButtonClearTextES = 'Presiona el bot&#243;n Borrar para volver a ingresar los datos';
	hardwareButtonCancelTextES = 'Presiona el bot&#243;n Cancelar para regresar a la pantalla anterior';

	isVerifyDLCalled = false;
	driversLicObject = null;

	myDate: any = "";
	startTime: any = "";
	endTime: any = "";
	responseTime: any = "";

	//Form Text
	ccDisclaimerTextES = [
		{'index': '1', 'text': 'Autorizaci&#243;n para verificaci&#243;n de cr&#233;dito'},
		{'index': '2', 'text': 'Antes de continuar con la activaci&#243;n del servicio, nuestra pol&#237;tica establece que debemos verificar tu cr&#233;dito.'},
		{'index': '3', 'text': '&#191;Autorizas a T-Mobile a obtener informaci&#243;n sobre tu historial de cr&#233;dito?'},
		{'index': '4', 'text': this.iAgreeButtonTextES},
		{'index': '5', 'text': this.doNotAgreeButtonTextES}
	];

	ccDisclaimerText = [
		{'index': '1', 'text': 'Credit Check Authorization'},
		{'index': '2', 'text': 'Before continuing with this service activation it is our policy to run a credit check.'},
		{'index': '3', 'text': 'Do you authorize T-Mobile to obtain information about your credit history?'},
		{'index': '4', 'text': this.iAgreeButtonText},
		{'index': '5', 'text': this.declineButtonText}
	];

	dlDisclaimerTextES = [
		{'index': '1', 'text': 'ID y Verificaci&#243;n de Cr&#233;dito'},
		{'index': '2', 'text': '<span style="font-family:Sans-serif" >T&#250; autorizas a T-Mobile a recopilar cierta informaci&#243;n de datos como tu nombre, direcci&#243;n, fecha de nacimiento, n&#250;mero de seguro social, n&#250;mero telef&#243;nico, y tipo de ID, y n&#250;mero de ID, lo cual podria ser recopilado al pasar electr&#243;nicamente tu tarjeta o al escanearla.  T&#250; declaras que la informaci&#243;n de datos es correcta.</span>'},
		{'index': '3', 'text': '<span style="font-family:Sans-serif" ><br><br>T&#250; est&#225;s de acuerdo en someter est&#225; informaci&#243;n junto con la informaci&#243;n que proporcionaste como parte de tu solicitud de cr&#233;dito con T-Mobile.  T-Mobile podria usar esta informaci&#243;n para obtener tu historial de cr&#233;dito de otras agencias de informes crediticios, lo cual podria afectar tu puntuaci&#243;n de cr&#233;dito.</span>'},
		{'index': '4', 'text': '<span style="font-family:Sans-serif" ><br><br><br><br>Tambi&#233;n est&#225;s de acuerdo en que T-Mobile, sus vendedores y otros terceros pueden usar esta informaci&#243;n para prevenir fraude y para prop&#243;sitos de verificacion de identidad.</span>'},
		{'index': '5', 'text': this.iAgreeButtonTextES},
		{'index': '6', 'text': this.declineButtonTextES},
		{'index': '7', 'text': 'o'}
	];

	dlDisclaimerText = [
		{'index': '1', 'text': 'ID & Credit Check'},
		{'index': '2', 'text': '<span style="font-family:Sans-serif" >You authorize T-Mobile to collect certain data elements such as your name, address, date of birth, social security number, phone number and ID type and number, which may be collected via electronic swipe or scan. You represent that the data elements you provide are accurate.</span>'},
		{'index': '3', 'text': '<span style="font-family:Sans-serif" ><br>You agree to submit this information along with information you provide as part of your T-Mobile credit application. T-Mobile may use this information to obtain your credit history from credit reporting agencies, which may affect your credit rating.</span>'},
		{'index': '4', 'text': '<span style="font-family:Sans-serif" ><br><br>You also agree that T-Mobile, its vendors and other third parties may use this information for fraud prevention and identity verification purposes.</span>'},
		{'index': '5', 'text': this.iAgreeButtonText},
		{'index': '6', 'text': this.declineButtonText},
		{'index': '7', 'text': 'or'}
	];

	homePhoneTextES = [
		{'index': '3', 'text': '&#32;&#32;&#32;'},
		{'index': '4', 'text': this.hardwareButtonEnterTextES},
		{'index': '5', 'text': this.hardwareButtonClearTextES},
		{'index': '6', 'text': this.hardwareButtonCancelTextES},
		{'index': '7', 'text': '&#32;&#32;&#32;'},
		{'index': '8', 'text': 'builtin'},
		{'index': '9', 'text': 'builtin'},
		{'index': '409', 'text': '2'},
		{'index': '410', 'text': '2'}
	];

	homePhoneText = [
		{'index': '3', 'text': '&#32;&#32;&#32;'},
		{'index': '4', 'text': this.hardwareButtonEnterText},
		{'index': '5', 'text': this.hardwareButtonClearText},
		{'index': '6', 'text': this.hardwareButtonCancelText},
		{'index': '7', 'text': '&#32;&#32;&#32;'},
		{'index': '8', 'text': 'builtin'},
		{'index': '9', 'text': 'builtin'},
		{'index': '409', 'text': '1'},
		{'index': '410', 'text': '1'}
	];

	personalGuarantorTextES = [
		{'index': '3', 'text': '&#32;&#32;&#32;'},
		{'index': '4', 'text': this.hardwareButtonEnterTextES},
		{'index': '5', 'text': this.hardwareButtonClearTextES},
		{'index': '6', 'text': this.hardwareButtonCancelTextES},
		{'index': '7', 'text': '&#32;&#32;&#32;'},
		{'index': '8', 'text': 'builtin'},
		{'index': '9', 'text': 'custom'},
		{'index': '409', 'text': '2'},
		{'index': '410', 'text': '2'}
	];

	personalGuarantorText = [
		{'index': '3', 'text': '&#32;&#32;&#32;'},
		{'index': '4', 'text': this.hardwareButtonEnterText},
		{'index': '5', 'text': this.hardwareButtonClearText},
		{'index': '6', 'text': this.hardwareButtonCancelText},
		{'index': '7', 'text': '&#32;&#32;&#32;'},
		{'index': '8', 'text': 'builtin'},
		{'index': '9', 'text': 'custom'},
		{'index': '409', 'text': '1'},
		{'index': '410', 'text': '1'}
	];

	passcodeTextES = [
		{'index': '3', 'text': '&#32;&#32;&#32;'},
		{'index': '4', 'text': this.hardwareButtonEnterTextES},
		{'index': '5', 'text': this.hardwareButtonClearTextES},
		{'index': '6', 'text': this.hardwareButtonCancelTextES},
		{'index': '7', 'text': 'T-Mobile usa un n&#250;mero de identificaci&#243;n personal para proteger tu cuenta contra acceso no autorizado cuando llamas al servicio al cliente.'},
		{'index': '8', 'text': 'custom'},
		{'index': '9', 'text': 'builtin'},
		{'index': '409', 'text': '2'},
		{'index': '410', 'text': '2'}
	];

	passcodeText = [
		{'index': '3', 'text': '&#32;&#32;&#32;'},
		{'index': '4', 'text': this.hardwareButtonEnterText},
		{'index': '5', 'text': this.hardwareButtonClearText},
		{'index': '6', 'text': this.hardwareButtonCancelText},
		{'index': '7', 'text': 'T-Mobile uses a personal identification number to secure your account against unauthorized access when you call customer service.'},
		{'index': '8', 'text': 'custom'},
		{'index': '9', 'text': 'builtin'},
		{'index': '409', 'text': '1'},
		{'index': '410', 'text': '1'}
	];

	clearEntryCustomTextES = [
		{'index': '3', 'text': '&#32;&#32;&#32;'},
		{'index': '4', 'text': this.hardwareButtonEnterTextES},
		{'index': '5', 'text': this.hardwareButtonClearTextES},
		{'index': '6', 'text': this.hardwareButtonCancelTextES},
		{'index': '7', 'text': '&#32;&#32;&#32;'},
		{'index': '8', 'text': 'custom'},
		{'index': '9', 'text': 'custom'},
		{'index': '409', 'text': '2'},
		{'index': '410', 'text': '2'}
	];

	clearEntryCustomText = [
		{'index': '3', 'text': '&#32;&#32;&#32;'},
		{'index': '4', 'text': this.hardwareButtonEnterText},
		{'index': '5', 'text': this.hardwareButtonClearText},
		{'index': '6', 'text': this.hardwareButtonCancelText},
		{'index': '7', 'text': '&#32;&#32;&#32;'},
		{'index': '8', 'text': 'custom'},
		{'index': '9', 'text': 'custom'},
		{'index': '409', 'text': '1'},
		{'index': '410', 'text': '1'}
	];

	emailTextES = [
		{'index': '409', 'text': '2'},
		{'index': '410', 'text': '2'}
	];

	emailText = [
		{'index': '409', 'text': '1'},
		{'index': '410', 'text': '1'}
	];

	partialAuthFormTextES = [
		{'index': '3', 'text': 'Autorizaci&#243;n de pago parcial'},
		{'index': '4', 'text': 'Selecciona Continuar para autorizar un pago parcial con tu tarjeta por:'},
		{'index': '5', 'text': 'Saldo restante a pagar:'},
		{'index': '6', 'text': this.continueButtonTextES},
		{'index': '7', 'text': this.declineButtonTextES}
	];

	partialAuthFormText = [
		{'index': '3', 'text': 'Partial Authorization'},
		{'index': '4', 'text': 'Select continue to authorize a partial payment of your card for:'},
		{'index': '5', 'text': 'Remaining Balance Due:'},
		{'index': '6', 'text': this.continueButtonText},
		{'index': '7', 'text': this.declineButtonText}
	];

	captureLanguagePreferenceFormText = [
		{'index': '1', 'text': 'SELECT YOUR LANGUAGE TO CONTINUE'},
		{'index': '2', 'text': 'SELECCIONE SU IDIOMA PARA CONTINUAR'},
		{'index': '3', 'text': this.englishButtonText},
		{'index': '4', 'text': this.spanishButtonTextES}
	];

	thankYouFormTextES = [
		{'index': '1', 'text': 'Gracias'}
	];

	thankYouFormText = [
		{'index': '1', 'text': 'Thank You'}
	];

	welcomeFormTextES = [
		{'index': '1', 'text': 'Bienvenido'}
	];

	welcomeFormText = [
		{'index': '1', 'text': 'Welcome'}
	];

	handpayFormTextES = [
		{'index': '1', 'text': 'M&#233;todo de pago'},
		{'index': '2', 'text': 'Entr&#233;gale tu m&#233;todo de pago al asociado de la tienda.'}
	];

	handpayFormText = [
		{'index': '1', 'text': 'Payment Method'},
		{'index': '2', 'text': 'Please present method of payment to the store associate.'}
	];

	informFormTextES = [
		{'index': '1', 'text': 'Editar el contenido'},
		{'index': '2', 'text': 'Ind&#237;cale al asociado de T-Mobile qu&#233; informaci&#243;n es incorrecta en la pantalla anterior.'}
	];

	informFormText = [
		{'index': '1', 'text': 'Edit Content'},
		{'index': '2', 'text': 'Please inform the T-Mobile associate of what content from the previous screen is incorrect.'}
	];

	declinedFormTextES = [
		{'index': '1', 'text': 'Transacci&#243;n rechazada'},
		{'index': '2', 'text': 'Pago no autorizado. Entr&#233;gale alg&#250;n otro m&#233;todo de pago al asociado de la tienda.'}
	];

	declinedFormText = [
		{'index': '1', 'text': 'Declined Transaction'},
		{'index': '2', 'text': 'Payment not Authorized. Please present another method of payment to the store associate.'}
	];

	insufficientFundsFormTextES = [
		{'index': '1', 'text': 'Transacci&#243;n rechazada'},
		{'index': '2', 'text': 'Pago no autorizado. Entr&#233;gale alg&#250;n otro m&#233;todo de pago al asociado de la tienda.'}
	];

	insufficientFundsFormText = [
		{'index': '1', 'text': 'Declined Transaction'},
		{'index': '2', 'text': 'Our system has declined your transaction. Reasons for this error are insufficient funds or an inactive account.'}
	];

	timeoutFormTextES = [
		{'index': '1', 'text': '&#32;&#32;&#32;'},
		{'index': '2', 'text': 'La transacci&#243;n no se proces&#243;.'}
	];

	timeoutFormText = [
		{'index': '1', 'text': '&#32;&#32;&#32;'},
		{'index': '2', 'text': 'Transaction did not process.'}
	];

	pinerrorFormTextES = [
		{'index': '1', 'text': 'Selecciona un m&#233;todo de pago diferente'},
		{'index': '2', 'text': 'Ingresaste demasiados PIN incorrectos'}
	];

	pinerrorFormText = [
		{'index': '1', 'text': 'Select a different payment method'},
		{'index': '2', 'text': 'Too many PIN entry errors.'}
	];

	refundPinErrorFormTextES = [
		{'index': '1', 'text': 'El reintegro a tu tarjeta de d&#233;bito ha sido rechazado'},
		{'index': '2', 'text': 'Ingresaste demasiados PIN incorrectos'}
	];

	refundPinErrorFormText = [
		{'index': '1', 'text': 'Refund to Debit Card Declined'},
		{'index': '2', 'text': 'Too many PIN entry errors.'}
	];

	systemUnavailableFormTextES = [
		{'index': '1', 'text': 'Sistema no disponible'},
		{'index': '2', 'text': 'Pres&#233;ntale otro m&#233;todo de pago al asociado de la tienda. Nuestro sistema no puede procesar este tipo de pago en este momento.'}
	];

	systemUnavailableFormText = [
		{'index': '1', 'text': 'System Unavailable'},
		{'index': '2', 'text': 'Please present a different method of payment to the store associate. Our system is not able to process this type of payment at this time.'}
	];

	listItemFormTextES = [
		{'index': '1', 'text': 'Lista de &#237;tems'}
	];

	listItemFormText = [
		{'index': '1', 'text': 'Item List'}
	];

	captureDebitPinFormTextES = [
		{'index': '4', 'text': 'Pulsa                                        el teclado para continuar'},
		{'index': '409', 'text': '2'},
		{'index': '410', 'text': '2'}
	];

	captureDebitPinFormText = [
		{'index': '4', 'text': 'Press                                      on the keypad to continue'},
		{'index': '409', 'text': '1'},
		{'index': '410', 'text': '1'}
	];

	processCreditCardFormTextES = [
		{'index': '2', 'text': 'Procesar la tarjeta de cr&#233;dito'},
		{'index': '3', 'text': '&#191;Deseas que se procese como una tarjeta de cr&#233;dito?'},
		{'index': '4', 'text': 'Monto:'},
		{'index': '5', 'text': this.agreeButtonTextES},
		{'index': '6', 'text': this.cancelButtonTextES}
	];

	processCreditCardFormText = [
		{'index': '2', 'text': 'Process Credit Card'},
		{'index': '3', 'text': 'Process as a credit card?'},
		{'index': '4', 'text': 'Amount:'},
		{'index': '5', 'text': this.agreeButtonText},
		{'index': '6', 'text': this.cancelButtonText}
	];

	salesTransFormTextES = [
		{'index': '1', 'text': 'Subtotal:'},
		{'index': '3', 'text': 'Impuesto:'},
		{'index': '5', 'text': 'Total:'},
		{'index': '7', 'text': 'Pago recibido:'},
		{'index': '11', 'text': 'Transacci&#243;n de venta'}
	];

	salesTransFormText = [
		{'index': '1', 'text': 'Subtotal:'},
		{'index': '3', 'text': 'Tax:'},
		{'index': '5', 'text': 'Total:'},
		{'index': '7', 'text': 'Payment Received:'},
		{'index': '11', 'text': 'Sales Transaction'}
	];

	pinErrorHybridFormTextES = [
		{'index': '1', 'text': '&#191;Deseas que se procese la transacci&#243;n como una tarjeta de cr&#233;dito?'},
		{'index': '2', 'text': 'Ingresaste demasiados PIN incorrectos'},
		{'index': '3', 'text': 'CR&#201;DITO'},
		{'index': '4', 'text': this.cancelButtonTextES}
	];

	pinErrorHybridFormText = [
		{'index': '1', 'text': 'Process as a credit card transaction?'},
		{'index': '2', 'text': 'Too many PIN entry errors.'},
		{'index': '3', 'text': 'CREDIT'},
		{'index': '4', 'text': this.cancelButtonText}
	];

	cvvErrorFormTextES = [
		{'index': '1', 'text': 'Por fa vor Intentar de nuevo'},
		{'index': '2', 'text': 'El CVV o CID es incorrecto. Intenta con otra tarjeta, o verifica el CVV o CID e intenta de nuevo.'},
		{'index': '3', 'text': 'Intentar de nuevo'},
		{'index': '4', 'text': this.cancelButtonTextES}
	];

	cvvErrorFormText = [
		{'index': '1', 'text': 'Please try again'},
		{'index': '2', 'text': 'Invalid CVV or CID. Try another card or check the CVV or CID and try again.'},
		{'index': '3', 'text': 'RETRY'},
		{'index': '4', 'text': this.cancelButtonText}
	];

	expireErrorFormTextES = [
		{'index': '1', 'text': 'Por fa vor Intentar de nuevo'},
		{'index': '2', 'text': 'Tarjeta vencida. Intenta con otra tarjeta, o verifica la fecha de vencimiento e intenta de nuevo.'},
		{'index': '3', 'text': 'Intentar de nuevo'},
		{'index': '4', 'text': this.cancelButtonTextES}
	];

	expireErrorFormText = [
		{'index': '1', 'text': 'Please try again'},
		{'index': '2', 'text': 'Expired Card. Try another card or check the expiration data and try again'},
		{'index': '3', 'text': 'RETRY'},
		{'index': '4', 'text': this.cancelButtonText}
	];

	authorizingFormTextES = [
		{'index': '1', 'text': 'Autorizando...'}
	];

	authorizingFormText = [
		{'index': '1', 'text': 'Authorizing...'}
	];

	captureSignatureFormTextES = [
		{'index': '1', 'text': 'El(los) titular(es) de la tarjeta acusa(n) recibo de'},
		{'index': '2', 'text': 'los productos y/o servicios por el monto del total que'},
		{'index': '3', 'text': 'figura en este recibo y acepta(n) cumplir con las '},
		{'index': '4', 'text': 'obligaciones estipuladas en el acuerdo de titularidad firmado con el emisor de la tarjeta.'},
		{'index': '5', 'text': 'P&#225;gina de la firma'},
		{'index': '6', 'text': this.agreeButtonTextES},
		{'index': '7', 'text': this.clearButtonTextES}
	];

	captureSignatureFormText = [
		{'index': '1', 'text': 'Cardholder(s) acknowledges receipt of goods and/or '},
		{'index': '2', 'text': 'services in the amount of the total shown on this '},
		{'index': '3', 'text': 'receipt and agrees to perform the obligations set'},
		{'index': '4', 'text': 'forth in the cardholder&#39;s agreement with issuer.'},
		{'index': '5', 'text': 'Signature Page'},
		{'index': '6', 'text': this.agreeButtonText},
		{'index': '7', 'text': this.clearButtonText}
	];

	creditSignatureFormTextES = [
		{'index': '1', 'text': 'El(los) titular(es) de la tarjeta acusa(n) recibo de'},
		{'index': '3', 'text': 'y acepta(n) cumplir con las obligaciones estipuladas en'},
		{'index': '4', 'text': 'el acuerdo de titularidad firmado con el emisor de la tarjeta.'},
		{'index': '5', 'text': 'P&#225;gina de la firma'},
		{'index': '6', 'text': this.agreeButtonTextES},
		{'index': '7', 'text': this.clearButtonTextES}
	];

	creditSignatureFormText = [
		{'index': '1', 'text': 'Cardholder(s) acknowledges receipt of goods and/or '},
		{'index': '3', 'text': 'and agrees to perform the obligations set forth in the'},
		{'index': '4', 'text': 'cardholder&#39;s agreement with issuer.'},
		{'index': '5', 'text': 'Signature Page'},
		{'index': '6', 'text': this.agreeButtonText},
		{'index': '7', 'text': this.clearButtonText}
	];

	cihuSignatureFormTextES = [
		{'index': '1', 'text': 'He le&#237;do y, por lo tanto, entiendo y acepto quedar'},
		{'index': '2', 'text': 'sujetoa los t&#233;rminos de mi acuerdo con T-Mobile'},
		{'index': '3', 'text': '&#32;&#32;&#32;'},
		{'index': '4', 'text': '&#32;&#32;&#32;'},
		{'index': '5', 'text': 'P&#225;gina de la firma'},
		{'index': '6', 'text': this.agreeButtonTextES},
		{'index': '7', 'text': this.clearButtonTextES}
	];

	cihuSignatureFormText = [
		{'index': '1', 'text': 'I have read, understand, and agree to be bound'},
		{'index': '2', 'text': 'by the terms of my agreement with T-Mobile.'},
		{'index': '3', 'text': '&#32;&#32;&#32;'},
		{'index': '4', 'text': '&#32;&#32;&#32;'},
		{'index': '5', 'text': 'Signature Page'},
		{'index': '6', 'text': this.agreeButtonText},
		{'index': '7', 'text': this.clearButtonText}
	];

	drpSignatureFormTextES = [
		{'index': '1', 'text': 'He le&#237;do y, por lo tanto, entiendo y acepto quedar'},
		{'index': '2', 'text': 'sujeto a los t&#233;rminos de mi Acuerdo del Programa'},
		{'index': '3', 'text': 'de Recuperacion de Tel&#233;fonos.'},
		{'index': '4', 'text': '&#32;&#32;&#32;'},
		{'index': '5', 'text': 'P&#225;gina de la firma'},
		{'index': '6', 'text': this.agreeButtonTextES},
		{'index': '7', 'text': this.clearButtonTextES}
	];

	drpSignatureFormText = [
		{'index': '1', 'text': 'I have read, understand, and agree to be bound'},
		{'index': '2', 'text': 'by the terms of my Device Recovery Program'},
		{'index': '3', 'text': 'Agreement'},
		{'index': '4', 'text': '&#32;&#32;&#32;'},
		{'index': '5', 'text': 'Signature Page'},
		{'index': '6', 'text': this.agreeButtonText},
		{'index': '7', 'text': this.clearButtonText}
	];

	tesaSignatureFormTextES = [
		{'index': '1', 'text': 'He tenido oportunidad de revisar mi Contrato,'},
		{'index': '2', 'text': 'y estoy de acuerdo con la versi&#243;n actual de los'},
		{'index': '3', 'text': 't&#233;rminos y condiciones de T-Mobile.'},
		{'index': '4', 'text': '&#32;&#32;&#32;'},
		{'index': '5', 'text': 'P&#225;gina de la firma'},
		{'index': '6', 'text': this.agreeButtonTextES},
		{'index': '7', 'text': this.clearButtonTextES}
	];

	onfileSignatureFormTextES = [
		{'index': '1', 'text': 'En la casilla de la firma, escribe &#34;REGISTRADA&#34;.'},
		{'index': '2', 'text': '&#32;&#32;&#32;'},
		{'index': '3', 'text': '&#32;&#32;&#32;'},
		{'index': '4', 'text': '&#32;&#32;&#32;'},
		{'index': '5', 'text': 'P&#225;gina de la firma'},
		{'index': '6', 'text': this.agreeButtonTextES},
		{'index': '7', 'text': this.clearButtonTextES}
	];

	onfileSignatureFormText = [
		{'index': '1', 'text': 'Write &#34;On File&#34; in signature box.'},
		{'index': '2', 'text': '&#32;&#32;&#32;'},
		{'index': '3', 'text': '&#32;&#32;&#32;'},
		{'index': '4', 'text': '&#32;&#32;&#32;'},
		{'index': '5', 'text': 'Signature Page'},
		{'index': '6', 'text': this.agreeButtonText},
		{'index': '7', 'text': this.clearButtonText}
	];

	emptySignatureFormTextES = [
		{'index': '1', 'text': '&#32;&#32;&#32;'},
		{'index': '2', 'text': '&#32;&#32;&#32;'},
		{'index': '3', 'text': '&#32;&#32;&#32;'},
		{'index': '4', 'text': '&#32;&#32;&#32;'},
		{'index': '5', 'text': 'P&#225;gina de la firma'},
		{'index': '6', 'text': this.agreeButtonTextES},
		{'index': '7', 'text': this.clearButtonTextES}
	];

	emptySignatureFormText = [
		{'index': '1', 'text': '&#32;&#32;&#32;'},
		{'index': '2', 'text': '&#32;&#32;&#32;'},
		{'index': '3', 'text': '&#32;&#32;&#32;'},
		{'index': '4', 'text': '&#32;&#32;&#32;'},
		{'index': '5', 'text': 'Signature Page'},
		{'index': '6', 'text': this.agreeButtonText},
		{'index': '7', 'text': this.clearButtonText}
	];

	eipSignatureFormTextES = [
		{'index': '1', 'text': 'Al firmar y hacer clic en &#34;Aceptar&#34;, confirmo que he'},
		{'index': '2', 'text': 'le&iacute;do el Contrato de Venta con Plan de Financiamiento o'},
		{'index': '3', 'text': 'el Contrato de Arrendamiento con Plan de Financiamiento'},
		{'index': '5', 'text': 'P&#225;gina de la firma'},
		{'index': '6', 'text': this.agreeButtonTextES},
		{'index': '7', 'text': this.clearButtonTextES}
	];

	eipSignatureFormText = [
		{'index': '1', 'text': 'By signing and clicking &#34;Agree&#34; below, I&#39;ve read the'},
		{'index': '2', 'text': 'Retail Installment Sale or Lease Agreement Plan ID:'},
		{'index': '4', 'text': 'directly above the Agreement signature line and agree to be bound by the terms.'},
		{'index': '5', 'text': 'Signature Page'},
		{'index': '6', 'text': this.agreeButtonText},
		{'index': '7', 'text': this.clearButtonText}
	];

	captureLastThreeofPlanIdFormTextES = [
		{'index': '1', 'text': 'Acusar Recibo del Contrato Financiero'},
		{'index': '2', 'text': 'Yo confirmo que he recibido una copia impresa del Contrato de Venta con Plan de Financiamiento o el Contrato de Arrendamiento.'},
		{'index': '3', 'text': this.continueButtonTextES},
		{'index': '4', 'text': this.clearButtonTextES},
		{'index': '5', 'text': this.cancelButtonTextES},
		{'index': '409', 'text': '2'},
		{'index': '410', 'text': '2'}
	];

	captureLastThreeofPlanIdFormText = [
		{'index': '1', 'text': 'Confirm Receipt of Financial Agreement'},
		{'index': '2', 'text': 'I acknowledge that I have received a printed copy of the Retail Installment Sale or Lease Agreement.'},
		{'index': '3', 'text': this.continueButtonText},
		{'index': '4', 'text': this.clearButtonText},
		{'index': '5', 'text': this.cancelButtonText},
		{'index': '409', 'text': '1'},
		{'index': '410', 'text': '1'}
	];

	captureCreditCardManualEntryFormTextES = [
		{'index': '1', 'text': 'Ingresa la informaci&#243;n manualmente'},
		{'index': '2', 'text': 'INGRESO MANUAL'},
		{'index': '3', 'text': this.cancelButtonTextES},
		{'index': '4', 'text': this.continueButtonTextES},
		{'index': '5', 'text': this.clearButtonTextES},
		{'index': '6', 'text': this.cancelButtonTextES}
	];

	captureCreditCardManualEntryFormText = [
		{'index': '1', 'text': 'Enter information by hand'},
		{'index': '2', 'text': 'HAND-KEY'},
		{'index': '3', 'text': this.cancelButtonText},
		{'index': '4', 'text': this.continueButtonText},
		{'index': '5', 'text': this.clearButtonText},
		{'index': '6', 'text': this.cancelButtonText}
	];

	captureCreditCardSwipeFormTextES = [
		{'index': '1', 'text': 'Deslizar o tocar'},
		{'index': '2', 'text': 'Desliza tu tarjeta de d&#233;bito o cr&#233;dito'},
		{'index': '3', 'text': 'Pulsa la parte posterior de tu tel&#233;fono o tarjeta'},
		{'index': '4', 'text': 'O pulsa                                              el teclado para usar otra forma de pago'},
		{'index': '5', 'text': 'O'}
	];

	captureCreditCardSwipeFormText = [
		{'index': '1', 'text': 'Swipe or Tap'},
		{'index': '2', 'text': 'Swipe your Debit or Credit Card'},
		{'index': '3', 'text': 'Tap the Back of your Device or Your Card'},
		{'index': '4', 'text': 'Or press                              on the keypad to use another form of payment'},
		{'index': '5', 'text': 'or'}
	];

	captureDLFormTextES = [
		{'index': '1', 'text': 'Deslizar la licencia de conducir'},
		{'index': '2', 'text': 'Entr&#233;gale tu licencia de conducir al asociado de la tienda.'}
	];

	captureDLFormText = [
		{'index': '1', 'text': 'Driver&#39;s License Swipe'},
		{'index': '2', 'text': 'Please hand your driver&#39;s license to the store associate.'}
	];

	termsFormTextES = [
		{'index': '1', 'text': this.agreeButtonTextES},
		{'index': '2', 'text': this.cancelButtonTextES},
		{'index': '409', 'text': '2'},
		{'index': '410', 'text': '2'}
	];

	termsFormText = [
		{'index': '1', 'text': this.agreeButtonText},
		{'index': '2', 'text': this.cancelButtonText},
		{'index': '409', 'text': '1'},
		{'index': '410', 'text': '1'}
	];

	createdTermsFormTextES = [
		{'index': '1', 'text': this.agreeButtonTextES},
		{'index': '2', 'text': this.cancelButtonTextES},
		{'index': '409', 'text': '1'},
		{'index': '410', 'text': '1'}
	];

	createdTermsFormText = [
		{'index': '1', 'text': this.agreeButtonText},
		{'index': '2', 'text': this.cancelButtonText},
		{'index': '409', 'text': '1'},
		{'index': '410', 'text': '1'}
	];

	verifyAmountFormTextES = [
		{'index': '2', 'text': 'Confirmaci&#243;n del monto'},
		{'index': '4', 'text': 'Monto:'},
		{'index': '5', 'text': 'Al pulsar &#34;Acepto&#34;, autorizas a T-Mobile a procesar un d&#233;bito &#250;nico de tu cuenta bancaria por el monto que se indica arriba.'},
		{'index': '6', 'text': this.agreeButtonTextES},
		{'index': '7', 'text': this.declineButtonTextES}
	];

	verifyAmountFormText = [
		{'index': '2', 'text': 'Validate Amount'},
		{'index': '4', 'text': 'Amount:'},
		{'index': '5', 'text': 'By tapping Agree, you authorize T-Mobile to process a one-time debit from your bank account in the amount listed above.'},
		{'index': '6', 'text': this.agreeButtonText},
		{'index': '7', 'text': this.declineButtonText}
	];

	verifyPhoneFormTextES = [
		{'index': '2', 'text': 'N&#250;mero telef&#243;nico de contacto'},
		{'index': '3', 'text': '&#191;Es correcto el n&#250;mero telef&#243;nico de contacto ingresado anteriormente?'},
		{'index': '4', 'text': this.backButtonTextES},
		{'index': '5', 'text': this.agreeButtonTextES},
		{'index': '6', 'text': this.reEnterButtonTextES}
	];

	verifyPhoneFormText = [
		{'index': '2', 'text': 'Contact Phone Number'},
		{'index': '3', 'text': 'Is the previously entered Contact Phone Number Correct?'},
		{'index': '4', 'text': this.backButtonText},
		{'index': '5', 'text': this.agreeButtonText},
		{'index': '6', 'text': this.reEnterButtonText}
	];

	verifySSNFormTextES = [
		{'index': '2', 'text': 'N&#250;mero de Seguro Social'},
		{'index': '3', 'text': '&#191;Es correcto el N&#250;mero de Seguro Social ingresado anteriormente?'},
		{'index': '4', 'text': this.backButtonTextES},
		{'index': '5', 'text': this.agreeButtonTextES},
		{'index': '6', 'text': this.reEnterButtonTextES}
	];

	verifySSNFormText = [
		{'index': '2', 'text': 'Social Security Number'},
		{'index': '3', 'text': 'Is the previously entered Social Security Number Correct?'},
		{'index': '4', 'text': this.backButtonText},
		{'index': '5', 'text': this.agreeButtonText},
		{'index': '6', 'text': this.reEnterButtonText}
	];

	verifyDLFormTextES = [
		{'index': '6', 'text': 'Datos de la licencia de conducir'},
		{'index': '7', 'text': '&#191;Todos los datos son correctos? (el asociado puede editarlos)'},
		{'index': '8', 'text': 'Nombre:'},
		{'index': '9', 'text': 'Direcci&#243;n:'},
		{'index': '10', 'text': 'Fecha nac.'},
		{'index': '11', 'text': 'No Lic.'},
		{'index': '12', 'text': this.backButtonTextES},
		{'index': '13', 'text': this.agreeButtonTextES},
		{'index': '14', 'text': this.reEnterButtonTextES}
	];

	verifyDLFormText = [
		{'index': '6', 'text': 'Driver&#39;s License Info'},
		{'index': '7', 'text': 'Is the information correct? (associate can edit)'},
		{'index': '8', 'text': 'Name:'},
		{'index': '9', 'text': 'Address:'},
		{'index': '10', 'text': 'DOB:'},
		{'index': '11', 'text': 'DL:'},
		{'index': '12', 'text': this.backButtonText},
		{'index': '13', 'text': this.agreeButtonText},
		{'index': '14', 'text': this.reEnterButtonText}
	];

	currentCreditCardData: any = {};
	Lastname:any = "";
	Firstname:any = ""; // First Name
	Middlename:any = ""; // Middle Name
	Suffix:any = ""; // Suffix
	Address1:any = ""; // Address
	Address2:any = ""; // Address 2
	City:any = ""; // City
	State:any = ""; // State
	Zipcode:any = ""; // Zip
	ZipExt:any = ""; // Zip+4
	IdNumber:any = "";  // DL Number
	IDExpDate:any = ""; // Exp Date
	Dob:any = ""; // DOB Date
	IDIssueDate:any = "";
	RawData:any = "";
	driversLicenseData() {
		this.Lastname = "";
		this.Firstname = ""; // First Name
		this.Middlename = ""; // Middle Name
		this.Suffix = ""; // Suffix
		this.Address1 = ""; // Address
		this.Address2 = ""; // Address 2
		this.City = ""; // City
		this.State = ""; // State
		this.Zipcode = ""; // Zip
		this.ZipExt = ""; // Zip+4
		this.IdNumber = "";  // DL Number
		this.IDExpDate = ""; // Exp Date
		this.Dob = ""; // DOB Date
		this.IDIssueDate = "";
		this.RawData = "";
	};

	tracks: any = {};
	cardSource: any = "";
	rawData: any = "";
	cardholderName: any = "";
	accountNumber: any = "";
	expire: any = "";
	expirationMonth: any = "";
	expirationYear: any = "";
	expirationYear4Digits: any = "";
	mobileMoneyTrack2: any = "";
	mobileMonenyUPC: any = "";
	theTerminalCapability: any = "false";
	theEntryMode: any = "true";
	theNFCEntryMode: any = "false";
	theHandKeyEntryMode: any = "false";
	isEncryptionOn: any = "false";
	TerminalCapability: any = "";
	PinAuthorizationCapability: any = "";
	CardTypeIndicator: any = "";
	AccountNumberIndicator: any = "";
	TerminalEntryMode: any = "";
	TerminalType: any = "";
	EntryMode: any = "";

	parsedCreditCardData() {
		this.tracks = {};
		this.cardSource = "";
		this.rawData = "";
		this.cardholderName = "";
		this.accountNumber = "";
		this.expire = "";
		this.expirationMonth = "";
		this.expirationYear = "";
		this.expirationYear4Digits = "";
		this.mobileMoneyTrack2 = "";
		this.mobileMonenyUPC = "";
		this.theTerminalCapability = "false";
		this.theEntryMode = "true";
		this.theNFCEntryMode = "false";
		this.theHandKeyEntryMode = "false";
		this.isEncryptionOn = "false";
		this.TerminalCapability = "";
		this.PinAuthorizationCapability = "";
		this.CardTypeIndicator = "";
		this.AccountNumberIndicator = "";
		this.TerminalEntryMode = "";
		this.TerminalType = "";
		this.EntryMode = "";
	};

	//Helper Methods
	libraryParseCC(creditCardData) {
		this.myDate = new Date();
		this.startTime = this.myDate.getTime();
		this.log("Staring Credit Card Data Parse: " + this.startTime);
		this.log("HAS libraryParseCC");
		this.currentCreditCardData = new this.parsedCreditCardData();
		this.currentCreditCardData.rawData = creditCardData;

		var cc = creditCardData,
			t1_flag = true,
			t2_flag = true,
			myString = "20",
			ccNumber = "",
			ccName = "",
			ccYear = "",
			ccMonth = "",
			ccExpire = "",
			MagneticOrContactless,
			tempCC,
			t1,
			t2;

		if (this.isNotNullOrEmpty(creditCardData)) {
			cc = cc.replace(/\x0A/g, '');
			cc = cc.replace(/\x0D/g, '');
			cc = cc.replace(/\?\?/g, '?');
			cc = cc.split('?');

			this.currentCreditCardData.TerminalCapability = "11";
			this.currentCreditCardData.PinAuthorizationCapability = "1";
			this.currentCreditCardData.AccountNumberIndicator = "1";
			this.currentCreditCardData.TerminalType = "2";
			this.checkForEncryptionOn(cc[2]);

			if (cc[0]) {
				MagneticOrContactless = cc[0].substring(1, 2);
				this.currentCreditCardData.cardSource = MagneticOrContactless;
				if (MagneticOrContactless === "H") {
					this.currentCreditCardData.theHandKeyEntryMode = "true";
					this.currentCreditCardData.TerminalEntryMode = "01";
					this.currentCreditCardData.EntryMode = "3";

					if (this.currentCreditCardData.isEncryptionOn) {
						this.currentCreditCardData.CardTypeIndicator = "3";
					} else {
						this.currentCreditCardData.CardTypeIndicator = "1";
					}

					if (cc[0].indexOf("M") <= 4) {
						this.currentCreditCardData.tracks[0] = cc[0].substring(cc[0].indexOf("M"));
					} else {
						this.currentCreditCardData.tracks[0] = cc[0].substring(2);
					}
				} else {
					if (cc[0].indexOf("B") > 0) {
						this.currentCreditCardData.tracks[0] = cc[0].substring(cc[0].indexOf("B"));
					} else {
						this.currentCreditCardData.tracks[0] = "";
					}
				}

				this.currentCreditCardData.tracks[1] = cc[1].substring(cc[1].indexOf(";") + 1);
				this.currentCreditCardData.tracks[2] = cc[2];

				if (this.currentCreditCardData.tracks[0].indexOf("$") > -1) {
					this.currentCreditCardData.mobileMoneyTrack2 = ";" + this.currentCreditCardData.tracks[1] + "?";

					tempCC = this.currentCreditCardData.tracks[0].split("^");
					this.currentCreditCardData.mobileMonenyUPC = tempCC[1].substring(0, tempCC[1].indexOf("$"));

				}
			}

			if (MagneticOrContactless === 'C') {
				this.currentCreditCardData.theNFCEntryMode = "true";
				this.currentCreditCardData.TerminalEntryMode = "91";
				this.currentCreditCardData.EntryMode = "1";
			} else if (MagneticOrContactless === 'M') {
				this.currentCreditCardData.TerminalEntryMode = "90";
				this.currentCreditCardData.EntryMode = "1";
			}

			if (MagneticOrContactless === 'C' || MagneticOrContactless === 'M') {
				this.currentCreditCardData.theTerminalCapability = "true";
				if (this.currentCreditCardData.isEncryptionOn) {
					this.currentCreditCardData.CardTypeIndicator = "3";
				} else {
					this.currentCreditCardData.CardTypeIndicator = "2";
				}
			} else {
				this.currentCreditCardData.theTerminalCapability = "false";
			}

			if (this.isNotNullOrEmpty(this.currentCreditCardData.tracks[0])) {
				this.log("Parsing Track 1");
				t1 = this.currentCreditCardData.tracks[0];
				t1 = t1.split('^');
				ccNumber = t1[0];
				if ((t1[0].indexOf('B') === 0) || (t1[0].indexOf('M') === 0)) {
					ccNumber = t1[0].substring(1);
				}

				this.currentCreditCardData.accountNumber = this.ignoreSpaces(ccNumber);

				ccName = t1[1];
				this.currentCreditCardData.cardholderName = this.filterName(ccName);

				ccYear = t1[2].substring(0, 2);
				this.currentCreditCardData.expirationYear = ccYear;

				ccMonth = t1[2].substring(2, 4);
				this.currentCreditCardData.expirationMonth = ccMonth;

			} else {
				t1_flag = false;
			}

			if (this.isNotNullOrEmpty(this.currentCreditCardData.tracks[1])) {
				this.log("Parsing Track 2");
				t2 = this.currentCreditCardData.tracks[1];
				t2 = t2.split('=');

				if (ccNumber === "") {
					ccNumber = t2[0];
					this.currentCreditCardData.accountNumber = ccNumber;
				}

				if (ccExpire === "") {
					ccExpire = t2[1];
					this.currentCreditCardData.expire = ccExpire.substring(0, 4);

					ccYear = this.currentCreditCardData.expire.substring(0, 2);
					this.currentCreditCardData.expirationYear = ccYear;
					this.currentCreditCardData.expirationYear4Digits = myString.concat(this.currentCreditCardData.expirationYear);

					ccMonth = this.currentCreditCardData.expire.substring(2, 4);
					this.currentCreditCardData.expirationMonth = ccMonth;
				}
			} else {
				t2_flag = false;
			}
		} else {
			t1_flag = false;
			t2_flag = false;
		}

		if (!t1_flag && !t2_flag) {
			this.currentCreditCardData.theEntryMode = "false";
			this.currentCreditCardData.theNFCEntryMode = "false";
			this.currentCreditCardData.theTerminalCapability = "false";
		}
	};

	checkForEncryptionOn(track3Data) {
		var tempString = null;
		if (track3Data !== null) {
			tempString = track3Data.slice(-2);
		}

		this.currentCreditCardData.isEncryptionOn = false;

		if (tempString !== null && tempString !== "" && tempString === "==") {
			this.currentCreditCardData.isEncryptionOn = true;
		}
	};

	ignoreSpaces(string) {
		this.log("HAS ignoreSpaces");
		var temp = "",
			tempString = string,
			i,
			splitstring = tempString.split(" ");
		for (i = 0; i < splitstring.length; i++) {
			temp += splitstring[i];
		}

		return temp;
	};

	filterName(str) {
		this.log("HAS filterName");
		return str.replace('/', ', ');
	};

	createVariableObject(index, text) {
		this.log("HAS createVariableObject");
		var tempObject: any = {};
		tempObject.index = index;
		tempObject.text = text;

		return tempObject;
	};

	createDriversLicObject(dlObject) {    
		if (typeof dlObject.Firstname == "undefined") {
			this.driversLicObject = new this.driversLicenseData();
			this.driversLicObject.Lastname = dlObject.LastName;
			this.driversLicObject.Firstname = dlObject.FirstName;
			this.driversLicObject.Middlename = dlObject.MiddleName;
			this.driversLicObject.Suffix = dlObject.Suffix;
			this.driversLicObject.Address1 = dlObject.StreetAddress;
			this.driversLicObject.Address2 = dlObject.StreetAddress_2;
			this.driversLicObject.City = dlObject.City;
			this.driversLicObject.State = dlObject.State;
			this.driversLicObject.Zipcode = dlObject.ZIPCode;
			this.driversLicObject.ZipExt = dlObject.ZipExt;
			this.driversLicObject.IdNumber = dlObject.IDNumber;
			this.driversLicObject.IDExpDate = dlObject.IDExpDate;
			this.driversLicObject.Dob = dlObject.DOB;
			this.driversLicObject.IDIssueDate = dlObject.IDIssueDate;
			this.driversLicObject.RawData = dlObject.RawData;
		}
	};

	//Ingenico Handlers
	onAcceptHandler(userInputData) {};
	onCancelHandler() {};
	getDeviceVersionHandler(version) {};
	getDeviceHealthStatsHandler(healthStats) { };
	getVariableRequestHandler(variableResponse) { };
	onCustomerFormDataReadyHandler(userData) {};
	onDebitPinReadyHandler(pinBlock) {};
	onEditHandler() {};
	onSignatureDataReadyHandler(signData, htmlSignBlock, signBlock) {};
	onDebitPinInvalidLengthHandler(pinBlock) {};
	onSalesFormLoaded() {};
	setDisplayItemHandler() { };
	onTimeoutHandler() {};
	onErrorHandler(errorMessage) {};
	readConfigurationHandler(configValue) {};
	writeConfigurationHandler(response) {};
	/***
		IdObject:
			LastName- string
			FirstName- string
			MiddleName- string
			Suffix- string
			StreetAddress- string
			StreetAddress_2- string
			City- string
			State- string
			ZIPCode- string
			ZipExt- string
			IDNumber- string
			IDExpDate- string
			DOB- string
			IDIssueDate- string
	***/
	onDLDataReadyHandler(driversLicenseData) {};
	/***
		cardData:
			tracks - Array
			cardholderName - string
			accountNumber - string
			expire - string
			expirationMonth - number
			expirationYear - number
			expirationYear4Digits - string
			theTerminalCapability - string
			theEntryMode - string
			theNFCEntryMode - string
	***/
	onMSRDataReadyHandlerFD(creditCardData) { };
	onMSRDataReadyHandler(creditCardData) { };

	//Ingenico Specific Methods
	displayCCDisclaimer(langPref) {
	    this.isVerifyDLCalled = false;
		this.log("HAS displayCCDisclaimer");
		var displayFormRequest: any = {};
		displayFormRequest.type = "INGENICO";
		displayFormRequest.ingenicoRequest = {};
		displayFormRequest.ingenicoRequest.type = "DisplayForm";
		displayFormRequest.ingenicoRequest.rbaRequest = {};
		displayFormRequest.ingenicoRequest.rbaRequest.messageType = "authcc";
		displayFormRequest.ingenicoRequest.rbaRequest.languagePreference = langPref;
		if (this.isSpanish(langPref)) {
			displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.ccDisclaimerTextES;
		} else {
			displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.ccDisclaimerText;
		}

		displayFormRequest.ingenicoRequest.rbaRequest.formName = "AUTHCC.K3Z";
		this.sendMessageToSocketServer(displayFormRequest);
	};

	displayDLDisclaimer(langPref) {
	    this.isVerifyDLCalled = false;
		this.log("HAS displayDLDisclaimer");
		var displayFormRequest: any = {};
		displayFormRequest.type = "INGENICO";
		displayFormRequest.ingenicoRequest = {};
		displayFormRequest.ingenicoRequest.type = "DisplayForm";
		displayFormRequest.ingenicoRequest.rbaRequest = {};
		displayFormRequest.ingenicoRequest.rbaRequest.messageType = "authdl";
		displayFormRequest.ingenicoRequest.rbaRequest.languagePreference = langPref;
		if (this.isSpanish(langPref)) {
			displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.dlDisclaimerTextES;
		} else {
			displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.dlDisclaimerText;
		}
		displayFormRequest.ingenicoRequest.rbaRequest.formName = "AUTHDL.K3Z";
		this.sendMessageToSocketServer(displayFormRequest);
	};

	displayClearEntryForm(langPref, formType, prompt, formatSpecifier) {
	    this.isVerifyDLCalled = false;
		this.log("HAS displayClearEntryForm");
		var clearEntryFormRequest: any = {};
		clearEntryFormRequest.type = "INGENICO";
		clearEntryFormRequest.ingenicoRequest = {};
		clearEntryFormRequest.ingenicoRequest.type = "ClearEntry";
		clearEntryFormRequest.ingenicoRequest.rbaRequest = {};
		clearEntryFormRequest.ingenicoRequest.rbaRequest.messageType = formType;
		clearEntryFormRequest.ingenicoRequest.rbaRequest.languagePreference = langPref;
		clearEntryFormRequest.ingenicoRequest.rbaRequest.inputFormat = formatSpecifier;
		clearEntryFormRequest.ingenicoRequest.rbaRequest.promptSpecifier = prompt;

		if (this.isSpanish(langPref)) {
			if (formType === this.homePhone) {
				clearEntryFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.homePhoneTextES;
			} else if (formType === this.personalGuarantor || formType === this.primaryPhone) {
				clearEntryFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.personalGuarantorTextES;
			} else if (formType === this.createPIN || formType === this.enterPIN) {
				clearEntryFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.passcodeTextES;
			} else if (formType === this.emailType) {
				clearEntryFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.emailTextES;
			} else {
				clearEntryFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.clearEntryCustomTextES;
			}
		} else {
			if (formType === this.homePhone) {
				clearEntryFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.homePhoneText;
			} else if (formType === this.personalGuarantor || formType === this.primaryPhone) {
				clearEntryFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.personalGuarantorText;
			} else if (formType === this.createPIN || formType === this.enterPIN) {
				clearEntryFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.passcodeText;
			} else if (formType === this.emailType) {
				clearEntryFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.emailText;
			} else {
				clearEntryFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.clearEntryCustomText;
			}
		}

		if (formType === this.emailType) {
			clearEntryFormRequest.ingenicoRequest.rbaRequest.formName = "EMAIL.K3Z";
		} else {
			clearEntryFormRequest.ingenicoRequest.rbaRequest.formName = "CLRENT1.K3Z";
		}

		this.sendMessageToSocketServer(clearEntryFormRequest);
	};

	captureEmailAddress(langPref) {
	    this.log("HAS captureEmailAddress");
		this.displayClearEntryForm(langPref, this.emailType, "304", "2");
	};

	displayPartialAuthForm(langPref, authAmount, remainAmount) {
	    this.isVerifyDLCalled = false;
		this.log("HAS displayPartialAuthForm");
		var displayFormRequest: any = {},
			tempPartialAuthArray,
			mergedArray,
			tempArray;

		displayFormRequest.type = "INGENICO";
		displayFormRequest.ingenicoRequest = {};
		displayFormRequest.ingenicoRequest.type = "DisplayForm";
		displayFormRequest.ingenicoRequest.rbaRequest = {};
		displayFormRequest.ingenicoRequest.rbaRequest.messageType = "dbtgft";
		displayFormRequest.ingenicoRequest.rbaRequest.languagePreference = langPref;
		displayFormRequest.ingenicoRequest.rbaRequest.formName = "DBTGFT.K3Z";

		tempArray = [
			{'index': '1', 'text': '$' + authAmount},
			{'index': '2', 'text': '$' + remainAmount}
		];
		if (this.isSpanish(langPref)) {
			tempPartialAuthArray = this.partialAuthFormTextES;
			mergedArray = tempPartialAuthArray.concat(tempArray);

		} else {
			tempPartialAuthArray = this.partialAuthFormText;
			mergedArray = tempPartialAuthArray.concat(tempArray);
		}

		displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = mergedArray;
		this.sendMessageToSocketServer(displayFormRequest);
	};

	captureLanguagePreference() {
	    this.isVerifyDLCalled = false;
		this.log("HAS captureLanguagePreference");
		var displayFormRequest: any;
		displayFormRequest = {};
		displayFormRequest.type = "INGENICO";
		displayFormRequest.ingenicoRequest = {};
		displayFormRequest.ingenicoRequest.type = "DisplayForm";
		displayFormRequest.ingenicoRequest.rbaRequest = {};
		displayFormRequest.ingenicoRequest.rbaRequest.messageType = "LANGPREF";
		displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.captureLanguagePreferenceFormText;
		displayFormRequest.ingenicoRequest.rbaRequest.formName = 'langPref.k3z';
		this.sendMessageToSocketServer(displayFormRequest);
	};

	displayThankYou(langPref) {
	    this.isVerifyDLCalled = false;
		this.log("HAS displayThankYou");
		var displayFormRequest: any;
		displayFormRequest = {};
		displayFormRequest.type = "INGENICO";
		displayFormRequest.ingenicoRequest = {};
		displayFormRequest.ingenicoRequest.type = "DisplayForm";
		displayFormRequest.ingenicoRequest.rbaRequest = {};
		displayFormRequest.ingenicoRequest.rbaRequest.messageType = "ThankYou";
		displayFormRequest.ingenicoRequest.rbaRequest.languagePreference = langPref;
		if (this.isSpanish(langPref)) {
			displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.thankYouFormTextES;
		} else {
			displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.thankYouFormText;
		}

		displayFormRequest.ingenicoRequest.rbaRequest.formName = 'thanks.k3z';
		this.sendMessageToSocketServer(displayFormRequest);
	};

	displayWelcome(langPref) {
	    this.isVerifyDLCalled = false;
		this.log("HAS displayWelcome");
		var displayFormRequest: any;
		displayFormRequest = {};
		displayFormRequest.type = "INGENICO";
		displayFormRequest.ingenicoRequest = {};
		displayFormRequest.ingenicoRequest.type = "DisplayForm";
		displayFormRequest.ingenicoRequest.rbaRequest = {};
		displayFormRequest.ingenicoRequest.rbaRequest.messageType = "Welcome";
		displayFormRequest.ingenicoRequest.rbaRequest.languagePreference = langPref;
		if (this.isSpanish(langPref)) {
			displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.welcomeFormTextES;
		} else {
			displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.welcomeFormText;
		}

		displayFormRequest.ingenicoRequest.rbaRequest.formName = 'thanks.k3z';
		this.sendMessageToSocketServer(displayFormRequest);
	};

	displayInformationForm(langPref, informationType) {
	    this.isVerifyDLCalled = false;
		this.log("HAS displayInformationForm");
		var displayFormRequest: any;
		displayFormRequest = {};
		displayFormRequest.type = "INGENICO";
		displayFormRequest.ingenicoRequest = {};
		displayFormRequest.ingenicoRequest.type = "DisplayForm";
		displayFormRequest.ingenicoRequest.rbaRequest = {};
		displayFormRequest.ingenicoRequest.rbaRequest.messageType = informationType;
		displayFormRequest.ingenicoRequest.rbaRequest.languagePreference = langPref;

		if (this.isSpanish(langPref)) {
			if (informationType === this.handPayType) {
				displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.handpayFormTextES;
			} else if (informationType === this.informType) {
				displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.informFormTextES;
			} else if (informationType === this.declinedType) {
				displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.declinedFormTextES;
			} else if (informationType === this.insufficientFundsType) {
				displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.insufficientFundsFormTextES;
			} else if (informationType === this.timeOutType) {
				displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.timeoutFormTextES;
			} else if (informationType === this.pinErrorType) {
				displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.pinerrorFormTextES;
			} else if (informationType === this.refundPinErrorType) {
				displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.refundPinErrorFormTextES;
			} else if (informationType === this.systemUnavailable) {
				displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.systemUnavailableFormTextES;
			}
		} else {
			if (informationType === this.handPayType) {
				displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.handpayFormText;
			} else if (informationType === this.informType) {
				displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.informFormText;
			} else if (informationType === this.declinedType) {
				displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.declinedFormText;
			} else if (informationType === this.insufficientFundsType) {
				displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.insufficientFundsFormText;
			} else if (informationType === this.timeOutType) {
				displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.timeoutFormText;
			} else if (informationType === this.pinErrorType) {
				displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.pinerrorFormText;
			} else if (informationType === this.refundPinErrorType) {
				displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.refundPinErrorFormText;
			} else if (informationType === this.systemUnavailable) {
				displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.systemUnavailableFormText;
			}
		}

		if (informationType === this.pinErrorType || informationType === this.refundPinErrorType || informationType === this.systemUnavailable) {
			displayFormRequest.ingenicoRequest.rbaRequest.formName = 'informerr.k3z';
		} else {
			displayFormRequest.ingenicoRequest.rbaRequest.formName = 'inform.k3z';
		}


		this.sendMessageToSocketServer(displayFormRequest);
	};

	displayItemListForm(langPref) {
	    this.isVerifyDLCalled = false;
		this.log("HAS displayItemListForm");
		var displayFormRequest: any;
		displayFormRequest = {};
		displayFormRequest.type = "INGENICO";
		displayFormRequest.ingenicoRequest = {};
		displayFormRequest.ingenicoRequest.type = "DisplayForm";
		displayFormRequest.ingenicoRequest.rbaRequest = {};
		displayFormRequest.ingenicoRequest.rbaRequest.messageType = "itemlist";
		displayFormRequest.ingenicoRequest.rbaRequest.languagePreference = langPref;
		if (this.isSpanish(langPref)) {
			displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.listItemFormTextES;
		} else {
			displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.listItemFormText;
		}
		displayFormRequest.ingenicoRequest.rbaRequest.formName = 'item_lst.k3z';
		this.sendMessageToSocketServer(displayFormRequest);
	};

	capturePin(langPref, cardNum, prompt, useAsCredit) {
	    this.isVerifyDLCalled = false;
		this.log("HAS capturePin");
		var debitPinFormRequest: any,
			tempCapturePinArray,
			mergedArray,
			tempArrayUseAsCreditES,
			tempArrayUseAsCredit,
			tempArrayES,
			tempArray;
		debitPinFormRequest = {};
		debitPinFormRequest.type = "INGENICO";
		debitPinFormRequest.ingenicoRequest = {};
		debitPinFormRequest.ingenicoRequest.type = "DebitPin";
		debitPinFormRequest.ingenicoRequest.rbaRequest = {};

		tempArrayUseAsCreditES = [
			{'index': '2', 'text': 'Pulsa                                        el teclado para procesarla como una tarjeta de cr&#233;dito'}
		];
		tempArrayUseAsCredit = [
			{'index': '2', 'text': 'Press                                      on the keypad to process as a credit card'}
		];
		tempArrayES = [
			{'index': '2', 'text': 'Pulsa                                        el bot&#243;n Cancelar para usar otro m&#233;todo de pago'}
		];
		tempArray = [
			{'index': '2', 'text': 'Press                                      on the keypad to use another method of payment'}
		];

		if (this.isSpanish(langPref)) {
			if (useAsCredit) {
				tempCapturePinArray = this.captureDebitPinFormTextES;
				mergedArray = tempCapturePinArray.concat(tempArrayUseAsCreditES);
			} else {
				tempCapturePinArray = this.captureDebitPinFormTextES;
				mergedArray = tempCapturePinArray.concat(tempArrayES);
			}
		} else {
			if (useAsCredit) {
				tempCapturePinArray = this.captureDebitPinFormText;
				mergedArray = tempCapturePinArray.concat(tempArrayUseAsCredit);
			} else {
				tempCapturePinArray = this.captureDebitPinFormText;
				mergedArray = tempCapturePinArray.concat(tempArray);
			}
		}

		debitPinFormRequest.ingenicoRequest.rbaRequest.setVariableData = mergedArray;
		debitPinFormRequest.ingenicoRequest.rbaRequest.formName = "pin.k3z";
		debitPinFormRequest.ingenicoRequest.rbaRequest.keyType = "*";
		debitPinFormRequest.ingenicoRequest.rbaRequest.encryptionConfiguation = "*";
		debitPinFormRequest.ingenicoRequest.rbaRequest.promptSpecifier = prompt;
		debitPinFormRequest.ingenicoRequest.rbaRequest.languagePreference = langPref;
		debitPinFormRequest.ingenicoRequest.customerRequest = {};
		debitPinFormRequest.ingenicoRequest.customerRequest.cardNumber = cardNum;
		this.sendMessageToSocketServer(debitPinFormRequest);
	};

	processCreditCard(langPref, tenderAmount) {
	    this.isVerifyDLCalled = false;
		this.log("HAS processCreditCard");
		var displayFormRequest: any,
			tempProcessCreditCardArray,
			mergedArray,
			tempArray;
		displayFormRequest = {};
		displayFormRequest.type = "INGENICO";
		displayFormRequest.ingenicoRequest = {};
		displayFormRequest.ingenicoRequest.type = "DisplayForm";
		displayFormRequest.ingenicoRequest.rbaRequest = {};
		displayFormRequest.ingenicoRequest.rbaRequest.messageType = "processCreditCard";
		displayFormRequest.ingenicoRequest.rbaRequest.languagePreference = langPref;

		tempArray = [
			{'index': '1', 'text': tenderAmount}
		];

		if (this.isSpanish(langPref)) {
			tempProcessCreditCardArray = this.processCreditCardFormTextES;
			mergedArray = tempProcessCreditCardArray.concat(tempArray);
		} else {
			tempProcessCreditCardArray = this.processCreditCardFormText;
			mergedArray = tempProcessCreditCardArray.concat(tempArray);
		}

		displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = mergedArray;
		displayFormRequest.ingenicoRequest.rbaRequest.formName = 'rnasct.k3z';
		this.sendMessageToSocketServer(displayFormRequest);
	};

	displaySalesTrans(langPref, subtotal, taxAmt, total, paidAmt, balanceDue) {
	    this.isVerifyDLCalled = false;
		this.log("HAS displaySalesTrans");
		var displayFormRequest: any = {},
			tempDisplaySalesArray,
			mergedArray,
			tempArray,
			tempArrayBalance,
			tempArrayBalanceES,
			tempArrayChange,
			tempArrayChangeES;

		displayFormRequest.type = "INGENICO";
		displayFormRequest.ingenicoRequest = {};
		displayFormRequest.ingenicoRequest.type = "DisplayForm";
		displayFormRequest.ingenicoRequest.rbaRequest = {};
		displayFormRequest.ingenicoRequest.rbaRequest.messageType = "salesTrans";
		displayFormRequest.ingenicoRequest.rbaRequest.languagePreference = langPref;
		displayFormRequest.ingenicoRequest.rbaRequest.formName = 'sales_ts.k3z';

		tempArray = [
			{'index': '2', 'text': subtotal},
			{'index': '4', 'text': taxAmt},
			{'index': '6', 'text': total},
			{'index': '8', 'text': paidAmt},
			{'index': '10', 'text': balanceDue}
		];

		tempArrayBalance = [
			{'index': '9', 'text': 'Balance Due:'}
		];

		tempArrayBalanceES = [
			{'index': '9', 'text': 'Saldo:'}
		];

		tempArrayChange = [
			{'index': '9', 'text': 'Change Due:'}
		];

		tempArrayChangeES = [
			{'index': '9', 'text': 'Cambio:'}
		];

		if (balanceDue <= 0) {
			if (this.isSpanish(langPref)) {
				tempDisplaySalesArray = this.salesTransFormTextES;
				mergedArray = tempDisplaySalesArray.concat(tempArrayChangeES);
			} else {
				tempDisplaySalesArray = this.salesTransFormText;
				mergedArray = tempDisplaySalesArray.concat(tempArrayChange);
			}
		} else {
			if (this.isSpanish(langPref)) {
				tempDisplaySalesArray = this.salesTransFormTextES;
				mergedArray = tempDisplaySalesArray.concat(tempArrayBalanceES);
			} else {
				tempDisplaySalesArray = this.salesTransFormText;
				mergedArray = tempDisplaySalesArray.concat(tempArrayBalance);
			}
		}

		mergedArray = mergedArray.concat(tempArray);

		displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = mergedArray;
		this.sendMessageToSocketServer(displayFormRequest);
	};

	displayCardErrorForm(errorType, langPref) {
	    this.isVerifyDLCalled = false;
		this.log("HAS displayCardErrorForm");
		var displayFormRequest: any;
		displayFormRequest = {}
		displayFormRequest.type = "INGENICO";
		displayFormRequest.ingenicoRequest = {};
		displayFormRequest.ingenicoRequest.type = "DisplayForm";
		displayFormRequest.ingenicoRequest.rbaRequest = {};
		displayFormRequest.ingenicoRequest.rbaRequest.messageType = errorType;
		displayFormRequest.ingenicoRequest.rbaRequest.languagePreference = langPref;
		displayFormRequest.ingenicoRequest.rbaRequest.formName = 'pinerror.k3z';

		if (this.isSpanish(langPref)) {
			if (errorType === this.pinErrorHybridType) {
				displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.pinErrorHybridFormTextES;
			} else if (errorType === this.cvvErrorType) {
				displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.cvvErrorFormTextES;
			} else if (errorType === this.expireErrorType) {
				displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.expireErrorFormTextES;
			}
		} else {
			if (errorType === this.pinErrorHybridType) {
				displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.pinErrorHybridFormText;
			} else if (errorType === this.cvvErrorType) {
				displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.cvvErrorFormText;
			} else if (errorType === this.expireErrorType) {
				displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.expireErrorFormText;
			}
		}

		this.sendMessageToSocketServer(displayFormRequest);
	};

	displayAuthorizingForm(langPref) {
	    this.isVerifyDLCalled = false;
		this.log("HAS displayAuthorizingForm");
		var displayFormRequest: any;
		displayFormRequest = {};
		displayFormRequest.type = "INGENICO";
		displayFormRequest.ingenicoRequest = {};
		displayFormRequest.ingenicoRequest.type = "DisplayForm";
		displayFormRequest.ingenicoRequest.rbaRequest = {};
		displayFormRequest.ingenicoRequest.rbaRequest.messageType = "authorize";
		displayFormRequest.ingenicoRequest.rbaRequest.languagePreference = langPref;
		displayFormRequest.ingenicoRequest.rbaRequest.formName = 'offline2.k3z';

		if (this.isSpanish(langPref)) {
			displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.authorizingFormTextES;
		} else {
			displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.authorizingFormText;
		}

		this.sendMessageToSocketServer(displayFormRequest);
	};

	captureSignature(langPref, sigType, totalAmount, planId) {
	    this.isVerifyDLCalled = false;
		this.log("HAS captureSignature");
		var displaySignatureFormRequest: any,
			tempCaptureSignatureArray,
			mergedArray,
			tempArrayCreditSignES,
			tempArrayEIPSignES,
			tempArrayCreditSign,
			tempArrayEIPSign;
		displaySignatureFormRequest = {};
		displaySignatureFormRequest.type = "INGENICO";
		displaySignatureFormRequest.ingenicoRequest = {};
		displaySignatureFormRequest.ingenicoRequest.type = "SignatureForm";
		displaySignatureFormRequest.ingenicoRequest.rbaRequest = {};
		displaySignatureFormRequest.ingenicoRequest.rbaRequest.messageType = sigType;
		displaySignatureFormRequest.ingenicoRequest.rbaRequest.languagePreference = langPref;
		displaySignatureFormRequest.ingenicoRequest.rbaRequest.promptSpecifier = '0';
		displaySignatureFormRequest.ingenicoRequest.rbaRequest.formName = 'sign.k3z';

		tempArrayCreditSignES = [
			{'index': '2', 'text': 'los productos y/o servicios por el monto de ' + totalAmount}
		];
		tempArrayEIPSignES = [
			{'index': '4', 'text': 'ID:' + planId + ', incluyendot&eacute;rminos de Aviso al Comprador y acepta cumplir con ellos.'}
		];
		tempArrayCreditSign = [
			{'index': '2', 'text': 'services in the amount of ' + totalAmount}
		];
		tempArrayEIPSign = [
			{'index': '3', 'text': planId + ' including any Notice to Buyer terms'}
		];

		if (this.isSpanish(langPref)) {
			if (sigType === 'undefined' || !this.isNotNullOrEmpty(sigType)) {
				displaySignatureFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.emptySignatureFormTextES;
			} else if (sigType === this.captureSigType) {
				displaySignatureFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.captureSignatureFormTextES;
			} else if (sigType === this.creditSigType) {
				tempCaptureSignatureArray = this.creditSignatureFormTextES;
				mergedArray = tempCaptureSignatureArray.concat(tempArrayCreditSignES);
				displaySignatureFormRequest.ingenicoRequest.rbaRequest.setVariableData = mergedArray;
			} else if (sigType === this.cihuSigType) {
				displaySignatureFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.cihuSignatureFormTextES;
			} else if (sigType === this.drpSigType) {
				displaySignatureFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.drpSignatureFormTextES;
			} else if (sigType === this.tesaSigType) {
				displaySignatureFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.tesaSignatureFormTextES;
			} else if (sigType === this.onFileSigType) {
				displaySignatureFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.onfileSignatureFormTextES;
			} else if (sigType === this.eipSigType) {
				tempCaptureSignatureArray = this.eipSignatureFormTextES;
				mergedArray = tempCaptureSignatureArray.concat(tempArrayEIPSignES);
				displaySignatureFormRequest.ingenicoRequest.rbaRequest.setVariableData = mergedArray;
			} else {
				displaySignatureFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.emptySignatureFormTextES;
			}

		} else {
			if (sigType === 'undefined' || !this.isNotNullOrEmpty(sigType)) {
				displaySignatureFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.emptySignatureFormText;
			} else if (sigType === this.captureSigType) {
				displaySignatureFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.captureSignatureFormText;
			} else if (sigType === this.creditSigType) {
				tempCaptureSignatureArray = this.creditSignatureFormText;
				mergedArray = tempCaptureSignatureArray.concat(tempArrayCreditSign);
				displaySignatureFormRequest.ingenicoRequest.rbaRequest.setVariableData = mergedArray;
			} else if (sigType === this.cihuSigType || sigType === this.tesaSigType) {
				displaySignatureFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.cihuSignatureFormText;
			} else if (sigType === this.drpSigType) {
				displaySignatureFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.drpSignatureFormText;
			} else if (sigType === this.onFileSigType) {
				displaySignatureFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.onfileSignatureFormText;
			} else if (sigType === this.eipSigType) {
				tempCaptureSignatureArray = this.eipSignatureFormText;
				mergedArray = tempCaptureSignatureArray.concat(tempArrayEIPSign);
				displaySignatureFormRequest.ingenicoRequest.rbaRequest.setVariableData = mergedArray;
			} else {
				displaySignatureFormRequest.ingenicoRequest.rbaRequest.setVariableData = this.emptySignatureFormText;
			}
		}

		this.sendMessageToSocketServer(displaySignatureFormRequest);
	};

	captureLastThreeOfPlanId(langPref) {
	    this.isVerifyDLCalled = false;
		this.log("HAS captureLastThreeOfPlanId");
		var planIdRequest: any;
		planIdRequest = {};
		planIdRequest.type = "INGENICO";
		planIdRequest.ingenicoRequest = {};
		planIdRequest.ingenicoRequest.type = "ClearEntry";
		planIdRequest.ingenicoRequest.rbaRequest = {};
		planIdRequest.ingenicoRequest.rbaRequest.inputFormat = '38';
		planIdRequest.ingenicoRequest.rbaRequest.promptSpecifier = '317';

		if (this.isSpanish(langPref)) {
			planIdRequest.ingenicoRequest.rbaRequest.setVariableData = this.captureLastThreeofPlanIdFormTextES;
		} else {
			planIdRequest.ingenicoRequest.rbaRequest.setVariableData = this.captureLastThreeofPlanIdFormText;
		}
		planIdRequest.ingenicoRequest.rbaRequest.formName = 'eip3dpin.k3z';
		this.sendMessageToSocketServer(planIdRequest);
	};

	captureCreditCard(langPref) {
		this.log("HAS captureCreditCard");
		this.captureCreditCardFD(langPref, "swipecc.k3z", false);
	};

	captureCreditCardFD(langPref, ccFormName, isVesta) {
	    this.isVerifyDLCalled = false;
		this.log("HAS captureCreditCardFD");
		var captureMsrRequest: any;
		captureMsrRequest  = {};
		captureMsrRequest.type = "INGENICO";
		captureMsrRequest.ingenicoRequest = {};
		captureMsrRequest.ingenicoRequest.type = "CaptureMsr";
		captureMsrRequest.ingenicoRequest.rbaRequest = {};
		captureMsrRequest.ingenicoRequest.rbaRequest.languagePreference = langPref;

		if (isVesta) {
			captureMsrRequest.ingenicoRequest.rbaRequest.messageType = "fdcreditcard";
		} else {
			captureMsrRequest.ingenicoRequest.rbaRequest.messageType = "creditCard";
		}

		if (ccFormName === "ccodm.k3z") {
			captureMsrRequest.ingenicoRequest.rbaRequest.formName = "ccodm.k3z";
			if (this.isSpanish(langPref)) {
				captureMsrRequest.ingenicoRequest.rbaRequest.setVariableData = this.captureCreditCardManualEntryFormTextES;
			} else {
				captureMsrRequest.ingenicoRequest.rbaRequest.setVariableData = this.captureCreditCardManualEntryFormText;
			}
		} else {
			captureMsrRequest.ingenicoRequest.rbaRequest.formName = "swipecc.k3z";
			if (this.isSpanish(langPref)) {
				captureMsrRequest.ingenicoRequest.rbaRequest.setVariableData = this.captureCreditCardSwipeFormTextES;
			} else {
				captureMsrRequest.ingenicoRequest.rbaRequest.setVariableData = this.captureCreditCardSwipeFormText;
			}
		}

		captureMsrRequest.ingenicoRequest.transactionRequest = {};

		if (isVesta) {
			captureMsrRequest.ingenicoRequest.transactionRequest.usingVesta = true;
		} else {
			captureMsrRequest.ingenicoRequest.transactionRequest.usingVesta = false;
		}

		this.sendMessageToSocketServer(captureMsrRequest);
	};

	captureDL(langPref) {
	    this.isVerifyDLCalled = false;
		this.myDate = new Date();
		this.startTime = this.myDate.getTime();
		this.log("StartTime ms: " + this.startTime);

		this.log("HAS captureDL");
		var captureMsrRequest: any;
		captureMsrRequest = {};
		captureMsrRequest.type = "INGENICO";
		captureMsrRequest.ingenicoRequest = {};
		captureMsrRequest.ingenicoRequest.type = "CaptureMsr";
		captureMsrRequest.ingenicoRequest.rbaRequest = {};
		captureMsrRequest.ingenicoRequest.rbaRequest.messageType = "driversLicense";
		captureMsrRequest.ingenicoRequest.rbaRequest.languagePreference = langPref;
		captureMsrRequest.ingenicoRequest.rbaRequest.formName = 'swipedl.k3z';

		if (this.isSpanish(langPref)) {
			captureMsrRequest.ingenicoRequest.rbaRequest.setVariableData = this.captureDLFormTextES;
		} else {
			captureMsrRequest.ingenicoRequest.rbaRequest.setVariableData = this.captureDLFormText;
		}
		this.sendMessageToSocketServer(captureMsrRequest);
	};

	displayText(langPref, tcIndex, isInHome, customerName, trxDate, phoneNumber, deviceModel, deviceImei) {
	    this.isVerifyDLCalled = false;
		this.log("HAS displayText");
		var termsConditionsRequest: any,
			tempTermsTextArray,
			mergedArray,
			tempArrayInHome,
			tempArray;

		termsConditionsRequest = {};
		termsConditionsRequest.type = "INGENICO";
		termsConditionsRequest.ingenicoRequest = {};
		termsConditionsRequest.ingenicoRequest.type = "DisplayTerms";
		termsConditionsRequest.ingenicoRequest.rbaRequest = {};
		termsConditionsRequest.ingenicoRequest.rbaRequest.languagePreference = langPref;
		termsConditionsRequest.ingenicoRequest.rbaRequest.varText = tcIndex;
		termsConditionsRequest.ingenicoRequest.rbaRequest.formName = 'tc.k3z';

		tempArrayInHome = [
			{'index': '3', 'text': customerName},
			{'index': '4', 'text': phoneNumber},
			{'index': '5', 'text': deviceModel},
			{'index': '6', 'text': deviceImei}
		];
		tempArray = [
			{'index': '3', 'text': trxDate},
			{'index': '4', 'text': customerName}
		];

		if (isInHome) {
			termsConditionsRequest.ingenicoRequest.rbaRequest.messageType = "InHomeCoverage";
			if (this.isSpanish(langPref)) {
				tempTermsTextArray = this.termsFormTextES;
				mergedArray = tempTermsTextArray.concat(tempArrayInHome);
			} else {
				tempTermsTextArray = this.termsFormText;
				mergedArray = tempTermsTextArray.concat(tempArrayInHome);
			}
		} else {
			termsConditionsRequest.ingenicoRequest.rbaRequest.messageType = "Terms";
			if (this.isSpanish(langPref)) {
				tempTermsTextArray = this.termsFormTextES;
				mergedArray = tempTermsTextArray.concat(tempArray);
			} else {
				tempTermsTextArray = this.termsFormText;
				mergedArray = tempTermsTextArray.concat(tempArray);
			}
		}

		termsConditionsRequest.ingenicoRequest.rbaRequest.setVariableData = mergedArray;

		this.sendMessageToSocketServer(termsConditionsRequest);
	};

	displayTCForm(langPref, textString) {
	    this.isVerifyDLCalled = false;
		this.log("HAS displayTCForm");
		var termsConditionsRequest: any = {};
		termsConditionsRequest.type = "INGENICO";
		termsConditionsRequest.ingenicoRequest = {};
		termsConditionsRequest.ingenicoRequest.type = "DisplayTerms";
		termsConditionsRequest.ingenicoRequest.rbaRequest = {};
		termsConditionsRequest.ingenicoRequest.rbaRequest.messageType = "CreatedTerms";
		termsConditionsRequest.ingenicoRequest.rbaRequest.varText = textString;
		termsConditionsRequest.ingenicoRequest.rbaRequest.languagePreference = langPref;
		termsConditionsRequest.ingenicoRequest.rbaRequest.formName = 'tc.k3z';

		if (this.isSpanish(langPref)) {
			termsConditionsRequest.ingenicoRequest.rbaRequest.setVariableData = this.createdTermsFormTextES;
		} else {
			termsConditionsRequest.ingenicoRequest.rbaRequest.setVariableData = this.createdTermsFormText;
		}

		this.sendMessageToSocketServer(termsConditionsRequest);
	};

	verifyAmount(langPref, amount) {
	    this.isVerifyDLCalled = false;
		this.log("HAS verifyAmount");
		var displayFormRequest: any = {},
			tempVerifyAmountArray,
			mergedArray,
			tempArray;

		displayFormRequest.type = "INGENICO";
		displayFormRequest.ingenicoRequest = {};
		displayFormRequest.ingenicoRequest.type = "DisplayForm";
		displayFormRequest.ingenicoRequest.rbaRequest = {};
		displayFormRequest.ingenicoRequest.rbaRequest.messageType = "VerifyAmount";
		displayFormRequest.ingenicoRequest.rbaRequest.languagePreference = langPref;
		displayFormRequest.ingenicoRequest.rbaRequest.formName = 'verfyamt.k3z';

		tempArray = [
			{'index': '1', 'text': '$' + amount}
		];

		if (this.isSpanish(langPref)) {
			tempVerifyAmountArray = this.verifyAmountFormTextES;
			mergedArray = tempVerifyAmountArray.concat(tempArray);
		} else {
			tempVerifyAmountArray = this.verifyAmountFormText;
			mergedArray = tempVerifyAmountArray.concat(tempArray);
		}

		displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = mergedArray;
		this.sendMessageToSocketServer(displayFormRequest);
	};

	verifyPhone(langPref, contactNumber) {
	    this.isVerifyDLCalled = false;
		this.log("HAS verifyPhone");
		var displayFormRequest: any = {},
			tempVerifyPhoneArray,
			mergedArray,
			tempArray;

		displayFormRequest.type = "INGENICO";
		displayFormRequest.ingenicoRequest = {};
		displayFormRequest.ingenicoRequest.type = "DisplayForm";
		displayFormRequest.ingenicoRequest.rbaRequest = {};
		displayFormRequest.ingenicoRequest.rbaRequest.messageType = "VerifyPhone";
		displayFormRequest.ingenicoRequest.rbaRequest.languagePreference = langPref;
		displayFormRequest.ingenicoRequest.rbaRequest.formName = 'VERIFPHN.K3Z';

		tempArray = [
			{'index': '1', 'text': contactNumber}
		];

		if (this.isSpanish(langPref)) {
			tempVerifyPhoneArray = this.verifyPhoneFormTextES;
			mergedArray = tempVerifyPhoneArray.concat(tempArray);
		} else {
			tempVerifyPhoneArray = this.verifyPhoneFormText;
			mergedArray = tempVerifyPhoneArray.concat(tempArray);
		}

		displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = mergedArray;
		this.sendMessageToSocketServer(displayFormRequest);
	};

	verifySSN(langPref, ssn) {
	    this.isVerifyDLCalled = false;
		this.log("HAS verifySSN");
		var displayFormRequest: any = {},
			tempVerifySSNArray,
			mergedArray,
			tempArray;

		displayFormRequest.type = "INGENICO";
		displayFormRequest.ingenicoRequest = {};
		displayFormRequest.ingenicoRequest.type = "DisplayForm";
		displayFormRequest.ingenicoRequest.rbaRequest = {};
		displayFormRequest.ingenicoRequest.rbaRequest.messageType = "VerifySSN";
		displayFormRequest.ingenicoRequest.rbaRequest.languagePreference = langPref;
		displayFormRequest.ingenicoRequest.rbaRequest.formName = 'VERIFPHN.K3Z';

		tempArray = [
			{'index': '1', 'text': ssn}
		];

		if (this.isSpanish(langPref)) {
			tempVerifySSNArray = this.verifySSNFormTextES;
			mergedArray = tempVerifySSNArray.concat(tempArray);
		} else {
			tempVerifySSNArray = this.verifySSNFormText;
			mergedArray = tempVerifySSNArray.concat(tempArray);
		}

		displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = mergedArray;
		this.sendMessageToSocketServer(displayFormRequest);
	};

	verifyDL(langPref, customerName, address, city, state, zipCode, dateOfBirth, driversLicenseNumber) {
	    this.log("HAS verifyDL");
		this.isVerifyDLCalled = true;
		var displayFormRequest: any = {},
			tempVerifyDLArray,
			mergedArray,
			tempArray;

		displayFormRequest.type = "INGENICO";
		displayFormRequest.ingenicoRequest = {};
		displayFormRequest.ingenicoRequest.type = "DisplayForm";
		displayFormRequest.ingenicoRequest.rbaRequest = {};
		displayFormRequest.ingenicoRequest.rbaRequest.messageType = "VerifyDL";
		displayFormRequest.ingenicoRequest.rbaRequest.languagePreference = langPref;
		displayFormRequest.ingenicoRequest.rbaRequest.formName = 'VERIFYDL.K3Z';

		tempArray = [
			{'index': '1', 'text': customerName},
			{'index': '2', 'text': address},
			{'index': '3', 'text': city + ' ' + state + ' ' + zipCode},
			{'index': '4', 'text': dateOfBirth},
			{'index': '5', 'text': driversLicenseNumber}
		];

		if (this.isSpanish(langPref)) {
			tempVerifyDLArray = this.verifyDLFormTextES;
			mergedArray = tempVerifyDLArray.concat(tempArray);
		} else {
			tempVerifyDLArray = this.verifyDLFormText;
			mergedArray = tempVerifyDLArray.concat(tempArray);
		}

		displayFormRequest.ingenicoRequest.rbaRequest.setVariableData = mergedArray;
		this.sendMessageToSocketServer(displayFormRequest);
	};

	getDeviceVersion(returnType) {
	    this.isVerifyDLCalled = false;
		this.myDate = new Date();
		this.startTime = this.myDate.getTime();
		this.log("HAS getDeviceVersion");
		this.log("StartTime ms: " + this.startTime);
		var getDeviceVersionRequest: any = {};
		getDeviceVersionRequest.type = "INGENICO";
		getDeviceVersionRequest.ingenicoRequest = {};
		getDeviceVersionRequest.ingenicoRequest.type = "DeviceVersion";
		getDeviceVersionRequest.ingenicoRequest.rbaRequest = {};
		getDeviceVersionRequest.ingenicoRequest.rbaRequest.varText = returnType;
		this.sendMessageToSocketServer(getDeviceVersionRequest);
	};

	getHealthStats(returnType) {
	    this.isVerifyDLCalled = false;
		this.myDate = new Date();
		this.startTime = this.myDate.getTime();
		this.log("Staring Health Stat: " + this.startTime);
		this.log("HAS getHealthStats");
		var getHealthStatsRequest: any = {};
		getHealthStatsRequest.type = "INGENICO";
		getHealthStatsRequest.ingenicoRequest = {};
		getHealthStatsRequest.ingenicoRequest.type = "HealthStat";
		getHealthStatsRequest.ingenicoRequest.rbaRequest = {};
		getHealthStatsRequest.ingenicoRequest.rbaRequest.varText = returnType;
		this.sendMessageToSocketServer(getHealthStatsRequest);
	};

	paymentTerminalOnline() {
	    this.isVerifyDLCalled = false;
		this.log("HAS paymentTerminalOnline");
		var onlineRequest: any = {};
		onlineRequest.type = "INGENICO";
		onlineRequest.ingenicoRequest = {};
		onlineRequest.ingenicoRequest.type = "TerminalOnline";
		this.sendMessageToSocketServer(onlineRequest);
	};

	paymentTerminalOffline() {
	    this.isVerifyDLCalled = false;
		this.log("HAS paymentTerminalOffline");
		var offlineRequest: any = {};
		offlineRequest.type = "INGENICO";
		offlineRequest.ingenicoRequest = {};
		offlineRequest.ingenicoRequest.type = "TerminalOffline";
		this.sendMessageToSocketServer(offlineRequest);
	};

	rebootPaymentTerminal() {
	    this.isVerifyDLCalled = false;
		this.log("HAS rebootPaymentTerminal");
		var rebootPaymentTerminalRequest: any = {};
		rebootPaymentTerminalRequest.type = "INGENICO";
		rebootPaymentTerminalRequest.ingenicoRequest = {};
		rebootPaymentTerminalRequest.ingenicoRequest.type = "RebootDevice";
		this.sendMessageToSocketServer(rebootPaymentTerminalRequest);
	};

	cancelDeviceTransaction() {
	    this.isVerifyDLCalled = false;
		this.log("HAS cancelDeviceTransaction");
		var hardResetDeviceRequest: any = {};
		hardResetDeviceRequest.type = "INGENICO";
		hardResetDeviceRequest.ingenicoRequest = {};
		hardResetDeviceRequest.ingenicoRequest.type = "HardResetDevice";
		this.sendMessageToSocketServer(hardResetDeviceRequest);
	};

	/*
	* expect resetTypes
	* 0 = Hard (same as 10.x message)
	* 1 = Cancel Signature (iSC250/iSC350 only)
	* 2 = Cancel PIN
	* 3 = Reset Amount
	* 4 = Reset Signature (iSC250/iSC350 only)
	* 5 = Continue Action
	* 6 = Stop Action, cancel process started by on-demand message
	* 7 = Reset PIN
	* 8 = Clear Line Item Display
	*
	*/
	softDeviceReset(resetType) {
	    this.isVerifyDLCalled = false;
		this.log("HAS softDeviceReset");
		var softResetDeviceRequest: any = {};
		softResetDeviceRequest.type = "INGENICO";
		softResetDeviceRequest.ingenicoRequest = {};
		softResetDeviceRequest.ingenicoRequest.type = "SoftResetDevice";
		softResetDeviceRequest.ingenicoRequest.rbaRequest = {};
		softResetDeviceRequest.ingenicoRequest.rbaRequest.keyType = resetType;
		this.sendMessageToSocketServer(softResetDeviceRequest);
	};

	displayAds() {
	    this.isVerifyDLCalled = false;
		this.log("HAS displayAds");
		var displayAdRequest: any = {};
		displayAdRequest.type = "INGENICO";
		displayAdRequest.ingenicoRequest = {};
		displayAdRequest.ingenicoRequest.type = "DisplayAds";
		this.sendMessageToSocketServer(displayAdRequest);
	};

	setVariable(index, text) {
	    this.isVerifyDLCalled = false;
		this.log("HAS setVariable");
		var setVariableRequest: any = {};
		setVariableRequest.type = "INGENICO";
		setVariableRequest.ingenicoRequest = {};
		setVariableRequest.ingenicoRequest.type = "SetVariable";
		setVariableRequest.ingenicoRequest.rbaRequest = {};
		setVariableRequest.ingenicoRequest.rbaRequest.varText = index;
		setVariableRequest.ingenicoRequest.rbaRequest.message = text;
		this.sendMessageToSocketServer(setVariableRequest);
	};

	getVariable(index) {
	    this.isVerifyDLCalled = false;
		this.myDate = new Date();
		this.startTime = this.myDate.getTime();
		this.log("StartTime getVariable ms: " + this.startTime);
		this.log("HAS getVariable");
		var getVariableRequest: any = {};
		getVariableRequest.type = "INGENICO";
		getVariableRequest.ingenicoRequest = {};
		getVariableRequest.ingenicoRequest.type = "GetVariable";
		getVariableRequest.ingenicoRequest.rbaRequest = {};
		getVariableRequest.ingenicoRequest.rbaRequest.varText = index;
		this.sendMessageToSocketServer(getVariableRequest);
	};

	readConfiguration(group, index) {
	    this.isVerifyDLCalled = false;
		this.myDate = new Date();
		this.startTime = this.myDate.getTime();
		this.log("StartTime readConfiguration ms: " + this.startTime);
		this.log("HAS readConfiguration");
		var readConfigurationRequest: any = {};
		readConfigurationRequest.type = "INGENICO";
		readConfigurationRequest.ingenicoRequest = {};
		readConfigurationRequest.ingenicoRequest.type = "ReadConfiguration";
		readConfigurationRequest.ingenicoRequest.rbaRequest = {};
		readConfigurationRequest.ingenicoRequest.rbaRequest.groupNumber = group;
		readConfigurationRequest.ingenicoRequest.rbaRequest.indexNumber = index;
		readConfigurationRequest.ingenicoRequest.rbaRequest.varText = "READ";
		this.sendMessageToSocketServer(readConfigurationRequest);
	};

	writeConfiguration(group, index, configValue) {
	    this.isVerifyDLCalled = false;	
		this.log("HAS writeConfiguration");
		var writeConfigurationRequest: any = {};
		writeConfigurationRequest.type = "INGENICO";
		writeConfigurationRequest.ingenicoRequest = {};
		writeConfigurationRequest.ingenicoRequest.type = "WriteConfiguration";
		writeConfigurationRequest.ingenicoRequest.rbaRequest = {};
		writeConfigurationRequest.ingenicoRequest.rbaRequest.groupNumber = group;
		writeConfigurationRequest.ingenicoRequest.rbaRequest.indexNumber = index;
		writeConfigurationRequest.ingenicoRequest.rbaRequest.configValueToSet = configValue;
		writeConfigurationRequest.ingenicoRequest.rbaRequest.varText = "WRITE";
		this.sendMessageToSocketServer(writeConfigurationRequest);
	};

	clearVariables() {
	    this.isVerifyDLCalled = false;
		this.log("HAS clearVariables");
		var clearVariableRequest: any = {};
		clearVariableRequest.type = "INGENICO";
		clearVariableRequest.ingenicoRequest = {};
		clearVariableRequest.ingenicoRequest.type = "ClearVariable";
		this.sendMessageToSocketServer(clearVariableRequest);
	};
	/**End of RBA message methods**/

	isSpanish(langPref) {
		var response = false;
		if ((langPref != null && langPref != "") && langPref.toUpperCase() === 'S' || langPref.toUpperCase() === 'SPANISH') {
			response = true;
		}
		return response;
	};

	ingenicoHASHandler(ingenico) {
		this.log("HAS ingenicoHASHandler");
		switch (ingenico.type.toUpperCase()) {
		case "TIMEOUT":
			this.onTimeoutHandler();
			break;
		case "ERRORRESPONSE":
			this.onErrorHandler(ingenico.data.userResponse);
			break;
		case "INVALIDPINLENGTH":
			this.onDebitPinInvalidLengthHandler(ingenico.data.userResponse);
			break;
		case "ACCEPT":
			if (this.isVerifyDLCalled) {
				this.onAcceptHandler(this.driversLicObject);
			} else {
				this.onAcceptHandler(ingenico.data.userResponse);
			}
			this.isVerifyDLCalled = false;
			break;
		case "USERCANCELLED":
			this.onCancelHandler();
			break;
		case "EDIT":
			this.onEditHandler();
			break;
		case "USERINPUT":
			this.onCustomerFormDataReadyHandler(ingenico.data.userResponse);
			break;
		case "PINDATA":
			this.onDebitPinReadyHandler(ingenico.data.userResponse);
			break;
		case "MSRDATA":
			if (ingenico.data.cardSwipeData.cardDataType.toUpperCase() === "DRIVERSLICENSE") {
				var dlObject = this.CreateIdObject();
				this.driversLicObject = new this.driversLicenseData();
				dlObject = this.processIdSwipe(ingenico.data.cardSwipeData);
				// dlObject = this.IDParser.processIdSwipe(ingenico.data.cardSwipeData);
				this.driversLicObject.Lastname = dlObject.LastName;
				this.driversLicObject.Firstname = dlObject.FirstName;
				this.driversLicObject.Middlename = dlObject.MiddleName;
				this.driversLicObject.Suffix = dlObject.Suffix;
				this.driversLicObject.Address1 = dlObject.StreetAddress;
				this.driversLicObject.Address2 = dlObject.StreetAddress_2;
				this.driversLicObject.City = dlObject.City;
				this.driversLicObject.State = dlObject.State;
				this.driversLicObject.Zipcode = dlObject.ZIPCode;
				this.driversLicObject.ZipExt = dlObject.ZipExt;
				this.driversLicObject.IdNumber = dlObject.IDNumber;
				this.driversLicObject.IDExpDate = dlObject.IDExpDate;
				this.driversLicObject.Dob = dlObject.DOB;
				this.driversLicObject.IDIssueDate = dlObject.IDIssueDate;
				this.driversLicObject.RawData = dlObject.RawData;
				this.onDLDataReadyHandler(this.driversLicObject);
			} else if (ingenico.data.cardSwipeData.cardDataType.toUpperCase() === "CREDITCARD") {
				this.onMSRDataReadyHandler(ingenico.data.cardSwipeData);
			} else if (ingenico.data.cardSwipeData.cardDataType.toUpperCase() === "FDCREDITCARD") {
				this.onMSRDataReadyHandlerFD(ingenico.data.cardSwipeData);
			}
			this.myDate = new Date();
			this.endTime = this.myDate.getTime();
			this.responseTime = this.endTime - this.startTime;
			this.log("EndTime in ms: " + this.endTime);
			this.log("Response Time: " + this.responseTime + "ms");

			this.myDate = "";
			this.endTime = "";
			this.startTime = "";
			this.responseTime = "";

			break;
		case "SIGNATUREDATAREADY":
			this.onSignatureDataReadyHandler(ingenico.data.userResponse, 'data:image/png;base64,' + ingenico.data.sigData, ingenico.data.sigData);
			break;
		case "VERSIONDATA":
			this.myDate = new Date();
			this.endTime = this.myDate.getTime();
			this.responseTime = this.endTime - this.startTime;
			this.log("EndTime in ms: " + this.endTime);
			this.log("Response Time: " + this.responseTime + "ms");

			this.getDeviceVersionHandler(ingenico.data.versionData);
			this.myDate = "";
			this.endTime = "";
			this.startTime = "";
			this.responseTime = "";

			break;
		case "HEALTHSTATDATA":
			this.myDate = new Date();
			this.endTime = this.myDate.getTime();
			this.responseTime = this.endTime - this.startTime;
			this.log("EndTime HealthStat in ms: " + this.endTime);
			this.log("Response Time: " + this.responseTime + "ms");

			this.getDeviceHealthStatsHandler(ingenico.data.versionData);
			this.myDate = "";
			this.endTime = "";
			this.startTime = "";
			this.responseTime = "";

			break;
		case "ITEMSDISPLAYED":
			this.setDisplayItemHandler();
			break;
		case "SALESFORMLOADED":
			this.onSalesFormLoaded();
			break;
		case "GETVARIABLE":
			this.myDate = new Date();
			this.endTime = this.myDate.getTime();
			this.responseTime = this.endTime - this.startTime;
			this.log("EndTime GetVariable in ms: " + this.endTime);
			this.log("Response Time: " + this.responseTime + "ms");

			this.getVariableRequestHandler(ingenico.data.userResponse);
			this.myDate = "";
			this.endTime = "";
			this.startTime = "";
			this.responseTime = "";

			break;
		case "READCONFIGURATION":
			this.myDate = new Date();
			this.endTime = this.myDate.getTime();
			this.responseTime = this.endTime - this.startTime;
			this.log("EndTime READCONFIGURATION in ms: " + this.endTime);
			this.log("Response Time: " + this.responseTime + "ms");

			this.readConfigurationHandler(ingenico.data);
			this.myDate = "";
			this.endTime = "";
			this.startTime = "";
			this.responseTime = "";

			break;
		case "WRITECONFIGURATION":
			this.writeConfigurationHandler(ingenico.data.userResponse);
			break;
		}	
	};
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
