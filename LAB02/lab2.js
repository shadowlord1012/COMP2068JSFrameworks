/*
Mike Kipp
*/

//gets the required module that is needed
var prompt = require('prompt');

//custom schema for the prompt node
var schema = {
    properties :{
        value: {
            message: 'Enter in Rock Paper Scissors or to quit type quit',
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

    let computerChoice = Math.random();

    //if the random number is between 0.34 and 0
    if(computerChoice>=0 && computerChoice <= 0.34){
        //paper
        //outputs the results
        switch(userInput)
        {
            case "rock":
                console.log("you loose.");
                break;
            case "paper":
                console.log("its a tie");
                break;
            case "scissors":
                console.log("you win!");
                break;
        }
    }
    //if the random number is between 0.34 and 0.67
    else if (computerChoice > 0.34 && computerChoice <= 0.67)
    {
        //Scissors
        //outputs the results
        switch(userInput)
        {
            case "rock":
                console.log("you Win!");
                break;
            case "paper":
                console.log("Your Lose");
                break;
            case "scissors":
                console.log("Tie!");
                break;
        }
    }
    //if the random number is between 0.67 and 1
    else if (computerChoice > 0.67 && computerChoice <= 1)
    {
        //ROCK        
        //outputs the results
        switch(userInput)
        {
            case "rock":
                console.log("Tie!");
                break;
            case "paper":
                console.log("you Win!");
                break;
            case "scissors":
                console.log("you lose!");
                break;
        }
    }    

    //starts the game over again until quit is used.
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
