/*To Do: 
	-Split map initialization and polygon controls into two parts

*/

function GoogleMapsManager() {
	//Initialise Google Maps
	//
	var me = this;
	var mapOptions = {
		center: new google.maps.LatLng(lat, lon),
		zoom: 12,
		disableDefaultUI: true,
		zoomControl: true,
		panControl: true,
		drawingControl: true,
		drawingControlOptions: {
			position: google.maps.ControlPosition.TOP_RIGHT,
			drawingModes: [
				google.maps.drawing.OverlayType.POLYGON
			]
		},
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL
		}
	}

	me.myGoogleMap = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

};

