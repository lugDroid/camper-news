var news = {
  template: $("#news-template").html(),
  news: [],
  index: 0,
  getData: function(data) {
    for (var i = 0; i < data.length; i++) {
      var date = new Date(data[this.index].timePosted);
      var news = {
        headline: data[this.index].headline.slice(0, 50) + "...",
        link: data[this.index].link,
        username: data[this.index].author.username,
        timePosted: date.getDate() + "/" + date.getMonth() + "/" + date.getYear(),
        rank: data[this.index].rank
      };
      if (data[this.index].image !== "") {
        news.image = data[this.index].image;
      } else {
        news.image = data[this.index].author.picture;
      }
      this.news.push(news);
    }
  },
  init: function() {
    this.cacheDom();
    this.getNews();
    this.render();
  },
  cacheDom: function() {
    this.$wrapper = $(".site-wrapper");
  },
  getNews: function() {
    $.getJSON("http://www.freecodecamp.com/news/hot", this.getData.bind(this));
  },
  render: function() {
    for (var i = 0; i < (this.news.length / 3) + 1; i++) {
      $(".site-wrapper").append("<div class='row' id='row-" + i + "'></div>");
      for (var j = i; j < (i + 3); j++) {
        var data = {
          news: this.news[j]
        };
        console.log(data);
        $("#row-" + i).append(Mustache.render(this.template, data));
        this.index++;
      }
    }
  }
};

$(document).ready(function() {
  news.init();
});
