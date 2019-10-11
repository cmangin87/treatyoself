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
    .then(function(response) {
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
        animation: false
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
      response.businesses.forEach(function(e) {
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
    .catch(function(error) {
      console.log(error);
    });
}
// searchYelp("");

$("#btnOne").on("click", function(event) {
  event.preventDefault();
  var zipNum = $("#typeHere")
    .val()
    .trim();
  console.log(zipNum);
  if (zipNum.length === 5 && zipNum.match(/^\d+$/) && foodChoice !== "") {
    console.log("zipcode = 5");
    searchYelp(zipNum, foodChoice);
  } else {
    alert("USE SWEETALERT");
  }
});

// Chris testing Kevin's randomization
function RandoResults() {
  var randomText = response.businessses.results[randomIndex];
  $("WHERE??").text(randomText);
}

$("#dropdownMenu2").on("click", function(event) {
  event.preventDefault();
});

$(".food-search").on("click", function(event) {
  var searchTerm = event.target.value;
  foodChoice = searchTerm;
  console.log(foodChoice);
});

$(".genre-search").on("click", function(event) {
  var searchTerm = event.target.value;
  console.log(searchTerm);
});

// ----- TO DO ----
// Randomize restaurant results - for loop
// THERE IS A SECOND ADDRESS LINE FOR SUITE AND APARTMENTS, DON'T FORGET IN THE CSS.
//--------------------- END KEVS STUFF ------------------
