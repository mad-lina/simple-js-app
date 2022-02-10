
//pokemon IIFE
let pokemonRepo=(function(){
    let pokemonList=[];
    //pokemon data
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //Function called when button is clicked
    function showDetails(pokemon){

      loadDetails(pokemon).then(function () {

      //A modal when pokemon button is clicked
        let modalContainer = document.querySelector('#modal-container');
        function showModal(pokemon) {
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        let contentElement = document.createElement('p');
        contentElement.innerText = pokemon.height;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);


        modalContainer.classList.add('is-visible');
        }

        function hideModal() {
          modalContainer.classList.remove('is-visible');
        }

        //Removes modal when user hits escape
        window.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
          }
        });
        //Removes modal when user clicks outside of modal
        modalContainer.addEventListener('click', (e) => {
          let target = e.target;
          if (target === modalContainer) {
            hideModal();
          }
        });

        document.querySelector('.newClass').addEventListener('click', () => {
          showModal(pokemon);
        });

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
