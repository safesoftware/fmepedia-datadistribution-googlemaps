var lon = -123.114166;
var lat = 49.264549;
var googleMapsManager;;

function initialize() {

		googleMapsManager = new GoogleMapsManager();

		polygonControl = new PolygonDrawTools(googleMapsManager);
}
