define([
	'underscore',
	'backbone'
	],
	function(_, Backbone){
		var Hospital = Backbone.Model.extend();

		var ListHospital = Backbone.Collection.extend({
			initialize: function(){
				this.listenTo(Backbone, 'GeoToHos', this.getHospital);
			},

			model: Hospital,

			getHospital: function(myLocation){
				var self = this;
				var myPosition = new google.maps.LatLng(myLocation.get('lat'), myLocation.get('lng'));
				var map = new google.maps.Map(document.getElementById('map-canvas'), {
					center: myPosition,
					zoom: 15
				});
				var searchHospital = new google.maps.places.PlacesService(map);
				window.map = map;
				function listHospital(results, status){
					if(status == google.maps.places.PlacesServiceStatus.OK){
						var listHopital = [];
						for(var i=0; i<results.length; i++){
							listHopital[listHopital.length] = new Hospital({
								_id: results[i].places_id,
								geometry: results[i].geometry.location,
								name : results[i].name,
								vicinity: results[i].vicinity
							});
						}
						self.add(listHopital);	
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