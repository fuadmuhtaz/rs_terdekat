define([
	'fastclick',
	'jquery',
	'underscore',
	'backbone',
	'./module/CheckConnection',
	'./module/Geolocation'
	],
	function(FastClick, $, _, Backbone, CheckConnection, Geolocation){
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
				}
			}
		});
		return App;
	}
);