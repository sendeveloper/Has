import { IngenicoLibraryWS } from '../ingenicolibraryws';

export class IngenicoIntegration{
  constructor(){

  }
}
var returnDLData;
var pg = false;
var ingenicoLanguagePref, ingenicoLanForEmployee;
var isIngenicoNFCEnabled;
var accountType, captureField;
var posdeluxe, deviceEnabled, deviceVersion, scanDL;
var acceptDLScan;
var ingenicolibraryws = new IngenicoLibraryWS();
var typeField, captureString, prev_captureString, captureDL;
var verifyDL, tempDLData;
var HASScreenPopAX;

function highlightFields() {
	try{
		// if(!($('#NewEmployeeAccount').val()=="true")){
	 //       document.theForm.lastName.style.backgroundColor = '#ADD8E6';
	 //       document.theForm.firstName.style.backgroundColor = '#ADD8E6';
	 //       document.theForm.midInit.style.backgroundColor = '#ADD8E6';
	 //       document.theForm.address1.style.backgroundColor = '#ADD8E6';
	 //       document.theForm.address2.style.backgroundColor = '#ADD8E6';
	 //       document.theForm.state.style.backgroundColor = '#ADD8E6';
	 //       document.theForm.idIssued.style.backgroundColor = '#ADD8E6';
	 //       document.theForm.city.style.backgroundColor = '#ADD8E6';
	 //       document.theForm.zip.style.backgroundColor = '#ADD8E6';
	 //       document.theForm.birthDate.style.backgroundColor = '#ADD8E6';
	 //       document.theForm.id.style.backgroundColor = '#ADD8E6';
		// }
	}catch(e){}

}

function deHighlightFields() {
	try{
       // document.theForm.lastName.style.backgroundColor = '#FFFFFF';
       // document.theForm.firstName.style.backgroundColor = '#FFFFFF';
       // document.theForm.midInit.style.backgroundColor = '#FFFFFF';
       // document.theForm.address1.style.backgroundColor = '#FFFFFF';
       // document.theForm.address2.style.backgroundColor = '#FFFFFF';
       // document.theForm.state.style.backgroundColor = '#FFFFFF';
       // document.theForm.idIssued.style.backgroundColor = '#FFFFFF';
       // document.theForm.city.style.backgroundColor = '#FFFFFF';
       // document.theForm.zip.style.backgroundColor = '#FFFFFF';
       // document.theForm.birthDate.style.backgroundColor = '#FFFFFF';
       // document.theForm.id.style.backgroundColor = '#FFFFFF';
	}catch(e){}

}

function doCreditOnload() {
    var captureString = '';
    var prev_captureString = '';
       if (accountType == 'P' || accountType == 'S' || accountType == 'B') //TODO /*&& ccMarketId.length == 0 & username != 'pmsr'*/
       {
             /* document.theForm.firstName.focus();*/
    	   if(sessionStorage.getItem("isWebSocketConnected")=="true" && deviceEnabled){
    		   captureField = 'Msg';
               acceptDLScan = false;
     	   	   // IngenicoLibraryWS.displayWelcome(null, ingenicoLanguagePref,false);
     	   	   // displayWelcome function has a parameter but try to call with 3 parameters
      	   	   window.setTimeout('delayShowDLDisclaimer()', 1500);
    	   }else{
    //            if (deviceEnabled && document.posdeluxe != null && document.posdeluxe.device != null) { 
    //                if (document.posdeluxe.device != 1) {
    //                      captureField = 'Msg';
    //                      acceptDLScan = false;
                          /* //captureMode = false; */
    //                      if (document.posdeluxe.device == 3) {
    //                             document.posdeluxe.MessageBoxYesNo(captureMsg2);
    //                      } else {
                                /*// document.posdeluxe.DisplayWelcome(); */
    //                     	 IngenicoLibraryWS.displayWelcome(document.posdeluxe, ingenicoLanguagePref,true);
    //                   	   	 window.setTimeout('delayShowDLDisclaimer()', 1500);
    //                      }
    //                } else {
    //                      disclaimer();
    //                      captureField = 'DL';
    //                }
				// }
    	   }
       }
}

function processAcceptEvent(userData) {
	try {
		var captureField;
		if (captureField == 'DL') {
			// setCookie("DLStatus","Done");
	    	 if(sessionStorage.getItem("isWebSocketConnected")=="true"){
	    		 populate_fields(userData);
	    	 }else{
	    		 // populate_fields(document.posdeluxe);
	    	 }
			//  if($("input[name='creditCheckAuthorized']:checked").val() == "yes"){
			// 	 showCreditPolicy();
			//  }else{
			//        captureField = 'phone';
   //       	       document.theForm.homePhone.click();
			//  }
			// document.theForm.dlMode.value = "S"; 
		} else if (captureField == 'Msg') {
			/* // showWStatus('Customer Accepted Driver\'s License Disclaimer'); // TODO side bar*/
			acceptDLScan = true;
			StartDLCapture();
		} else if (captureField == 'CreditMsg') {
			/* // showWStatus('Customer Accepted to Run Credit Check');// TODO side bar */
			acceptCreditPolicy();
		} else if (captureField == 'ssn') {
			acceptSSN(userData);
		} else if (captureField == 'phone') {
			acceptPhone(userData);
		} else if (captureField == 'pin') {
			acceptPin(userData);
			/*Remedy #12770698 fix Starts*/
		} else if (captureField == 'emailCreditPage' || captureField == 'emailBusinessCreditPage') {
			processEmailDataReady(userData);
			/*Remedy #12770698 fix Starts*/
		}else if (captureField == 'EmployeeSSN'){
			acceptEmployeeSSN(userData);
		}else if (captureField == 'PNumber'){
			acceptPNumber(userData);
		}else if (captureField == 'fein') {
			acceptFEIN(userData);
		}else if (captureField == 'primaryContact') {
			acceptPrimacryContactPhone(userData);
		}else if (captureField == 'mobile'){
			acceptMobileNumber(userData);
		}else if(captureField == 'workPhone'){
			acceptWorkNumber(userData);
		}
	} catch (e) {
	}
}
function StartDLCapture() {
       /*if (deviceEnabled ) {*///TODO
       captureField = 'DL';
       typeField = '';
       acceptDLScan = true;
       /*//captureMode = true;*/
       captureString = '';
       prev_captureString = '';
      /* document.theForm.firstName.focus();*/
       // document.theForm.firstName.click();
       /*//device_swiping();*/

       if(isIngenicoNFCEnabled != null && isIngenicoNFCEnabled){
    	   // document.posdeluxe.StartCaptureDL('DL');
       } 
       else{
    	   if(sessionStorage.getItem("isWebSocketConnected")=="true"){
    		   // IngenicoLibraryWS.captureDL(null, ingenicoLanguagePref,false);
    		   // captureDL function has a paramter but try to call with 3 parameters
    	   }else{
    		   // IngenicoLibraryWS.captureDL(document.posdeluxe, ingenicoLanguagePref,true);
    	   }
       }

       setTimeout('showDLPrompter()', 200);
       //showDLDialog();
}


function checkDevice() {
       deviceEnabled = false;
       deviceVersion = "1004"; //TODO                                
       if (posdeluxe != null && posdeluxe.device != null) {
              try {
                     posdeluxe.getDeviceVersion();
                     deviceEnabled = true;
              } catch (e) {
                     // TODO: handle exception
              }
       }
}

/*    -----------  function checkDevice() :TODO anylysis of code start :: This reuires clean up------------------*/
/*if(getCookie(\"remoteHost\") == null){ 
                           setCookie(\"remoteHost\",posdeluxe.GetComputerName());\n+
                           }             

                           deviceVersion = "1004";     //TODO    
/*    -----------  function checkDevice(): TODO anylysis of code END------------------*/

