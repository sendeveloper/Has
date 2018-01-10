import { Ingenicolibrarylegacy } from './ingenicolibrarylegacy';

export class Idparser extends Ingenicolibrarylegacy{
	constructor(){

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
}