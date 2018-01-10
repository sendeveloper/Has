import { Shortcut } from './shortcut';

var shortcut = new Shortcut();

export var TRNDataFunction = function(trnNumber) {};
export var unknownBarcodeFunction = function(barcode) {}

export var SymbolPDF417 = new function(){
	
	this.addScanTarget = function()
	{
		var scanTarget = document.createElement("textarea");
		scanTarget.id = "scan_target";
		scanTarget.style.height = "0px";
		scanTarget.style.width = "0px";
		scanTarget.style.padding = "0px";
		scanTarget.style.border = "0px";
		scanTarget.style.outline = "none";
		scanTarget.style.resize = "none";
		scanTarget.style.overflow = "hidden";
		scanTarget.style.position = "absolute";

		document.body.appendChild(scanTarget);
		  
		shortcut.add("Ctrl+F",function() {
			scanTarget.focus();
		},{
			'type':'keydown',
			'propagate':false,
			'target':document
		});

		shortcut.add("Ctrl+J",function() {
			var data = scanTarget.value;
			if(data.match(/^TRN-/)) {
				TRNDataFunction(data);
			} else if (typeof this.IDParser !== "undefined") {
				if(data.match(this.IDParser.LICENSE_REGEX)) {
			  		HandleDLData(this.IDParser.processId(data));
				} else {
					unknownBarcodeFunction(data);
				}
			} else {
				unknownBarcodeFunction(data);
			}
			scanTarget.value = "";
		},{ 'type':'keydown',
			'propagate':false,
			'target':document
		});
	}
	
	this.removeScanTarget = function()
	{
	  var node = document.getElementById("scan_target");
	  if(node !== null) {
		 document.body.removeChild(node);
		 shortcut.remove("Ctrl+F");
		 shortcut.remove("Ctrl+J");
	  }
	}
	
	this.version = '0.0.1';
}
Object.freeze(SymbolPDF417);

export var HandleDLData = function(ido) {}