function showDLPrompter(strMessage) {
       try {
    	   var strFeatures = "dialogWidth=586px;dialogHeight=426px;center=1;help=0;status=0;resizable=0;scrolling=0";
    	   document.cookie = "DLStatus=;expires=Thu, 01-Jan-70 00:00:01 GMT;path=/";
    	   if(sessionStorage.getItem("isWebSocketConnected")=="true"){
    		   scanDL = true;
    		   // returnDLData = window.showModalDialog("/idPrompter.html",
    				 //   isIngenicoNFCEnabled, strFeatures);
    		   if (returnDLData != "undefined" && returnDLData != null
    				   && returnDLData.length > 0 ) {
    			   if(scanDL){
        			   // tempDLData= IDParser.processId(returnDLData);
        			   tempDLData = ingenicolibraryws.processId(returnDLData);
        			   processDLDataReadyEvent(tempDLData);
    			   }
    		   }
    	   }else{
    		   // returnDLData = window.showModalDialog("/prompter.html",
    				 //   isIngenicoNFCEnabled, strFeatures);
    		   if (returnDLData != "undefined" && returnDLData != null
    				   && returnDLData.length > 0 && returnDLData != "Finished") {
    			   // document.posdeluxe.ProcessRawDataDriverLicense(returnDLData);
    		   }
    	   }

       } catch (e) {
       }
}

function showDLDialog() {

       try {
              var title = "Driver License Capture";
              var msgBefore = "Scan or Swipe Customer Driver License ...";
              var msgCapturing = "Processing Customer Driver's License Data (This may take up to 10 seconds)...";
              var msgAfter = "Received Customer Driver License Data, Confirmation in Progress ...";
              var imgUrl = "http://" + self.location.hostname + "/images/DLSwipe.jpg";
              /*//alert(imgUrl);*/
              // document.posdeluxe.StartCaptureKeyboard(1000, title, msgBefore,msgCapturing, msgAfter, imgUrl);
       } catch (e) {
              /*//alert("showDLDialog:" + e.message); */
       }
}

function device_swiping() {
       // if (document.getElementById("popCalcbg") != null)
       //        document.getElementById("popCalcbg").style.display = 'block';
       // if (document.getElementById("device_swiping") != null)
       //        document.getElementById("device_swiping").style.display = 'block';

       captureField = 'DL';

       hideCreditFields();

       var dialog_window = showDLPrompter("Scan or Swipe Customer's Driver License Now ....")

}
function processDLDataReadyEvent(userData) {
	try {
		var middleName;
		if(sessionStorage.getItem("isWebSocketConnected")=="true"){
			if(scanDL){
				middleName = "";
				if (userData.MiddleName != null) {
					middleName = userData.MiddleName.charAt(0);
				}
				var customerName = userData.FirstName + " "+middleName+" "+ userData.LastName;
				// IngenicoLibraryWS.verifyDL(null, ingenicoLanguagePref,customerName, userData.StreetAddress, userData.City, 
				// 		userData.State, userData.ZIPCode, userData.DOB, userData.IDNumber, false);
				// The function has 8 parameters but try to call with 10 parameters
			}else{
				middleName = "";
				if (userData.Middlename != null) {
					middleName = userData.Middlename.charAt(0);
				}
				var customerName = userData.Firstname + " "+middleName+" "+ userData.Lastname;
				// IngenicoLibraryWS.verifyDL(null, ingenicoLanguagePref,customerName, userData.Address1, userData.City, 
				// 		userData.State, userData.Zipcode, userData.Dob, userData.IdNumber, false);
				// The function has 8 parameters but try to call with 10 parameters
			}

		}else{
			// if (document.posdeluxe.device > 1) {
			// 	verifyDLLegacy(document.posdeluxe, ingenicoLanguagePref);
				/*//IngenicoLibraryWS.verifyDL(document.posdeluxe, ingenicoLanguagePref,customerName, userData.Address1, userData.City, userData.State, userData.ZipCode, userData.Dob, userData.IdNumber, true);*/
			// } else {
			// 	populate_fields(document.posdeluxe);
			// 	closeSwipe();
			// 	scanned();
			// }
		}
	} catch (e) {
	}
}
function populate_fields(capture) {
	// if(window.undefined == capture){
	if(undefined == capture){
		capture= tempDLData;
	}
       if (capture.Lastname != null) {
              // document.theForm.lastName.value = capture.Lastname;
       }if (capture.Firstname != null) {
              // document.theForm.firstName.value = capture.Firstname;
       }if (capture.Middlename != null) {
              // document.theForm.midInit.value = capture.Middlename.charAt(0);
       }if (capture.Address1 != null && capture.Address1 != 'undefined') {
              /* //splitAddress(capture.Address1); */
              // document.theForm.address1.value = capture.Address1;
       }
       // document.theForm.address2.value = validateField(capture.Address2);
       /*
       //document.theForm.state.value = validateField(capture.State);
       //document.theForm.idIssued.value = validateField(capture.State); */
       // document.getElementById('idIssued').value=validateField(capture.State);
       // document.getElementById('state').value = validateField(capture.State);
       // document.theForm.city.value = validateField(capture.City);
       // document.theForm.zip.value = validateField(capture.Zipcode);
       // document.theForm.birthDate.value = validateField(capture.Dob);
       // $("#birthDate").keyup();
       // document.theForm.id.value = validateField(capture.IdNumber);
       // getLocalSignalDetails();
       /* //  getSignalStrength(); */
}

function showCreditPolicy() {
       captureField = 'CreditMsg';
       if(sessionStorage.getItem("isWebSocketConnected")=="true"){
    	   // IngenicoLibraryWS.displayCCDisclaimer(null, ingenicoLanguagePref,false);
    	   // ingenicolibraryws.displayCCDisclaimer(null, ingenicoLanguagePref,false);
    	   // The displayCCDisclaimer function has a parameter but try to call with 3 parameters
       }else{
    	   // IngenicoLibraryWS.displayCCDisclaimer(document.posdeluxe, ingenicoLanguagePref,true);
    	   // ingenicolibraryws.displayCCDisclaimer(document.posdeluxe, ingenicoLanguagePref,true);
    	   // The displayCCDisclaimer function has a parameter but try to call with 3 parameters
       }
       /*document.posdeluxe
       .DisplayCCDisclaimer('* Before continuing with this |service activation, it is |our policy to run a credit check.| |*Do you authorize T-mobile to |obtain information about your |credit history?');*/
}

function acceptCreditPolicy() {
       
       // document.theForm.ssn.style.background = "white";
       // document.theForm.ssnconfirm.style.background = "white";
       // document.theForm.homePhone.style.background = "white";
       captureField = 'ssn';
       editSSN();

}

function editSSN() {
       deHighlightFields();
       captureField = 'ssn';
       // if (document.theForm.ssn.value != null && document.theForm.ssn.value != '') {
               /* //document.posdeluxe.ssn = document.theForm.ssn.value; */
       //        document.posdeluxe
       //        .DisplaySSN('Is the previously entered Social Security Number correct?');
       // } else {
       //        document.theForm.ssn.focus();
       //        document.theForm.ssn.click();
       // }
}


function validateField(fieldValue) {
       if (fieldValue != null && fieldValue != 'undefined') {
              return fieldValue;
       }
       else {
              return "";
       }
}

function StartCaptureSSN() {
      
	if(deviceEnabled && sessionStorage.getItem("isWebSocketConnected")=="true"){
		// document.theForm.ssn.style.backgroundColor = '#ADD8E6';
		try {
			captureField = 'ssn';
			// if ($('#creditCheckYes').prop('checked')) {
			// 	IngenicoLibraryWS.displayClearEntryForm(null, ingenicoLanguagePref, 'SSN', '301', '34',ingenicoVersion,false);
			// }
			// else {
			// 	showCreditPolicy();
			// }
		}
		catch(e) {
		}
	}else{
		// if (deviceEnabled && document.posdeluxe.device != null) {
	
		// 	 document.theForm.ssn.style.backgroundColor = '#ADD8E6';
	
		// 	if (document.posdeluxe.device == 1) {
		// 		typeField = 'ssn';
		// 		check('Please Enter Your Social Security Number:');
		// 		numpad_change();
		// 	}
		// 	else {
		// 		try {
		// 			captureField = 'ssn';
		// 			if ($('#creditCheckYes').prop('checked')) {
		// 				if(isIngenicoNFCEnabled != null && isIngenicoNFCEnabled)
		// 					document.posdeluxe.StartCaptureSSN('Please enter your Social Security Number & Press Next when complete:');
		// 				else{
		// 					try{
		// 						document.posdeluxe.CancelDeviceTransaction();
		// 					}catch(e){}
		 					/* // document.posdeluxe.StartCapture('uctssn.k3z','301','34'); */
		// 					IngenicoLibraryWS.displayClearEntryForm(document.posdeluxe, ingenicoLanguagePref, 'SSN', '301', '34',ingenicoVersion,true);
		// 				}
		// 			}
		// 			else {
		// 				showCreditPolicy();
		// 			}
		// 		}
		// 		catch(e) {
		// 		}
		// 	}
		// }
	}
}

