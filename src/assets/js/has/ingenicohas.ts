import { Commonhas } from '../has/commonhas';

export class Ingenicohas extends Commonhas{
	constructor(){
		super();
	}
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