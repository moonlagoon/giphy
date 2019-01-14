$(document).ready(function(){
  
  const topics = 
  ["Naruto", 
  "Noragami", 
  "My Hero Academia", 
  "One Punch Man", 
  "Tokyo Ghoul"];

  function displayAnime() {

    var anime = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + anime + "&api_key=dc6zaTOxFJmzC";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response){
      $("#animeImg").empty();

      var results = response.data;

      console.log(response);

      for(var i = 0; i < results.length; i++) {

        var animeDiv = $("<div>");

        animeDiv.addClass("animepictures");

        var rating = results[i].rating;
        var p = $("<h2>").text("Rating: " + rating);

        var animeImage = $("<img>");
        animeImage.attr("src", results[i].images.fixed_height_still.url);
        animeImage.attr("data-still", results[i].images.fixed_height_still.url);
        animeImage.attr("data-animate", results[i].images.fixed_height.url);
        animeImage.attr("data-state", "still");
        animeImage.addClass('animeImage');

        animeDiv.prepend(p);

        animeDiv.prepend(animeImage);
        $("#previewAnime").prepend(animeDiv);
      }

      $(".animeImage").on("click", function() {
        var state = $(this).attr("data-state");
        console.log(state);

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });        
  }

  function renderButtons() {

    $("#animebuttons").empty();

    for(var i = 0; i < topics.length; i++) {

      var animeAdd = $("<button>");

      animeAdd.addClass("anime");

      animeAdd.attr("data-name", topics[i]);

      animeAdd.text(topics[i]);

      $("#animebuttons").append(animeAdd);
    }
  }

  $("#add-anime").on("click", function(event){
    event.preventDefault();

    var anime = $("#input").val().trim();

    topics.push(anime);

    renderButtons();
  });

  $(document).on("click", ".anime", displayAnime);
  renderButtons();
});