function delayShowDLDisclaimer() {
       captureField = 'Msg';
       if(sessionStorage.getItem("isWebSocketConnected")=="true"){
    	   // IngenicoLibraryWS.displayDLDisclaimer(null, ingenicoLanguagePref,false);
    	   // The function has a parameter but try to call with 3 parameters
       }else{
    	   // IngenicoLibraryWS.displayDLDisclaimer(document.posdeluxe, ingenicoLanguagePref,true);
    	   // The function has a parameter but try to call with 3 parameters
       }
       
}

function disclaimer() {
	try{
		// if (document.getElementById("popCalcbg") != null)
		// 	document.getElementById("popCalcbg").style.display = 'block';
		// if (document.getElementById("disclaimer") != null)
		// 	document.getElementById("disclaimer").style.display = 'block';

		hideCreditFields();
	}catch(e){}

}

function hideCreditFields() {
       try {
              // document.getElementById("creditinfo").style.display = 'none';
              // document.getElementById("buttonBar").style.display = 'none';
       } catch(e) {
       }
}

function numpad_change()
{
       setTimeout("donothing()", 100);

}

function acceptSSN(userData) {

	if(sessionStorage.getItem("isWebSocketConnected")=="true"){
		// document.theForm.ssn.value = userData;
	}else{
	       if(isIngenicoNFCEnabled != null && isIngenicoNFCEnabled)
	       {
	              // document.theForm.ssn.value = document.posdeluxe.SSN;
	       }
	       else{
	              // document.theForm.ssn.value = document.posdeluxe.Buffer;
	       }
	}

       // document.theForm.ssnconfirm.style.backgroundColor = '#ADD8E6';
       // document.theForm.ssnconfirm.value = document.theForm.ssn.value;
      /*// document.theForm.ssn.style.backgroundColor = '#FFFFFF';*/
       captureField = 'phone';
       // if (accountType != 'B') {
       //     document.theForm.homePhone.focus();
       //     document.theForm.homePhone.click();
       // }else{
    	  //  document.theForm.BhomePhone.focus();
    	  //  document.theForm.BhomePhone.click();
       // }
}


function editPhoneNumber() {
       // if (document.theForm.homePhone.value != null && document.theForm.homePhone.value != '') {
       //        document.posdeluxe.DisplayPhoneNumber('Is the previously entered Primary Contact Number correct?');
       // }
}



function acceptPhone(userData) {
	try{
		if (accountType == 'B') {
			if (captureField == 'primaryContact') {
				if(deviceEnabled && sessionStorage.getItem("isWebSocketConnected")=="true"){
					// document.theForm.businessPhone.value = userData;
				}else{
					if (isIngenicoNFCEnabled != null && isIngenicoNFCEnabled) {
						// document.theForm.businessPhone.value = document.posdeluxe.PhoneNumber;
					} else {
						// document.theForm.businessPhone.value = document.posdeluxe.Buffer;
					}
				}
				// document.theForm.businessPhone.style.backgroundColor = '#FFFFFF';
				// document.theForm.bPin.focus();
				// document.theForm.bPin.click();
			}else if(captureField == 'phone'){
				// document.theForm.ssn.style.backgroundColor = '#FFFFFF';
				// document.theForm.BhomePhone.focus();
				if(deviceEnabled && sessionStorage.getItem("isWebSocketConnected")=="true"){
					// document.theForm.BhomePhone.value = userData;
					// document.theForm.BhomePhone.style.backgroundColor = '#FFFFFF';
					// document.theForm.mobilePhone.focus();
					// document.theForm.mobilePhone.click();
				}else{
					if (isIngenicoNFCEnabled != null && isIngenicoNFCEnabled) {
						// document.theForm.BhomePhone.value = document.posdeluxe.PhoneNumber;
						// document.theForm.BhomePhone.style.backgroundColor = '#FFFFFF';
						// document.theForm.mobilePhone.focus();
						// document.theForm.mobilePhone.click();
					} else {
						// document.theForm.BhomePhone.value = document.posdeluxe.Buffer;
						// document.theForm.BhomePhone.style.backgroundColor = '#FFFFFF';
						// document.theForm.mobilePhone.focus();
						// document.theForm.mobilePhone.click();
					}
				}
			}else if(captureField == 'mobile'){
				acceptMobileNumber(userData);
			}else if(captureField == 'workPhone'){
				acceptWorkNumber(userData);
			}
		} else {
			if(deviceEnabled && sessionStorage.getItem("isWebSocketConnected")=="true"){
				// document.theForm.homePhone.value = userData;
			}else{
				if (isIngenicoNFCEnabled != null && isIngenicoNFCEnabled){
					// document.theForm.homePhone.value = document.posdeluxe.PhoneNumber;
				}
				else{
					// document.theForm.homePhone.value = document.posdeluxe.Buffer;
				}
			}
			// document.theForm.pin.style.backgroundColor = '#ADD8E6';
			// document.theForm.pin.focus();
			// document.theForm.pin.click();
		}
	}catch(e){}
}

// Duplicate function

// function acceptPrimacryContactPhone(userData) {
// 	try{
// 		// if(document.theForm.primaryContact.value==null || document.theForm.primaryContact.value== ''){
// 		// 	if(sessionStorage.getItem("isWebSocketConnected")=="true"){
// 		// 		document.theForm.primaryContact.value = userData;
// 		// 	}else{
// 		// 		document.theForm.primaryContact.value = document.posdeluxe.Buffer;
// 		// 	}
// 		// }
// 		// document.theForm.pin.focus();
// 		// document.theForm.pin.click();
// 	}catch(e){}
// }

// Duplicate function

// function StartCapturePrimaryPhoneNumber() {
// 	if (deviceEnabled) {
//           // if (document.posdeluxe!=null && document.posdeluxe.device != null && document.posdeluxe.device == 1) {
//           //        typeField = 'phone';
//           //        check('Please enter your Primary Contact Number:');
//           //        numpad_change();
//           // }
//           // else {
//           //        try {
//           //              captureField = 'primaryContact';
//           //              if(sessionStorage.getItem("isWebSocketConnected")=="true"){
//           //           	   IngenicoLibraryWS.displayClearEntryForm(null, ingenicoLanguagePref, 'PRIMARY_PHONE', '310', '7',ingenicoVersion,false);
//           //              }else{
//           //                  if(isIngenicoNFCEnabled != null && isIngenicoNFCEnabled){
//           //               	   try{
//           //               		   document.posdeluxe.CancelDeviceTransaction();
//           //               	   }catch(e){}
//           //                         document.posdeluxe.StartCapturePhoneNumber('Please enter your Primary Contact Number & Press Next when complete:');}
//           //                  else{
//           //                      try{
//           //                      	document.posdeluxe.CancelDeviceTransaction();
//           //                      }catch(e){}             
//           //                      IngenicoLibraryWS.displayClearEntryForm(document.posdeluxe, ingenicoLanguagePref, 'PRIMARY_PHONE', '310', '7',ingenicoVersion,true);
//           //                  }
//           //              }
//           //        }
//           //        catch(e) {
//           //        }
//           // }
//    }
// }

