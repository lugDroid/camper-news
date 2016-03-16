$(document).ready(function() {
  console.log("waiting for data");
  $.getJSON("http://www.freecodecamp.com/news/hot", function(data) {
    console.log("data received");
    var index = 0;

    for (var i = 0; i < (data.length / 3) + 1; i++) {
      $(".site-wrapper").append("<div class='row' id='row-" + i + "'></div>");

      for (var j = i; j < (i + 3); j++) {
        // obtain info from current elements
        var headline = data[index].headline.slice(0, 50) + "...";
        var image;
        if (data[index].image !== "") {
          image = data[index].image;
        } else {
          image = data[index].author.picture;
        }
        var link = data[index].link;
        var username = data[index].author.username;
        var date = new Date(data[index].timePosted);
        console.log(data[index].timePosted, (data[index].timePosted / 1000) ,new Date(Math.floor(data[index].timePosted / 1000)));
        var timePosted = date.getDate() + "/" + date.getMonth() + "/" + date.getYear();
        var rank = data[index].rank;

        // generate html
        $("#row-" + i).append("<div class='col-md-4'><div class='thumbnail'><a href=" + link + " target='_blank'><img src=" + image + "></a><div class='caption'><a href=" + link + " target='_blank'><h3 class='text-center'>" + headline + "</h3></a><div class='bottom-info'><p class='text-left post-info'>by <a href='http://www.freecodecamp.com'" + username + " target='_blank'>" + username + "</a> on " + timePosted + "</p><p class='text-right rank'><span class='glyphicon glyphicon-heart'></span> " + rank + "</p></div></div></div></div>");

        // update index
        index++;
      }
    }
  });
});
