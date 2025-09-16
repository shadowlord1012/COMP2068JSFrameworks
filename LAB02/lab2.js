/*
Mike Kipp
*/

//gets the required module that is needed
var prompt = require('prompt');

//custom schema for the prompt node
var schema = {
    properties :{
        value: {
            message: 'Rock Paper Scissors or quit only',
            required: true
        }
    }
}

//starts the prompt module
prompt.start();

//Outputs to the 
console.log("Welcome to Rock, Papper, Scissors!");

//Prompt to get the user information
prompt.get(schema,function (err,res){
    mainDes(res.value.toLocaleLowerCase());
});

//Starts up the game
function startGame(userInput){
    prompt.get(schema,function (err,res){

    mainDes(res.value.toLocaleLowerCase());
    
    });
}


function mainDes(inputValue){
//makes sure if the user is quiting the game or not
    if(inputValue !== 'quit' )
    {
        //if not play the game
        startGame(inputValue);
    }
    else {
        //quit program
        console.log("Quitting game");
    }
}