function StartCapturePhoneNumber() {
	if(deviceEnabled && sessionStorage.getItem("isWebSocketConnected")=="true"){
		// document.theForm.ssn.style.backgroundColor = '#FFFFFF';
  //       document.theForm.ssnconfirm.style.backgroundColor = '#FFFFFF';
        if(accountType == 'B'){
     	   // document.theForm.BhomePhone.focus();
     	   // document.theForm.BhomePhone.style.backgroundColor = '#ADD8E6';
        }else{
     	   // document.theForm.homePhone.style.backgroundColor = '#ADD8E6';
        }
        try {
            captureField = 'phone';
         	// IngenicoLibraryWS.displayClearEntryForm(null, ingenicoLanguagePref, 'PRIMARY_PHONE', '310', '7',ingenicoVersion,false);
         	// The displayClearEntryForm function has 4 parameters but try to call with 7 parameters
      }
      catch(e) {
      }
        
	}else{
		// if (deviceEnabled && document.posdeluxe.device != null) {
	           
	 //    	   document.theForm.ssn.style.backgroundColor = '#FFFFFF';
	 //           document.theForm.ssnconfirm.style.backgroundColor = '#FFFFFF';
	 //           if(accountType == 'B'){
	 //        	   document.theForm.BhomePhone.focus();
	 //        	   document.theForm.BhomePhone.style.backgroundColor = '#ADD8E6';
	 //           }else{
	 //        	   document.theForm.homePhone.style.backgroundColor = '#ADD8E6';
	 //           }
	           
	              
	 //           if (document.posdeluxe.device == 1) {
	 //                     typeField = 'phone';
	 //                     check('Please enter your Primary Contact Number:');
	 //                     numpad_change();
	 //              }
	 //              else {
	 //                     try {
	 //                           	captureField = 'phone';
	 //                           	if(isIngenicoNFCEnabled != null && isIngenicoNFCEnabled)
	 //                           	{
	 //                               	try{
	 //                               		document.posdeluxe.CancelDeviceTransaction();
	 //                               	  }catch(e){}
	 //                                  document.posdeluxe.StartCapturePhoneNumber('Please enter your Primary Contact Number & Press Next when complete:');
	 //                           }
	 //                           else{ 
	 //                               try{
	 //                               	document.posdeluxe.CancelDeviceTransaction();
	 //                               }catch(e){}
	 //                           		 document.posdeluxe.StartCapture('ctphone.k3z','222','7');
	 //                               IngenicoLibraryWS.displayClearEntryForm(document.posdeluxe, ingenicoLanguagePref, 'PRIMARY_PHONE', '310', '7',ingenicoVersion,true);
	 //                           }
	 //                     }
	 //                     catch(e) {
	 //                     }
	 //              }
	 //       }
	}
}

function StartCapturePIN() {
	if(deviceEnabled){ /*//sessionStorage.getItem("isWebSocketConnected")=="true"*/
	
		if(!(accountType == 'B')){
			// document.theForm.homePhone.style.backgroundColor = '#FFFFFF';
			// document.theForm.pin.style.backgroundColor = '#ADD8E6';
	
			if(sessionStorage.getItem("isWebSocketConnected")=="true"){
				try {
					captureField = 'pin';
					// IngenicoLibraryWS.displayClearEntryForm(null, ingenicoLanguagePref, 'PIN_CREATE', '311', '36',ingenicoVersion,false);
					// The displayClearEntryForm function has 4 parameters but try to call with 7 parameters
				}
				catch(e) {
				}
			}
			// else if (document.posdeluxe.device != null) {
			// 	if (document.posdeluxe.device == 1) {
			// 		typeField = 'pin';
			// 		check('Please create a unique 4 digit PIN:');
			// 		numpad_change();
			// 	}
			// 	else {
			// 		try {
			// 			captureField = 'pin';
			// 			if(isIngenicoNFCEnabled != null && isIngenicoNFCEnabled){
			// 				try{
			// 					document.posdeluxe.CancelDeviceTransaction();
			// 				}catch(e){}
			// 				document.posdeluxe.StartCapturePIN('Please create a unique 4 digit PIN & Press Next when complete:');}
			// 			else{
			// 				try{
			// 					document.posdeluxe.CancelDeviceTransaction();
			// 				}catch(e){}
			// 				//document.posdeluxe.StartCapture('uctpin.k3z','311','29');
			// 				IngenicoLibraryWS.displayClearEntryForm(document.posdeluxe, ingenicoLanguagePref, 'PIN_CREATE', '311', '36',ingenicoVersion,true);
			// 			}
			// 		}
			// 		catch(e) {
			// 		}
			// 	}
			// }
	
		}else{
			// document.theForm.bPin.style.backgroundColor = '#ADD8E6';
			// document.theForm.bPin.focus();
			if(sessionStorage.getItem("isWebSocketConnected")=="true"){
				try {
					captureField = 'pin';
					// IngenicoLibraryWS.displayClearEntryForm(null, ingenicoLanguagePref, 'PIN_CREATE', '311', '36',ingenicoVersion,false);
					// The displayClearEntryForm function has 4 parameters but try to call with 7 parameters
				}
				catch(e) {
				}
			}
			// else if (document.posdeluxe.device != null) {
			// 	if (document.posdeluxe.device == 1) {
			// 		typeField = 'pin';
			// 		check('Please create a unique 4 digit PIN:');
			// 		numpad_change();
			// 	}else{
			// 		try {
			// 			captureField = 'pin';
			// 			if(isIngenicoNFCEnabled != null && isIngenicoNFCEnabled){
			// 				try{
			// 					document.posdeluxe.CancelDeviceTransaction();
			// 				}catch(e){}
			// 				document.posdeluxe.StartCapturePIN('Please create a unique 4 digit PIN & Press Next when complete:');}
			// 			else{
			// 				try{
			// 					document.posdeluxe.CancelDeviceTransaction();
			// 				}catch(e){}
			 				/* //document.posdeluxe.StartCapture('uctpin.k3z','311','29'); */
			// 				IngenicoLibraryWS.displayClearEntryForm(document.posdeluxe, ingenicoLanguagePref, 'PIN_CREATE', '311', '36',ingenicoVersion,true);
			// 			}
			// 		}
			// 		catch(e) {
			// 		}
			// 	}
			// }
		}
	}
}

function acceptPin(userData) {

	if(!(accountType == 'B')){
		if(sessionStorage.getItem("isWebSocketConnected")=="true"){
			// document.theForm.pin.value = userData;
		}else{
			if(isIngenicoNFCEnabled != null && isIngenicoNFCEnabled)
			{
				// document.theForm.pin.value = document.posdeluxe.PIN;
			}
			else{
				// document.theForm.pin.value = document.posdeluxe.Buffer;
			}
		}

		// document.theForm.pin.style.backgroundColor = '#ADD8E6';
		// enableCreditCheckButton();
		// document.theForm.emailCreditPage.focus();
		// document.theForm.emailCreditPage.click();
	}else{
		if(sessionStorage.getItem("isWebSocketConnected")=="true"){
			// document.theForm.bPin.value = userData;
		}else{
			if(isIngenicoNFCEnabled != null && isIngenicoNFCEnabled)
			{
				// document.theForm.bPin.value = document.posdeluxe.PIN;
			}
			else{
				// document.theForm.bPin.value = document.posdeluxe.Buffer;
			}
		}
		// document.theForm.bPin.style.backgroundColor = '#ADD8E6';
		// document.theForm.emailBusinessCreditPage.focus();
		// document.theForm.emailBusinessCreditPage.click();
	}   

}

function StartCaptureEmail() {
	try {
		/*Remedy #12770698 fix Starts*/
		if (deviceEnabled) {
			if(accountType == 'B'){
				pg = true;
			}
				// document.theForm.pin.style.backgroundColor = '#FFFFFF';
				// document.theForm.emailCreditPage.style.backgroundColor = '#ADD8E6';
				captureField = 'emailCreditPage';
				if(sessionStorage.getItem("isWebSocketConnected")=="true"){
					// IngenicoLibraryWS.captureEmailAddress(null, ingenicoLanguagePref,false);
					// The captureEmailAddress function has a parameter but try to call with 3 parameters
				}else{
					if(isIngenicoNFCEnabled != null && isIngenicoNFCEnabled){
						try{
							// document.posdeluxe.CancelDeviceTransaction();
						}catch(e){}
						// document.posdeluxe.StartCaptureEmail('Please enter your Email Address and Press Enter when complete:');
					}
					else{
						try{
							// document.posdeluxe.CancelDeviceTransaction();
						}catch(e){}
						/*//document.posdeluxe.StartCapture('email.k3z','304','2');*/
						// IngenicoLibraryWS.captureEmailAddress(document.posdeluxe, ingenicoLanguagePref,true);
						// The captureEmailAddress function has a parameter but try to call with 3 parameters
					}
				}
			}
		}catch(e) {
	}
		/*Remedy #12770698 fix ends*/
}

