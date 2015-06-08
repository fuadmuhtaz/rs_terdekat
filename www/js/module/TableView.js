define([
	'jquery',
	'underscore',
	'backbone',
	'./Templates'
	],
	function($, _, Backbone, TplManager){
		var TableView = Backbone.View.extend({
			initialize: function(){
				this.listenTo(Backbone, 'HosToTab', this.render);
			},

			template: TplManager.getCachedTemplate('table'),
			itemTemplate: TplManager.getCachedTemplate('tableItem'),

			render: function(){
				this.$el.empty();
				this.$el.html(this.template);
				for(var i=0; i<this.collection.length; i++)
					this.itemRender(this.collection.at(i));
				$('.content').html(this.el);
			},

			itemRender: function(data){
				this.$('.table-view').append(this.itemTemplate(data.toJSON()));
			}
		});
		return TableView;
	}
);