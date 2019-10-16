// user chooses a type of cuisines from dropdown menue ,
// and a picture of that food type comes up and stays on a page;
// user chooses a type of genres from dropdown menue,
// and a picture of that genre type comes up and stays on a page;
// maybe a plus sign comes up bettween them
// based on user choice of food and genre,
// we give them options (combined together: food and genre of movie) what we think is
// good together (food and movie) taken from yelp API and movie website API.
// The result is going to show up on the same page, where we won't see dropdown menus
// we see right now.

$(document).ready(function () {
  var yelpKey =
    "WryFK_Fia6X6mI7Qo4GXKpsgXq28PtJo4fj-JCC53ggv5E7izVZ--ynGA62pamf8jZgp-o7nqhqV1EEODABa0bZYmHX8bI7S-DZMtDQv0Ws0WDImLt2JRL_u31OfXXYx";
  var yelpQueryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search`;
  var randomYelpURL = `https://api.yelp.com/v3/businesses/search`;
  var foodChoice = "";

  // ----- AJAX CALL FOR RESTAURANTS
  $(".wrapperOne").hide();
  $(".wrapperTwo").hide();

  function searchYelp(userLocation, foodChoice) {
    $.ajax({
        type: "GET",
        url: yelpQueryURL,
        headers: {
          Authorization: "Bearer " + yelpKey
        },
        data: {
          term: foodChoice,
          location: userLocation
        }
      })
      .then(function (response) {
        console.log(response);
        foodChoice = "";
        $("#typeHere").val("");
        console.log(foodChoice);
        //console.table(response.businesses);
        var randomIndex = Math.floor(
          Math.random() * (response.businesses.length - 1)
        );
        console.log(response);
        var getName = $(".restaurant-name").text(
          response.businesses[randomIndex].name
        );
        console.log(getName);

        var getPrice = $(".restaurant-price").text(
          response.businesses[randomIndex].price
        );
        console.log(getPrice);

        var getAddressStreetOne = $(".restaurant-address").text(
          response.businesses[randomIndex].location.address1
        );
        console.log(getAddressStreetOne);

        var getAddressStreetTwo = $(".restaurant-address").append(
          " " + response.businesses[randomIndex].location.address2
        );
        console.log(
          getAddressStreetTwo
        );

        var getAddressCity = $(".restaurant-city").text(
          " " + response.businesses[randomIndex].location.city
        );
        console.log(getAddressCity);

        var getAddressState = $(".restaurant-city").append(", " + response.businesses[randomIndex].location.state);
        console.log(getAddressState);

        var getAddressZip = $(".restaurant-city").append(
          ", " + response.businesses[randomIndex].location.zip_code
        );
        console.log(getAddressZip);

        var getPhone = $(".restaurant-phone").text(
          "Phone: " + response.businesses[randomIndex].display_phone
        );
        console.log(getPhone);

        var getRating = $(".restaurant-rating").text(
          "Rating: " + response.businesses[randomIndex].rating + "/5"
        );

        $("#restaurantImg").attr("src", response.businesses[randomIndex].image_url);
        $("#restaurantImg").attr("width", "200px");
        $("#restaurantImg").attr("height", "200px");

        console.log(getRating);
        //console.clear();
        response.businesses.forEach(function (e) {
          //console.table(e.transactions);
        });

        console.log(response.businesses[randomIndex].transactions);
        if (
          response.businesses[randomIndex].transactions.indexOf("delivery") > -1
        ) {
          $(".restaurant-deliver").text("Delivery Available!");
          console.log(
            response.businesses[randomIndex].transactions.indexOf("delivery")
          );
        } else {
          $(".restaurant-deliver").text("Pickup Only");
        }
        $(".wrapperOne").show();

      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // searchYelp("");

  $("#btnOne").on("click", function (event) {
    event.preventDefault();
    var zipNum = $("#typeHere")
      .val()
      .trim();
    console.log(zipNum);
    if (zipNum.length === 5 && zipNum.match(/^\d+$/) && foodChoice !== "") {
      console.log("zipcode = 5");
      searchYelp(zipNum, foodChoice);
    } else {
      Swal.fire(
        'Oh no!',
        'You need to input both the zip code AND your favorite food cuisine!',
        'error'
      );
    }
  })

  $("#dropdownMenu2").on("click", function (event) {
    event.preventDefault();
  });

  $(".food-search").on("click", function (event) {
    var searchTerm = event.target.value;
    var foodString = $(this).text();
    foodChoice = searchTerm;
    console.log(foodChoice);
    $("#dropdownMenu2").text(foodString);
  });

  $(".genre-search").on("click", function (event) {
    var movieSearchTerm = event.target.value;
    var movieSearchString = $(this).text();
    searchMovie(movieSearchTerm);
    $("#dropdownMenu3").text(movieSearchString);
    $(".wrapperTwo").show();
  });

  $("#random").on("click", function () {
    Swal.fire({
      title: '<h2 style="color:chartreuse">RANDOMIZED!</h2>',
      width: 500,
      padding: '3em',
      background: '#fff url("https://media.giphy.com/media/i1hiQy3uVZ0KQ/source.gif")',
    });
    randomMovie();
    $(".wrapperTwo").show();
    randomYelp();
    $(".wrapperOne").show();

  });

  // AJAX FUNCTION TMDB

  function searchMovie(movieSearchTerm) {
    var movieAPI = "9c78f7f7ceee5681298aabdde3007043";
    var movieURL =
      "https://api.themoviedb.org/3/discover/movie?api_key=" +
      movieAPI +
      "&with_genres=" +
      movieSearchTerm;

    $.ajax({
      type: "GET",
      url: movieURL,
      header: {
        authorization: "Bearer " + movieAPI
      }
    }).then(function (response) {
      console.log(response);
      console.log(movieURL);
      var randomMovieIndex = Math.floor(
        Math.random() * (response.results.length - 1)
      );
      var getMovieName = $(".movie-title").text(
        response.results[randomMovieIndex].original_title
      );

      $("#movieImg").attr(
        "src",
        "https://image.tmdb.org/t/p/w200" +
        response.results[randomMovieIndex].poster_path
      );
      var getMoviePlot = $(".movie-plot").text(
        response.results[randomMovieIndex].overview
      );
      $(".movie-title").prepend(getMovieName);
      $(".movie-plot").append(getMoviePlot);
    });
  }

  function randomMovie() {
    var movieAPI = "9c78f7f7ceee5681298aabdde3007043";
    var movieURL =
      "https://api.themoviedb.org/3/discover/movie?api_key=" +
      movieAPI;

    $.ajax({
      type: "GET",
      url: movieURL,
      header: {
        authorization: "Bearer " + movieAPI
      }
    }).then(function (response) {
      console.log(response);
      console.log(movieURL);
      var randomMovieIndex = Math.floor(
        Math.random() * (response.results.length - 1)
      );
      var getMovieName = $(".movie-title").text(
        response.results[randomMovieIndex].original_title
      );

      $("#movieImg").attr(
        "src",
        "https://image.tmdb.org/t/p/w200" +
        response.results[randomMovieIndex].poster_path
      );
      var getMoviePlot = $(".movie-plot").text(
        response.results[randomMovieIndex].overview
      );
      $(".movie-title").prepend(getMovieName);
      $(".movie-plot").append(getMoviePlot);
    });
  };

  function randomYelp() {
    $.ajax({
        type: "GET",
        url: yelpQueryURL,
        headers: {
          Authorization: "Bearer " + yelpKey
        },
        data: {
          term: "food",
          location: "08873"
        }
      })
      .then(function (response) {
        console.log(response);
        foodChoice = "";
        $("#typeHere").val("");
        console.log(foodChoice);
        //console.table(response.businesses);
        var randomIndex = Math.floor(

          Math.random() * (response.businesses.length - 1)
        );
        console.log(response);
        var getName = $(".restaurant-name").text(
          response.businesses[randomIndex].name
        );
        console.log(getName);

        var getPrice = $(".restaurant-price").text(
          response.businesses[randomIndex].price
        );
        console.log(getPrice);

        var getAddressStreetOne = $(".restaurant-address").text(
          response.businesses[randomIndex].location.address1
        );
        console.log(getAddressStreetOne);

        var getAddressStreetTwo = $(".restaurant-address").append(
          " " + response.businesses[randomIndex].location.address2
        );
        console.log(
          getAddressStreetTwo
        );

        var getAddressCity = $(".restaurant-city").text(
          " " + response.businesses[randomIndex].location.city
        );
        console.log(getAddressCity);

        var getAddressState = $(".restaurant-city").append(", " + response.businesses[randomIndex].location.state);
        console.log(getAddressState);

        var getAddressZip = $(".restaurant-city").append(
          ", " + response.businesses[randomIndex].location.zip_code
        );
        console.log(getAddressZip);

        var getPhone = $(".restaurant-phone").text(
          "Phone: " + response.businesses[randomIndex].display_phone
        );
        console.log(getPhone);

        var getRating = $(".restaurant-rating").text(
          "Rating: " + response.businesses[randomIndex].rating + "/5"
        );

        $("#restaurantImg").attr("src", response.businesses[randomIndex].image_url);
        $("#restaurantImg").attr("width", "200px");
        $("#restaurantImg").attr("height", "200px");

        console.log(getRating);
        //console.clear();
        response.businesses.forEach(function (e) {
          //console.table(e.transactions);
        });

        console.log(response.businesses[randomIndex].transactions);
        if (
          response.businesses[randomIndex].transactions.indexOf("delivery") > -1
        ) {
          $(".restaurant-deliver").text("Delivery Available!");
          console.log(
            response.businesses[randomIndex].transactions.indexOf("delivery")
          );
        } else {
          $(".restaurant-deliver").text("Pickup Only");
        }

        $(".wrapperOne").show();

      })
      .catch(function (error) {
        console.log(error);
      });
  }

// Initialize Firebase 
const config = {
  apiKey: "AIzaSyDjC8K5PHrRVcL_GXYtFUFjMSWJT17uZxc",
  authDomain: "happy-hour-a46f7.firebaseapp.com",
  databaseURL: "https://happy-hour-a46f7.firebaseio.com",
  projectId: "happy-hour-a46f7",
  storageBucket: "happy-hour-a46f7.appspot.com",
  messagingSenderId: "1020075149720",
  appId: "1:1020075149720:web:c7ab7fde36b8ab6ae103ed"
};

firebase.initializeApp(config);

var database = firebase.database();
var movieInput = "";
var foodInput = "";

// Capture Button Click
$(".btn-like").on("click", function (event) {
  event.preventDefault();
  console.log("Clicked")

  // Grabbed values from text boxes
  movieInput = $(".movie-title")
    .text();
  foodInput = $(".restaurant-name")
    .text();

  var ref = firebase.database().ref("/pairs");
  var pair = {
    movieName: $(".movie-title").text(),
    moviePlot: $(".movie-plot").text(),
    foodName: $(".restaurant-name").text(),
    likes: 0
  };
  var found = false;

  ref.once("value", pairs => { 
    console.log("once value entered");

    pairs.forEach(pair => { 
      // get the key and data from the snapshot
      const childKey = pair.key;
      const childData = pair.val();
      console.log(childKey);
      console.log(childData);
      console.log(childData.foodName);
      console.log(foodInput);
      console.log(childData.movieName);
      console.log(movieInput);
      if (childData.movieName === movieInput && childData.foodName === foodInput) {
        console.log("Found it!!!!");
        // setting 'found' to true must be placed before api
        found = true;
        console.log("found: " + found);
        var likes = childData.likes;
        likes++;

        ref.child(childKey).update({
          likes: likes
        })
      }
    });
    if (!found) {
      console.log("found : " + found)
      ref.push(pair);
      console.log("object pushed to firebase");
    }

  });
});
});