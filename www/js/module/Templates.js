define([
	'jquery',
	'underscore'
	],
	function($, _){
		var TplManager = {
			templates: {},
			cachedTemplates: {},
			getCachedTemplate: function(tplName){
				if(this.cachedTemplates.hasOwnProperty(tplName)){
					return this.cachedTemplates[tplName];
				}

				if(this.templates.hasOwnProperty(tplName)){
					this.cachedTemplates[tplName] = _.template(this.templates[tplName]);
				}

				return this.cachedTemplates[tplName];
			}
		};

		TplManager.templates.table = [
		'<ul class="table-view"></ul>'
		].join('\n');

		TplManager.templates.tableItem = [
		'<li class="table-view-cell">',
			'<a href="#<%= identifier %>">',
				'<h4><%= name %></strong></h4>',
				'<span class="badge"><%= distance %></span>',
				'<p><%= vicinity %></p>',
			'</a>',
		'</li>'
		].join('\n');

		return TplManager;
	}
);