function PolygonDrawTools(myGoogleMap){
    var me = this;

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

        var xml = me.getPolygonCoordsXML();
        $('#geom').attr('value', xml);
        $('#geom').change();
    })


};

PolygonDrawTools.prototype.drawPolygon = function(){
    var me = this;
    if(me.myPolygon){
        me.myPolygon.setMap(null);
    }
    me.drawManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
};

PolygonDrawTools.prototype.clearPolygon = function(){
    var me = this;
    me.myPolygon.setMap(null);
    me.myPolygon = null;
    $('#geom').attr('value', "");
    $('#geom').change();
};

PolygonDrawTools.prototype.getPolygonCoords = function(){
    var me = this;
    var vertices = me.myPolygon.getPath();
    var vertList = "";
    for(var i=0; i<vertices.getLength(); i++){
        var xy = vertices.getAt(i);
        vertList += " " + xy;
    }

    alert(vertList);
};

PolygonDrawTools.prototype.polyIsComplete = function(){
    var me = this;
    if (me.myPolygon){
        return true;
    }
    else {
        return false;
    }
};

PolygonDrawTools.prototype.getPolygonCoordsXML = function(){
    var me = this;
    if (me.polyIsComplete){
        var header = '<lt>?xml<space>version=<quote>1.0<quote><space>encoding=<quote>US_ASCII<quote><space>standalone=<quote>no<quote><space>?<gt><lt>geometry<gt><lt>polygon<gt><lt>line<gt>';
        var footer = '<lt><solidus>line<gt><lt><solidus>polygon<gt><lt><solidus>geometry<gt>';

        var XMLString = header;

        var vertices = me.myPolygon.getPath();
        for(var i=0; i<vertices.getLength(); i++){
            var lat = vertices.getAt(i).lat();
            var lng = vertices.getAt(i).lng();
            XMLString += "<lt>coord<space>x=<quote>" + lng + "<quote><space>y=<quote>" + lat + "<quote><solidus><gt>";
        }
        XMLString += footer;
        return XMLString;
   }
   else{
    return "";
   }
    
}