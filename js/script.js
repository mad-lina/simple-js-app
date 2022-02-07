
//three types of pokemon with three properties:name, height, types (an array of strings)
let pokemonList=[
  {name:'Venomoth', height:1.5, type:['Shield-grass', 'Tinted-lens']},

  {name:'Charizard', height:1.7, type:['Blaze', 'Solar-power']},

  {name:'Nidoran', height:0.4, type:['Poison-point', 'Hustle']}
];

//Foreach loop with arrow function
pokemonList.forEach( poke =>
  {
    if(poke.height<1.6){
    document.write(`<div> ${poke.name} (height: ${poke.height}) </div>`)
    }
    else{
    document.write(`<div> ${poke.name} (height: ${poke.height}) -So Tall!! </div>`)
    }
  }
);


/*Foreach loop practice without arrow function
function pokeLoopfunction(poke){

document.write(`${poke.name} (height: ${poke.height}) `);

}
pokemonList.forEach(pokeLoopfunction);*/
