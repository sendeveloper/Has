import { Component,Inject } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { IngenicoLibraryWS } from '../assets/js/ingenicolibraryws';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	title: string;
	clientName: string;
	langPref: boolean;
	disableButtons: any;
	buttonAttribute: any;
	selectedIndex: number;
	output: string;
	outputpopup: string;
	outputta: string
	responseData: string;
	textAreaTC: string;
	resetType: string;
	varIndex: string;
	varString: string;
	configValueString: string;
	outputcontainer: boolean;
	imagecontainer: boolean;
	sigimage: string;
	scancontainer: boolean;
	scanfieldcontainer: boolean;

	activationFlowPersonal: boolean;
	activationFlowEmployee: boolean;
	activationFlowPersonalGuarantor: boolean;
	activationFlowAddALine: boolean;
	captureDLPersonal: boolean;
	primaryPhonePersonalCaptured: boolean;
	passcodeCaptured: boolean;
	homePhoneCaptured: boolean;
	ssnCaptured: boolean;
	emailCaptured: boolean;
	activationTerms: boolean;
	pNumberCapture: boolean;
	last4Captured: boolean;
	personalGuarantorCapture: boolean;
	feinCapture: boolean;
	enterPasscodeCaptured: boolean;
	purchaseFlowCredit: boolean;
	purchaseFlowDebit: boolean;
	purchaseFlowCash: boolean;
	purchaseFlowDrp: boolean;
	purchaseFlowIhc: boolean;
	purchaseFlowFa: boolean;
	verifyAmountCapture: boolean;
	debitPinCapture: boolean;
	processCreditCardCapture: boolean;
	captureLangPref: boolean;
	drpTerms: boolean;
	ihcTerms: boolean;
	faTerms: boolean;

	languagePreference: string;

	keyBuffer: string;
	bufferLen: number;
	oDlData: any;
	keyboardMap: any;

	firstName: string;
	midInit: string;
	lastName: string;
	suffix: string;
	address1: string;
	address2: string;
	zip: string;
	city: string;
	state: string;
	idType: string;
	idIssued: string;
	id: string;
	birthDate: string;

	accountNumber: string;
	mobileNumber: string;
	token: string;
	channel: string;
	constructor(public ingenicolibraryws: IngenicoLibraryWS){

		this.initInterface();
		this.fShowCurrentDiv();
		this.fShowIngenicoDiv();
		this.fClearOutput();
		this.initData();
		this.initKeyData();
		this.initContainerData();

		this.setEventHandlersWebsocket();
		this.getLangPref();
	}
	
	initInterface(){
		var i;
		this.title = 'HAS';
		this.clientName = 'option1';
		this.langPref = false;
		this.disableButtons = ["clientName", "connect", "disconnect", "setvariable", "getvariable",
								"dlcapture", "scandl"];
		this.buttonAttribute = [];
		for (i=0;i<this.disableButtons.length;i++)
			this.buttonAttribute[ this.disableButtons[i] ] = false;
		
		this.buttonAttribute['disconnect'] = true;
		this.selectedIndex = 1;
		this.outputcontainer = this.imagecontainer = false;
		this.scancontainer = false;
		this.scanfieldcontainer = false;

		this.accountNumber = "";
		this.mobileNumber = "";
		this.token = "";
		this.channel = "";
		// this.outputcontainer = true;
	}
	fOutputDisplay(show: boolean){
		this.outputcontainer = show;
	}
	fWriteOutput(text: string){
		if (this.output == "&nbsp;" || this.output == "")
			this.output = (text + "<br />");
		else
			this.output += (text + "<br />");
		this.outputta += (text + "\n");
		// outputtextarea.scrollTop = outputtextarea.scrollHeight;
	}
	fClearOutput(){
		this.output = "&nbsp;";
		this.outputpopup = "&nbsp;";
		this.outputta = "";
		this.responseData = "";
		this.textAreaTC = "";
		this.resetType = "";
		this.varIndex = "";
		this.varString = "";
		this.configValueString = "";
		this.sigimage = "";
		this.scancontainer = false;
	}
	fImageDisplay(show: boolean) {
		this.imagecontainer = show;
	}
	hideIngenicoDivs(){
		// unnecessary
	}
	fShowCurrentDiv(){
		
	}
	fShowIngenicoDiv(){

	}
	fClearImage(){

	}
	
	initData(){
		this.activationFlowPersonal = false;
		this.activationFlowEmployee = false;
		this.activationFlowPersonalGuarantor = false;
		this.activationFlowAddALine = false;
		this.captureDLPersonal = false;
		this.primaryPhonePersonalCaptured = false;
		this.passcodeCaptured = false;
		this.homePhoneCaptured = false;
		this.ssnCaptured = false;
		this.emailCaptured = false;
		this.activationTerms = false;
		this.pNumberCapture = false;
		this.last4Captured = false;
		this.personalGuarantorCapture = false;
		this.feinCapture = false;
		this.enterPasscodeCaptured = false;
		this.purchaseFlowCredit = false;
		this.purchaseFlowDebit = false;
		this.purchaseFlowCash = false;
		this.purchaseFlowDrp = false;
		this.purchaseFlowIhc = false;
		this.purchaseFlowFa = false;
		this.verifyAmountCapture = false;
		this.debitPinCapture = false;
		this.processCreditCardCapture = false;
		this.captureLangPref = false;
		this.drpTerms = false;
		this.ihcTerms = false;
		this.faTerms = false;

		this.languagePreference = "E";
	}
	resetFlowControlVariables(){
		this.initData();
	}
	connectWebSocket() {
		this.fClearOutput();
		this.fWriteOutput("OpenSocketSession");
		this.ingenicolibraryws.debug = true;
		this.ingenicolibraryws.init('6004', this.clientName);
	}
	disconnectWebSocket() {
		if (this.ingenicolibraryws.socketConnection) {
			this.ingenicolibraryws.socketConnection.close();
		}
		this.fWriteOutput("CloseSocketSession");
		
		this.buttonAttribute['connect'] = false;
		this.clientName = "";
		this.buttonAttribute['disconnect'] = true;
	}

	writeResponseToResponseDataField(data, isObject) {
		var reqDataField = this.responseData;
		if(reqDataField) {
			if (isObject) {
				reqDataField = JSON.stringify(data);
			} else {
				reqDataField = data;
			}
		}
	}
	getPin(promptIndex, isCredit) {
		if(this.ingenicolibraryws && this.ingenicolibraryws.currentCreditCardData && this.ingenicolibraryws.currentCreditCardData.accountNumber) {
			this.ingenicolibraryws.capturePin(this.languagePreference, this.ingenicolibraryws.currentCreditCardData.accountNumber, promptIndex, isCredit);
		} else {
			this.ingenicolibraryws.capturePin(this.languagePreference, '4117744012599408', promptIndex, isCredit);
		}
	}
	getLangPref() {
		this.languagePreference = "E";
		if (this.langPref) {
			this.languagePreference = 'S';
			this.fWriteOutput("Spanish");
		} else {
			this.fWriteOutput("English");
		}
		this.langPref = !this.langPref;
	}

	displayManualTCs() {
		var tc = this.textAreaTC;
		this.ingenicolibraryws.displayTCForm(this.languagePreference, tc);
	}
	
	performSoftReset(varString, typeMessage, textString, itemDisplay) {
		var myItemList = ['Apple iPhone 6 599.99', 'Plantronix Bluetooth Headset 29.99'];
		
		if(!itemDisplay) {
			myItemList = null;
		}

		// this.ingenicolibraryws.softDeviceReset(this.resetType, varString, typeMessage, textString, myItemList, this.languagePreference);
		this.ingenicolibraryws.softDeviceReset(this.resetType);
	}
	processVariableRequest(setVaraible, readConfig, writeConfig) {
		if (setVaraible) {
			this.ingenicolibraryws.setVariable(this.varIndex, this.varString);
		} else if(readConfig) {
			this.ingenicolibraryws.readConfiguration(this.varIndex, this.varString);
		} else if(writeConfig) {
			this.ingenicolibraryws.writeConfiguration(this.varIndex, this.varString, this.configValueString);
		} else {
			this.ingenicolibraryws.getVariable(this.varIndex);
		}
	}

	addMultipleItems() {
		var itemArray = ["iPhone 5S $599.99", "Samsung Galaxy S5 $699.99", "Screen Protector $10.00"];
		for(var i = 0; i < itemArray.length; i++) {
			this.ingenicolibraryws.setVariable('104', itemArray[i]);
		}
	}
	onConnectedHandler(message) {
		var component = this.getParentComponent();
		component.fWriteOutput(message);
		component.writeResponseToResponseDataField("connected", false);
		component.buttonAttribute['clientName'] = true;
		component.buttonAttribute['connect'] = true;
		component.buttonAttribute['disconnect'] = false;
		component.resetFlowControlVariables();
	}

	onConnectionErrorHandler(evtData) {
		var component = this.getParentComponent();
		component.writeResponseToResponseDataField("connection-failed", false);
		component.fWriteOutput("onConnectionErrorHandler");
		component.fWriteOutput(evtData);
		component.resetFlowControlVariables();
	}

	onErrorMessageHandler(message) {
		var component = this.getParentComponent();
		component.fWriteOutput("onErrorMessageHandler");
		component.fWriteOutput(message);
		component.resetFlowControlVariables();
	}
	mutlipleMacTest() {
		for (var i = 0; i <= 50; i++) {
			this.ingenicolibraryws.getMACAddress()
		}
	}
	
	onMacAddressHandler(macAddress) {
		var component = this.getParentComponent();
		if(macAddress && macAddress != "") {
			component.fWriteOutput("onMacAddressHandler");
			component.writeResponseToResponseDataField(macAddress, false);
		} else {
			alert("Mac empty");
		}
	}

	onSalesFormLoaded() {
		var component = this.getParentComponent();
		component.fWriteOutput("Sales Form Loaded");
	}

	onComputerNameHandler(computerName) {
		var component = this.getParentComponent();
		component.fWriteOutput("onComputerNameHandler");
		component.writeResponseToResponseDataField(computerName, false);
	}

	setDisplayItemHandler() {
		var component = this.getParentComponent();
		component.fWriteOutput("setDisplayItemHandler");
		component.fWriteOutput("Items Displayed");
	}
	onCustomerFormDataReadyHandler(userData) {
		var component = this.getParentComponent();
		if(component.activationFlowPersonal) {
			if(component.primaryPhonePersonalCaptured) {
				component.primaryPhonePersonalCaptured = false;
				component.homePhoneCaptured = true;
				component.fWriteOutput(userData);
				this.ingenicolibraryws.displayClearEntryForm(component.languagePreference, 'HOME_PHONE', '222', '7');
			} else if(component.homePhoneCaptured) {
				component.homePhoneCaptured = false;
				component.ssnCaptured = true;
				component.fWriteOutput(userData);
				this.ingenicolibraryws.displayClearEntryForm(component.languagePreference, 'SSN', '301', '34');
			} else if(component.ssnCaptured) {
				component.ssnCaptured = false;
				component.emailCaptured = true;
				component.fWriteOutput(userData);
				this.ingenicolibraryws.captureEmailAddress(component.languagePreference);
			} else if(component.emailCaptured) {
				component.emailCaptured = false;
				component.passcodeCaptured = true;
				component.fWriteOutput(userData);
				this.ingenicolibraryws.displayClearEntryForm(component.languagePreference, 'PIN_CREATE', '311', '36');
			} else if(component.passcodeCaptured) {
				component.passcodeCaptured = false;
				component.activationTerms = true;
				component.fWriteOutput(userData);
				this.ingenicolibraryws.displayText(component.languagePreference, '1', false, '', '', '', '', '');
			}
		} else if(component.activationFlowEmployee) {
			if(component.pNumberCapture) {
				component.pNumberCapture = false;
				component.pNumberCapture = true;
				component.fWriteOutput(userData);
				this.ingenicolibraryws.displayClearEntryForm(component.languagePreference, 'LAST_FOUR', '314', '36');
			} else if(component.pNumberCapture) {
				component.pNumberCapture = false;
				component.emailCaptured = true;
				component.fWriteOutput(userData);
				this.ingenicolibraryws.captureEmailAddress(component.languagePreference);
			} else if(component.emailCaptured) {
				component.emailCaptured = false;
				component.enterPasscodeCaptured = true;
				component.fWriteOutput(userData);
				this.ingenicolibraryws.displayClearEntryForm(component.languagePreference, 'PIN_ENTER', '233', '36');
			} else if(component.enterPasscodeCaptured) {
				component.enterPasscodeCaptured = false;
				component.activationTerms = true;
				component.fWriteOutput(userData);
				component.fWriteOutput("this.activationFlowEmployee completed");
				this.ingenicolibraryws.displayText(component.languagePreference, '1', false, '', '', '', '', '');
			}
		} else if(component.activationFlowPersonalGuarantor) {
			if(component.personalGuarantorCapture) {
				component.personalGuarantorCapture = false;
				component.feinCapture = true;
				component.fWriteOutput(userData);
				this.ingenicolibraryws.displayClearEntryForm(component.languagePreference, 'FEIN', '312', '34');
			} else if(component.feinCapture) {
				component.feinCapture = false;
				component.captureDLPersonal = true;
				component.fWriteOutput(userData);
				this.ingenicolibraryws.captureDL(component.languagePreference);
			} else if(component.primaryPhonePersonalCaptured) {
				component.primaryPhonePersonalCaptured = false;
				component.homePhoneCaptured = true;
				component.fWriteOutput(userData);
				this.ingenicolibraryws.displayClearEntryForm(component.languagePreference, 'HOME_PHONE', '222', '7');
			} else if(component.homePhoneCaptured) {
				component.homePhoneCaptured = false;
				component.ssnCaptured = true;
				component.fWriteOutput(userData);
				this.ingenicolibraryws.displayClearEntryForm(component.languagePreference, 'SSN', '301', '34');
			} else if(component.ssnCaptured) {
				component.ssnCaptured = false;
				component.emailCaptured = true;
				component.fWriteOutput(userData);
				this.ingenicolibraryws.captureEmailAddress(component.languagePreference);
			} else if(component.emailCaptured) {
				component.emailCaptured = false;
				component.passcodeCaptured = true;
				component.fWriteOutput(userData);
				this.ingenicolibraryws.displayClearEntryForm(component.languagePreference, 'PIN_CREATE', '311', '36');
			} else if(component.passcodeCaptured) {
				component.passcodeCaptured = false;
				component.activationTerms = true;
				component.fWriteOutput(userData);
				this.ingenicolibraryws.displayText(component.languagePreference, '1', false, '', '', '', '', '');
			}
		} else if(component.activationFlowAddALine) {
			if(component.ssnCaptured) {
				component.ssnCaptured = false;
				component.primaryPhonePersonalCaptured = true;
				component.fWriteOutput(userData);
				this.ingenicolibraryws.displayClearEntryForm(component.languagePreference, 'PRIMARY_PHONE', '310', '7');
			} else if(component.primaryPhonePersonalCaptured) {
				component.primaryPhonePersonalCaptured = false;
				component.enterPasscodeCaptured = true;
				component.fWriteOutput(userData);
				this.ingenicolibraryws.displayClearEntryForm(component.languagePreference, 'PIN_ENTER', '233', '36');
			} else if(component.enterPasscodeCaptured) {
				component.activationFlowAddALine = false;
				component.enterPasscodeCaptured = false;
				component.fWriteOutput(userData);
				component.fWriteOutput("this.activationFlowAddALine completed");
			}
		} else {
			component.writeResponseToResponseDataField(userData, false);
			component.resetFlowControlVariables();
		}
	}
	onDebitPinReadyHandler(pinBlock) {
		var component = this.getParentComponent();
		component.fWriteOutput("onDebitPinReadyHandler");
		if(component.purchaseFlowDebit) {
			component.verifyAmountCapture = true;
			component.fWriteOutput("Debit Pin Captured");
			this.ingenicolibraryws.verifyAmount(component.languagePreference, '201.26');
		} else {
			component.writeResponseToResponseDataField(pinBlock, false);
		}
	}
	
	readConfigurationHandler(configValue) {
		var component = this.getParentComponent();
		component.fWriteOutput("readConfigurationHandler");
		component.writeResponseToResponseDataField(configValue, true);				
	}

	onDebitPinInvalidLengthHandler(pinBlock) {
		var component = this.getParentComponent();
		component.fWriteOutput("onDebitPinInvalidLengthHandler");
		component.writeResponseToResponseDataField(pinBlock, false);
	}
	onAcceptHandler(userInputData) {
		var component = this.getParentComponent();
		component.fWriteOutput("onAcceptHandler");
		if(component.activationFlowPersonal) {
			if(component.captureLangPref) {
				component.langPref = false;
				
				// langPrefCB.checked = false;
				component.languagePreference = 'E';
				component.captureLangPref = false;
				component.captureDLPersonal = true;
				component.fWriteOutput('ENGLISH');
				this.ingenicolibraryws.captureDL(component.languagePreference);
			} else if(component.captureDLPersonal) {
				component.captureDLPersonal = false;
				component.primaryPhonePersonalCaptured = true;
				component.fWriteOutput("DL Data Accepted");
				this.ingenicolibraryws.displayClearEntryForm(component.languagePreference, 'PRIMARY_PHONE', '310', '7');
			} else if(component.activationTerms) {
				component.activationTerms = false;
				component.fWriteOutput("Terms Accepted");
				this.ingenicolibraryws.captureSignature(component.languagePreference, 'CAPTURE', '','');
			}
		} else if(component.activationFlowEmployee) {
			if(component.captureLangPref) {
				component.langPref = false;
				
				// langPrefCB.checked = false;
				component.languagePreference = 'E';
				component.captureLangPref = false;
				component.pNumberCapture = true;
				component.fWriteOutput('ENGLISH');
				this.ingenicolibraryws.displayClearEntryForm(component.languagePreference, 'P_NUMBER', '313', '37');
			} else if(component.activationTerms) {
				component.activationTerms = false;
				component.fWriteOutput("Terms Accepted");
				this.ingenicolibraryws.captureSignature(component.languagePreference, 'CAPTURE', '','');
			}
		} else if(component.activationFlowPersonalGuarantor) {
			if(component.captureLangPref) {
				component.langPref = false;
				
				// langPrefCB.checked = false;
				component.languagePreference = 'E';
				component.captureLangPref = false
				component.personalGuarantorCapture = true;
				component.fWriteOutput('ENGLISH');
				this.ingenicolibraryws.displayClearEntryForm(component.languagePreference, 'PERSONAL_GUARANTOR', '315', '7');
			} else if(component.captureDLPersonal) {
				component.captureDLPersonal = false;
				component.primaryPhonePersonalCaptured = true;
				component.fWriteOutput("DL Data Accepted");
				this.ingenicolibraryws.displayClearEntryForm(component.languagePreference, 'PRIMARY_PHONE', '310', '7');
			} else if(component.activationTerms) {
				component.activationTerms = false;
				component.fWriteOutput("Terms Accepted");
				this.ingenicolibraryws.captureSignature(component.languagePreference, 'CAPTURE', '','');
			}
		} else if(component.activationFlowAddALine) {
			if(component.captureLangPref) {
				component.langPref = false;
				
				// langPrefCB.checked = false;
				component.languagePreference = 'E';
				component.captureLangPref = false;
				component.ssnCaptured = true;
				component.fWriteOutput('ENGLISH');
				this.ingenicolibraryws.displayClearEntryForm(component.languagePreference, 'SSN', '301', '34');
			}
		} else if(component.purchaseFlowCredit) {
			component.langPref = false;
			
			// langPrefCB.checked = false;
			component.languagePreference = 'E';
			component.fWriteOutput("ENGLISH");
			this.ingenicolibraryws.softDeviceReset('8');
			this.ingenicolibraryws.displayItemListForm(component.languagePreference);
			component.addMultipleItems();
			alert("Stopping the process to see ItemList.");
			this.ingenicolibraryws.displaySalesTrans(component.languagePreference, '112.01', '3.20', '382.81', '383.01', '382.21');
			alert("Stopping the process to see SalesTran.");
			this.ingenicolibraryws.captureCreditCardFD(component.languagePreference, 'swipecc.k3z', true);
		} else if(component.purchaseFlowDebit) {
			if(component.captureLangPref) {
				component.langPref = false;
				
				// langPrefCB.checked = false;
				component.languagePreference = 'E';
				component.fWriteOutput("ENGLISH");
				this.ingenicolibraryws.softDeviceReset('8');
				this.ingenicolibraryws.displayItemListForm(component.languagePreference);
				component.addMultipleItems();
				alert("Stopping the process to see ItemList.");
				this.ingenicolibraryws.displaySalesTrans(component.languagePreference, '112.01', '3.20', '382.81', '383.01', '382.21');
				alert("Stopping the process to see SalesTran.");
				this.ingenicolibraryws.captureCreditCardFD(component.languagePreference, 'swipecc.k3z', true);
			} else if(component.verifyAmountCapture) {
				component.verifyAmountCapture = false;
				component.purchaseFlowDebit = false;
				component.fWriteOutput("Amount Verified");
				this.ingenicolibraryws.displaySalesTrans(component.languagePreference, '112.01', '3.20', '382.81', '386.54', '0.0');
			} else if(component.processCreditCardCapture) {
				component.processCreditCardCapture = false;
				component.purchaseFlowCredit = true;
				component.fWriteOutput("Run as Credit");
				this.ingenicolibraryws.captureSignature(component.languagePreference, 'CREDIT', '100.00','');
			}
		} else if(component.purchaseFlowCash) {
			component.langPref = false;
			
			// langPrefCB.checked = false;
			component.languagePreference = 'E';
			component.purchaseFlowCash = false;
			component.fWriteOutput("ENGLISH");
			this.ingenicolibraryws.softDeviceReset('8');
			this.ingenicolibraryws.displayItemListForm(component.languagePreference);
			component.addMultipleItems();
			alert("Stopping the process to see ItemList.");
			this.ingenicolibraryws.displaySalesTrans(component.languagePreference, '112.01', '3.20', '382.81', '383.01', '382.21');
			alert("Stopping the process to see SalesTran.");
			this.ingenicolibraryws.displaySalesTrans(component.languagePreference, '112.01', '3.20', '382.81', '386.54', '-5.21');
		} else if(component.purchaseFlowDrp) {
			if(component.captureLangPref) {
				component.langPref = false;
				
				// langPrefCB.checked = false;
				component.languagePreference = 'E';
				component.captureLangPref = false;
				component.fWriteOutput("ENGLISH");
				this.ingenicolibraryws.softDeviceReset('8');
				this.ingenicolibraryws.displayItemListForm(component.languagePreference);
				component.addMultipleItems();
				alert("Stopping the process to see ItemList.");
				component.drpTerms = true;
				this.ingenicolibraryws.displayText(component.languagePreference, '7', false, 'Testing Tester', '07/23/2014', '', '', '');
			} else if(component.drpTerms) {
				this.ingenicolibraryws.captureSignature(component.languagePreference, 'DRP', '','');
			}
		} else if(component.purchaseFlowIhc) {
			if(component.captureLangPref) {
				component.langPref = false;
				
				// langPrefCB.checked = false;
				component.languagePreference = 'E';
				component.captureLangPref = false;
				component.fWriteOutput("ENGLISH");
				this.ingenicolibraryws.softDeviceReset('8');
				this.ingenicolibraryws.displayItemListForm(component.languagePreference);
				component.addMultipleItems();
				alert("Stopping the process to see ItemList.");
				component.ihcTerms = true;
				this.ingenicolibraryws.displayText(component.languagePreference, '8', true, 'Testing Tester', '', '(425)555-6778', 'Testing', '853659526514732');
			} else if(component.ihcTerms) {
				this.ingenicolibraryws.captureSignature(component.languagePreference, '', '','');
			}
		} else if(component.purchaseFlowFa) {
			if(component.captureLangPref) {
				component.langPref = false;
				
				// langPrefCB.checked = false;
				component.languagePreference = 'E';
				component.captureLangPref = false;
				component.fWriteOutput("ENGLISH");
				this.ingenicolibraryws.softDeviceReset('8');
				this.ingenicolibraryws.displayItemListForm(component.languagePreference);
				component.addMultipleItems();
				alert("Stopping the process to see ItemList.");
				component.faTerms = true;
				this.ingenicolibraryws.displayText(component.languagePreference, '10', false, '', '', '', '', '');
			} else if(component.faTerms) {
				this.ingenicolibraryws.captureSignature(component.languagePreference, 'EIP', '','20150929316300000');
			}
		} else {
			component.writeResponseToResponseDataField(userInputData, false);
			component.resetFlowControlVariables();
		}
	}
	onEditHandler() {
		var component = this.getParentComponent();
		component.writeResponseToResponseDataField("Edit Handler Called", false);
	}

	onCancelHandler() {
		var component = this.getParentComponent();
		component.fWriteOutput("onCancelHandler");
		if(component.activationFlowPersonal) {
			component.langPref = true;
			
			// langPrefCB.checked = true;
			component.languagePreference = 'S';
			component.captureLangPref = false;
			component.captureDLPersonal = true;
			component.fWriteOutput('SPANISH');
			this.ingenicolibraryws.captureDL(component.languagePreference);
		} else if(component.activationFlowEmployee) {
			component.langPref = true;
			
			// langPrefCB.checked = true;
			component.languagePreference = 'S';
			component.captureLangPref = false;
			component.pNumberCapture = true;
			component.fWriteOutput('SPANISH');
			this.ingenicolibraryws.displayClearEntryForm(component.languagePreference, 'P_NUMBER', '313', '37');
		} else if(component.activationFlowPersonalGuarantor) {
			component.langPref = true;
			
			// langPrefCB.checked = true;
			component.languagePreference = 'S';
			component.captureLangPref = false;
			component.personalGuarantorCapture = true;
			component.fWriteOutput('SPANISH');
			this.ingenicolibraryws.displayClearEntryForm(component.languagePreference, 'PERSONAL_GUARANTOR', '315', '7');
		} else if(component.activationFlowAddALine) {
			component.langPref = true;
			
			// langPrefCB.checked = true;
			component.languagePreference = 'S';
			component.captureLangPref = false;
			component.ssnCaptured = true;
			component.fWriteOutput('SPANISH');
			this.ingenicolibraryws.displayClearEntryForm(component.languagePreference, 'SSN', '301', '34');
		} else if(component.purchaseFlowCredit) {
			component.langPref = true;
			
			// langPrefCB.checked = true;
			component.languagePreference = 'S';
			component.captureLangPref = false;
			component.fWriteOutput("SPANISH");
			this.ingenicolibraryws.softDeviceReset('8');
			this.ingenicolibraryws.displayItemListForm(component.languagePreference);
			component.addMultipleItems();
			alert("Stopping the process to see ItemList.");
			this.ingenicolibraryws.displaySalesTrans(component.languagePreference, '112.01', '3.20', '382.81', '383.01', '382.21');
			alert("Stopping the process to see SalesTran.");
			this.ingenicolibraryws.captureCreditCardFD(component.languagePreference, 'swipecc.k3z', true);
		} else if(component.purchaseFlowDebit) {
			if(component.captureLangPref) {
				component.langPref = true;
				
				// langPrefCB.checked = true;
				component.languagePreference = 'S';
				component.captureLangPref = false;
				component.fWriteOutput("SPANISH");
				this.ingenicolibraryws.softDeviceReset('8');
				this.ingenicolibraryws.displayItemListForm(component.languagePreference);
				component.addMultipleItems();
				alert("Stopping the process to see ItemList.");
				this.ingenicolibraryws.displaySalesTrans(component.languagePreference, '112.01', '3.20', '382.81', '383.01', '382.21');
				alert("Stopping the process to see SalesTran.");
				this.ingenicolibraryws.captureCreditCardFD(component.languagePreference, 'swipecc.k3z', true);
			} else if(component.debitPinCapture) {
				component.debitPinCapture = false;
				component.processCreditCardCapture = true;
				component.fWriteOutput("Run as Credit");
				this.ingenicolibraryws.processCreditCard(component.languagePreference, '25.00');
			} 
		} else if(component.purchaseFlowCash) {
			component.langPref = true;
			
			// langPrefCB.checked = true;
			component.languagePreference = 'S';
			component.captureLangPref = false;
			component.fWriteOutput("SPANISH");
			this.ingenicolibraryws.softDeviceReset('8');
			this.ingenicolibraryws.displayItemListForm(component.languagePreference);
			component.addMultipleItems();
			alert("Stopping the process to see ItemList.");
			this.ingenicolibraryws.displaySalesTrans(component.languagePreference, '112.01', '3.20', '382.81', '383.01', '382.21');
			alert("Stopping the process to see SalesTran.");
			this.ingenicolibraryws.displaySalesTrans(component.languagePreference, '112.01', '3.20', '382.81', '386.54', '-5.21');
		} else if(component.purchaseFlowDrp) {
			component.langPref = true;
			
			// langPrefCB.checked = true;
			component.languagePreference = 'S';
			component.captureLangPref = false;
			component.fWriteOutput("SPANISH");
			this.ingenicolibraryws.softDeviceReset('8');
			this.ingenicolibraryws.displayItemListForm(component.languagePreference);
			component.addMultipleItems();
			alert("Stopping the process to see ItemList.");
			component.drpTerms = true;
			this.ingenicolibraryws.displayText(component.languagePreference, '7', false, 'Testing Tester', '07/23/2014', '', '', '');
		} else if(component.purchaseFlowIhc) {
			component.langPref = true;
			
			// langPrefCB.checked = true;
			component.languagePreference = 'S';
			component.captureLangPref = false;
			component.fWriteOutput("SPANISH");
			this.ingenicolibraryws.softDeviceReset('8');
			this.ingenicolibraryws.displayItemListForm(component.languagePreference);
			component.addMultipleItems();
			alert("Stopping the process to see ItemList.");
			component.ihcTerms = true;
			this.ingenicolibraryws.displayText(component.languagePreference, '8', true, 'Testing Tester', '', '(425)555-6778', 'Testing', '853659526514732');
		} else if(component.purchaseFlowFa) {
			component.langPref = true;
			
			// langPrefCB.checked = true;
			component.languagePreference = 'S';
			component.captureLangPref = false;
			component.fWriteOutput("SPANISH");
			this.ingenicolibraryws.softDeviceReset('8');
			this.ingenicolibraryws.displayItemListForm(component.languagePreference);
			component.addMultipleItems();
			alert("Stopping the process to see ItemList.");
			component.faTerms = true;
			this.ingenicolibraryws.displayText(component.languagePreference, '10', false, '', '', '', '', '');
		} else {
			component.writeResponseToResponseDataField("onCancelHandler called", false);
			component.fWriteOutput("User Cancelled");
			component.resetFlowControlVariables();
		}
	}
	onMSRDataReadyHandlerFD(creditCardData) {
		var component = this.getParentComponent();
		this.ingenicolibraryws.currentCreditCardData = creditCardData;
		component.fWriteOutput("onMSRDataReadyHandlerFD");
		if(component.purchaseFlowCredit) {
			component.fWriteOutput('Credit Card Data Captured');
			this.ingenicolibraryws.captureSignature(component.languagePreference, 'CREDIT', '100.00','');
		} else if(component.purchaseFlowDebit) {
			component.fWriteOutput('Debit Card Data Captured');
			component.debitPinCapture = true;
			component.getPin('1', true);
		} else {
			component.writeResponseToResponseDataField(creditCardData, true);
		}
	}

	onMSRDataReadyHandler(creditCardData) {
		var component = this.getParentComponent();
		component.fWriteOutput("onMSRDataReadyHandler");
		component.fWriteOutput("track1: " + creditCardData.tracks[0] + "\ntrack2: " + creditCardData.tracks[1] + "\ntrack3: " + creditCardData.tracks[2]);
	}

	onDLDataReadyHandler(driversLicenseData) {
		var component = this.getParentComponent();
		component.fWriteOutput("onDLDataReadyHandler");
		var tempDLObject = this.ingenicolibraryws.createDriversLicObject(driversLicenseData);
		if(component.activationFlowPersonal) {
			if(component.captureDLPersonal) {
				component.fWriteOutput("DL Captured");
				this.ingenicolibraryws.verifyDL(component.languagePreference, driversLicenseData.Firstname + ' ' + driversLicenseData.Lastname, driversLicenseData.Address1, driversLicenseData.City, driversLicenseData.State, driversLicenseData.Zipcode, driversLicenseData.Dob, driversLicenseData.IdNumber);
			} 
		} else if(component.activationFlowPersonalGuarantor) {
			if(component.captureDLPersonal) {
				component.fWriteOutput("DL Captured");
				this.ingenicolibraryws.verifyDL(component.languagePreference, driversLicenseData.Firstname + ' ' + driversLicenseData.Lastname, driversLicenseData.Address1, driversLicenseData.City, driversLicenseData.State, driversLicenseData.Zipcode, driversLicenseData.Dob, driversLicenseData.IdNumber);
			}
		} else {
			component.fWriteOutput(driversLicenseData.IdNumber);
			component.resetFlowControlVariables();
		}
	}
	hasVersionHandler (hasVersionData) {
		var component = this.getParentComponent();
		component.fWriteOutput("hasVersionHandler");
		component.writeResponseToResponseDataField(hasVersionData, false);
	}

	onErrorHandler(errorMessage) {
		var component = this.getParentComponent();
		component.fWriteOutput("onErrorHandler");
		component.writeResponseToResponseDataField(errorMessage, false);
	}

	onTimeoutHandler() {
		var component = this.getParentComponent();
		component.fWriteOutput("onTimeoutHandler");
		component.fWriteOutput("Timeout");
	}

	getDeviceVersionHandler(version) {
		var component = this.getParentComponent();
		component.fWriteOutput("getDeviceVersionHandler");
		component.fWriteOutput("EFTL: " + version.eftl + "\nEFTP: " + version.eftp);
		component.writeResponseToResponseDataField(version, true);
	}

	getDeviceHealthStatsHandler(healthStats) {
		var component = this.getParentComponent();
		component.fWriteOutput("getDeviceHealthStatsHandler");
		component.writeResponseToResponseDataField(healthStats, true);
	}
	onSignatureDataReadyHandler(signData, htmlSignBlock, signBlock) {
		var component = this.getParentComponent();
		component.fWriteOutput("onSignatureDataReadyHandler");
		component.sigimage = htmlSignBlock;
		if(component.activationFlowPersonal) {
			component.activationFlowPersonal = false;
			component.fWriteOutput("this.activationFlowPersonal completed");
			component.fImageDisplay(true);
		} else if(component.activationFlowPersonalGuarantor) {
			component.activationFlowPersonalGuarantor = false;
			component.fWriteOutput("this.activationFlowPersonalGuarantor completed");
			component.fImageDisplay(true);
		} else if(component.activationFlowEmployee) {
			component.activationFlowEmployee = false;
			component.fWriteOutput("this.activationFlowEmployee completed");
			component.fImageDisplay(true);
		} else if(component.purchaseFlowCredit) {
			component.purchaseFlowCredit = false;
			if(component.purchaseFlowDebit) { 
				component.purchaseFlowDebit = false;
				component.fWriteOutput("Signature Captured for Debit as Credit");
				this.ingenicolibraryws.displaySalesTrans(component.languagePreference, '112.01', '3.20', '382.81', '383.01', '0.0');
			} else {
				component.fWriteOutput("Signature Captured for Credit Card");
				this.ingenicolibraryws.displaySalesTrans(component.languagePreference, '112.01', '3.20', '382.81', '383.01', '0.0');
			}
		} else if(component.purchaseFlowDrp) {
			if(component.drpTerms) {
				component.drpTerms = false;
				component.purchaseFlowDrp = false;
				component.purchaseFlowCredit = true;
				this.ingenicolibraryws.displaySalesTrans(component.languagePreference, '112.01', '3.20', '382.81', '383.01', '382.21');
				alert("Stopping the process to see SalesTran.");
				this.ingenicolibraryws.captureCreditCardFD(component.languagePreference, 'swipecc.k3z', true);
			}
		} else if(component.purchaseFlowIhc) {
			if(component.ihcTerms) {
				component.ihcTerms = false;
				component.purchaseFlowIhc = false;
				component.purchaseFlowCredit = true;
				this.ingenicolibraryws.displaySalesTrans(component.languagePreference, '112.01', '3.20', '382.81', '383.01', '382.21');
				alert("Stopping the process to see SalesTran.");
				this.ingenicolibraryws.captureCreditCardFD(component.languagePreference, 'swipecc.k3z', true);
			}
		} else if(component.purchaseFlowFa) {
			if(component.faTerms) {
				component.faTerms = false;
				component.purchaseFlowFa = false;
				component.purchaseFlowCredit = true;
				this.ingenicolibraryws.displaySalesTrans(component.languagePreference, '112.01', '3.20', '382.81', '383.01', '382.21');
				alert("Stopping the process to see SalesTran.");
				this.ingenicolibraryws.captureCreditCardFD(component.languagePreference, 'swipecc.k3z', true);
			}
		} else {
			component.fImageDisplay(true);
			component.resetFlowControlVariables();
		}
	}

	closeHandler() {
		var component = this.getParentComponent();
		component.fWriteOutput("closeHandler");
		component.fWriteOutput('Session closed');
		component.buttonAttribute['connect'] = false;
		component.buttonAttribute['clientName'] = false;
		component.buttonAttribute['disconnect'] = true;
	}
	onScreenPopReadyHandler(msg) {
		var component = this.getParentComponent();
		component.fWriteOutput("Screen pop Ready.");
	}
	onScreenPopHandler(data) {
		var component = this.getParentComponent();
		component.fWriteOutput("Screen Pop received");
		component.fWriteOutput("UUID : " +  data.uuid);
		component.fWriteOutput("UUI Type: " + data.uuiType);
	}

	getVariableRequestHandler(variableResponse) {
		var component = this.getParentComponent();
		component.fWriteOutput("getVariableRequestHandler");
		component.writeResponseToResponseDataField(variableResponse, false);
	}
	
	writeConfigurationHandler(response) {
		var component = this.getParentComponent();
		component.fWriteOutput("writeConfigurationHandler");
		component.writeResponseToResponseDataField(response, false);
	}

	setEventHandlersWebsocket() {
		if(typeof this.ingenicolibraryws !== "undefined" && this.ingenicolibraryws) {
			//HAS Handlers
			this.ingenicolibraryws.setParentComponent(this);

			this.ingenicolibraryws.onConnectedHandler = this.onConnectedHandler;
			this.ingenicolibraryws.onConnectionErrorHandler = this.onConnectionErrorHandler;
			this.ingenicolibraryws.onHASVersionHandler = this.hasVersionHandler;

			//Comman Handlers
			this.ingenicolibraryws.onMacAddressHandler = this.onMacAddressHandler;
			this.ingenicolibraryws.onComputerNameHandler = this.onComputerNameHandler;
			this.ingenicolibraryws.onErrorMessageHandler = this.onErrorMessageHandler;
			
			//Avaya Handlers
			this.ingenicolibraryws.onScreenPopHandler = this.onScreenPopHandler;
			this.ingenicolibraryws.onScreenPopReadyHandler = this.onScreenPopReadyHandler;
			
			
			//Ingenico Handlers
			this.ingenicolibraryws.onTimeoutHandler = this.onTimeoutHandler;
			this.ingenicolibraryws.closeHandler = this.closeHandler;
			this.ingenicolibraryws.onErrorHandler = this.onErrorHandler;
			this.ingenicolibraryws.onAcceptHandler = this.onAcceptHandler;
			this.ingenicolibraryws.onCancelHandler = this.onCancelHandler;
			this.ingenicolibraryws.getDeviceVersionHandler = this.getDeviceVersionHandler;
			this.ingenicolibraryws.getDeviceHealthStatsHandler = this.getDeviceHealthStatsHandler;
			this.ingenicolibraryws.getVariableRequestHandler = this.getVariableRequestHandler;
			this.ingenicolibraryws.onCustomerFormDataReadyHandler = this.onCustomerFormDataReadyHandler;
			this.ingenicolibraryws.onDebitPinReadyHandler = this.onDebitPinReadyHandler;
			this.ingenicolibraryws.onEditHandler = this.onEditHandler;
			this.ingenicolibraryws.onSignatureDataReadyHandler = this.onSignatureDataReadyHandler;
			this.ingenicolibraryws.onDebitPinInvalidLengthHandler = this.onDebitPinInvalidLengthHandler;
			this.ingenicolibraryws.onSalesFormLoaded = this.onSalesFormLoaded;
			this.ingenicolibraryws.setDisplayItemHandler = this.setDisplayItemHandler;
			this.ingenicolibraryws.onMSRDataReadyHandlerFD = this.onMSRDataReadyHandlerFD;
			this.ingenicolibraryws.onMSRDataReadyHandler = this.onMSRDataReadyHandler;
			this.ingenicolibraryws.onDLDataReadyHandler = this.onDLDataReadyHandler;
			this.ingenicolibraryws.readConfigurationHandler = this.readConfigurationHandler;
			this.ingenicolibraryws.writeConfigurationHandler = this.writeConfigurationHandler;
		}
	}

	initKeyData(){
		this.keyBuffer = "";
		this.bufferLen = 0;
		this.oDlData = null;	
		this.keyboardMap = ["","","","CANCEL","","","HELP","","BACK_SPACE","TAB","","","CLEAR","ENTER","RETURN","","SHIFT","CONTROL","ALT","PAUSE","CAPS_LOCK","KANA","EISU","JUNJA","FINAL","HANJA","","ESCAPE","CONVERT","NONCONVERT","ACCEPT","MODECHANGE","SPACE","PAGE_UP","PAGE_DOWN","END","HOME","LEFT","UP","RIGHT","DOWN","SELECT","PRINT","EXECUTE","PRINTSCREEN","INSERT","DELETE","","0","1","2","3","4","5","6","7","8","9","COLON","SEMICOLON","LESS_THAN","EQUALS","GREATER_THAN","QUESTION_MARK","AT","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","WIN","","CONTEXT_MENU","","SLEEP","NUMPAD0","NUMPAD1","NUMPAD2","NUMPAD3","NUMPAD4","NUMPAD5","NUMPAD6","NUMPAD7","NUMPAD8","NUMPAD9","MULTIPLY","ADD","SEPARATOR","SUBTRACT","DECIMAL","DIVIDE","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","F13","F14","F15","F16","F17","F18","F19","F20","F21","F22","F23","F24","","","","","","","","","NUM_LOCK","SCROLL_LOCK","WIN_OEM_FJ_JISHO","WIN_OEM_FJ_MASSHOU","WIN_OEM_FJ_TOUROKU","WIN_OEM_FJ_LOYA","WIN_OEM_FJ_ROYA","","","","","","","","","","CIRCUMFLEX","EXCLAMATION","DOUBLE_QUOTE","HASH","DOLLAR","PERCENT","AMPERSAND","UNDERSCORE","OPEN_PAREN","CLOSE_PAREN","ASTERISK","PLUS","PIPE","HYPHEN_MINUS","OPEN_CURLY_BRACKET","CLOSE_CURLY_BRACKET","TILDE","","","","","VOLUME_MUTE","VOLUME_DOWN","VOLUME_UP","","","","","COMMA","","PERIOD","SLASH","BACK_QUOTE","","","","","","","","","","","","","","","","","","","","","","","","","","","OPEN_BRACKET","BACK_SLASH","CLOSE_BRACKET","QUOTE","","META","ALTGR","","WIN_ICO_HELP","WIN_ICO_00","","WIN_ICO_CLEAR","","","WIN_OEM_RESET","WIN_OEM_JUMP","WIN_OEM_PA1","WIN_OEM_PA2","WIN_OEM_PA3","WIN_OEM_WSCTRL","WIN_OEM_CUSEL","WIN_OEM_ATTN","WIN_OEM_FINISH","WIN_OEM_COPY","WIN_OEM_AUTO","WIN_OEM_ENLW","WIN_OEM_BACKTAB","ATTN","CRSEL","EXSEL","EREOF","PLAY","ZOOM","","PA1","WIN_OEM_CLEAR",""];
	}
	fScanDisplay(show) {
		if (show == true) {
			this.keyBuffer = "";
			this.bufferLen = 0;
			this.buttonAttribute['scandl'] = true;
			this.buttonAttribute['dlcapture'] = true;
			this.scancontainer = true;

		} else {
			this.buttonAttribute['scandl'] = false;
			this.buttonAttribute['dlcapture'] = false;
			this.scancontainer = false;
			// window.document.onkeydown = null;
		}
	}
	
	processKeyBuffer() {
		var sData = "";
		this.oDlData = null;
		
		if (this.bufferLen == this.keyBuffer.length)
		{
			this.keyBuffer = this.keyBuffer.replace(/CONTROL,J,/g, "|||");
			this.keyBuffer = this.keyBuffer.replace(/CONTROL,[A-Z6],/g, ""); // Also remove CONTROL6 for new WA DL.
			this.keyBuffer = this.keyBuffer.replace(/CONTROL,BACK_SLASH,/g, "");
			this.keyBuffer = this.keyBuffer.replace(/SHIFT,BACK_SLASH,/g, "|");
			this.keyBuffer = this.keyBuffer.replace(/BACK_SLASH,/g, "");
			this.keyBuffer = this.keyBuffer.replace(/SHIFT,2,/g, "@");
			this.keyBuffer = this.keyBuffer.replace(/SHIFT,[0-9],/g, "");
			this.keyBuffer = this.keyBuffer.replace(/HYPHEN_MINUS,/g, "-");
			this.keyBuffer = this.keyBuffer.replace(/SHIFT,/g, "");
			this.keyBuffer = this.keyBuffer.replace(/SPACE,/g, " ");
			this.keyBuffer = this.keyBuffer.replace(/,/g, "");
			this.keyBuffer = this.keyBuffer.replace(/COMMA/g, ",");
			
			sData = this.keyBuffer;
			this.oDlData = this.ingenicolibraryws.processId(sData);
			// this.oDlData = this.ingenicolibraryws.IDParser.processId(sData); // Data is placed in object.
			this.fScanDisplay(false);
			if (this.oDlData.FirstName && this.oDlData.LastName && (sData.length > 100))
			{
				// Output
				this.fWriteOutput(this.oDlData.FirstName + " " + this.oDlData.LastName);
				this.fWriteOutput(sData);
				
				// Fields
				this.fScanfieldPopulate();
				this.fScanfieldDisplay(true);
			}
			
			this.keyBuffer = "";
			// window.document.onkeydown = null; // Clean up.
		} else {
			this.bufferLen = this.keyBuffer.length;
			setTimeout('processKeyBuffer()', 400);
		}
		
		// window.document.onkeydown = null;
	}

	hookKeyboardEvents(e) {
		// get key code
		var key_code = (window.event) ? e.keyCode : e.which;
		
		// case: if it is IE event
		if (window.event)
		{
			if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
				e.keyCode = 0;
			}
			window.event.cancelBubble = true;
			window.event.returnValue = false;
		}
		// case: if it is firefox event
		else
		{
			e.stopPropagation();
			e.preventDefault();
		}
		
		if (this.bufferLen == 0)
		{
			setTimeout('processKeyBuffer()', 5000);
		}
		
		this.keyBuffer += this.keyboardMap[key_code] + ",";
	}
	fScanGet() {
		this.buttonAttribute['scandl'] = true;
		this.buttonAttribute['dlcapture'] = true;
		this.fScanDisplay(true);
		// window.document.onkeydown = hookKeyboardEvents;
	}
	initContainerData() {
		this.fScanfieldClear();
	}
	fScanfieldClear() {

		this.firstName = "";
		this.midInit = "";
		this.lastName = "";
		this.suffix = "";
		this.address1 = "";
		this.address2 = "";
		this.zip = "";
		this.city = "";
		this.state = "";
		this.idType = "";
		this.idIssued = "";
		this.id = "";
		this.birthDate = "";
	}
	
	fScanfieldPopulate() {
		this.firstName = this.oDlData.FirstName;
		this.midInit = this.oDlData.MiddleName;
		this.lastName = this.oDlData.LastName;
		this.suffix = this.oDlData.Suffix;
		this.address1 = this.oDlData.StreetAddress;
		this.address2 = this.oDlData.StreetAddress_2;
		this.zip = this.oDlData.ZIPCode;
		this.city = this.oDlData.City;
		this.state = this.oDlData.State;
		// Card type?
		this.idIssued = this.oDlData.State;
		this.id = this.oDlData.IDNumber;
		this.birthDate = this.oDlData.DOB;
	}
	
	fScanfieldDisplay(show) {
		this.scanfieldcontainer = show;
	}

	paymentTerminalOnline(){
		this.ingenicolibraryws.paymentTerminalOnline();
	}
	paymentTerminalOffline(){
		this.ingenicolibraryws.paymentTerminalOffline();
	}
	getDeviceVersion(version: string){
		this.ingenicolibraryws.getDeviceVersion(version);	
	}
	getHealthStats(m: string){
		this.ingenicolibraryws.getHealthStats(m);		
	}
	displayAds(){
		this.ingenicolibraryws.displayAds();
	}
	ConnectSentry(){
		// this.ingenicolibraryws.ConnectSentry(this.clientName);
		this.ingenicolibraryws.ConnectSentry();
	}
	ConnectSentryContinueous(){
		// this.ingenicolibraryws.ConnectSentryContinueous(this.clientName);	
		this.ingenicolibraryws.ConnectSentryContinueous();
	}
	captureSignature(a: string, b: string, c:string){
		this.ingenicolibraryws.captureSignature(this.languagePreference, a,b,c);
	}
	captureLastThreeOfPlanId(){
		this.ingenicolibraryws.captureLastThreeOfPlanId(this.languagePreference);	
	}
	displayClearEntryForm(a: string, b: string, c:string){
		this.ingenicolibraryws.displayClearEntryForm(this.languagePreference, a,b,c);
	}
	captureEmailAddress(){
		this.ingenicolibraryws.captureEmailAddress(this.languagePreference);	
	}
	captureCreditCard(){
		this.ingenicolibraryws.captureCreditCard(this.languagePreference);
	}
	captureCreditCardFD(a: string, b: boolean){
		this.ingenicolibraryws.captureCreditCardFD(this.languagePreference,a,b);
	}
	captureDL(){
		this.ingenicolibraryws.captureDL(this.languagePreference);
	}
	displayWelcome(){
		this.ingenicolibraryws.displayWelcome(this.languagePreference);
	}
	displayThankYou(){
		this.ingenicolibraryws.displayThankYou(this.languagePreference);
	}
	displayCCDisclaimer(){
		this.ingenicolibraryws.displayCCDisclaimer(this.languagePreference);	
	}
	displayDLDisclaimer(){
		this.ingenicolibraryws.displayDLDisclaimer(this.languagePreference);		
	}
	captureLanguagePreference(a: any){
		// this.ingenicolibraryws.captureLanguagePreference(a);
		this.ingenicolibraryws.captureLanguagePreference();
	}
	displayInformationForm(a: string){
		this.ingenicolibraryws.displayInformationForm(this.languagePreference, a);
	}
	displayAuthorizingForm(){
		this.ingenicolibraryws.displayAuthorizingForm(this.languagePreference);	
	}
	displayCardErrorForm(a: string){
		this.ingenicolibraryws.displayCardErrorForm(a, this.languagePreference);
	}
	verifyPhone(a: string){
		this.ingenicolibraryws.verifyPhone(this.languagePreference, a);
	}
	verifySSN(a: string){
		this.ingenicolibraryws.verifySSN(this.languagePreference, a);
	}
	verifyDL(a: string, b: string, c: string, d:string, e: string, f: string, g: string){
		this.ingenicolibraryws.verifyDL(this.languagePreference, a,b,c,d,e,f,g);
	}
	verifyAmount(a: string){
		this.ingenicolibraryws.verifyAmount(this.languagePreference, a);	
	}
	displayPartialAuthForm(a: string, b: string){
		this.ingenicolibraryws.displayPartialAuthForm(this.languagePreference, a,b);	
	}
	displayItemListForm(){
		this.ingenicolibraryws.displayItemListForm(this.languagePreference);
	}
	processCreditCard(a: string){
		this.ingenicolibraryws.processCreditCard(this.languagePreference,a);	
	}
	displaySalesTrans(a:string,b:string,c:string,d:string,e:string){
		this.ingenicolibraryws.displaySalesTrans(this.languagePreference,a,b,c,d,e);
	}
	displayText(a: string, b: boolean, c:string,d:string,e:string,f:string,g:string)
	{
		this.ingenicolibraryws.displayText(this.languagePreference,a,b,c,d,e,f,g);	
	}
	openCashDrawer(a: any){
		// this.ingenicolibraryws.openCashDrawer(a);
		this.ingenicolibraryws.openCashDrawer();
	}
	getComputerName(){
		this.ingenicolibraryws.getComputerName();
	}
	getMACAddress(){
		this.ingenicolibraryws.getMACAddress();
	}
	getHASVersion(){
		this.ingenicolibraryws.getHASVersion();
	}
	launchQuikView(){
		this.ingenicolibraryws.launchQuikView(
			this.accountNumber, this.mobileNumber, this.token, this.channel);
	}
	rebootPaymentTerminal(){
		this.ingenicolibraryws.rebootPaymentTerminal();
	}
	getParentComponent(){
		return null;
	}
}
