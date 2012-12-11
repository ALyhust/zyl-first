
var Task=Backbone.Model.extend({}
	
);

var TaskList=Backbone.Collection.extend({
	model: Task,
	initialize:function(models,options){
		if(options){
			this.url=options.url;
		}
	}
});


var TaskRowView = Backbone.View.extend({
    tagName: "li",
    className: "document-row",
    events: {
        "mouseover   .service": "test"
    },
    initialize: function(options) {
        _.bindAll(this, 'render');
        _.extend(this, Backbone.Events);
        this.model.bind("change", this.render, this);
    },
    render: function() {
        //var that=this;
		console.log(this.model.toJSON());
        $(this.el).html(Mustache.to_html($("#test-container-template").html(), this.model.toJSON()));
        return this;
    },
    test: function() {
        this.model.set({name:"123123123"});
    }

});

var TaskListView = Backbone.View.extend({
    tagName: "ul",
    className: "document",
    initialize: function(options) {
        _.bindAll(this, 'render');
        _.extend(this, Backbone.Events);
        this.collection = new TaskList(null, { url: "data.json" });
        this.collection.bind("reset", this.addALL, this);
    },
    loadTasks: function() {
        var that = this;
        this.collection.fetch();
    },
    addALL: function() {
        _.each(this.collection.models, function(model) {
			console.log("22");
            this.addOne(model);
        }, this);
    },
    addOne: function(model) {
        var taskRowView = new TaskRowView({ model: model });
        $(this.el).append(taskRowView.render().el);
    },
    render: function() {
        $("#canvas").append(this.el);
        return this;
    }

});