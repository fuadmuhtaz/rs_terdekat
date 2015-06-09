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
				this.setLeg(directionsDisplay.selectedLegStep.Dp);
				$('#directions-panel').hide();
			},

			setLeg: function(leg){
				map.panTo(directionsDisplay.directions.routes[0].legs[0].steps[leg].start_location);
			}
		});
		return ControlPanel;
	}
);