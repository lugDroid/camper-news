var news = {
  articlesList: [],
  index: 0,
  article: {},
  cacheDom: function() {
    this.$wrapper = $(".site-wrapper");
    this.template = $("#news-template").html();
  },
  getNews: function() {
    console.log("Getting data...");
    $.getJSON("http://www.freecodecamp.com/news/hot?callback=?", this.getData.bind(this));
  },
  getData: function(data) {
    console.log("Parsing data received...");
    var date;
    for (var i = 0; i < data.length; i++) {
      date = new Date(data[i].timePosted);
      this.article = {
        headline: data[i].headline.slice(0, 50) + "...",
        link: data[i].link,
        username: data[i].author.username,
        timePosted: date.getDate() + "/" + date.getMonth() + "/" + date.getYear(),
        rank: data[i].rank
      };
      if (data[i].image !== "") {
        this.article.image = data[i].image;
      } else {
        this.article.image = data[i].author.picture;
      }
      this.articlesList.push(this.article);
    }
  },
  render: function() {
    for (var i = 0; i < (this.articlesList.length / 3) + 1; i++) {
      $(".site-wrapper").append("<div class='row' id='row-" + i + "'></div>");
      for (var j = i; j < (i + 3); j++) {
        var data = {
          news: this.articlesList[j]
        };
        $("#row-" + i).append(Mustache.render(this.template, data));
        this.index++;
      }
    }
  },
  init: function() {
    this.cacheDom();
    this.getNews();
    console.log(this.articlesList);
    this.render();
  }
};

$(document).ready(function() {
  news.init();
});
