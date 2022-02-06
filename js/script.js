
//three types of pokemon with three properties:name, height, types (an array of strings)
let pokemonList=[
  {name:'Venomoth', height:1.5, type:['Shield-grass', 'Tinted-lens']},

  {name:'Charizard', height:1.7, type:['Blaze', 'Solar-power']},

  {name:'Nidoran', height:0.4, type:['Poison-point', 'Hustle']}
];

//for loop to print all three names and heights
for(let i=0; i<=(pokemonList.length-1); i++){

  //check if height is tall and comment
  if(pokemonList[i].height<1.6){
  document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) `);}
  else{
  document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) -So Tall!! `);}


}
