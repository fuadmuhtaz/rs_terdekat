require.config({
	paths: {
		backbone : '../bower_components/backbone/backbone',
		fastclick: '../bower_components/fastclick/lib/fastclick',
		jquery: '../bower_components/jquery/dist/jquery.min',
		underscore: '../bower_components/underscore/underscore-min',
		async: '../bower_components/requirejs-plugins/src/async'
	}
});

require([
	'./app'
	],
	function(App){
		new App();
	}
);