

$(document).ready(function() {
	dataDistGoogle.init();
});


var dataDistGoogle = {
	lon : -123.114166,
	lat : 49.264549,

	init : function() {

		googleMapsManager = new GoogleMapsManager();
		polygonControl = new PolygonDrawTools(googleMapsManager);
		fmeserver.connectToServer("localhost", "8d1319ba2f5eed6844b17892259253d3e5c9a257");
	}


	//get parameters from workspace
	

	//update query panel
	
	//display translation results
	
	//order data

}