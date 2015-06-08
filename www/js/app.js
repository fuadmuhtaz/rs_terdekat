define([
	'fastclick',
	'jquery',
	'underscore',
	'backbone',
	'./module/CheckConnection',
	'./module/Geolocation',
	'./module/Hospital'
	],
	function(FastClick, $, _, Backbone, CheckConnection, Geolocation, ListHospital){
		var App = Backbone.Router.extend({
			initialize: function(){
				var self = this;
				document.addEventListener("deviceready", self.onDeviceReady, false);
			},

			onDeviceReady: function(){
				FastClick.attach(document.body);
				var myConnection = new CheckConnection();
				if(myConnection.check() == 1){
					var myLocation = new Geolocation();
					var listHospital = new ListHospital();
					window.myLocation = myLocation;
					window.listHospital = listHospital;
					Backbone.history.start();
				}
			}
		});
		return App;
	}
);