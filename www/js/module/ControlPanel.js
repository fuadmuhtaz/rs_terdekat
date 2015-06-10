define([
	'jquery',
	'underscore',
	'backbone'
	],
	function($, _, Backbone){
		var ControlPanel = Backbone.View.extend({
			el: '#control-panel',
			events: {
				'click #ShowDirection' : 'showDirection',
				'click #ShowMap' : 'showMap'
			},

			showDirection: function(){
				$('.content').hide();
				$('#control-panel').show();
				$('#ShowDirection').hide();
				$('#ShowMap').show();
				$('#directions-panel').show();
				$('#map-canvas').hide();
				google.maps.event.trigger(map, 'resize');
			},

			showMap: function(){
				$('.content').hide();
				$('#control-panel').show();
				$('#ShowDirection').show();
				$('#ShowMap').hide();
				$('#map-canvas').show();
				google.maps.event.trigger(map, 'resize');
				ActivityIndicator.show();
				this.setLeg(_.values(directionsDisplay.selectedLegStep));
				$('#directions-panel').hide();
			},

			setLeg: function(leg){
				if(leg.length == 0){
					setTimeout(function(){
						ActivityIndicator.hide();	
					}, 2000);
				}
				else if(_.contains(leg, undefined)){
					if(leg[0] == 0)
						map.panTo(directionsDisplay.directions.request.origin);
					else
						map.panTo(directionsDisplay.directions.request.destination);
					setTimeout(function(){
						ActivityIndicator.hide();	
					}, 2500);
				}
				else{
					if(leg[0] == 0)
						leg = leg[1];
					else
						leg = leg[0];
					map.panTo(directionsDisplay.directions.routes[0].legs[0].steps[leg].start_location);
					setTimeout(function(){
						ActivityIndicator.hide();	
					}, 2000);
				}	
			}
		});
		return ControlPanel;
	}
);