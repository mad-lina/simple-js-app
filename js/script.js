
//pokemon IIFE
let pokemonRepo=(function(){
    let pokemonList=[];
    //pokemon data
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //Function called when button is clicked
    function showDetails(pokemon){
      loadDetails(pokemon).then(function () {
      console.log(pokemon);
      });
    }

    //Using the DOM to create buttons for each pokemon
    function addListItem(pokemon){
      let pokemonListElement=document.querySelector('.pokemon-list');
      let listItem=document.createElement('li');
      let button=document.createElement('button');
      button.innerText=pokemon.name;
      button.classList.add('newClass');
      listItem.append(button);
      pokemonListElement.append(listItem);

      button.addEventListener('click', function(){showDetails(pokemon);});
    }

    function add(pokemon){
      //validate data is correct type
      if(
        typeof pokemon === 'object' &&
        'name' in pokemon
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
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
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
