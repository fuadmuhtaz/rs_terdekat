define([
	'underscore',
	'backbone'
	],
	function(_, Backbone){
		var Hospital = Backbone.Model.extend();

		var ListHospital = Backbone.Collection.extend({
			initialize: function(){
				this.retry = 0;
				this.location;
				this.listenTo(Backbone, 'GeoToHos', this.getHospital);
				this.listenTo(Backbone, 'AppToHos', this.getHospital);
			},

			model: Hospital,

			getHospital: function(myLocation){
				var self = this;
				this.location = myLocation;
				var myPosition = new google.maps.LatLng(myLocation.get('lat'), myLocation.get('lng'));
				var map = new google.maps.Map(document.getElementById('map-canvas'), {
					center: myPosition,
					zoom: 15,
					disableDefaultUI: true
				});
				var searchHospital = new google.maps.places.PlacesService(map);
				window.map = map;

				function listHospital(results, status){
					if(status == google.maps.places.PlacesServiceStatus.OK){
						var listHopital = [];
						for(var i=0; i<results.length; i++){
							var distance = google.maps.geometry.spherical.computeDistanceBetween(myPosition, results[i].geometry.location);
							if(distance > 1000){
								distance = distance/1000;
								distance = distance.toFixed(1)+" km";
							}
							else
								distance = distance.toFixed(0)+" m";

							listHopital[listHopital.length] = new Hospital({
								identifier: i,
								distance: distance,
								geometry: results[i].geometry.location,
								name : results[i].name,
								vicinity: results[i].vicinity
							});
						}
						self.add(listHopital);	
						Backbone.trigger('HosToTab');
						Backbone.trigger('HosToDir');
						ActivityIndicator.hide();
					}
					else{
						navigator.notification.alert("Terjadi masalah dengan koneksi", function(){
							navigator.app.exitApp();
						});
					}
				};

				searchHospital.nearbySearch(
					{location: myPosition, types: ['hospital'], rankBy: google.maps.places.RankBy.DISTANCE},
					listHospital
				);
			}
		});
		return ListHospital;
	}
);