/*Remedy #12770698 fix Starts*/
function StartCaptureBusinessEmail() {
	try {
		if (deviceEnabled) {
				// document.theForm.bPin.style.backgroundColor = '#FFFFFF';
				// document.theForm.emailBusinessCreditPage.style.backgroundColor = '#ADD8E6';
				captureField = 'emailBusinessCreditPage';
					
				if(sessionStorage.getItem("isWebSocketConnected")=="true"){
					// IngenicoLibraryWS.captureEmailAddress(null, ingenicoLanguagePref,false);
					// The captureEmailAddress function has a parameter but try to call with 3 parameters
				}else{
					if(isIngenicoNFCEnabled != null && isIngenicoNFCEnabled){
						try{
							// document.posdeluxe.CancelDeviceTransaction();
						}catch(e){}
						// document.posdeluxe.StartCaptureEmail('Please enter your Email Address and Press Enter when complete:');
					}
					else{
						try{
							// document.posdeluxe.CancelDeviceTransaction();
						}catch(e){}
						/*//document.posdeluxe.StartCapture('email.k3z','304','2');*/
						// IngenicoLibraryWS.captureEmailAddress(document.posdeluxe, ingenicoLanguagePref,true);
						// The captureEmailAddress function has a parameter but try to call with 3 parameters
					}
				}
			}
		}
	catch(e) {
	}
}

/*Remedy #12770698 fix Ends*/

function processEmailDataReady(userData) {
	
		if(!(accountType == 'B')){
			try {
				if(sessionStorage.getItem("isWebSocketConnected")=="true"){
					// document.theForm.emailCreditPage.value = userData;
					// document.theForm.emailCreditPage.style.backgroundColor = '#FFFFFF';
					// IngenicoLibraryWS.displayThankYou(null, ingenicoLanguagePref,false);
					// The displayThankYou function has a parameter but try to call with 3 parameters
				}else{
					if(isIngenicoNFCEnabled != null && isIngenicoNFCEnabled)
					{
						// document.theForm.emailCreditPage.value = document.posdeluxe.Email;
					}
					else{
						// document.theForm.emailCreditPage.value = document.posdeluxe.Buffer;
					}
					// document.theForm.emailCreditPage.style.backgroundColor = '#FFFFFF';
					// IngenicoLibraryWS.displayThankYou(document.posdeluxe, ingenicoLanguagePref,true);
					// The displayThankYou function has a parameter but try to call with 3 parameters
				}
				// enableCreditCheckButton();
			}
			catch(e) {}
		} else{
			if(sessionStorage.getItem("isWebSocketConnected")=="true"){
				if(pg){
					// document.theForm.emailCreditPage.value = userData;
				}else{
					// document.theForm.emailBusinessCreditPage.value = userData;
				}
				// IngenicoLibraryWS.displayThankYou(null, ingenicoLanguagePref,false);
				// The displayThankYou function has a parameter but try to call with 3 parameters
			}else{
				if(isIngenicoNFCEnabled != null && isIngenicoNFCEnabled){
					if(pg){
						// document.theForm.emailCreditPage.value = document.posdeluxe.Email;
					}else{
						// document.theForm.emailBusinessCreditPage.value = document.posdeluxe.Email;
					}
				}
				else{
					if(pg){
						// document.theForm.emailCreditPage.value = document.posdeluxe.Buffer;
					}else{
						// document.theForm.emailBusinessCreditPage.value = document.posdeluxe.Buffer;
					}
				}
				// IngenicoLibraryWS.displayThankYou(document.posdeluxe, ingenicoLanguagePref,true);
				// The displayThankYou function has a parameter but try to call with 3 parameters
			}

			if(pg){
				// document.theForm.emailCreditPage.style.backgroundColor = '#FFFFFF';
			}else{
				// document.theForm.emailBusinessCreditPage.style.backgroundColor = '#FFFFFF';
			}
			pg = false;
			
			
		}
}


function startCaptureMSR() {
	
	// if (document.theForm.billingMethod != null
	// 		&& document.theForm.billingMethod[1].checked && deviceEnabled) {
	// 	if(sessionStorage.getItem("isWebSocketConnected")=="true" || (posdeluxe != null && posdeluxe.device != null)){
	// 		processCC();
	// 	}
	// 	if (posdeluxe != null && posdeluxe.device != null) {
	// 		if (isIngenicoNFCEnabled != null && isIngenicoNFCEnabled)
	// 			posdeluxe.StartCaptureMSR('Please swipe your credit card!');
	// 		else{
	// 			if(sessionStorage.getItem("ingenicoLanguagePref") != null){
	// 				ingenicoLanguagePref = sessionStorage.getItem("ingenicoLanguagePref");
	// 			}
	// 		}

	// 	}
	// 	if(sessionStorage.getItem("isWebSocketConnected")=="true"){
	// 		IngenicoLibraryWS.captureCreditCard(null, ingenicoLanguagePref,false);
	// 	}else{
	// 		IngenicoLibraryWS.captureCreditCard(posdeluxe, ingenicoLanguagePref,true);
	// 	}
		
	// }
}

function processCC()                                                          
{                  

       // var ccNum = document.getElementById('billingCardNumber').value;             
       var ccNum = '';
       if (ccNum !='' && ccNum.indexOf("1[\") != -1 && ccNum.indexOf(\"]2") != -1)
       {                                                                           
              // document.getElementById('billingCardNumber').value = '';                  
              parseCC(ccNum);
              try {
                  if(sessionStorage.getItem("isWebSocketConnected")=="true"){
                	  // IngenicoLibraryWS.displayThankYou(null, ingenicoLanguagePref,false);
                	  // The displayThankYou function has a parameter but try to call with 3 parameters
                  }else{
                	  // IngenicoLibraryWS.displayThankYou(null, ingenicoLanguagePref,true);
                	  // The displayThankYou function has a parameter but try to call with 3 parameters
                  }
              } 
              catch(e){

              }                                                       
       }                                                                           
       else {                                                                      
              setTimeout('processCC()',500);                                            
              return;                                                                   
       }                                                                           
}

function populateSSN(){
       // if($("input[name='creditCheckAuthorized']:checked").val() == "yes"){

       //        StartCaptureSSN();  
       // }
}

