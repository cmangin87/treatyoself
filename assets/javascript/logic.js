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

//--------------------- KEVS STUFF ------------------
// --------------- VARS
$(document).ready(function () {
      var yelpKey =
        "WryFK_Fia6X6mI7Qo4GXKpsgXq28PtJo4fj-JCC53ggv5E7izVZ--ynGA62pamf8jZgp-o7nqhqV1EEODABa0bZYmHX8bI7S-DZMtDQv0Ws0WDImLt2JRL_u31OfXXYx";
      var yelpQueryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search`;
      var foodChoice = "";

      // ----- AJAX CALL FOR RESTAURANTS
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
              //Chris added this section from Kev //
              Math.random() * (response.businesses.length - 1)
            );
            console.log(response);
            var getName = $(".restaurant-name").text(
              response.businesses[randomIndex].name
            );
            console.log(getName);

            // Chris added this section
            Swal.fire({
              title: response.businesses[randomIndex].name,

              html: `<div class="results">
        <div class="restaurant-deliver"> ${response.businesses[randomIndex].transactions}</div>
        <div class="food-result"> Address: ${response.businesses[randomIndex].location.address1}</div>
        <div class="food-result">${response.businesses[randomIndex].location.address2}</div>
        <div class="food-result"> City: ${response.businesses[randomIndex].location.city}</div>
        <div class="food-result"> Zip: ${response.businesses[randomIndex].location.zip_code}</div>
        <div class="food-result"> Phone #: ${response.businesses[randomIndex].phone}</div>
        <div class="food-result"> Yelp Rating: ${response.businesses[randomIndex].rating}/5</div>        
      </div>
              `,
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: "Custom image",
              animation: true
            });

            var getAddressStreetOne = $(".restaurant-address").text(
              response.businesses[randomIndex].location.address1
            );
            console.log(getAddressStreetOne);

            var getAddressStreetTwo = $(".restaurant-address").append(
              " " + response.businesses[randomIndex].location.address2
            );
            console.log(
              getAddressStreetTwo
            ); /* This is for the second address line. ie if there is an apartment number/suite number it'll list here. THIS NEEDS TO BE TESTED ON A WORKING SUITE/APRT ADDRESS*/

            var getAddressCity = $(".restaurant-address-city").text(
              " " + response.businesses[randomIndex].location.city
            );
            console.log(getAddressCity);

            var getAddressZip = $(".restaurant-address-zip").text(
              " " + response.businesses[randomIndex].location.zip_code
            );
            console.log(getAddressZip);

            var getPhone = $(".restaurant-phone").text(
              "Phone: " + response.businesses[randomIndex].phone
            );
            console.log(getPhone);

            var getRating = $(".restaurant-rating").text(
              "Rating: " + response.businesses[randomIndex].rating + "/5"
            );

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
          searchMovie();
        } else {
          alert("USE SWEETALERT");
        }
      })

      // Chris testing Kevin's randomization
      // var randomArray = [];

      // function RandoResults() {
      //   for (i=0; i<response.length; i++) {
      //     var randomText = response.businesses.results[randomIndex]
      //   ;}
      //   $("WHERE??").text(randomText);

      // }

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
        console.log(movieSearchTerm);
        searchMovie(movieSearchTerm);
        $("#dropdownMenu3").text(movieSearchString);
      });
      // ----- TO DO ----
      // Randomize restaurant results - for loop
      // THERE IS A SECOND ADDRESS LINE FOR SUITE AND APARTMENTS, DON'T FORGET IN THE CSS.
      //--------------------- END KEVS STUFF ------------------


      //-----Jake's Work-----//
      //-----TO DO-----//
      // Find a way to chain response modal with quiz complete modal
      // input movie database API
      //Edit CSS to reformat buttons and pages


      $("#quizBtn").on("click", function () {
        swal.queue([
          // Step 0
          {
            title: "We're gonna ask you a few questions!",
            confirmButtonText: 'Next &rarr;'
          },

          // Step 1
          {
            title: 'What is your favorite type of food!',
            input: 'select',
            inputOptions: {
              italian: 'Italian',
              mexican: 'Mexican',
              japanese: 'Japanese',
              indian: 'Indian',
              fastfood: 'Fast Food',
              chinese: 'Chinese',
              thai: 'Thai',
              greek: 'Greek',
              bbq: 'Barbecue',
              spanish: 'spanish'
            },
            inputPlaceholder: 'Select a food type',
            showCancelButton: false,
            confirmButtonText: "Continue &rarr; ",
            inputValidator: (value) => {
              return !value && 'You need to pick something!'
            }
          },
          {
            title: 'Choose your favorite movie genre!',
            input: 'select',
            inputOptions: {
              action: 'Action',
              animated: 'Animated',
              comedy: 'Comedy',
              drama: 'Drama',
              horror: 'Horror',
              romance: 'Romance',
              romcom: 'Romantic Comedy',
              scifi: 'Sci-Fi',
              thriller: 'Thriller'
            },
            inputPlaceholder: 'Select a movie genre',
            showCancelButton: false,
            confirmButtonText: "Continue &rarr; ",
            inputValidator: (value) => {
              return !value && 'You need to pick something!'
            }
          },
          {
            title: 'Enter your zipcode!',
            input: 'text',
            inputValue: '',
            inputPlaceholder: '00000',
            inputValidator: (value) => {
              return !value && 'You need to pick something!'
            }
          },
          {
            title: 'Are you high?',
            input: 'select',
            inputOptions: {
              high: 'Absolutely!',
              definitelyhigh: 'Not sure..',
              not: 'Nope!'
            },
            inputPlaceholder: 'Well are you?',
            showCancelButton: false,
            confirmButtonText: "Finish!",
            inputValidator: (value) => {
              return !value && 'You need to pick something!'
            }
          }
        });

        // Chris testing Kevin's randomization
        // var randomArray = [];

        // function RandoResults() {
        //   for (i=0; i<response.length; i++) {
        //     var randomText = response.businesses.results[randomIndex]
        //   ;}
        //   $("WHERE??").text(randomText);

        // }

        $("#dropdownMenu2").on("click", function (event) {
          event.preventDefault();
        });

        $(".food-search").on("click", function (event) {
          var searchTerm = event.target.value;
          foodChoice = searchTerm;
          console.log(foodChoice);
        });

        $(".genre-search").on("click", function (event) {
          var movieSearchTerm = event.target.value;
          console.log(movieSearchTerm);
          searchMovie(movieSearchTerm);
        });

        // ----- TO DO ----
        // Randomize restaurant results - for loop
        // THERE IS A SECOND ADDRESS LINE FOR SUITE AND APARTMENTS, DON'T FORGET IN THE CSS.
        //--------------------- END KEVS STUFF ------------------

        //-----Jake's Work-----//
        //-----TO DO-----//
        // Find a way to chain response modal with quiz complete modal
        // input movie database API
        //Edit CSS to reformat buttons and pages

        $("#quizBtn").on("click", function () {
          swal
            .queue([
              // Step 0
              {
                title: "We're gonna ask you a few questions!",
                confirmButtonText: "Next &rarr;"
              },

              // Step 1
              {
                title: "What is your favorite type of food!",
                input: "select",
                inputOptions: {
                  italian: "Italian",
                  mexican: "Mexican",
                  japanese: "Japanese",
                  indian: "Indian",
                  fastfood: "Fast Food",
                  chinese: "Chinese",
                  thai: "Thai",
                  greek: "Greek",
                  bbq: "Barbecue",
                  spanish: "spanish"
                },
                inputPlaceholder: "Select a food type",
                showCancelButton: false,
                confirmButtonText: "Continue &rarr; ",
                inputValidator: value => {
                  return !value && "You need to pick something!";
                }
              },
              {
                title: "Choose your favorite movie genre!",
                input: "select",
                inputOptions: {
                  action: "Action",
                  animated: "Animated",
                  comedy: "Comedy",
                  drama: "Drama",
                  horror: "Horror",
                  romance: "Romance",
                  romcom: "Romantic Comedy",
                  scifi: "Sci-Fi",
                  thriller: "Thriller"
                },
                inputPlaceholder: "Select a movie genre",
                showCancelButton: false,
                confirmButtonText: "Continue &rarr; ",
                inputValidator: value => {
                  return !value && "You need to pick something!";
                }
              },
              {
                title: "Enter your zipcode!",
                input: "text",
                inputValue: "",
                inputPlaceholder: "00000",
                inputValidator: value => {
                  return !value && "You need to pick something!";
                }
              },
              {
                title: "Are you high?",
                input: "select",
                inputOptions: {
                  high: "Absolutely!",
                  definitelyhigh: "Not sure..",
                  not: "Nope!"
                },
                inputPlaceholder: "Well are you?",
                showCancelButton: false,
                confirmButtonText: "Finish!",
                inputValidator: value => {
                  return !value && "You need to pick something!";
                }
              }
            ])
            .then(result => {
              console.log(
                result.value[1],
                result.value[2],
                result.value[3],
                result.value[4]
              );
              zipNum = result.value[3];
              searchTerm = result.value[1];
              if (
                result.value[4] === "high" ||
                result.value[4] === "definitelyhigh"
              ) {
                swal.fire({
                  title: "Randomized! Try something new!",
                  customClass: "high-card",
                  padding: "3em",
                  background: "#fff url(assets/css/Trippy.jpg)",
                  confirmButtonText: "Nice.",
                  backdrop: `
          rgba(0,0,123,0.4)
          url("https://media.giphy.com/media/6wmz6Qo40eTDf4tW3Z/giphy.gif")
          center top
          no-repeat
        `
                });
              } else {
                swal.fire("Quiz Finished!", "Here are your results.", "success");

                searchYelp(zipNum, foodChoice);
              }
            });
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

            var getMoviePoster = $("<img>");
            getMoviePoster.attr(
              "src",
              "https://image.tmdb.org/t/p/w200" +
              response.results[randomMovieIndex].poster_path
            );
            var getMoviePlot = $(".movie-plot").text(
              response.results[randomMovieIndex].overview
            );
            $(".movie-title").prepend(getMovieName);
            $(".movie-poster").append(getMoviePoster);
            $(".movie-plot").append(getMoviePlot);
          });
        }
      });