var FMEServerRequests = {
	svrHost : '',
	token : '',

	connectToServer : function(svrHost, token){
		this.svrHost = svrHost;
		this.token = token;
	}, 

	getParams : function(repository, wrkspname){
		var url = this.svrHost + '/fmerest/repositories/' + repository + '/' + wrkspName + '/parameters.json?token=' + this.token;
		var parms = null;

		$.ajax({
			url: url, 
			async: false, 
			dataType: 'json',
			success: function(json){
				params = json;
			}
		})
		return params;
	},

	orderData : function (something){

	}
}