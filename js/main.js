$(document).ready(function() {
  var template = $("#news-template").html();

  console.log("waiting for data");
  $.getJSON("http://www.freecodecamp.com/news/hot", function(data) {
    console.log("data received");
    var index = 0;

    for (var i = 0; i < (data.length / 3) + 1; i++) {
      $(".site-wrapper").append("<div class='row' id='row-" + i + "'></div>");

      for (var j = i; j < (i + 3); j++) {
        var date = new Date(data[index].timePosted);

        var news = {
          headline: data[index].headline.slice(0, 50) + "...",
          //image: "",
          link: data[index].link,
          username: data[index].author.username,
          timePosted: date.getDate() + "/" + date.getMonth() + "/" + date.getYear(),
          rank: data[index].rank
        };

        if (data[index].image !== "") {
          news.image = data[index].image;
        } else {
          news.image = data[index].author.picture;
        }

        $("#row-" + i).append(Mustache.to_html(template, news));

        index++;
      }
    }
  });
});
