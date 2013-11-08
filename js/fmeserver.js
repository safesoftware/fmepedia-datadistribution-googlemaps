
function FMEServer(svrHost, token, svrPort, isSSL) {

	this.svrHost = svrHost;
	this.token =token;
	this.svrPort = svrPort || '80';
	this.isSSL = isSSL || false;


	this.getParams = getParams;
	function getParams(repository, wrkspName){
		var url = svrHost + '/fmerest/repositories/' + repository + '/' + wrkspName + '/parameters.json?token=' + token;
		var params = null;

		$.ajax({
			url: url, 
			async: false, 
			dataType: 'json',
			success: function(json){
				params = json;
			}
		})
		return params;
	}

	//gets the current session id from FME Server
	//can use this to get the path to any files added through
	//the file upload service	
	this.getSessionID = getSessionID;
	function getSessionID(wrkspPath){
		//returns null if there is an error
		var url = svrHost + '/fmedataupload/' + wrkspPath + '?opt_extractarchive=false&opt_pathlevel=3&opt_fullpath=true';
		var sessionID = null;
		
		$.ajax({
			url: url, 
			async: false, 
			dataType: 'json', 
			success: function(json){
				sessionID = json.serviceResponse.session;
			}
		});

		return sessionID;
	}

	/** Returns a WebSocket connection object to the specified server
      *
      *
      */
    this.getWebSocketConnection = getWebSocketConnection;
    function getWebSocketConnection(stream_id) {
            var wsConn = new WebSocket("ws://" + svrHost + ":7078/websocket");
            wsConn.onopen = function() {
                    var openMsg = {
                            ws_op : 'open',
                            ws_stream_id : stream_id
                    }
            wsConn.send(JSON.stringify(openMsg));
            };
            return wsConn;
    }

    this.runDataDownload = runDataDownload;
    function runDataDownload(repository, wrkspName, params){

    	//params = params + 'GEOM=<lt>?xml<space>version=<quote>1.0<quote><space>encoding=<quote>US_ASCII<quote><space>standalone=<quote>no<quote><space>?<gt><lt>geometry<gt><lt>polygon<gt><lt>line<gt><lt>coord<space>x=<quote>-124<quote><space>y=<quote>48<quote><solidus><gt><lt>coord<space>x=<quote>-124<quote><space>y=<quote>49.399999999999999<quote><solidus><gt><lt>coord<space>x=<quote>-122<quote><space>y=<quote>49.5<quote><solidus><gt><lt>coord<space>x=<quote>-122<quote><space>y=<quote>48<quote><solidus><gt><lt>coord<space>x=<quote>-124<quote><space>y=<quote>48<quote><solidus><gt><lt><solidus>line<gt><lt><solidus>polygon<gt><lt><solidus>geometry<gt>';
    	//params = encodeURI(params);
    	var url = svrHost + '/fmedatadownload/' + repository + '/' + wrkspName + '.fmw?' + params;

		$.ajax({
			url: url, 
			async: false, 
			dataType: 'json',
			success: function(json){
				result = json;
			},
			error: function(failure){
				result = failure.responseJSON;
			}
		})
		return result;
                	
    }

}