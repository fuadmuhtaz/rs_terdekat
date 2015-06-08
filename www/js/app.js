define([
	'fastclick',
	'jquery',
	'underscore',
	'backbone',
	'./module/CheckConnection'
	],
	function(FastClick, $, _, Backbone, CheckConnection){
		var App = Backbone.Router.extend({
			initialize: function(){
				var self = this;
				document.addEventListener("deviceready", self.onDeviceReady, false);
			},

			onDeviceReady: function(){
				FastClick.attach(document.body);
				var myConnection = new CheckConnection();
				if(myConnection.check() == 1){
					navigator.notification.alert("Online", function(){});
				}
			}
		});
		return App;
	}
);