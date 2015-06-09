define([
	'jquery',
	'underscore',
	'backbone'
	],
	function($, _, Backbone){
		var Direction = Backbone.View.extend({
			initialize: function(){
				this.listenToOnce(Backbone, 'HosToDir', this.serviceInit);
				this.listenTo(Backbone, 'direction', this.getDirection);
			},

			serviceInit: function(){
					var directionsDisplay = new google.maps.DirectionsRenderer();
					directionsDisplay.setMap(map);
					var directionsService = new google.maps.DirectionsService();
					window.directionsDisplay = directionsDisplay;
					window.directionsService = directionsService;
			},

			getDirection: function(id){
				var myPosition = new google.maps.LatLng(this.model.get('lat'), this.model.get('lng'));
				var selectHospital = this.collection.at(id).get('geometry');
				var request = {
					origin: myPosition,
					destination: selectHospital,
					travelMode: google.maps.TravelMode.DRIVING
				};
				directionsService.route(request, function(result, status) {
					if (status == google.maps.DirectionsStatus.OK){
						directionsDisplay.setDirections(result);
						setTimeout(function(){
							$('.content').css('z-index', 0);
							$('.content').hide();
							ActivityIndicator.hide();
						}, 3000);
					}
				});
			}
		});
		return Direction;
	}
);