function parseCC(cc)
{

       var ccNumber = "";
       var ccMonth = "";
       var ccYear = "";
       var ccName = "";
       var ccExpire = "";

       var t1_flag = true;
       var t2_flag = true;

       cc = cc.replace('1[', '%');
       cc = cc.replace(']1', '?');
       cc = cc.replace('2[', ';');
       cc = cc.replace(']2', '?');

/*//     alert("ccdata value == " + cc); */
       if (cc == "") {
              return;
       }

       if (cc.indexOf("%") != -1)
       {
              /*// TRACK ONE DATA */
              if(isIngenicoNFCEnabled != null && isIngenicoNFCEnabled)
                     var t1 = cc.substring(cc.indexOf("%") + 1, cc.indexOf("?"));
              else
                     var t1 = cc.substring(cc.indexOf("%") + 2, cc.indexOf("?"));
/*
//            Add in track data so it can be sent to PaylinX for integrated credit stores
              //alert("track number == " + t1);
*/
              try {
                     // document.theForm.theTrack1Data.value = t1; 
              } 
              catch(e){}

              if (t1.indexOf("^") != -1)
              {
                     ccNumber = t1.substring(1, t1.indexOf("^"));
/*//                   alert(ccNumber); */

                     // document.getElementById('billingCardNumber').value = ignoreSpaces(ccNumber);
                     ccName = t1.substring((ccNumber.length + 2), t1.indexOf("^", (ccNumber.length + 2)));
/*//                   alert(ccName);
                     //Start-IE8 Changes--Removing '/' from Card Name  */
                     ccName=filterSlash(ccName);
                     /*//End-IE8 Changes--Removing '/' from Card Name 
//                   alert(ccName); */
                     // document.getElementById('nameOnCard').value = ccName;

                     ccYear = t1.substring(( (t1.indexOf("^", (ccNumber.length + 2))) + 1 ), (t1.indexOf("^", (ccNumber.length + 2)) + 3 ));
/*//                   alert(ccYear);*/

                     var index = parseInt('20' + ccYear);
                     // $("#billingExpYear").val(index);
                     /*
                     //document.getElementById('billingExpYear').options(index+1).selected = true;
					*/
                     ccMonth = t1.substring(( (t1.indexOf("^", (ccNumber.length + 2))) + 3 ), (t1.indexOf("^", (ccNumber.length + 2)) + 5 ));
/*//                   alert(ccMonth); */

                     if (ccMonth.length !=2) {
                           ccMonth = "0"+ ccMonth;
                     }
                     // $("#billingExpMonth").val(ccMonth);
              }

       }
       else t1_flag = false;


       if (cc.indexOf(";") != -1)
       {
              var temp = cc.substring(cc.indexOf(";") + 2);
              var t2 = temp.substring(0, cc.indexOf("?"));

              // document.theForm.theTrack2Data.value = t2;
       }
       else t2_flag = false;

}
function isCreditCard(st)
{
	var sum, mul, l, i;
	var digit, tproduct;
       if (st.length > 19)
              return (false);

       sum = 0;
       mul = 1;
       l = st.length;
       for (i = 0; i < l; i++)
       {
              digit = st.substring(l - i - 1, l - i);
              tproduct = parseInt(digit, 10) * mul;
              if (tproduct >= 10)
                     sum += (tproduct % 10) + 1;
              else
                     sum += tproduct;
              if (mul == 1)
                     mul++;
              else
                     mul--;
       }
       if ((sum % 10) == 0)
       {
              return (true);
       }
       else
       {
              return (false);
       }
}

function ignoreSpaces(string)
{
       var temp = "", splitstring;
       string = '' + string;
       splitstring = string.split(" ");
       for (var i = 0; i < splitstring.length; i++)
              temp += splitstring[i];
       return temp;
}

function filterSlash(str)
{
       str = '' + str;
       return str.replace('/', ' ');
}

function processEditEvent() {
	try{
		
       if (captureField == 'DL') {
              // populate_fields(document.posdeluxe);
			/*// document.theForm.housenumber.focus(); */
              // document.theForm.dlMode.value = "E";
              // setCookie("DLStatus","Done");
              try {
                     if (isIngenicoNFCEnabled != null && isIngenicoNFCEnabled){
                           // document.posdeluxe.DisplayForm('inform.icg');
                     }else{
                           //document.posdeluxe.DisplayForm('inform.k3z');
                    	 	//displayInformationForm(document.posdeluxe, ingenicoLanguagePref, 'INFORM',version);
                           if(sessionStorage.getItem("isWebSocketConnected")=="true"){
                        	   // IngenicoLibraryWS.displayInformationForm(null, ingenicoLanguagePref, 'INFORM', ingenicoVersion, false);
                        	   // The displayInformationForm function has 2 parameters but try to call with 5 parameters
                           } else {
                        	   // IngenicoLibraryWS.displayInformationForm(document.posdeluxe, ingenicoLanguagePref, 'INFORM', ingenicoVersion, true);
                        	   // The displayInformationForm function has 2 parameters but try to call with 5 parameters
                           }
                           
                     }
                     // document.theForm.address1.focus();
              } catch (e) {
              }
       } else if (captureField == 'ssn') {
              // document.theForm.ssn.focus();
              // document.theForm.ssn.click();

       } else if (captureField == 'phone') {
              // document.theForm.homePhone.focus();
              // document.theForm.homePhone.click();
       } else if (captureField == 'pin') {
              // document.theForm.pin.focus();
              // document.theForm.pin.click();
       } else if (captureField == 'primaryContact') {
              // document.theForm.primaryContact.click();
              // document.theForm.primaryContact.focus();
       } else if (captureField == 'emailCreditPage') {
    	      // document.theForm.emailCreditPage.focus();
           //    document.theForm.emailCreditPage.click();
       } else if (captureField == 'emailBusinessCreditPage'){
    	   	  // document.theForm.emailBusinessCreditPage.focus();
           //    document.theForm.emailBusinessCreditPage.click();
       }
	}catch(e){}
}

// Duplicate function

// function processBackEvent() {
// 	try{

//     if (captureField == 'phone') {
//     	if($("input[name='creditCheckAuthorized']:checked").val() == "yes") {
//            captureField = 'ssn';
//             editSSN();
//         }
//         else {
//             captureField = 'CreditMsg';
//             showCreditPolicy();
//         }
//     }
//     else if (captureField == 'pin') {
//         	captureField = 'phone';
//         // document.posdeluxe.DisplayPhoneNumber('Is the previously entered Primary Contact Number correct?');
//     }
//     else if (captureField == 'emailCreditPage' || captureField == 'emailBusinessCreditPage') {
//         captureField = 'pin';
//         // document.posdeluxe.DisplayPIN('Is the previously entered PIN Number correct?');
//     }
//     else if (captureField == 'ssn') {
//         	captureField = 'CreditMsg';
//         	showCreditPolicy();
//     }
// 	}catch(e){}
// }

function processSkipEvent() {
    if (captureField == 'ssn') {
        editPhoneNumber();
    }
    else if (captureField == 'email') {
        // document.posdeluxe.DisplayThankYou();
        // document.theForm.numServReq.click();
    }
}

function StartCaptureEmployeeSSN(){
	if(sessionStorage.getItem("isWebSocketConnected")=="true"){
		try {
			// document.theForm.lastFourSSN.style.backgroundColor = '#ADD8E6';
			captureField = 'EmployeeSSN';
			// IngenicoLibraryWS.displayClearEntryForm(null, ingenicoLanguagePref, 'LAST_FOUR', '314', '36',ingenicoVersion,false);
			// The function has 4 parameters but try to call with 7 parameters
		}
		catch(e) {
		}
	}else{
		// if (deviceEnabled && document.posdeluxe.device != null) {
		// 	document.theForm.lastFourSSN.style.backgroundColor = '#ADD8E6';
		// 	if (document.posdeluxe.device == 1) {
		// 		typeField = 'EmployeeSSN';
		// 		check('Please Enter Employee last 4 digits of SSN');
		// 		numpad_change();
		// 	}
		// 	else {
		// 		try {
		// 			captureField = 'EmployeeSSN';
	
		// 			if(isIngenicoNFCEnabled != null && isIngenicoNFCEnabled)
		// 				document.posdeluxe.StartCapture('ctlfour.icg','Capture Last 4 of SSN','%m4%M4%p*');
		// 			else{
		// 				try{
		// 					document.posdeluxe.CancelDeviceTransaction();
		// 				}catch(e){}
		// 				/*//document.posdeluxe.StartCapture('ctlfour.k3z','314','36');*/
		// 				IngenicoLibraryWS.displayClearEntryForm(document.posdeluxe, ingenicoLanguagePref, 'LAST_FOUR', '314', '36',ingenicoVersion,true);
		// 			}
		// 		}
		// 		catch(e) {
		// 		}
		// 	}
		// }
	}

	ingenicoLanForEmployee = true;
}

function acceptEmployeeSSN(userData) {
	if(sessionStorage.getItem("isWebSocketConnected") == "true"){
		// document.theForm.lastFourSSN.value = userData;
	}else{
		// document.theForm.lastFourSSN.value = document.posdeluxe.Buffer;
	}
	// document.theForm.lastFourSSN.style.backgroundColor = '#FFFFFF';
	// enableEmpSearchButton();
}

