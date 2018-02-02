var performanceJobs = {
    team1: "http://localhost:8080/view/performance/job/performance-test/lastStableBuild/artifact/out/index.html",
    team2: "http://localhost:8080/view/performance/job/performance-test/lastStableBuild/artifact/out/index.html",
};

var MyTabModel = Backbone.Collection.extend({
    url: 'data/myplugindata.json'
})

class MyLayout extends allure.components.AppLayout {

    initialize() {
        this.model = new MyTabModel();
    }

    loadData() {
        return this.model.fetch();
    }

    getContentView() {
        return new MyView({items: this.model.models});
    }
}

const template = function (data) {
    html = '<h3 class="pane__title">Performance</h3>';
    html += `<table><tr><th>Team</th><th>Jenkins Job</th><th>Comments</th></tr><tr><td id="team">Team-1</td><td><a href="${performanceJobs.team1}">Performance job</a></td><td>Job with Wealth performance tests</td></tr><tr><td id="team2">Team-2</td><td><a href="${performanceJobs.team2}">Performance job</a></td><td>Job with performance tests</td></tr></table>`
//    for (var item of data.items) {
//        html += '<p>' + item.attributes.name + ' says: ' + item.attributes.sounds + '</p>';
//    }
    return html;
}

var MyView = Backbone.Marionette.View.extend({
    template: template,

    render: function () {
        this.$el.html(this.template(this.options));
        return this;
    }
})

allure.api.addTab('performancetab', {
    title: 'Performance', icon: 'fa fa-trophy',
    route: 'performancetab',
    onEnter: (function () {
        return new MyLayout()
    })
});
