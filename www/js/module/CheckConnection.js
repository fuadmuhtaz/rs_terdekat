define(
	function(){
		var CheckConnection = function(){
			this.check = function(){
				if(navigator.connection.type == Connection.NONE){
					navigator.notification.alert("Tidak ada koneksi internet", function(){});
					return 0;
				}
				return 1;
			}
		}
		return CheckConnection;
	}
);