function StartCapturePNumber() {
	try{
	  if(sessionStorage.getItem("isWebSocketConnected") == "true"){
			try {
				// document.theForm.Pnumber.style.backgroundColor = '#ADD8E6';
				captureField = 'PNumber';
				// IngenicoLibraryWS.displayClearEntryForm(null, ingenicoLanguagePref, 'P_NUMBER', '313', '37',ingenicoVersion,false);
				// The displayClearEntryForm function has 4 parameters but try to call with 7 parameters
				}
			catch(e) {
			}
	  }else{
			// if (deviceEnabled && document.posdeluxe.device != null) {
			// 	if (document.posdeluxe.device == 1) {
			// 		typeField = 'PNumber';
			// 		check('Please Enter PNumber');
			// 		numpad_change();
			// 	}
			// 	else {
			// 		try {
			// 			document.theForm.Pnumber.style.backgroundColor = '#ADD8E6';
			// 			captureField = 'PNumber';
			// 			if(isIngenicoNFCEnabled != null && isIngenicoNFCEnabled){
			// 	            try{
			// 	            	document.posdeluxe.CancelDeviceTransaction();
			// 	            }catch(e){}
			// 				document.posdeluxe.StartCapture('ctpnum.icg','Capture P Number','%m8%M8');}
			// 			else{
			// 	            try{
			// 	            	document.posdeluxe.CancelDeviceTransaction();
			// 	            }catch(e){}
			 				/*//document.posdeluxe.StartCapture('ctpnum.k3z','313','37');*/
			// 	            IngenicoLibraryWS.displayClearEntryForm(document.posdeluxe, ingenicoLanguagePref, 'P_NUMBER', '313', '37',ingenicoVersion,true);
			// 			}
			// 		}
			// 		catch(e) {
			// 		}
			// 	}
				
			// }
	  }
	 }catch(e){}
		ingenicoLanForEmployee = true;
}

function acceptPNumber(userData) {

	if(sessionStorage.getItem("isWebSocketConnected")=="true"){
		// document.theForm.Pnumber.value = userData;
	}else{
		// document.theForm.Pnumber.value = document.posdeluxe.Buffer;
	}
	// document.theForm.Pnumber.style.backgroundColor = '#FFFFFF';
	// enableEmpSearchButton();	
	// document.theForm.lastFourSSN.focus();
	// document.theForm.lastFourSSN.click();
}

function StartCaptureFEIN() {
	if (deviceEnabled) {
		try {
				captureField = 'fein';
				
				if(accountType=="B"){
					// document.theForm.fein.style.backgroundColor = '#ADD8E6';
					//ssnField = document.theForm.fein;
					if(sessionStorage.getItem("isWebSocketConnected")=="true"){
						// IngenicoLibraryWS.displayClearEntryForm(null, ingenicoLanguagePref, 'FEIN', '312', '34',ingenicoVersion,false);
						// The displayClearEntryForm function has 4 parameters but try to call with 7 parameters
					}
					else{

						if(isIngenicoNFCEnabled != null && isIngenicoNFCEnabled){
							try{
								// document.posdeluxe.CancelDeviceTransaction();
							}catch(e){}
							// document.posdeluxe.StartCapture('uctfein.icg','Capture FEIN', '%m9%M9%dl%p*%o   %f-%o  %f-%o    '); 	// this is added for PG new phone image for device i6780 for PG fein feild
						}
						else{
							try{
								// document.posdeluxe.CancelDeviceTransaction();
							}catch(e){}
							// IngenicoLibraryWS.displayClearEntryForm(document.posdeluxe, ingenicoLanguagePref, 'FEIN', '312', '34',ingenicoVersion,true);
							// The displayClearEntryForm function has 4 parameters but try to call with 7 parameters
						}

					}
				}
			}
			catch(e) {
			}
		}
}

function acceptFEIN(userData) {
	if(sessionStorage.getItem("isWebSocketConnected")=="true"){
		// document.theForm.fein.value = userData;
	}else{
		// document.theForm.fein.value = document.posdeluxe.Buffer;
	}
	
	// document.theForm.feinconfirm.value = document.theForm.fein.value;
	// document.theForm.fein.style.backgroundColor = '#FFFFFF';
	editPrimaryPhoneNumber();
}

function editPrimaryPhoneNumber() {
	captureField = 'primaryContact';
	if(accountType=="B"){
		try{
			// if (document.theForm.businessPhone.value != null && document.theForm.businessPhone.value != '') {
			// 	try{
			// 		if(sessionStorage.getItem("isWebSocketConnected")=="true"){
			// 			IngenicoLibraryWS.verifyPhone(null,ingenicoLanguagePref,document.theForm.businessPhone.value,false);
			// 			//document.posdeluxe.DisplayPhoneNumber('Is the previously entered Primary Contact Number correct?');
			// 		}else{
			// 			IngenicoLibraryWS.verifyPhone(document.posdeluxe,ingenicoLanguagePref,document.theForm.businessPhone.value,true);
			// 		}
			// 	}catch(e){}

			// }
			// else {
			// 	document.theForm.businessPhone.focus();
			// 	document.theForm.businessPhone.click();
			// }
		}catch(e){}
	}
}

function StartCapturePrimaryPhoneNumber() {
	if (deviceEnabled) {
		// if (document.posdeluxe.device != null && document.posdeluxe.device == 1) {
		// 	typeField = 'phone';
		// 	 check('Please enter your Primary Contact Number:');
		// 	numpad_change();
		// }
		// else {
		// 	try {

		// 		document.theForm.businessPhone.style.backgroundColor = '#ADD8E6';

		// 		captureField = 'primaryContact';
		// 		if(sessionStorage.getItem("isWebSocketConnected")=="true"){
		// 			IngenicoLibraryWS.displayClearEntryForm(null, ingenicoLanguagePref, 'PRIMARY_PHONE', '310', '7',ingenicoVersion,false);
		// 		}else{
		// 			if(isIngenicoNFCEnabled != null && isIngenicoNFCEnabled){
		// 	            try{
		// 	            	document.posdeluxe.CancelDeviceTransaction();
		// 	            }catch(e){}
		// 				document.posdeluxe.StartCapturePhoneNumber('Please enter your Primary Contact Number & Press Next when complete:');}
						 
		// 			else{
		// 	            try{
		// 	            	document.posdeluxe.CancelDeviceTransaction();
		// 	            }catch(e){}
		// 				document.posdeluxe.StartCapture('ctphone.k3z','222','7');
		// 	            IngenicoLibraryWS.displayClearEntryForm(document.posdeluxe, ingenicoLanguagePref, 'PRIMARY_PHONE', '310', '7',ingenicoVersion,true);
		// 			}
		// 		}
		// 	}
		// 	catch(e) {
		// 	}
		// }
	}
}

function acceptPrimacryContactPhone(userData) {
	try{
		if(accountType=="B"){
			if(sessionStorage.getItem("isWebSocketConnected")=="true"){
					// document.theForm.businessPhone.value = userData;
			}else{
				if(isIngenicoNFCEnabled != null && isIngenicoNFCEnabled){
					// document.theForm.businessPhone.value = document.posdeluxe.PhoneNumber;
				}
				else{
					// if(document.theForm.businessPhone.value==null || document.theForm.businessPhone.value== ''){
					// 	document.theForm.businessPhone.value = document.posdeluxe.Buffer;
					// }
				}
			}
			// document.theForm.businessPhone.style.backgroundColor = '#FFFFFF';
			StartCapturePIN();
			
		}
	}catch(e){}
}

