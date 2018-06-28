$(document).ready(function() {

	var APIKey = "bc7d95a7643eb5c7d985e6d89eabeb81";
  topicArray = ["cat", "dog", "fish", "filet of fish", "phish"];

  createButtons(topicArray);


  $(".input-button").click(function(){
    
    var inputText = $(".input-text").val();
    inputText = inputText.toLowerCase();
    if (topicArray.includes(inputText)){
      alert("You already picked that topic dummy!")
      return
    }
    else if (inputText ==""){
      return
    }
    else {
      topicArray.push(inputText);   
      createButtons(topicArray);  
    }

    $(".gif-list").empty();


    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + inputText + "&api_key=dc6zaTOxFJmzC&limit=10";


    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var imageUrl = response.data.image_original_url;

      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        var newDiv = $("<div>");

        var p = $("<p>").text("Rating: " + results[i].rating);

        var newImage = $("<img>");


        newImage.attr("data-state", "still");
        newImage.attr("class", "gif");
        newImage.attr("data-animate", results[i].images.fixed_height.url);

        var x = results[i].images.fixed_height.url;
        x = x.replace(".gif", "_s.gif");
        
        newImage.attr("data-still", x);
        newImage.attr("src", x);

        newDiv.append(p);
        newDiv.append(newImage);

        $(".gif-list").prepend(newDiv);
      }

    }); //End ajax

    $(".input-text").val("");

  }); //End input-button click

  $(document.body).on("click", ".topic-button", function(){
    debugger
    
    var inputText = $(this).text();
    debugger
    inputText = inputText.toLowerCase();
    
    $(".gif-list").empty();

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + inputText + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var imageUrl = response.data.image_original_url;

      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        var newDiv = $("<div>");

        var p = $("<p>").text("Rating: " + results[i].rating);

        var newImage = $("<img>");
        newImage.attr("data-state", "still");
        newImage.attr("class", "gif");
        newImage.attr("data-animate", results[i].images.fixed_height.url);

        var x = results[i].images.fixed_height.url;
        x = x.replace(".gif", "_s.gif");
        
        newImage.attr("data-still", x);
        newImage.attr("src", x);

        newDiv.append(p);
        newDiv.append(newImage);

        $(".gif-list").prepend(newDiv);
      }

    }); //End ajax

  }); //End topic-button click


  function createButtons(inputArray){

    $('.button-list').empty();
    for (var i = 0; i<inputArray.length; i++){
      var newButton = $('<button class="topic-button btn btn-primary" type="button">');
      newButton.text(inputArray[i]);
      $('.button-list').append(newButton);
    }
  }

  $(document.body).on("click", ".gif", function(){
 
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } 
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
    });

}); //End $(document).ready