export class Ingenicoresourceshas{
	constructor(){
		
	}
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
}