define([
	'fastclick',
	'jquery',
	'underscore',
	'backbone',
	'./module/CheckConnection',
	'./module/Geolocation',
	'./module/Hospital',
	'./module/TableView',
	'./module/Direction',
	'./module/ControlPanel',
	'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyCJxGctxoRVUin3pBg2jLEpKxzYGnFI14M&language=id&libraries=geometry,places'
	],
	function(FastClick, $, _, Backbone, CheckConnection, Geolocation, ListHospital, TableView, Direction, ControlPanel){
		var App = Backbone.Router.extend({
			initialize: function(){
				var self = this;
				document.addEventListener("deviceready", self.onDeviceReady, false);
			},

			routes: {
				"" : "table",
				":id" : "direction"
			},
			
			onDeviceReady: function(){
				FastClick.attach(document.body);
				var myConnection = new CheckConnection();
				ActivityIndicator.show("Mencari Rumah Sakit");
				if(myConnection.check() == 1){
					var myLocation = new Geolocation();
					var listHospital = new ListHospital();
					var tableView = new TableView({collection: listHospital});
					var direction = new Direction({model: myLocation, collection: listHospital});
					var controlPanel = new ControlPanel();
					Backbone.history.start();
				}
			},

			table: function(){
				$('.content').show();
				$('#control-panel').hide();
				$('#directions-panel').hide();
				$('#map-canvas').hide();
				google.maps.event.trigger(map, 'resize');
				Backbone.trigger("AppToHos");
			},

			direction: function(id){
				ActivityIndicator.show("Mencari rute");
				$('.content').css('z-index', 99);
				$('#control-panel').show();
				$('#ShowDirection').show();
				$('#ShowMap').hide();
				$('#directions-panel').hide();
				$('#map-canvas').show();
				google.maps.event.trigger(map, 'resize');
				Backbone.trigger("direction", id);
			}
		});
		return App;
	}
);