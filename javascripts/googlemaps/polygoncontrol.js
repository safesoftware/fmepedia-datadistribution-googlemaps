function PolygonDrawTools(myGoogleMap){

        me.drawManager = new google.maps.drawing.DrawingManager({
        drawingControl: false,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT, 
            drawingModes: [
                google.maps.drawing.OverlayType.POLYGON
            ]
        },
        polygonOptions:{
            editable: true,
            strokeColor: '#505050'
            /*fillColor: '#D8F781',
            strokeOpacity:,
            strokeWeight:*/
        }
    });

    me.drawManager.setMap(myGoogleMap);
    me.PolyListener = google.maps.event.addListener(me.drawManager, 'polygoncomplete', function(e){
        me.myPolygon = e;
        me.drawManager.setDrawingMode(null);
    })
};
}

GoogleMapsManager.prototype.drawPolygon = function(){
    var me = this;
    if(me.myPolygon){
        me.myPolygon.setMap(null);
    }
    me.drawManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
};

GoogleMapsManager.prototype.clearPolygon = function(){
    var me = this;
    me.myPolygon.setMap(null);
}

GoogleMapsManager.prototype.getPolygonCoords = function(){
    var me = this;
    var vertices = me.myPolygon.getPath();
    var vertList = "";
    for(var i=0; i<vertices.getLength(); i++){
        var xy = vertices.getAt(i);
        vertList += " " + xy;
    }

    alert(vertList);
}