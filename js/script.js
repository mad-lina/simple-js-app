
//pokemon IIFE
let pokemonRepo=(function(){

    //three types of pokemon with three properties:name, height, types (an array of strings)
    let pokemonList=[
      {name:'Venomoth', height:1.5, type:['Shield-grass', 'Tinted-lens']},

      {name:'Charizard', height:1.7, type:['Blaze', 'Solar-power']},

      {name:'Nidoran', height:0.4, type:['Poison-point', 'Hustle']}
    ];

    //Function called when button is clicked
    function showDetails(pokemon){
      console.log(pokemon.name);
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

      button.addEventListener('click', showDetails(pokemon));
    }

    function add(){
      return pokemonList.push(poke);
    }

    function getAll(){
      return pokemonList;
    }

    return{
      add:add,
      getAll:getAll,
      addListItem:addListItem
    }

})();

//Foreach loop with arrow function
pokemonRepo.getAll().forEach( poke =>
  {
    pokemonRepo.addListItem(poke);
  }
);
