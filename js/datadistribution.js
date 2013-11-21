var lon = -123.114166;
var lat = 49.264549;

$(document).ready(function() {
	dataDistGoogle.init();
});


var dataDistGoogle = {
	host : "bd-lkdesktop",
	token : "33cf72bf28dc152be059e813539d3514cc21253e",
	repository : 'Demos', 
	workspaceName : 'DataDownloadService',

	init : function() {

		googleMapsManager = new GoogleMapsManager();
		polygonControl = new PolygonDrawTools(googleMapsManager.myGoogleMap);
		myFMEServer = new FMEServer(this.host, this.token);

		//set up parameters on page
		myFMEServer.getParams(this.repository, this.workspaceName, this.buildParams);

		$('#geom').change(function(){
        	dataDistGoogle.updateQuery();
    	})
	},

	//set parameter list in webpage
	buildParams : function(json){
		//parse JSON response
		//add in drop down menu options from workspace
		//==================================================
		//==================================================
		//TODO: Check for error in response
		//==================================================
		//==================================================
		var paramArray = json.parameter;
		var test = $('#fmeForm');
		var parameters = $('<div id="parameters" />');

		for (var i = 0; i < paramArray.length; i++){
			//populate drop-down options for choice-type parameters

			if (paramArray[i].type == 'LOOKUP_CHOICE'){
				//populate drop-down options on page
				var section = $('<div />');
				var title = paramArray[i].description + ':';
				var select = $('<select name=' + paramArray[i].name +'/>');
				var optionArray = paramArray[i].options.option;
				for (var x = 0; x < optionArray.length; x++){
					var option = $('<option />', {value: optionArray[x].value, text: optionArray[x].displayAlias});
					//$('#' + paramArray[i].name).append(option);
					select.append(option);
				}
				section.append(title);
				section.append(select);
				parameters.append(section);
			};
			//LISTBOX_ENCODED
			if(paramArray[i].type == 'LISTBOX_ENCODED'){
				var section = $('<div />');
				var title = paramArray[i].description + ':';
				var checkBoxes = $('<div id="' + paramArray[i].name + '" />');
				var optionArray = paramArray[i].options.option;
				for (var x = 0; x < optionArray.length; x++){
					var box = $('<input type="checkbox" value="'+ optionArray[x].value + '" name="' + paramArray[i].name +'">' + optionArray[x].value + '</>');
					checkBoxes.append(box);
					checkBoxes.append($('<br/>'));
				}
				section.append(title);
				section.append(checkBoxes);
				parameters.append(section);
			}
		}  
		parameters.insertBefore('#submit');

	},

	buildURL : function(formInfo){
		var str = '';
		str = 'http://' + this.host + '/' + this.repository + '/' + this.workspaceName + '.fmw?'
		var elem = formInfo[0];
		for(var i = 0; i < elem.length; i++) {
			if(elem[i].type !== 'submit') {

				if(elem[i].type === "checkbox" && elem[i].checked) {
					str += elem[i].name + "=" + elem[i].value + "&";
				} else if(elem[i].type !== "checkbox") {
					str += elem[i].name + "=" + elem[i].value + "&";
				}
			}
		}
		return str;
	},
	

	//update query panel
	updateQuery : function(){
		var queryStr = this.buildURL($('#fmeForm'));
		$('#query-panel-results').text(queryStr);		
	},

	//display translation results
	displayResult : function(result){
		var resultText = result.serviceResponse.fmeTransformationResult.fmeEngineResponse.statusMessage;
		var resultUrl = '';
		var resultDiv = $('<div />');

		if(result.serviceResponse.statusInfo.status == 'success'){
			resultUrl = result.serviceResponse.url;
			resultDiv.append($('<h2>' + resultText + '</h2>'));
			resultDiv.append($('<a href="' + resultUrl + '">' + 'Download Data </a>'));
		}
		else{
			resultDiv.append($('<h2>There was an error processing your request</h2>'));
			resultDiv.append($('<h2>' + resultText + '</h2>'));
		}

		$('#results').html(resultDiv);
	},
	
	//order data
	orderData : function(formInfo){
		var params = '';
		var elem = formInfo.elements;
		for(var i = 0; i < elem.length; i++) {
			if(elem[i].type !== 'submit') {

				if(elem[i].type === "checkbox" && elem[i].checked) {
					params += elem[i].name + "=" + elem[i].value + "&";
				} else if(elem[i].type !== "checkbox") {
					params += elem[i].name + "=" + elem[i].value + "&";
				}
			}
		};

		myFMEServer.runDataDownload(this.repository, this.workspaceName, params, this.displayResult);
		
		return false;
	}


}