function processCancelEvent(){

	try{
		if (captureField == 'CreditMsg') {
			// if($("input[name='creditCheckAuthorized']:checked").val() == "yes"){
			// 	document.theForm.ssn.value="";
			// 	document.theForm.ssnconfirm.value="";
			// }

			// $("#creditCheckNo").attr('checked',true);
			// showDeclineCreditModal('no');
			if(!(accountType == 'B')){
				captureField = 'phone';
				// document.theForm.homePhone.click();
			}else{
				deHighlightFields();
				/*
				// disableButton($('#creditCheckForm'));
				// creditCheckFormState(false,'creditCheckNo'); 
				*/
			}

			/*		captureField = 'pin';
		document.theForm.pin.click();*/
		}
		else if (captureField == 'DL') {
			// document.theForm.firstName.focus();
			// document.theForm.firstName.click();
		}
		else if (captureField == 'ssn') {
			captureField = 'CreditMsg';
			showCreditPolicy();
		}
		else if (captureField == 'phone') {
			if(!(accountType == 'B')){
				// if($("input[name='creditCheckAuthorized']:checked").val() == "yes"){
				// 	captureField = 'ssn';
				// 	editSSN();
				// }
				// else {
				// 	captureField = 'CreditMsg';
				// 	showCreditPolicy();
				// }
			}else{
				// document.theForm.businessPhone.value="";
				// document.theForm.businessPhone.style.backgroundColor = '#FFFFFF';
				// document.theForm.emailBusinessCreditPage.focus();
				// document.theForm.emailBusinessCreditPage.click();

			}

		}
		else if (captureField == 'pin') {
			if(!(accountType=="B")){
				captureField = 'phone';
				// document.posdeluxe.DisplayPhoneNumber('Is the previously entered Primary Contact Number correct?');
			}else{
				// document.theForm.emailCreditPage.focus();
				// document.theForm.emailCreditPage.click();
			}

		}
		else if (captureField == 'email') {
			// document.theForm.customerEmailId.blur();
			// document.posdeluxe.DisplayThankYou();
			// document.theForm.numServReq.focus();
			// document.theForm.numServReq.click();
			// document.theForm.emailCreditPage.style.backgroundColor = '#FFFFFF';
		}
		else if (captureField == 'fein') {
			// top.middle.document.theForm.fein.value="";
			// document.theForm.feinconfirm.value="";
			// document.theForm.fein.style.backgroundColor = '#FFFFFF';
			// document.theForm.fein.style.backgroundColor = '#FFFFFF';

		}
		else if (captureField == 'primaryContact') {
			// document.theForm.pin.focus();
			// document.theForm.pin.click();

		}
		else if (captureField == 'emailCreditPage') {
			// document.theForm.emailCreditPage.value="";
			// document.theForm.emailCreditPage.style.backgroundColor = '#FFFFFF';
		}
		else if(captureField == 'emailBusinessCreditPage'){
			// document.theForm.emailBusinessCreditPage.value="";
			// document.theForm.emailBusinessCreditPage.style.backgroundColor = '#FFFFFF';
		}
	}catch(e){}
}

function processBackEvent() {
	try{
		var captureField;
		if (captureField == 'phone') {
			// if($("input[name='creditCheckAuthorized']:checked").val() == "yes") {
			// 	captureField = 'ssn';
			// 	editSSN();
			// }
			// else {
			// 	captureField = 'CreditMsg';
			// 	showCreditPolicy();
			// }
		}
		else if (captureField == 'pin') {
			captureField = 'phone';
			// document.posdeluxe.DisplayPhoneNumber('Is the previously entered Primary Contact Number correct?');
		}
		else if (captureField == 'emailCreditPage' || captureField == 'emailBusinessCreditPage') {
			captureField = 'pin';
			// document.posdeluxe.DisplayPIN('Is the previously entered PIN Number correct?');
		}
		else if (captureField == 'ssn') {
			captureField = 'CreditMsg';
			showCreditPolicy();
		}
	}catch(e){}
}


function StartCaptureMobileNumber() {
	if (deviceEnabled) {
		// if (document.posdeluxe!= null && document.posdeluxe.device != null && document.posdeluxe.device == 1) {
		// 	typeField = 'phone';
		// 	check('Please enter your Mobile Number:');
		// 	numpad_change();
		// }
		// else {
		// 	try {

		// 		document.theForm.mobilePhone.style.backgroundColor = '#ADD8E6';

		// 		captureField = 'mobile';

		// 		if(isIngenicoNFCEnabled != null && isIngenicoNFCEnabled){
		//             try{
		//             	document.posdeluxe.CancelDeviceTransaction();
		//             }catch(e){}
		// 			document.posdeluxe.StartCapturePhoneNumber('Please enter your Primary Contact Number & Press Next when complete:');}

		// 		else{
		// 			if(sessionStorage.getItem("isWebSocketConnected")=="true"){
		// 				IngenicoLibraryWS.displayClearEntryForm(null, ingenicoLanguagePref, 'PRIMARY_PHONE', '310', '7',ingenicoVersion,false);
		// 			}else{
		// 				try{
		// 	            	document.posdeluxe.CancelDeviceTransaction();
		// 	            }catch(e){}
		// 				document.posdeluxe.StartCapture('ctphone.k3z','222','7');
		// 				IngenicoLibraryWS.displayClearEntryForm(document.posdeluxe, ingenicoLanguagePref, 'PRIMARY_PHONE', '310', '7',ingenicoVersion,true);
		// 			}
		// 		}
		// 	}
		// 	catch(e) {
		// 	}
		// }
	}
}

function acceptMobileNumber(userData){
	if (accountType == 'B') {
		if (captureField == 'mobile') {
			if(sessionStorage.getItem("isWebSocketConnected")=="true"){
				// document.theForm.mobilePhone.value = userData;
			}else{
				if (isIngenicoNFCEnabled != null && isIngenicoNFCEnabled) {
					// document.theForm.mobilePhone.value = document.posdeluxe.PhoneNumber;
				} else {
					// document.theForm.mobilePhone.value = document.posdeluxe.Buffer;
				}
			}
			// document.theForm.mobilePhone.style.backgroundColor = '#FFFFFF';
			// enableCreditCheckButton();
			// document.theForm.BworkPhone.focus();
			// document.theForm.BworkPhone.click();
		}
	}
}

function StartCaptureWorkNumber() {
	if (deviceEnabled) {
		// if (document.posdeluxe!=null && document.posdeluxe.device != null && document.posdeluxe.device == 1) {
		// 	typeField = 'phone';
		// 	check('Please enter your Mobile Number:');
		// 	numpad_change();
		// }
		// else {
		// 	try {

		// 		document.theForm.BworkPhone.style.backgroundColor = '#ADD8E6';

		// 		captureField = 'workPhone';

		// 		if(isIngenicoNFCEnabled != null && isIngenicoNFCEnabled){
		//             try{
		//             	document.posdeluxe.CancelDeviceTransaction();
		//             }catch(e){}
		// 			document.posdeluxe.StartCapturePhoneNumber('Please enter your Primary Contact Number & Press Next when complete:');
		// 		}

		// 		else{
		// 			if(sessionStorage.getItem("isWebSocketConnected")=="true"){
		// 				IngenicoLibraryWS.displayClearEntryForm(null, ingenicoLanguagePref, 'PRIMARY_PHONE', '310', '7',ingenicoVersion,false);
		// 			}else{
		// 	            try{
		// 	            	document.posdeluxe.CancelDeviceTransaction();
		// 	            }catch(e){}
		// 				/*//document.posdeluxe.StartCapture('ctphone.k3z','222','7');*/
		// 				IngenicoLibraryWS.displayClearEntryForm(document.posdeluxe, ingenicoLanguagePref, 'PRIMARY_PHONE', '310', '7',ingenicoVersion,true);
		// 			}
		// 		}
		// 	}
		// 	catch(e) {
		// 	}
		// }
	}
}

function acceptWorkNumber(userData){
	if (accountType == 'B') {
		if (captureField == 'workPhone') {
			if(sessionStorage.getItem("isWebSocketConnected")=="true"){
				// document.theForm.BworkPhone.value = userData;
			}else{
				if (isIngenicoNFCEnabled != null && isIngenicoNFCEnabled) {
					// document.theForm.BworkPhone.value = document.posdeluxe.PhoneNumber;
				} else {
					// document.theForm.BworkPhone.value = document.posdeluxe.Buffer;
				}
			}
			// document.theForm.BworkPhone.style.backgroundColor = '#FFFFFF';
		}
		pg = true;
		// document.theForm.emailCreditPage.focus();
		// document.theForm.emailCreditPage.style.backgroundColor = '#ADD8E6';
		// document.theForm.emailCreditPage.click();
		/*//document.posdeluxe.DisplayThankYou();*/
	}
}