//pokemon IIFE
let pokemonRepo=(function(){
    let pokemonList=[];
    //pokemon data
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //Function called when button is clicked
    function showDetails(pokemon){
      loadDetails(pokemon).then(function () {
        console.log("showDetails", pokemon);
        //A modal when pokemon button is clicked
        showModal(pokemon);
      });
    }

    //A modal when pokemon button is clicked
      function showModal(pokemon) {
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');
      let modalHeader = $('.modal-header');

      modalTitle.empty();
      modalBody.empty();

      let nameElement = $('<h1>' + pokemon.name + '</h1>');

      let imageElementFront = $('<img class="modal-img" style="width:50%">');
      imageElementFront.attr("src", pokemon.imageUrlFront);

      let imageElementBack = $('<img class="modal-img" style="width:50%">');
      imageElementBack.attr("src", pokemon.imageUrlBack);

      let heightElement = $('<p>' + 'height : ' + pokemon.height + '</p>');
      // //creating element for weight in modal content
      let weightElement = $('<p>' + 'weight : ' + pokemon.weight + '</p>');
      // //creating element for type in modal content
      let typesElement = $('<p>' + 'types : ' + pokemon.types + '</p>');
      // //creating element for abilities in modal content
      let abilitiesElement = $('<p>' + 'abilities : ' + pokemon.abilities + '</p>');

      modalTitle.append(nameElement);
      modalBody.append(imageElementFront);
      modalBody.append(imageElementBack);
      modalBody.append(heightElement);
      modalBody.append(weightElement);
      modalBody.append(typesElement);
      modalBody.append(abilitiesElement);
      }

    //Using bootstrap to create a 'card' class for each pokemon
    function addListItem(pokemon){
      pokemonRepo.loadDetails(pokemon).then(function () {
        var $row = $(".row");

        var $card = $('<div class="card col-sm-4" style="width:400px"></div>');
        var $image = $('<img class="card-img-top" alt="Card image" style="width:20%" />');
        $image.attr("src", pokemon.imageUrlFront);
        var $cardBody = $('<div class="card-body"></div>');
        var $cardTitle = $("<h4 class='card-title' >" + pokemon.name + "</h4>");
        var $seeProfile = $(
          '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#pokemonModal">See Profile</button>'
        );

        //Not sure how to implement aria
        var ariaLabel = $('aria-label');

        $row.append($card);
        //Append the image to each card
        $card.append($image);
        $card.append($cardBody);
        $cardBody.append($cardTitle);
        $cardBody.append($seeProfile);

        $seeProfile.on("click", function (event) {
          showDetails(pokemon);
        });
      });
    }

    function add(pokemon){
      //validate data is correct type
      if(
        typeof pokemon === 'object' &&
        'name' in pokemon &&
        'detailsUrl' in pokemon
      ){
        //add pokemon to pokemonList
        return pokemonList.push(pokemon);
      }else{
        console.log('pokemon is not correct');
      }
    }

    function getAll(){
      return pokemonList;
    }

    //Calling data and converting from JSON to objects in pokemonList
    function loadList(){
      return fetch(apiUrl).then(function(response){
        return response.json();
      }).then(function(json){
        json.results.forEach(function(item){
          let pokemon={
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function(e){
        console.error(e);
      })
    }

    //Putting details from the pokemon data into pokemonList objects
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = [];
        for (var i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
        item.abilities = [];
        for (var i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }
      }).catch(function (e) {
        console.error(e);
      });
    }

    return{
      add:add,
      getAll:getAll,
      addListItem:addListItem,
      loadList:loadList,
      loadDetails:loadDetails
    }

})();

pokemonRepo.loadList().then(function(){

  pokemonRepo.getAll().forEach( pokemon =>
    {
      pokemonRepo.addListItem(pokemon);
    }
  );

})
