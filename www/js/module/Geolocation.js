define([
	'underscore',
	'backbone'
	],
	function(_, Backbone){
		var Geolocation = Backbone.Model.extend({
			initialize: function(){
				this.getCurrentPosition();
			},

			getCurrentPosition: function(){
				var self = this;
				function onSuccess(position){
					self.set({
						lat: position.coords.latitude,
						lng: position.coords.longitude
					});
					Backbone.trigger("GeoToHos", self);
				}

				function onError(){
					navigator.notification.alert("Tidak bisa mendapatakan lokasi", function(){
						navigator.app.exitApp();
					});
				}
				navigator.geolocation.getCurrentPosition(onSuccess, onError);
			}
		});
		return Geolocation;
	}
);