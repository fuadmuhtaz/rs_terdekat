define([
	'fastclick',
	'jquery',
	'underscore',
	'backbone',
	'./module/CheckConnection',
	'./module/Geolocation',
	'./module/Hospital',
	'./module/TableView'
	],
	function(FastClick, $, _, Backbone, CheckConnection, Geolocation, ListHospital, TableView){
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
					var tableView = new TableView({collection: listHospital});
					window.myLocation = myLocation;
					window.listHospital = listHospital;
					window.tableView = tableView;
					Backbone.history.start();
				}
			}
		});
		return App;
	}
);